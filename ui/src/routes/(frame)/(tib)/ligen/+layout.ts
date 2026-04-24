import {LeagueGroupAPIRequest, type LeagueGroup} from "bsm.js";
import type {LayoutLoad} from "./$types";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {client} from "$lib/dp/client.svelte.ts";

export const load: LayoutLoad = async ({ parent, url, fetch }) => {
  const data = await parent();
  let leagueGroups = data.leagueGroups as Promise<LeagueGroup[]>;

  const leagueGroupRequest = new LeagueGroupAPIRequest("");
  leagueGroupRequest.setAPIURL(RELAY_URL);
  const season = url.searchParams.get("season")?.toString();

  if (season) {
    const lgURL = leagueGroupRequest.buildRequestURL("league_groups.json", [
      [leagueGroupRequest.SEASON_FILTER, String(season)],
    ]);
    leagueGroups = client.send<LeagueGroup[]>(lgURL.pathname + lgURL.search, {
      fetch,
      requestKey: `ligen-layout-leagueGroups-${season}`,
    });
  }

  return {
    leagueGroups,
  };
};
