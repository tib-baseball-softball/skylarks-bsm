import type {PageLoad} from "./$types";
import {error} from "@sveltejs/kit";
import type {Field} from "bsm.js";

export const load: PageLoad = async ({params, parent}) => {
  let data = await parent();
  const fields: Field[] = await data.fields;

  let field = fields.find((field) => field.id === Number(params.id));

  if (!field) {
    error(404, "No ballpark found.");
  }

  return {
    field: field,
  };
};
