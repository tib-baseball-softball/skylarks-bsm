package tib

import (
	"log/slog"
	"time"

	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/getsentry/sentry-go"
	"github.com/pocketbase/dbx"
)

// RemoveOutdatedCaches periodically deletes expired records from the request caches table to free up storage space.
func RemoveOutdatedCaches(db *dbx.DB) {
	defer func() {
		if r := recover(); r != nil {
			slog.Error("Recovered from panic in RemoveOutdatedCaches", "error", r)
		}
	}()

	ticker := time.NewTicker(60 * time.Minute)
	defer ticker.Stop()

	for {
		<-ticker.C

		result, err := db.Delete(
			TableRequestCaches,
			dbx.NewExp("expires_at < {:now}", dbx.Params{"now": time.Now().Format("2006-01-02 15:04:05Z")}),
		).Execute()
		if err != nil {
			sentry.CaptureException(err)
			slog.Error("Error executing cleanup task", "error", err)
			break
		}

		affected, err := result.RowsAffected()
		if err != nil {
			sentry.CaptureException(err)
			slog.Error("Error retrieving affected rows", "error", err)
			break
		}

		slog.Info("Cleanup task executed", "affectedRows", affected)
	}
}

// StartImportTeamDatasetsJob periodically updates the team datasets.
func StartImportTeamDatasetsJob(db *dbx.DB, client bsm.APIClient) {
	defer func() {
		if r := recover(); r != nil {
			slog.Error("Recovered from panic in StartImportTeamDatasetsJob", "error", r)
		}
	}()

	ticker := time.NewTicker(120 * time.Minute)
	defer ticker.Stop()

	for {
		<-ticker.C
		ImportTeamDatasets(db, client)
	}
}
