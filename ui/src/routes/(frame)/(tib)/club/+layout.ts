import type {Club} from "bsm.js";
import {env} from "$env/dynamic/public";
import {client} from "$lib/dp/client.svelte.ts";
import type {LayoutLoad} from "./$types";

export const load: LayoutLoad = async ({fetch}) => {
  const bsmClubData = await client.send<Club>(`/api/bsm/relay/clubs/${env.PUBLIC_CLUB_ID}.json`, {
    fetch: fetch,
    requestKey: env.PUBLIC_CLUB_ID,
  });

  return {
    bsmClubData: bsmClubData,
  };
};
