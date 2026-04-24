import {Gameday, MatchAPIRequest, type Match} from "bsm.js";
import type {PageLoad} from "./$types";
import {env as publicEnv} from "$env/dynamic/public";
import {preferences} from "$lib/tib/globals.svelte.ts";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {client} from "$lib/dp/client.svelte.ts";

export const load: PageLoad = async ({ fetch }) => {
  const matchRequest = new MatchAPIRequest("");
  matchRequest.setAPIURL(RELAY_URL);
  const appPreferences = preferences.current;

  const currentURL = matchRequest.buildRequestURL(`clubs/${publicEnv.PUBLIC_CLUB_ID}/matches.json`, [
    [matchRequest.SEASON_FILTER, String(appPreferences.selectedSeason)],
    [matchRequest.GAMEDAY_FILTER, Gameday.current],
    [matchRequest.COMPACT_PARAM, "true"],
  ]);
  const previousURL = matchRequest.buildRequestURL(`clubs/${publicEnv.PUBLIC_CLUB_ID}/matches.json`, [
    [matchRequest.SEASON_FILTER, String(appPreferences.selectedSeason)],
    [matchRequest.GAMEDAY_FILTER, Gameday.previous],
    [matchRequest.COMPACT_PARAM, "true"],
  ]);
  const nextURL = matchRequest.buildRequestURL(`clubs/${publicEnv.PUBLIC_CLUB_ID}/matches.json`, [
    [matchRequest.SEASON_FILTER, String(appPreferences.selectedSeason)],
    [matchRequest.GAMEDAY_FILTER, Gameday.next],
    [matchRequest.COMPACT_PARAM, "true"],
  ]);

  const matchesCurrent = client.send<Match[]>(currentURL.pathname + currentURL.search, {
    fetch,
    requestKey: `home-matches-current-${appPreferences.selectedSeason}`,
  });
  const matchesPrevious = client.send<Match[]>(previousURL.pathname + previousURL.search, {
    fetch,
    requestKey: `home-matches-previous-${appPreferences.selectedSeason}`,
  });
  const matchesNext = client.send<Match[]>(nextURL.pathname + nextURL.search, {
    fetch,
    requestKey: `home-matches-next-${appPreferences.selectedSeason}`,
  });

  return {
    matchesCurrent,
    matchesPrevious,
    matchesNext,
  };
};
