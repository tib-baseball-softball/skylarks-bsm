<script lang="ts">
  // @ts-ignore
  import {Tabs} from "bits-ui";
  import MatchMainInfoSection from "$lib/tib/components/match/MatchMainInfoSection.svelte";
  import MatchBoxscoreSection from "$lib/tib/components/boxscore/MatchBoxscoreSection.svelte";
  import MatchDetailStatsCard from "$lib/tib/components/match/MatchDetailStatsCard.svelte";
  import MatchDetailLocationCard from "$lib/dp/components/event/match/MatchDetailLocationCard.svelte";
  import MatchDetailOfficialsCard from "$lib/tib/components/match/MatchDetailOfficialsCard.svelte";
  import type {PageProps} from "./$types";
  import ContentFilteredUnavailable from "$lib/tib/components/match/ContentFilteredUnavailable.svelte";
  import GameReport from "$lib/tib/components/gameReport/GameReport.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";

  let {data}: PageProps = $props();

  let match = $derived(data.match);
  let tabSet: "gameData" | "boxscore" | "gameReport" | string = $state("gameData");
</script>

<h1 class="h2 page-title">Details zu Spiel {match.match_id}</h1>

<section class="main-info-section">
  <MatchMainInfoSection {match}/>
</section>

<section class="tabs-section">

  <Tabs.Root
    bind:value={tabSet}
  >
    <Tabs.List
      class="tabs-list"
    >
      <Tabs.Trigger
        class="tabs-trigger btn"
        value="gameData"
      >Game Data
      </Tabs.Trigger>
      <Tabs.Trigger
        class="tabs-trigger btn"
        value="boxscore"
      >Box Score
      </Tabs.Trigger>
      <Tabs.Trigger
        class="tabs-trigger btn"
        value="gameReport"
      >Game Report
      </Tabs.Trigger>
    </Tabs.List>

    <div class="content-wrapper">
      <Tabs.Content class="tabs-content" value="gameData">
        <div class="game-data-grid">
          <MatchDetailStatsCard {match}/>

          <MatchDetailLocationCard
            --location-padding="3"
            --location-spacing="0"
            field={match?.field}
          />

          <MatchDetailOfficialsCard {match}/>
        </div>
      </Tabs.Content>

      <Tabs.Content class="tabs-content" value="boxscore">
        {#await data.singleGameStats}
          <ProgressRing/>
        {:then boxscore}
          {#if boxscore}
            <MatchBoxscoreSection {boxscore}/>
          {:else }
            <ContentFilteredUnavailable text="Box Score for this game could not be loaded or is unavailable."/>
          {/if}
        {:catch error}
          <p>error loading box score: {error.message}</p>
        {/await}
      </Tabs.Content>

      <Tabs.Content class="tabs-content" value="gameReport">
        {#await data.gameReport}
          <ProgressRing/>
        {:then gameReport}
          {#if gameReport}
            <GameReport classes="game-report-custom" report={gameReport}/>
          {:else }
            <ContentFilteredUnavailable text="No Game Report available."/>
          {/if}
        {:catch error}
          <p>error loading Game Report: {error.message}</p>
        {/await}
      </Tabs.Content>
    </div>
  </Tabs.Root>
</section>

<style>
  .page-title {
    margin-top: calc(var(--spacing) * 3);
  }

  .main-info-section {
    margin-block: calc(var(--spacing) * 3);

    @media (min-width: 64rem) {
      margin-block: calc(var(--spacing) * 5);
    }
  }

  .tabs-section {
    margin-bottom: calc(var(--spacing) * 8);
  }

  :global(.tabs-section .tabs-list) {
    border: 1px var(--tw-border-style);
  }

  .game-data-grid {
    display: grid;
    grid-template-columns: 1fr;
    place-items: stretch;
    gap: calc(var(--spacing) * 5);

    @media (min-width: 48rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 64rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  :global(.game-report-custom) {
    margin-block: calc(var(--spacing) * 2) !important;

    @media (min-width: 48rem) {
      max-width: 80%;
    }

    @media (min-width: 160rem) {
      /* 2xl */
      max-width: 70%;
    }
  }

  .content-wrapper {
    margin-block: calc(var(--spacing) * 4);
  }
</style>
