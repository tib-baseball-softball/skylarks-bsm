import type {License} from "bsm.js";
import {env} from "$env/dynamic/public";
import {client} from "$lib/dp/client.svelte.ts";
import type {PageLoad} from "./$types";

export const load: PageLoad = async ({fetch}) => {
  const scorerLicenses = client.send<License[]>(`/api/bsm/relay/clubs/${env.PUBLIC_CLUB_ID}/licenses.json?filters[categories][]=scorer`, {
    fetch: fetch,
    requestKey: "scorerLicenses",
  });

  return {
    scorerLicenses: scorerLicenses,
  };
};
