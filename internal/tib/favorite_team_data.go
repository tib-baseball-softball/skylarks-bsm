package tib

//
//import (
//	"errors"
//	"os"
//	"slices"
//	"strconv"
//	"sync"
//	"time"
//
//	"git.berlinskylarks.de/tib-baseball/bsm-go"
//)
//
//// LoadHomeData loads structured data to display on a single team's home dashboard.
//func LoadHomeData(app any, client bsm.APIClient, entryID int, leagueID int, season int) ([]HomeDataset, error) {
//	apiKey := os.Getenv("BSM_API_KEY")
//	if apiKey == "" {
//		return nil, errors.New("default API key not set, aborting")
//	}
//
//	entryChannel := make(chan bsm.LeagueEntry, 1)
//	leagueChannel := make(chan []bsm.LeagueGroup, 1)
//
//	go func() {
//		team, err := client.LoadLeagueEntryByID(entryID, apiKey)
//		if err != nil {
//			app.Logger().Error("Error fetching team", "error", err, "team", entryID)
//			entryChannel <-bsm.LeagueEntry{}
//		}
//		entryChannel <- team
//	}()
//
//	go func() {
//		leagueGroupsResponse, err := client.FetchLeagueGroupsForLeague(leagueID, apiKey)
//		if err != nil {
//			app.Logger().Error("Error fetching league groups", "error", err, "team", entryID)
//			leagueChannel <- make([]bsm.LeagueGroup, 0)
//		}
//		leagueChannel <- leagueGroupsResponse
//	}()
//
//	var leagueEntry bsm.LeagueEntry
//	var leagueGroups []bsm.LeagueGroup
//
//	select {
//	    case leagueEntry = <-entryChannel:
//		case <-time.After(25 * time.Second):
//            return nil ,errors.New("timeout while waiting for BSM response - team")
//	}
//
//	select {
//		case leagueGroups = <-leagueChannel:
//		case <-time.After(25 * time.Second):
//            return nil ,errors.New("timeout while waiting for BSM response - leagueGroups")
//	}
//
//	if leagueEntry.ID == 0 {
//		return nil, errors.New("unexpected zero value for team ID")
//	}
//
//	datasetContainer := DatasetContainer{
//		datasets: make([]HomeDataset, 0),
//	}
//
//	var wg sync.WaitGroup
//
//	for _, leagueGroup := range leagueGroups {
//		wg.Add(1)
//		go func(leagueEntry bsm.LeagueEntry) {
//			defer wg.Done()
//
//			var dataset HomeDataset
//			dataset.LeagueGroup = leagueGroup
//			dataset.TeamID = entryID
//			dataset.Season = season
//			dataset.LeagueGroupID = leagueGroup.ID
//
//			var wg sync.WaitGroup
//
//			wg.Add(1)
//			go func() {
//				defer wg.Done()
//
//				var matches []bsm.Match
//
//				params := make(map[string]string)
//				params[bsm.SeasonFilter] = strconv.Itoa(leagueGroup.Season)
//				params[bsm.SearchFilter] = TeamSearchParam
//				params[bsm.LeagueFilter] = strconv.Itoa(leagueGroup.ID)
//				params[bsm.GamedayFilter] = bsm.GameDayAny
//				params[bsm.CompactFilter] = "true"
//
//				matches, err := client.LoadMatchesWithFilterParams(params, apiKey)
//				if err != nil {
//					app.Logger().Error("Error fetching matches", "error", err, "team", entryID)
//					return
//				}
//				displayGames := findNextAndPreviousGame(matches, time.Now())
//
//				if displayGames.Next != nil {
//					dataset.NextGame = displayGames.Next
//				}
//
//				if displayGames.Last != nil {
//					dataset.LastGame = displayGames.Last
//				}
//				createPlayoffSeriesData(&dataset, matches)
//				if leagueEntry.Team != nil {
//				    dataset.StreakData = createStreakDataEntries(matches, leagueEntry.Team.Name)
//				}
//			}()
//
//			wg.Add(1)
//			go func(leagueEntry bsm.LeagueEntry) {
//				defer wg.Done()
//
//				if leagueEntry.Team == nil {
//                    return
//				}
//
//				err := LoadHomeTeamTable(client, *leagueEntry.Team, leagueGroup.ID, &dataset, apiKey)
//				if err != nil {
//					app.Logger().Warn("Error fetching home team table", "error", err, "entry", leagueEntry.ID, "leagueGroup", leagueGroup.ID)
//					return
//				}
//			}(leagueEntry)
//			wg.Wait()
//
//			datasetContainer.Add(dataset)
//		}(leagueEntry)
//	}
//	wg.Wait()
//
//	return datasetContainer.datasets, nil
//}
//
//func createPlayoffSeriesData(dataset *HomeDataset, games []bsm.Match) {
//	playoffGames := slices.Collect(func(yield func(bsm.Match) bool) {
//		for _, game := range games {
//			if game.IsPlayoffGame() {
//				if !yield(game) {
//					return
//				}
//			}
//		}
//	})
//	playoffSeries := bsm.NewPlayoffSeries(playoffGames)
//
//	playoffSeries.GetSeriesStatus()
//	dataset.PlayoffSeries = &playoffSeries
//}
//
//// LoadHomeTeamTable loads the home team table
//func LoadHomeTeamTable(client bsm.APIClient, team bsm.Team, leagueGroupID int, dataset *HomeDataset, apiKey string) error {
//	table, err := client.LoadSingleTable(leagueGroupID, apiKey)
//	if err != nil {
//		return err
//	}
//
//	row := bsm.DetermineTableRow(team, &table)
//
//	dataset.Table = table
//	dataset.TableRow = row
//
//	return nil
//}
