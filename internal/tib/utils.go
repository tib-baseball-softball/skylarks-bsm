package tib

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"
	"strings"
)

// CalcWebhookSignature reproduces the PHP hash_hmac('sha256', sprintf('%s:%s', $identifier, $body), $secret)
// and returns a lowercase hex string (same as PHP's default output format).
// See https://docs.typo3.org/c/typo3/cms-webhooks/main/en-us/HashCalculation/Index.html
func CalcWebhookSignature(identifier string, body []byte, secret string) string {
	m := hmac.New(sha256.New, []byte(secret))
	_, err := fmt.Fprintf(m, "%s:%s", identifier, body)
	if err != nil {
		return ""
	}
	return hex.EncodeToString(m.Sum(nil))
}

// VerifyWebhookSignature checks the request headers and body against the computed signature.
func VerifyWebhookSignature(r *http.Request, identifier, secret string, body []byte) bool {
	algo := r.Header.Get("Webhook-Signature-Algo")
	if strings.ToLower(strings.TrimSpace(algo)) != "sha256" {
		return false
	}
	got := strings.TrimSpace(r.Header.Get("Webhook-Signature"))
	if got == "" {
		return false
	}
	want := CalcWebhookSignature(identifier, body, secret)
	// Constant-time comparison
	return hmac.Equal([]byte(want), []byte(got))
}
