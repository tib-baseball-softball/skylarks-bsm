package main

import (
	"embed"
	"errors"
	"fmt"
	"io/fs"
	"log"
	"log/slog"
	"net/http"
	"os"
	"path"
	"strings"
	"time"

	"git.berlinskylarks.de/skylarks-bsm/internal/tib"
	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/getsentry/sentry-go"
	sentryhttp "github.com/getsentry/sentry-go/http"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"github.com/go-chi/httprate"
	"github.com/pocketbase/dbx"
	"github.com/subosito/gotenv"
	_ "modernc.org/sqlite"
)

const (
	ContextDevelopment = "development"
	ContextProduction  = "production"
)

//go:embed public/*
var spaFiles embed.FS

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
	applicationContext := os.Getenv("APPLICATION_CONTEXT")
	isDevelopment := applicationContext == ContextDevelopment

	db, err := DefaultDBConnect("data/db.sqlite")
	if err != nil {
		log.Fatal(err)
	}
	defer func(db *dbx.DB) {
		err := db.Close()
		if err != nil {
			log.Printf("Error closing database: %v", err)
		}
	}(db)

	err = initDB(db)
	if err != nil {
		log.Fatal(err)
	}

	err = sentry.Init(sentry.ClientOptions{
		Dsn:                  os.Getenv("SENTRY_DSN"),
		Debug:                isDevelopment,
		SendDefaultPII:       false,
		DisableClientReports: true,
		Environment:          applicationContext,
		TracesSampleRate:     0.0,
	})
	if err != nil {
		log.Fatalf("sentry.Init: %s", err)
	}
	defer sentry.Flush(2 * time.Second)

	sentryMiddleware := sentryhttp.New(sentryhttp.Options{
		Repanic: true,
	})
	slog.Info("Sentry Middleware set up", "DSN", os.Getenv("SENTRY_DSN"))

	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.Heartbeat("/health"))
	r.Use(middleware.ClientIPFromRemoteAddr)
	r.Use(httprate.LimitBy(300, time.Second, func(r *http.Request) (string, error) {
		return httprate.CanonicalizeIP(middleware.GetClientIP(r.Context())), nil
	}))
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)
	r.Use(sentryMiddleware.Handle)

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

	r.Handle("/*", SPAHandler())

	bsmClient := bsm.NewAPIClient()
	r.Route("/api/bsm/relay", func(r chi.Router) {
		r.Get("/favorite-team", tib.GetFavoriteTeamData(db, bsmClient))
		r.Get("/top10/{league}", tib.GetLeagueLeaders(db, bsmClient))
		r.Get("/*", tib.GetRelayedBSMData(db))
	})

	// ------------- Cron jobs -----------------//
	go tib.RemoveOutdatedCaches(db)
	go tib.StartImportTeamDatasetsJob(db, bsmClient)

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

// DefaultDBConnect connects to the database in WAL mode.
// Shamelessly stolen from PocketBase.
func DefaultDBConnect(dbPath string) (*dbx.DB, error) {
	// Note: the busy_timeout pragma must be first because
	// the connection needs to be set to block on busy before WAL mode
	// is set in case it hasn't been already set by another connection.
	pragmas := "?_pragma=busy_timeout(10000)&_pragma=journal_mode(WAL)&_pragma=journal_size_limit(200000000)&_pragma=synchronous(NORMAL)&_pragma=foreign_keys(ON)&_pragma=temp_store(MEMORY)&_pragma=cache_size(-32000)"

	db, err := dbx.MustOpen("sqlite", dbPath+pragmas)
	if err != nil {
		return nil, err
	}

	return db, nil
}

func SPAHandler() http.HandlerFunc {
	spaFS, err := fs.Sub(spaFiles, "public")
	if err != nil {
		panic(fmt.Errorf("failed getting the sub tree for the site files: %w", err))
	}
	return func(w http.ResponseWriter, r *http.Request) {
		f, err := spaFS.Open(strings.TrimPrefix(path.Clean(r.URL.Path), "/"))
		if err == nil {
			defer f.Close()
		}
		if errors.Is(err, fs.ErrNotExist) {
			r.URL.Path = "/"
		}
		http.FileServer(http.FS(spaFS)).ServeHTTP(w, r)
	}
}
