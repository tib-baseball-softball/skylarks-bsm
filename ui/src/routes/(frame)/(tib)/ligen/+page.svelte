<script lang="ts">
  import {goto} from "$app/navigation";
  import ReloadUponPreferenceChange from "$lib/tib/components/utils/ReloadUponPreferenceChange.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";
  import SeasonSelector from "$lib/tib/components/utils/SeasonSelector.svelte";
  import {preferences} from "$lib/tib/globals.svelte.ts";
  import type {PageProps} from "./$types";

  const reload = () => {
    const queryString = `?season=${preferences.current.selectedSeason}`;

    goto(queryString);
  };

  const {data}: PageProps = $props();
</script>

<ReloadUponPreferenceChange callback={reload}/>

<div class="header-container">
  <h1 class="h1">Leagues</h1>
  <div>
    <SeasonSelector/>
  </div>
</div>

{#await data.leagueGroups}
  <p>Loading Leagues...</p>
  <ProgressRing/>

{:then leagueGroups}

  <ul class="leagues-list">
    {#each leagueGroups as leagueGroup}
      <li class="league-item">
        <a href="/ligen/{leagueGroup.id}">
          <span class="badge league-badge">{leagueGroup.acronym}</span>
          <span class="league-name">{leagueGroup.name}</span>
        </a>
      </li>
    {/each}
  </ul>

{:catch error}
  <p>error loading: {error.message}</p>
{/await}

<style>
  .leagues-list {
    margin-top: calc(var(--spacing) * 5);
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 3);
  }

  .league-item {
    background-color: var(--color-surface-50-950);
    padding: calc(var(--spacing) * 3);
    min-height: 3.5rem;
    border-radius: var(--radius-base);

    @media (prefers-color-scheme: dark) {
      background-color: var(--color-surface-300-700);
      color: var(--color-surface-contrast-300-700);
    }
  }

  .league-badge {
    width: 5rem;
    background-color: var(--color-primary-50-950);
    color: var(--color-primary-950-50);
    border: 1px solid var(--color-primary-500);
  }

  .league-name {
    flex: 1 1 auto;
    margin-inline-start: calc(var(--spacing) * 3);
  }
  
  .header-container {
    justify-content: space-between;
    align-items: center;
    
    @media (min-width: 32rem) {
      display: flex;
    }
  }
</style>
