<script lang="ts">
  // @ts-ignore
  import {Tabs} from "bits-ui";
  import {Gameday} from "bsm.js";
  import {browser} from "$app/environment";
  import {goto} from "$app/navigation";
  import GamecenterMatchSection from "$lib/tib/components/match/GamecenterMatchSection.svelte";
  import ReloadUponPreferenceChange from "$lib/tib/components/utils/ReloadUponPreferenceChange.svelte";
  import LeagueFilter from "$lib/tib/components/league/LeagueFilter.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";
  import SeasonSelector from "$lib/tib/components/utils/SeasonSelector.svelte";
  import Switch from "$lib/tib/components/utils/Switch.svelte";
  import {preferences} from "$lib/tib/globals.svelte.ts";
  import type {PageProps} from "./$types";

  const DEFAULT_LEAGUE_GROUP_ID = 0;

  const reloadGameData = () => {
    if (browser) {
      let queryString = `?gameday=${preferences.current.gameday}&season=${preferences.current.selectedSeason}`;

      if (preferences.current.leagueGroupID !== DEFAULT_LEAGUE_GROUP_ID) {
        queryString = queryString + `&leagueGroup=${preferences.current.leagueGroupID}`;
      }
      goto(queryString);
    }
  };

  const {data}: PageProps = $props();
  const leagueGroups = $derived(data.leagueGroups);

  let showExternal = $state(false);

  /**
   *  enum <=> string conversion necessary
   */
  function onGamedayChange(value: string) {
    //@ts-expect-error
    preferences.current.gameday = value;
  }
</script>

<ReloadUponPreferenceChange callback={reloadGameData}/>

<div class="gamecenter-header">
  <h1 class="h1">Gamecenter</h1>

  <div>
    <div class="header-container">
      {#await leagueGroups then groups}
        <LeagueFilter leagueGroups={groups}/>
      {/await}
      <SeasonSelector/>
    </div>

    <div class="header-container switch-container">
      <Switch
        --switch-active-bg="light-dark(var(--color-surface-900), var(--color-tertiary-700))"
        bind:checked={showExternal}
        name="slide"
      />
      <p>Show external games</p>
    </div>
  </div>
</div>

<section class="gameday-section">
  <header class="h4">Gameday</header>
  <Tabs.Root
    onValueChange={onGamedayChange}
    value={preferences.current.gameday}
  >
    <Tabs.List
      class="tabs-list preset-tonal-surface"
    >
      <Tabs.Trigger
        class="tabs-trigger btn"
        data-testid="segment-item-previous"
        value={Gameday.previous}
      >Previous
      </Tabs.Trigger>
      <Tabs.Trigger
        class="tabs-trigger btn"
        data-testid="segment-item"
        value={Gameday.current}
      >
        Current
      </Tabs.Trigger>
      <Tabs.Trigger
        class="tabs-trigger btn"
        data-testid="segment-item"
        value={Gameday.next}
      >Next
      </Tabs.Trigger>
      <Tabs.Trigger
        class="tabs-trigger btn"
        data-testid="segment-item"
        value={Gameday.any}
      >All
      </Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content class="pt-3" value={preferences.current.gameday}>
      {#await data.streamed.matches}
        <p>Loading matches...</p>
        <ProgressRing/>
      {:then matches}
        <GamecenterMatchSection {matches} {showExternal}/>
      {:catch error}
        <p>error loading matches: {error.message}</p>
      {/await}
    </Tabs.Content>
  </Tabs.Root>
</section>

<style>
  .gameday-section {
    margin-block-end: calc(var(--spacing) * 5);
    margin-block-start: calc(var(--spacing) * 3);

    header {
      margin-block-end: 0.5rem;
    }
  }

  .gamecenter-header {
    margin-block: calc(var(--spacing) * 4);
    justify-content: space-between;
    align-items: start;

    @media (min-width: 32rem) {
      display: flex;
    }
  }

  .header-container {
    display: flex;
    gap: calc(var(--spacing) * 2);
  }

  .switch-container {
    justify-content: end;
    margin-block: calc(var(--spacing) * 4);
  }
</style>
