package tib

import (
	"encoding/json"
	"net/http"
	"strconv"

	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/go-chi/chi/v5"
	"github.com/pocketbase/dbx"
)

// GetLeagueLeaders returns a nicely formatted response for top 10 stats in the given league to avoid making multiple
// direct BSM requests on the frontend side.
func GetLeagueLeaders(db *dbx.DB, client bsm.APIClient) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		leagueID := chi.URLParam(r, "league")
		if leagueID == "" {
			http.Error(w, "league ID missing", http.StatusBadRequest)
			return
		}
		result, err := strconv.Atoi(leagueID)
		if err != nil || result == 0 {
			http.Error(w, "league ID must be an integer", http.StatusBadRequest)
			return
		}

		statsType := r.URL.Query().Get("statsType")
		if statsType == "" {
			statsType = "batting"
		}

		leagueLeaderboard, err := GetLeagueTop10Data(db, client, leagueID, statsType)
		if err != nil {
			http.Error(w, "could not get league leaderboard", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(leagueLeaderboard)
		if err != nil {
			http.Error(w, "internal error occurred", http.StatusInternalServerError)
			return
		}
	}
}
