<script lang="ts">
  import {browser} from "$app/environment";
  import {goto} from "$app/navigation";
  import ReloadUponPreferenceChange from "$lib/tib/components/utils/ReloadUponPreferenceChange.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";
  import SeasonSelector from "$lib/tib/components/utils/SeasonSelector.svelte";
  import {preferences} from "$lib/tib/globals.svelte.ts";
  import type {PageProps} from "./$types";

  const reload = () => {
    if (browser) {
      const queryString = `?season=${preferences.current.selectedSeason}`;

      goto(queryString);
    }
  };

  const {data}: PageProps = $props();
</script>

<div class="my-2 md:flex justify-between items-center">
  <h1 class="h1 mb-3">Teams</h1>
  <div>
    <SeasonSelector/>
  </div>
</div>

<ReloadUponPreferenceChange callback={reload}/>

{#await data.clubTeams}
  <p>Loading Teams...</p>
  <ProgressRing/>

{:then clubTeams}
  <ul class="teams-list">
    {#each clubTeams ?? [] as clubTeam}
      <li class="team-item">
        <a href="/teams/{clubTeam.id}?season={preferences.current.selectedSeason}">
          <span
            class="badge team-badge">{clubTeam?.league_entries.at(0)?.league?.acronym}</span>
          <span class="team-name">{clubTeam?.name}</span>
        </a>
      </li>
    {/each}
  </ul>

{:catch error}
  <p>error loading: {error.message}</p>
{/await}

<style>
  .teams-list {
    margin-top: calc(var(--spacing) * 5);
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 3);
  }

  .team-item {
    background-color: var(--color-surface-50-950);
    padding: calc(var(--spacing) * 3);
    min-height: 3.5rem;
    border-radius: var(--radius-base);

    @media (prefers-color-scheme: dark) {
      background-color: var(--color-surface-300-700);
      color: var(--color-surface-contrast-300-700);
    }
  }

  .team-badge {
    width: 5rem;
    background-color: var(--color-primary-50-950);
    color: var(--color-primary-950-50);
    border: 1px solid var(--color-primary-500);
  }

  .team-name {
    flex: 1 1 auto;
    margin-inline-start: calc(var(--spacing) * 3);
  }
</style>
