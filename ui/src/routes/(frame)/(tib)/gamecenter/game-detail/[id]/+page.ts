import {error} from "@sveltejs/kit";
import type {PageLoad} from "./$types";
import {type Match, MatchAPIRequest, type MatchBoxscore} from "bsm.js";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {client} from "$lib/dp/client.svelte.ts";
import {GameReportClient} from "$lib/tib/service/GameReportClient.ts";

export const load: PageLoad = async ({parent, params, fetch}) => {
  const data = await parent();
  const matches = await data.streamed.matches as Match[];
  let match = matches.find((m: Match) => m.id === Number(params.id));

  const matchRequest = new MatchAPIRequest("");
  matchRequest.setAPIURL(RELAY_URL);

  // if not already found in data, load it via relay
  if (!match) {
    try {
      const matchURL = matchRequest.buildRequestURL(`matches/${params.id}.json`, [
        [matchRequest.COMPACT_PARAM, "true"],
      ]);
      match = await client.send<Match>(matchURL.pathname + matchURL.search, {
        fetch,
        requestKey: `game-detail-match-${params.id}`,
      });
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }

  if (!match) throw error(404, "Match couldn't be found.");

  const boxURL = matchRequest.buildRequestURL(`matches/${params.id}/match_boxscore.json`, []);
  const singleGameStats = client.send<MatchBoxscore>(boxURL.pathname + boxURL.search, {
    fetch,
    requestKey: `game-detail-boxscore-${params.id}`,
  });

  const reportClient = new GameReportClient(fetch);
  const gameReport = reportClient.loadSingleGameReportForBSMMatchID(match.match_id);

  return {
    match,
    singleGameStats,
    gameReport,
  };
};
