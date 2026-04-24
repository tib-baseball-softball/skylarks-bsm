import {error} from "@sveltejs/kit";
import type {License} from "bsm.js";
import {browser} from "$app/environment";
import {page} from "$app/state";
import {client} from "$lib/dp/client.svelte.ts";
import type {PageLoad} from "./$types";

export const load: PageLoad = async ({params, fetch}) => {
  let license: License | undefined;

  if (browser) {
    const umpireLicenses: License[] = await page.data.umpireLicenses;
    const scorerLicenses: License[] = await page.data.scorerLicenses;

    license = scorerLicenses?.find((license) => license.id === Number(params.id));

    if (!license) {
      license = umpireLicenses?.find((license) => license.id === Number(params.id));
    }

    if (!license) {
      license = await client.send<License>(`/api/bsm/relay/licenses/${params.id}.json`, {
        fetch: fetch,
        requestKey: `license-${params.id}`,
      });
    }

    if (!license) {
      error(404, "No license found.");
    }
  }

  return {
    license: license,
  };
};
