package tib

import (
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"os"
	"strings"

	"github.com/pocketbase/dbx"
)

// GetRelayedBSMData relays BSM request so the client-side does not need to know API keys.
// Uses allowlist for URLs to make sure only public information is disclosed.
func GetRelayedBSMData(db *dbx.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		targetURL := rewriteURLForProxying(*r.URL)

		if !isAllowedBSMURL(&targetURL) {
			http.Error(w, "Only allowlisted BSM URLs are allowed", http.StatusForbidden)
			return
		}

		resp, err := GetCachedBSMResponse(db, &targetURL)
		if err != nil {
			http.Error(w, "Failed to fetch from BSM", http.StatusInternalServerError)
			return
		}

		stripped, err := stripResponseKeys(string(resp))
		if err != nil {
			http.Error(w, "Internal error occurred", http.StatusInternalServerError)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(stripped)
	}
}

var keysToRemoveFromBSMResponse = []string{
	"current_player_list",
	"current_roster",
	"gamechanger",
}

// stripResponseKeys removes keys from the response body that are not needed for the client.
func stripResponseKeys(cachedResponseBody string) ([]byte, error) {
	var arrayShapeData []map[string]any
	var objectShapeData map[string]any
	var bytes []byte

	err := json.Unmarshal([]byte(cachedResponseBody), &arrayShapeData)
	if err != nil {
		if _, ok := errors.AsType[*json.UnmarshalTypeError](err); ok {
			// response is not JSON array, try to unmarshal as an object
			err = json.Unmarshal([]byte(cachedResponseBody), &objectShapeData)
			if err != nil {
				return nil, err
			}

			for _, key := range keysToRemoveFromBSMResponse {
				delete(objectShapeData, key)
			}
			bytes, err = json.Marshal(objectShapeData)
			if err != nil {
				return nil, err
			}
		} else {
			// all other errors can bubble up
			return nil, err
		}
	} else {
		// response is JSON array
		for _, item := range arrayShapeData {
			for _, key := range keysToRemoveFromBSMResponse {
				delete(item, key)
			}
		}
		bytes, err = json.Marshal(arrayShapeData)
		if err != nil {
			return nil, err
		}
	}

	return bytes, nil
}

// rewriteURLForProxying rewrites the given URL to point to the BSM API.
func rewriteURLForProxying(url url.URL) url.URL {
	bsmHost := os.Getenv("BSM_API_HOST")
	targetURL := url
	targetURL.Scheme = "https"
	targetURL.Host = bsmHost
	targetURL.Path = strings.TrimPrefix(url.Path, "/api/bsm/relay")

	newQuery := url.Query()
	newQuery.Set("api_key", os.Getenv("BSM_API_KEY"))
	targetURL.RawQuery = newQuery.Encode()

	return targetURL
}
