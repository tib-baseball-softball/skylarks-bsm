package tib

import (
	"crypto/md5"
	"encoding/hex"
	"encoding/json"
	"errors"
	"log"
	"net/url"
	"os"
	"regexp"
	"sync"
	"time"

	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/pocketbase/dbx"
)

const cacheLifetimeMinutes = 1440

var cacheURLAllowlist = []*regexp.Regexp{
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/licenses\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/league_groups(/\d+)?(\.json)?(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/league_groups/\d+/top10/(batting|pitching|fielding)/[^/]+\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/licenses/\d+\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/matches/\d+\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/club_functions\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/fields\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/matches\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/matches\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/(teams|team_clubs)\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/league_groups/\d+/(table|statistics)\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/(league_entries|people|clubs)/\d+/(statistics)(/.*)?\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/matches/\d+/match_boxscore\.json(?:\?.*)?$`),
}

type RequestCache struct {
	ID           string `db:"id"`
	Hash         string `db:"hash"`
	ResponseBody string `db:"responseBody"`
	ExpiresAt    string `db:"expires_at"`
	URL          string `db:"url"`
	Identifier   string `db:"identifier"`
}

func getMD5Hash(text string) string {
	hash := md5.Sum([]byte(text))
	return hex.EncodeToString(hash[:])
}

// isAllowedBSMURL checks if the given url matches any regex in the cacheURLAllowlist
func isAllowedBSMURL(u *url.URL) bool {
	urlStr := u.String()
	for _, re := range cacheURLAllowlist {
		if re.MatchString(urlStr) {
			return true
		}
	}
	return false
}

func GetLeagueTop10Data(db *dbx.DB, client bsm.BaseClient, leagueID string, statsType string) (bsm.LeaderboardSummary, error) {
	leagueLeaderboard := bsm.LeaderboardSummary{
		LeagueID:  leagueID,
		StatsType: statsType,
		Data:      make([]bsm.LeaderboardData, 0),
	}

	var statsEndpoints []string

	switch statsType {
	case bsm.TypeBatting:
		statsEndpoints = bsm.GetBattingStatsTypes()
	case bsm.TypePitching:
		statsEndpoints = bsm.GetPitchingStatsTypes()
	case bsm.TypeFielding:
		statsEndpoints = bsm.GetFieldingStatsTypes()
	default:
		return leagueLeaderboard, errors.New("unknown stats type")
	}

	var wg sync.WaitGroup
	var mu sync.Mutex

	apiKey := os.Getenv("BSM_API_KEY")
	if apiKey == "" {
		return leagueLeaderboard, errors.New("BSM_API_KEY not set")
	}

	for _, endpoint := range statsEndpoints {
		wg.Add(1)
		go func(endpoint string) {
			defer wg.Done()
			query := make(map[string]string)
			resource := "league_groups/" + leagueID + "/top10/" + statsType + "/" + endpoint + ".json"
			apiURL := client.GetAPIURL(resource, query, apiKey)

			rawResponseData, err := GetCachedBSMResponse(db, apiURL)
			if err != nil {
				log.Printf("Error fetching league leaderboard: %v, resource: %s", err, resource)
				return
			}
			var leaderboardData bsm.LeaderboardData
			err = json.Unmarshal([]byte(rawResponseData), &leaderboardData)
			if err != nil {
				log.Printf("Error unmarshalling league leaderboard: %v, resource: %s", err, resource)
				return
			}

			leaderboardData.StatsCategory = endpoint
			mu.Lock()
			leagueLeaderboard.Data = append(leagueLeaderboard.Data, leaderboardData)
			mu.Unlock()
		}(endpoint)
	}

	wg.Wait()
	return leagueLeaderboard, nil
}

func GetCachedBSMResponse(db *dbx.DB, url *url.URL) (string, error) {
	var ret string

	if url.Host != os.Getenv("BSM_API_HOST") || !isAllowedBSMURL(url) {
		return ret, &bsm.URLAllowlistError{URL: url.Path, Message: "Only allowlisted BSM URLs are allowed"}
	}
	hash := getMD5Hash(url.String())

	var requestCache RequestCache
	err := db.Select().From("requestcaches").Where(dbx.HashExp{"hash": hash}).One(&requestCache)
	if err != nil {
		// no data or error - request has never been cached before
		body, err := saveBSMResponseToCache(db, url.String())
		if err != nil {
			return ret, err
		}

		return body, nil
	}

	if isOutdated(requestCache.ExpiresAt) {
		_, err = db.Delete("requestcaches", dbx.HashExp{"hash": hash}).Execute()
		if err != nil {
			return ret, err
		}

		body, err := saveBSMResponseToCache(db, url.String())
		if err != nil {
			return ret, err
		}
		ret = body
	} else {
		ret = requestCache.ResponseBody
	}

	return ret, nil
}

func saveBSMResponseToCache(db *dbx.DB, bsmURL string) (string, error) {
	_, body, err := bsm.FetchResource[any](bsmURL)
	if err != nil {
	if _, ok := errors.AsType[*url.Error](err); ok {
			log.Printf("Fetch to BSM failed: %v, bsmURL: %s", err, bsmURL)
			return "", err
		}
		if _, ok := errors.AsType[*json.UnmarshalTypeError](err); ok {
			log.Printf("JSON unmarshal failed: %v, bsmURL: %s", err, bsmURL)
			return "", err
		}

		// other errors get treated as common operations that can be handled
		log.Printf("Empty/Invalid Response from BSM: %v, bsmURL: %s", err, bsmURL)

		if _, ok := errors.AsType[*json.SyntaxError](err); ok {
			if body == "" {
				body = "null" // valid JSON
			}
		}
	}

	hash := getMD5Hash(bsmURL)
	expiresAt := time.Now().Add(cacheLifetimeMinutes * time.Minute).Format("2006-01-02 15:04:05Z")

	_, err = db.Insert("requestcaches", dbx.Params{
		"hash":         hash,
		"responseBody": body,
		"url":          bsmURL,
		"expires_at":   expiresAt,
	}).Execute()

	if err != nil {
		return body, err
	}

	return body, nil
}

func isOutdated(expiresAt string) bool {
	t, err := time.Parse("2006-01-02 15:04:05Z", expiresAt)
	if err != nil {
		return true
	}

	return time.Now().After(t)
}