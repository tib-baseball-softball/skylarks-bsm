package tib

import (
	"encoding/json"
	"testing"
)

func TestStripResponseKeys_RemovesKeysFromObject(t *testing.T) {
	input := `{"name":"Team","current_player_list":[1,2,3],"current_roster":{"a":1},"gamechanger":true,"nested":{"current_roster":42}}`

	got, err := stripResponseKeys(input)
	if err != nil {
		t.Fatalf("stripResponseKeys returned error: %v", err)
	}

	var obj map[string]any
	if err := json.Unmarshal(got, &obj); err != nil {
		t.Fatalf("result is not valid JSON object: %v", err)
	}

	if _, exists := obj["current_player_list"]; exists {
		t.Errorf("expected 'current_player_list' to be removed from top-level object")
	}
	if _, exists := obj["current_roster"]; exists {
		t.Errorf("expected 'current_roster' to be removed from top-level object")
	}
	if _, exists := obj["gamechanger"]; exists {
		t.Errorf("expected 'gamechanger' to be removed from top-level object")
	}

	if name, _ := obj["name"].(string); name != "Team" {
		t.Errorf("expected 'name' to remain 'Team', got %v", obj["name"])
	}

	// Ensure nested occurrences are not removed (function only strips top-level keys)
	nested, ok := obj["nested"].(map[string]any)
	if !ok {
		t.Fatalf("expected 'nested' to remain a map, got %T", obj["nested"])
	}
	if _, exists := nested["current_roster"]; !exists {
		t.Errorf("expected nested 'current_roster' to remain untouched")
	}
}

func TestStripResponseKeys_RemovesKeysFromArray(t *testing.T) {
	input := `[{"id":1,"current_roster":{}},{"id":2,"gamechanger":false,"x":3}]`

	got, err := stripResponseKeys(input)
	if err != nil {
		t.Fatalf("stripResponseKeys returned error: %v", err)
	}

	var arr []map[string]any
	if err := json.Unmarshal(got, &arr); err != nil {
		t.Fatalf("result is not valid JSON array: %v", err)
	}
	if len(arr) != 2 {
		t.Fatalf("expected array length 2, got %d", len(arr))
	}

	if _, exists := arr[0]["current_roster"]; exists {
		t.Errorf("expected 'current_roster' to be removed from first element")
	}
	if _, exists := arr[1]["gamechanger"]; exists {
		t.Errorf("expected 'gamechanger' to be removed from second element")
	}
	if x, _ := arr[1]["x"].(float64); x != 3 {
		t.Errorf("expected other fields to remain unchanged; want x=3, got %v", arr[1]["x"])
	}
}

func TestStripResponseKeys_InvalidJSON_ReturnsError(t *testing.T) {
	input := `{"not":"closed"`

	got, err := stripResponseKeys(input)
	if err == nil {
		t.Fatalf("expected error for invalid JSON, got nil")
	}
	if got != nil && len(got) > 0 {
		t.Errorf("expected no bytes returned on error, got %q", string(got))
	}
}
