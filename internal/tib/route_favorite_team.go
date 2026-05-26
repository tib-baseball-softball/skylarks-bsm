package tib

import (
	"net/http"
	"strconv"

	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/pocketbase/dbx"
)

// GetFavoriteTeamData returns a handler function for the favorite team data endpoint
func GetFavoriteTeamData(db *dbx.DB, client bsm.APIClient) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		teamID := r.URL.Query().Get("team")
		if teamID == "" {
			http.Error(w, "Team ID not found in request", http.StatusBadRequest)
			return
		}

		convertedTeamID, err := strconv.Atoi(teamID)
		if err != nil {
			http.Error(w, "Team ID must be an integer", http.StatusBadRequest)
			return
		}

		season := r.URL.Query().Get("season")
		if season == "" {
			http.Error(w, "Season not found in request", http.StatusBadRequest)
			return
		}

		convertedSeason, err := strconv.Atoi(season)
		if err != nil {
			http.Error(w, "Season must be an integer", http.StatusBadRequest)
			return
		}

		gameClass := r.URL.Query().Get("gameClass")
		if gameClass == "" {
			http.Error(w, "Game class not found in request", http.StatusBadRequest)
			return
		}

		convertedGameClass, err := strconv.Atoi(gameClass)
		if err != nil {
			http.Error(w, "Game class must be an integer", http.StatusBadRequest)
			return
		}

		response, err := GetCachedDatasetResponse(db, client, convertedTeamID, convertedGameClass, convertedSeason)
		if err != nil {
			http.Error(w, "Internal error occurred", http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		_, _ = w.Write(response)
	}
}
