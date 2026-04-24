import {client} from "$lib/dp/client.svelte.ts";
import {preferences} from "$lib/tib/globals.svelte.ts";
import type {HomeDataset} from "$lib/tib/types/HomeDataset.ts";
import type {PageLoad} from "./$types";

export const load: PageLoad = async ({parent, url, fetch}) => {
  let teamId = Number(url.searchParams.get("team"));
  let season = Number(url.searchParams.get("season"));
  let gameClass = Number(url.searchParams.get("gameClass"));

  teamId = preferences.current.favoriteTeamID;
  season = preferences.current.selectedSeason;

  let datasets: Promise<HomeDataset[]>;

  if (Number(teamId) > 0) {
    try {
      datasets = client.send<HomeDataset[]>("/api/team/favorite", {
        fetch: fetch,
        query: {
          team: teamId,
          season: season,
          gameClass: gameClass,
        },
        requestKey: `favorite-${teamId}-${season}`,
      });
    } catch (e) {
      datasets = new Promise(() => []);
    }
  } else {
    datasets = new Promise(() => []);
  }

  const data = await parent();

  return {
    clubTeams: await data.clubTeams,
    leagueGroups: await data.leagueGroups,
    datasets: datasets,
  };
};
