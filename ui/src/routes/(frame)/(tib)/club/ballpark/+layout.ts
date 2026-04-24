import type {Field} from "bsm.js";
import {env} from "$env/dynamic/public";
import {client} from "$lib/dp/client.svelte.ts";
import type {LayoutLoad} from "./$types";

export const load: LayoutLoad = async ({fetch}) => {
  const fields = client.send<Field[]>(`/api/bsm/relay/clubs/${env.PUBLIC_CLUB_ID}/fields.json`, {
    fetch: fetch,
    requestKey: "ballparks",
  });

  return {
    fields: fields,
  };
};
