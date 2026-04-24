import {ClubTeamsAPIRequest, type LeagueGroup, LeagueGroupAPIRequest, type Team} from "bsm.js";
import type {LayoutLoad} from "./$types";
import {env as publicEnv} from "$env/dynamic/public";
import {preferences, RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {client} from "$lib/dp/client.svelte.ts";
import {browser, dev} from "$app/environment";
import {loadLocale} from "wuchale/load-utils";
import { locales } from "../locales/data";
import {appLocale} from "$lib/dp/locale.svelte.ts";

export const ssr = false;

export const load: LayoutLoad = async ({fetch}) => {
  const appPreferences = preferences.current;

  // Build URLs via bsm.js and relay them through PocketBase
  const leagueGroupRequest = new LeagueGroupAPIRequest("");
  leagueGroupRequest.setAPIURL(RELAY_URL);
  const leagueGroupsURL = leagueGroupRequest.buildRequestURL("league_groups.json", [
    [leagueGroupRequest.SEASON_FILTER, String(appPreferences.selectedSeason)],
  ]);

  const clubTeamRequest = new ClubTeamsAPIRequest("");
  clubTeamRequest.setAPIURL(RELAY_URL);
  const clubTeamsURL = clubTeamRequest.buildRequestURL(`clubs/${publicEnv.PUBLIC_CLUB_ID}/teams.json`, [
    [clubTeamRequest.SEASON_FILTER, String(appPreferences.selectedSeason)],
  ]);

  const clubTeams = client.send<Team[]>(clubTeamsURL.pathname + clubTeamsURL.search, {
    fetch,
    requestKey: `root-clubTeams-${publicEnv.PUBLIC_CLUB_ID}-${appPreferences.selectedSeason}`,
  });

  const leagueGroups = client.send<LeagueGroup[]>(leagueGroupsURL.pathname + leagueGroupsURL.search, {
    fetch,
    requestKey: `root-leagueGroups-${appPreferences.selectedSeason}`,
  });

  if (browser) {
    let locale: string;
    if (appLocale.current) {
      // locale has been set before
      locale = appLocale.current;
    } else {
      // locale is unset so far, try to read from browser settings
      const browserPreferredLocale = navigator.language.slice(0, 2); // Safari has `de-DE`, Chrome and Firefox use `de`

      // @ts-ignore - locales is wrongly inferred to be Intl.Locale instead of simple Wuchale union type
      if (locales.includes(browserPreferredLocale)) {
        locale = browserPreferredLocale;
      } else {
        locale = "en";
      }
    }
    if (dev) {
      console.log(`detected locale: ${locale}`);
    }
    await loadLocale(locale);
  }

  return {
    clubTeams,
    leagueGroups,
  };
};
