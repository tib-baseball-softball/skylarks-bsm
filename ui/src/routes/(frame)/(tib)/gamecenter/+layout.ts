import {Gameday, type LeagueGroup, LeagueGroupAPIRequest, type Match, MatchAPIRequest} from "bsm.js";
import type {LayoutLoad} from "./$types";
import {env as publicEnv} from "$env/dynamic/public";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {client} from "$lib/dp/client.svelte.ts";

export const load = (async ({url, fetch}) => {
  const matchRequest = new MatchAPIRequest("");
  matchRequest.setAPIURL(RELAY_URL);

  const season = url.searchParams.get("season")?.toString() ?? matchRequest.defaultSeason;
  let gameday = (url.searchParams.get("gameday") as Gameday) ?? Gameday.current;
  const leagueGroup = url.searchParams.get("leagueGroup");

  if (!(gameday in Gameday)) {
    gameday = Gameday.current;
  }

  // Our Club API key has access to basically all games in Germany, which takes a long time to load and is not relevant
  // most of the time. Restrict games to Club Games except when a specific league is requested.

  let matchTargetURL: URL;
  if (leagueGroup && leagueGroup !== "0") {
    matchTargetURL = matchRequest.buildRequestURL("matches.json", [
      [matchRequest.SEASON_FILTER, String(season)],
      [matchRequest.GAMEDAY_FILTER, gameday],
      [matchRequest.LEAGUE_FILTER, leagueGroup],
      [matchRequest.COMPACT_PARAM, "true"],
    ]);
  } else {
    matchTargetURL = matchRequest.buildRequestURL(`clubs/${publicEnv.PUBLIC_CLUB_ID}/matches.json`, [
      [matchRequest.SEASON_FILTER, String(season)],
      [matchRequest.GAMEDAY_FILTER, gameday],
      [matchRequest.COMPACT_PARAM, "true"],
    ]);
  }

  const matchesPromise = client.send<Match[]>(matchTargetURL.pathname + matchTargetURL.search, {
    fetch: fetch,
    requestKey: `leagueGroup-${leagueGroup}-${season}-${gameday}`,
  });

  const leagueGroupRequest = new LeagueGroupAPIRequest("");
  leagueGroupRequest.setAPIURL(RELAY_URL);

  const leagueURL = leagueGroupRequest.buildRequestURL("league_groups.json", [
    [leagueGroupRequest.SEASON_FILTER, String(season)]
  ]);
  const leagueGroups = client.send<LeagueGroup[]>(leagueURL.pathname + leagueURL.search, {
    fetch: fetch,
    requestKey: `leagueGroups-${season}`,
  });

  return {
    leagueGroups: leagueGroups,
    streamed: {
      matches: matchesPromise,
    },
  };
}) satisfies LayoutLoad;
