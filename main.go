package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"git.berlinskylarks.de/skylarks-bsm/internal/tib"
	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/pocketbase/dbx"
	"github.com/subosito/gotenv"
	_ "modernc.org/sqlite"
)

// / Loads environment.
//   - Locally: from .env file
//   - Production: from container env
func init() {
	_ = gotenv.Load()

	if os.Getenv("APPLICATION_CONTEXT") == "" {
		log.Fatal("APPLICATION_CONTEXT not set, error loading environment variables")
	}

	if os.Getenv("BSM_API_KEY") == "" || os.Getenv("BSM_API_HOST") == "" {
		log.Fatal("BSM API key or host not set, error loading environment variables")
	}
}

func main() {
	db, err := dbx.MustOpen("sqlite", "data/db.sqlite")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	err = initDB(db)
	if err != nil {
		log.Fatal(err)
	}

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: false,
		MaxAge:           300, // Maximum value that is not ignored by any of major browsers
	}))

	// Set a timeout value on the request context (ctx), that will signal
	// through ctx.Done() that the request has timed out and further
	// processing should be stopped.
	r.Use(middleware.Timeout(60 * time.Second))

	// ------------- Routes -----------------//

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := w.Write([]byte(bsm.TriplePlays + " are rather rare"))
		if err != nil {
			return
		}
	})

	bsmClient := bsm.NewAPIClient()
	r.Route("/api/bsm/relay", func(r chi.Router) {
		r.Get("/*", tib.GetRelayedBSMData(db))
		r.Get("/top10/{league}", tib.GetLeagueLeaders(db, bsmClient))
	})

	// ------------- Cron jobs -----------------//
	go tib.RemoveOutdatedCaches(db)

	log.Println("server listening on port 8090")
	err = http.ListenAndServe(":8090", r)
	if err != nil {
		log.Fatalf("failed to start server: %v", err)
		return
	}
}

func initDB(db *dbx.DB) error {
	if _, err := db.DB().Exec(`
    CREATE TABLE IF NOT EXISTS requestcaches
    (
        id           TEXT PRIMARY KEY DEFAULT ('r' || lower(hex(randomblob(7)))) NOT NULL,
        hash         TEXT             DEFAULT ''                                 NOT NULL,
        responseBody JSON             DEFAULT NULL,
        expires_at   TEXT             DEFAULT (strftime('%Y-%m-%d %H:%M:%fZ'))   NOT NULL,
        url          TEXT             DEFAULT ''                                 NOT NULL,
        identifier   TEXT             DEFAULT ''                                 NOT NULL
    );
    `); err != nil {
		return err
	}
	return nil
}
