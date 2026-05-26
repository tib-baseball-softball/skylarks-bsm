package tib


import (
	"encoding/json"
	"errors"
	"log/slog"
	"strconv"
	"strings"
	"sync"
	"time"

	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/pocketbase/dbx"
)

type teamDatasetCacheIdentifier struct {
	TeamID   int
	LeagueID int
	Season   string
}

func ImportTeamDatasets(db *dbx.DB, client bsm.APIClient) {
	currentYear := time.Now().Year()

	var requestCaches []RequestCache
	err := db.Select().From(TableRequestCaches).
		Where(dbx.NewExp("identifier LIKE {:currentYear} AND identifier LIKE {:cacheTag}", dbx.Params{
			"currentYear": "%" + strconv.Itoa(currentYear) + "%",
			"cacheTag":    "%" + homeDatasetCacheTag + "%",
		})).All(&requestCaches)

	if err != nil {
		slog.Error("ImportTeamDatasets error", "error", err)
		return
	}

	processedRecords := 0
	var wg sync.WaitGroup
	var mu sync.Mutex

	for _, requestCache := range requestCaches {
		wg.Add(1)
		go func(requestCache RequestCache) {
			defer wg.Done()

			if isOutdated(requestCache.ExpiresAt) {
				parsedIdentifier, err := parseTeamDatasetCacheIdentifier(requestCache.Identifier)
				if err != nil {
					slog.Error("ImportTeamDatasets error", "error", err, "cacheIdentifier", requestCache.Identifier)
					return
				}

				datasets, err := LoadHomeData(client, parsedIdentifier.TeamID, parsedIdentifier.LeagueID, currentYear) // we have established earlier that only the current year is of interest
				if err != nil {
					slog.Error("ImportTeamDatasets error", "error", err, "cacheIdentifier", requestCache.Identifier)
					return
				}
				responseBody, err := json.Marshal(datasets)
				if err != nil {
					slog.Error("ImportTeamDatasets error", "error", err, "cacheIdentifier", requestCache.Identifier)
					return
				}

				expiresAt := time.Now().Add(cacheLifetimeMinutes * time.Minute).Format("2006-01-02 15:04:05Z")
				_, err = db.Update(TableRequestCaches, dbx.Params{
					"responseBody": string(responseBody),
					"expires_at":   expiresAt,
				}, dbx.HashExp{"id": requestCache.ID}).Execute()

				if err != nil {
					slog.Error("Failed saving TeamDatasets cache record", "error", err, "cacheIdentifier", requestCache.Identifier)
					return
				}

				mu.Lock()
				processedRecords++
				mu.Unlock()
			}
		}(requestCache)
	}
	wg.Wait()
	slog.Info("TeamDatasets Import successfully imported new team datasets.", "Number of records processed", processedRecords)
}

const teamDatasetCacheIdentifierLength = 4

func parseTeamDatasetCacheIdentifier(identifier string) (teamDatasetCacheIdentifier, error) {
	var ret teamDatasetCacheIdentifier
	slice := strings.Split(identifier, "_")
	if len(slice) != teamDatasetCacheIdentifierLength {
		return ret, errors.New("invalid cache identifier")
	}

	if slice[0] == "" || slice[1] == "" {
		return ret, errors.New("invalid cache identifier")
	}

	convertedTeamID, err := strconv.Atoi(slice[1])
	if err != nil {
		return ret, errors.New("invalid cache identifier, could not convert team ID to integer")
	}

	convertedLeagueID, err := strconv.Atoi(slice[2])
	if err != nil {
		return ret, errors.New("invalid cache identifier, could not convert league ID to integer")
	}

	ret.Season = slice[0]
	ret.TeamID = convertedTeamID
	ret.LeagueID = convertedLeagueID

	return ret, nil
}
