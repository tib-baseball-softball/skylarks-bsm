import {error} from "@sveltejs/kit";
import type {LeagueGroup} from "bsm.js";
import {client} from "$lib/dp/client.svelte.js";
import type {LeaderboardSummary} from "$lib/tib/types/LeaderboardData.ts";
import type {PageLoad} from "./$types";

/**
 * Gets statistics for league leaders in all relevant categories.
 */
export const load: PageLoad = async ({parent, params, url, fetch}) => {
  const data = await parent();
  const leagueGroups = await data.leagueGroups;
  let leagueGroup: LeagueGroup | undefined = leagueGroups.find(
    (leagueGroup: LeagueGroup) => leagueGroup.id === Number(params.id)
  );

  if (!leagueGroup) {
    leagueGroup = await client.send<LeagueGroup>(`/api/bsm/relay/league_groups/${params.id}.json`, {
      fetch: fetch,
      requestKey: `leagueGroupStatsRoute-lg-${params.id}`,
    });
  }

  if (!leagueGroup) {
    throw error(404, "leagueGroup not found");
  }

  const statsType = url.searchParams.get("statsType") ?? "";

  const leaderboardData = client.send<LeaderboardSummary>(`/api/bsm/relay/top10/${leagueGroup.id}`, {
    fetch: fetch,
    query: {
      statsType: statsType,
    },
    requestKey: `leagueGroupStatsRoute-top10-${params.id}-${statsType}`,
  });

  return {
    leagueGroup: leagueGroup,
    leaderboardData: leaderboardData,
  };
};
