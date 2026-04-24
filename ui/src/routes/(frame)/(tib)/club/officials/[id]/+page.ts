import type {PageLoad} from "./$types";
import {error} from "@sveltejs/kit";
import type {ClubFunction} from "bsm.js";

export const load: PageLoad = async ({params, parent}) => {
  let data = await parent();
  const clubOfficials: ClubFunction[] = await data.clubOfficials;

  let clubOfficial = clubOfficials.find((clubOfficial) => clubOfficial.id === Number(params.id));

  if (!clubOfficial) {
    error(404, "No club official found.");
  }

  return {
    clubOfficial: clubOfficial,
  };
};
