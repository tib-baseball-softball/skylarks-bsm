package tib

import (
	"fmt"
	"time"

	"github.com/getsentry/sentry-go"
	"github.com/pocketbase/dbx"
)

// RemoveOutdatedCaches periodically deletes expired records from the request caches table to free up storage space.
func RemoveOutdatedCaches(db *dbx.DB) {
	defer func() {
		if r := recover(); r != nil {
			fmt.Println("Recovered from panic in RemoveOutdatedCaches", r)
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
			fmt.Println("Error executing cleanup task:", err)
			break
		}

		affected, err := result.RowsAffected()
		if err != nil {
			sentry.CaptureException(err)
			fmt.Println("Error retrieving affected rows:", err)
			break
		}

		fmt.Println("Cleanup task executed at:", time.Now())
		fmt.Println("Affected Rows:", affected)
	}
}
