import {ClubTeamsAPIRequest, type Team} from "bsm.js";
import type {LayoutLoad} from "./$types";
import {env as publicEnv} from "$env/dynamic/public";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {client} from "$lib/dp/client.svelte.ts";

export const load: LayoutLoad = async ({url, fetch, parent}) => {
  const data = await parent();
  let clubTeams = data.clubTeams as Promise<Team[]>;

  const clubTeamRequest = new ClubTeamsAPIRequest("");
  clubTeamRequest.setAPIURL(RELAY_URL);
  const season = url.searchParams.get("season") ?? clubTeamRequest.defaultSeason;

  if (season) {
    const clubTeamsURL = clubTeamRequest.buildRequestURL(`clubs/${publicEnv.PUBLIC_CLUB_ID}/teams.json`, [
      [clubTeamRequest.SEASON_FILTER, String(season)],
    ]);

    clubTeams = client.send<Team[]>(clubTeamsURL.pathname + clubTeamsURL.search, {
      fetch,
      requestKey: `favorite-clubTeams-${publicEnv.PUBLIC_CLUB_ID}-${season}`,
    });
  }

  return {
    clubTeams,
  };
};
