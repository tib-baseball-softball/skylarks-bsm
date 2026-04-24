package tib

import (
	"net/url"
	"regexp"
)

var cacheURLAllowlist = []*regexp.Regexp{
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/licenses\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/league_groups(/\d+)?(\.json)?(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/league_groups/\d+/top10/(batting|pitching|fielding)/[^/]+\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/licenses/\d+\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/matches/\d+\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/club_functions\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/fields\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/matches\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/matches\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/clubs/\d+/(teams|team_clubs)\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/league_groups/\d+/(table|statistics)\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/(league_entries|people|clubs)/\d+/(statistics)(/.*)?\.json(?:\?.*)?$`),
	regexp.MustCompile(`^https://bsm\.baseball-softball\.de/matches/\d+/match_boxscore\.json(?:\?.*)?$`),
}

// isAllowedBSMURL checks if the given url matches any regex in the cacheURLAllowlist
func isAllowedBSMURL(u *url.URL) bool {
	urlStr := u.String()
	for _, re := range cacheURLAllowlist {
		if re.MatchString(urlStr) {
			return true
		}
	}
	return false
}
