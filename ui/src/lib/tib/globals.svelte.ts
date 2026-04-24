import {Gameday} from "bsm.js";
import {persistedState} from "svelte-persisted-state";
import { env } from "$env/dynamic/public";

export type AppPreferences = {
  selectedSeason: number
  gameday: Gameday
  leagueGroupID: number
  favoriteTeamID: number
}

/*
 * User Preferences, kept in sync via Local Storage.
 *
 * NB: Could be saved in the database for logged-in users
 *
 * Usage: https://github.com/oMaN-Rod/svelte-persisted-state
 */
export const preferences = persistedState<AppPreferences>(
  "preferences",
  {
    gameday: Gameday.current,
    selectedSeason: new Date().getFullYear(),
    leagueGroupID: 0,
    favoriteTeamID: 0,
  },
  {
    storage: "local",
    syncTabs: true,
  }
);

// only used to construct the URL for the relay, not used for directly fetching data
export const RELAY_URL = `${env.PUBLIC_BACKEND_URL ?? ""}/api/bsm/relay`;
