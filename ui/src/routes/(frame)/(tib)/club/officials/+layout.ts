import type {ClubFunction} from "bsm.js";
import {ClubTeamsAPIRequest} from "bsm.js";
import {client} from "$lib/dp/client.svelte.ts";
import type {LayoutLoad} from "./$types";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {env as publicEnv} from "$env/dynamic/public";

export const load: LayoutLoad = async ({fetch}) => {
  const req = new ClubTeamsAPIRequest("");
  req.setAPIURL(RELAY_URL);
  const url = req.buildRequestURL(`clubs/${publicEnv.PUBLIC_CLUB_ID}/club_functions.json`, []);

  const clubOfficials = client.send<ClubFunction[]>(url.pathname + url.search, {
    fetch,
    requestKey: "officials",
  });

  return {
    clubOfficials: clubOfficials,
  };
};
