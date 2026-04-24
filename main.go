package main

import (
	"log"
	"net/http"
	"time"

	"git.berlinskylarks.de/skylarks-bsm/internal/tib"
	"git.berlinskylarks.de/tib-baseball/bsm-go"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	// Set a timeout value on the request context (ctx), that will signal
	// through ctx.Done() that the request has timed out and further
	// processing should be stopped.
	r.Use(middleware.Timeout(60 * time.Second))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := w.Write([]byte(bsm.TriplePlays + " are rather rare"))
		if err != nil {
			return
		}
	})

	r.Route("/api/bsm/relay", func(r chi.Router) {
		r.Get("/*", tib.GetRelayedBSMData)
	})

	log.Println("server listening on port 8090")
	err := http.ListenAndServe(":8090", r)
	if err != nil {
		log.Fatalf("failed to start server: %v", err)
		return
	}
}
