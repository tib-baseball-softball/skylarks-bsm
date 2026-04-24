import {AbstractAPIRequest} from "bsm.js";
import {env as publicEnv} from "$env/dynamic/public";
import type {Fetch} from "$lib/dp/utility/Fetch.ts";

export class TYPO3Client extends AbstractAPIRequest {
  protected readonly fetch: Fetch;
  protected readonly API_URL = publicEnv.PUBLIC_TYPO3_URL;

  protected readonly HEADERS = {
    "Content-Type": "application/json",
  };

  constructor(fetch: Fetch) {
    super(""); // no auth necessary
    this.fetch = fetch;
  }
}
