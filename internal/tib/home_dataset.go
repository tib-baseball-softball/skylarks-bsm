package tib


import (
	"encoding/json"
	"log/slog"
	"slices"
	"strconv"
	"sync"
	"time"

	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/pocketbase/dbx"
)

// HomeDataset represents the data for a team's home page
type HomeDataset struct {
	TeamID        int                `json:"team_id"`
	Season        int                `json:"season"`
	LeagueGroupID int                `json:"league_group_id"`
	LeagueGroup   bsm.LeagueGroup    `json:"league_group"`
	NextGame      *bsm.Match         `json:"next_game"`
	LastGame      *bsm.Match         `json:"last_game"`
	PlayoffSeries *bsm.PlayoffSeries `json:"playoff_series"`
	Table         bsm.Table          `json:"table"`
	TableRow      *bsm.Row           `json:"table_row"`
	StreakData    []StreakDataEntry  `json:"streak_data"`
}

type DatasetContainer struct {
	mu       sync.Mutex
	datasets []HomeDataset
}

const homeDatasetCacheTag = "homeDataset"

func (c *DatasetContainer) Add(dataset HomeDataset) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.datasets = append(c.datasets, dataset)
}

// StreakDataEntry represents a single entry in a team's streak data
type StreakDataEntry struct {
	Game      string `json:"game"`
	WonGame   bool   `json:"won_game"`
	WinsCount int    `json:"wins_count"`
}

type DisplayGames struct {
	Next *bsm.Match
	Last *bsm.Match
}

func GetCachedDatasetResponse(db *dbx.DB, client bsm.APIClient, teamID int, leagueID int, season int) ([]byte, error) {
	var ret []byte
	cacheIdentifier := strconv.Itoa(season) + "_" + strconv.Itoa(teamID) + "_" + strconv.Itoa(leagueID) + "_" + homeDatasetCacheTag

	var requestCache RequestCache
	err := db.Select().From(TableRequestCaches).Where(dbx.HashExp{"identifier": cacheIdentifier}).One(&requestCache)

	if err != nil || (isOutdated(requestCache.ExpiresAt) && time.Now().Year() <= season) {
		// This identifier has not been cached before or has expired.
		// For this specific set of data, we assume it's not going to change after the season ends.

		if err == nil {
			_, _ = db.Delete(TableRequestCaches, dbx.HashExp{"identifier": cacheIdentifier}).Execute()
		}

		homeDatasets, err := LoadHomeData(client, teamID, leagueID, season)
		if err != nil {
			slog.Error("Failed to load home data", "error", err, "team", teamID, "season", season)
			return ret, err
		}

		ret, err = json.Marshal(homeDatasets)
		if err != nil {
			slog.Error("Failed to marshal home data", "error", err)
			return ret, err
		}

		expiresAt := time.Now().Add(cacheLifetimeMinutes * time.Minute).Format("2006-01-02 15:04:05Z")

		_, err = db.Insert(TableRequestCaches, dbx.Params{
			"identifier":   cacheIdentifier,
			"responseBody": string(ret),
			"expires_at":   expiresAt,
		}).Execute()

		if err != nil {
			slog.Error("Failed to save data to cache", "error", err, "cacheIdentifier", cacheIdentifier)
			return nil, err
		}
		return ret, nil
	} else {
		// cache hit
		ret = []byte(requestCache.ResponseBody)
		return ret, nil
	}
}

// createStreakDataEntries creates streak data entries for a team. Usable for data visualization in a chart.
func createStreakDataEntries(games []bsm.Match, teamName string) []StreakDataEntry {
	var entries []StreakDataEntry
	wins := 0

	for i, game := range games {
		state := game.GetMatchState(teamName)
		if state == bsm.MatchStateCancelled || state == bsm.MatchStateNotYetPlayed {
			continue
		}

		won := state == bsm.MatchStateWon

		if won {
			wins++
		}

		entries = append(entries, StreakDataEntry{
			Game:      strconv.Itoa(i + 1),
			WonGame:   won,
			WinsCount: wins,
		})
	}
	return entries
}

// findNextAndPreviousGame processes game dates to find the next and previous game for a given point in time
func findNextAndPreviousGame(matches []bsm.Match, targetTime time.Time) DisplayGames {
	var result DisplayGames

	index := slices.IndexFunc(matches, func(m bsm.Match) bool {
		gameTime, _ := time.Parse(bsm.TimeFormat, m.Time)
		return gameTime.After(targetTime) && m.State == "planned"
	})
	if index != -1 {
		result.Next = &matches[index]
	}

	matchesReverse := make([]bsm.Match, len(matches))
	copy(matchesReverse, matches)  // proper copy to prevent index pointers from pointing to the same element
	slices.Reverse(matchesReverse) // for the previous game we are interested in the last element satisfying the index func

	index = slices.IndexFunc(matchesReverse, func(m bsm.Match) bool {
		gameTime, _ := time.Parse(bsm.TimeFormat, m.Time)
		return gameTime.Before(targetTime) && m.State != "planned" && m.State != "cancelled"
	})
	if index != -1 {
		result.Last = &matchesReverse[index]
	}

	return result
}
