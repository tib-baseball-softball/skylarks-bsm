import {type LeagueGroup, LeagueGroupAPIRequest, type Table, TablesAPIRequest} from "bsm.js";
import {client} from "$lib/dp/client.svelte.ts";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {error} from "@sveltejs/kit";
import type {PageLoad} from "./$types";

export const load: PageLoad = async ({parent, params, fetch}) => {
  const data = await parent();
  const leagueGroups = await data.leagueGroups as LeagueGroup[];
  let leagueGroup: LeagueGroup | undefined = leagueGroups.find(
    (lg) => lg.id === Number(params.id)
  );

  const leagueGroupRequest = new LeagueGroupAPIRequest("");
  leagueGroupRequest.setAPIURL(RELAY_URL);

  if (!leagueGroup) {
    const lgURL = leagueGroupRequest.buildRequestURL(`league_groups/${params.id}.json`, []);
    leagueGroup = await client.send<LeagueGroup>(lgURL.pathname + lgURL.search, {
      fetch,
      requestKey: `ligen-id-leagueGroup-${params.id}`,
    });
  }

  if (!leagueGroup) {
    throw error(404, "leagueGroup not found");
  }

  const tablesRequest = new TablesAPIRequest("");
  tablesRequest.setAPIURL(RELAY_URL);
  const tableURL = tablesRequest.buildRequestURL(`league_groups/${params.id}/table.json`, []);
  const table = client.send<Table>(tableURL.pathname + tableURL.search, {
    fetch,
    requestKey: `ligen-id-table-${params.id}`,
  });

  return {
    table,
    leagueGroup,
  };
};
