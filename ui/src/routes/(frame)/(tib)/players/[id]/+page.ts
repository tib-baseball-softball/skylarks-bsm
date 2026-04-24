import {
  type BattingStatisticsEntry,
  type FieldingStatisticsEntry,
  type PitchingStatisticsEntry,
  StatsAPIRequest,
  StatsType
} from "bsm.js";
import type {PageLoad} from "./$types";
import {client} from "$lib/dp/client.svelte.ts";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {PlayerClient} from "$lib/tib/service/PlayerClient.ts";

export const load: PageLoad = async ({params, fetch}) => {
  const statsRequest = new StatsAPIRequest("");
  statsRequest.setAPIURL(RELAY_URL);

  const battingURL = statsRequest.buildRequestURL(`people/${params.id}/statistics/${StatsType.batting}.json`, []);
  const pitchingURL = statsRequest.buildRequestURL(`people/${params.id}/statistics/${StatsType.pitching}.json`, []);
  const fieldingURL = statsRequest.buildRequestURL(`people/${params.id}/statistics/${StatsType.fielding}.json`, []);

  const playerBattingStats = client.send<BattingStatisticsEntry>(battingURL.pathname + battingURL.search, {
    fetch,
    requestKey: `player-batting-${params.id}`,
  });
  const playerPitchingStats = client.send<PitchingStatisticsEntry>(pitchingURL.pathname + pitchingURL.search, {
    fetch,
    requestKey: `player-pitching-${params.id}`,
  });
  const playerFieldingStats = client.send<FieldingStatisticsEntry>(fieldingURL.pathname + fieldingURL.search, {
    fetch,
    requestKey: `player-fielding-${params.id}`,
  });

  const playerClient = new PlayerClient(fetch);
  const player = playerClient.fetchSinglePlayer(params.id);

  return {
    battingStats: playerBattingStats,
    pitchingStats: playerPitchingStats,
    fieldingStats: playerFieldingStats,
    player,
  };
};
