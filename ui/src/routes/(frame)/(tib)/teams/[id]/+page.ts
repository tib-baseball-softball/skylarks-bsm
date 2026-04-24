import {error} from "@sveltejs/kit";
import {
  type BattingStatisticsEntry,
  ClubTeamsAPIRequest,
  type FieldingStatisticsEntry,
  type LeagueGroup,
  LeagueGroupAPIRequest,
  type PitchingStatisticsEntry,
  StatsAPIRequest,
  StatsType,
  type Table,
  TablesAPIRequest,
  type Team,
} from "bsm.js";
import type {PageLoad} from "./$types";
import {client} from "$lib/dp/client.svelte.ts";
import {RELAY_URL} from "$lib/tib/globals.svelte.ts";
import {env as publicEnv} from "$env/dynamic/public";
import {PlayerClient} from "$lib/tib/service/PlayerClient.ts";
import type {TiBTeam} from "$lib/tib/types/TiBTeam.ts";
import {TeamClient} from "$lib/tib/service/TeamClient.ts";
import {dev} from "$app/environment";

export const load: PageLoad = async ({parent, params, url, fetch}) => {
  const data = await parent();
  let clubTeams: Team[] | undefined = await data.clubTeams;

  // Fallback: if the parent provided no teams, fetch from relay
  if (!clubTeams || clubTeams.length === 0) {
    const clubTeamRequest = new ClubTeamsAPIRequest("");
    clubTeamRequest.setAPIURL(RELAY_URL);
    const season = url.searchParams.get("season")?.toString() ?? clubTeamRequest.defaultSeason;
    const clubTeamsURL = clubTeamRequest.buildRequestURL(`clubs/${publicEnv.PUBLIC_CLUB_ID}/teams.json`, [
      [clubTeamRequest.SEASON_FILTER, String(season)],
    ]);
    clubTeams = await client.send<Team[]>(clubTeamsURL.pathname + clubTeamsURL.search, {
      fetch,
      requestKey: `team-id-clubTeams-${publicEnv.PUBLIC_CLUB_ID}-${season}`,
    });
  }

  const clubTeam = clubTeams?.find((t) => t.id === Number(params.id));
  if (!clubTeam) {
    throw error(404);
  }

  const statsRequest = new StatsAPIRequest("");
  statsRequest.setAPIURL(RELAY_URL);

  const leagueEntry = clubTeam.league_entries.at(0);
  if (!leagueEntry) {
    return {
      clubTeam,
    };
  }

  // Stats for the league entry
  const battingURL = statsRequest.buildRequestURL(`league_entries/${leagueEntry.id}/statistics/${StatsType.batting}.json`, []);
  const pitchingURL = statsRequest.buildRequestURL(`league_entries/${leagueEntry.id}/statistics/${StatsType.pitching}.json`, []);
  const fieldingURL = statsRequest.buildRequestURL(`league_entries/${leagueEntry.id}/statistics/${StatsType.fielding}.json`, []);

  const battingStats = client.send<BattingStatisticsEntry>(battingURL.pathname + battingURL.search, {
    fetch,
    requestKey: `team-id-batting-${leagueEntry.id}`,
  });
  const pitchingStats = client.send<PitchingStatisticsEntry>(pitchingURL.pathname + pitchingURL.search, {
    fetch,
    requestKey: `team-id-pitching-${leagueEntry.id}`,
  });
  const fieldingStats = client.send<FieldingStatisticsEntry>(fieldingURL.pathname + fieldingURL.search, {
    fetch,
    requestKey: `team-id-fielding-${leagueEntry.id}`,
  });

  // Resolve leagueGroup
  let leagueGroups: LeagueGroup[] | undefined = await data.leagueGroups;
  let leagueGroup = leagueGroups?.find((g) => g.game_class?.id === leagueEntry.league?.id);

  if (!leagueGroup) {
    // Fallback: fetch league groups for the season
    const leagueGroupRequest = new LeagueGroupAPIRequest("");
    leagueGroupRequest.setAPIURL(RELAY_URL);
    const season = url.searchParams.get("season")?.toString() ?? leagueGroupRequest.defaultSeason;
    const lgURL = leagueGroupRequest.buildRequestURL("league_groups.json", [
      [leagueGroupRequest.SEASON_FILTER, String(season)],
    ]);
    leagueGroups = await client.send<LeagueGroup[]>(lgURL.pathname + lgURL.search, {
      fetch,
      requestKey: `team-id-leagueGroups-${season}`,
    });
    leagueGroup = leagueGroups?.find((g) => g.game_class?.id === leagueEntry.league?.id);
  }

  // Table for the league group if available
  let table: Promise<Table> | null = null;
  if (leagueGroup) {
    const tableRequest = new TablesAPIRequest("");
    tableRequest.setAPIURL(RELAY_URL);
    const tableURL = tableRequest.buildRequestURL(`league_groups/${leagueGroup.id}/table.json`, []);
    table = client.send<Table>(tableURL.pathname + tableURL.search, {
      fetch,
      requestKey: `team-id-table-${leagueGroup.id}`,
    });
  }

  let team: TiBTeam | undefined;
  if (leagueGroup) {
    const teamClient = new TeamClient(fetch);

    if (dev) {
      console.log("Fetching team for league group", leagueGroup.id);
    }
    const teamResponse = await teamClient.fetchTeamByFilter({league: String(leagueGroup.id)});

    if (Array.isArray(teamResponse) && teamResponse.length > 0) {
      team = teamResponse.at(0);
    }
  }
  const playerClient = new PlayerClient(fetch);

  return {
    clubTeam,
    battingStats,
    pitchingStats,
    fieldingStats,
    players: team ? playerClient.fetchPlayersByFilters({team: String(team.uid)}) : null,
    table,
  };
};
