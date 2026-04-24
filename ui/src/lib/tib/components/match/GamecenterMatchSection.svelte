<script lang="ts">
  import MatchTeaserCard from "$lib/dp/components/event/match/MatchTeaserCard.svelte";
  import type {Match} from "bsm.js";
  import {env} from "$env/dynamic/public";
  import ContentFilteredUnavailable from "$lib/tib/components/match/ContentFilteredUnavailable.svelte";

  interface Props {
    matches?: Match[];
    showExternal?: boolean;
  }

  let {matches = [], showExternal = false}: Props = $props();
  let skylarksGames = $derived(matches.filter(
    (match) =>
      match.away_team_name.includes(env.PUBLIC_TEAM_NAME) ||
      match.home_team_name.includes(env.PUBLIC_TEAM_NAME)
  ));
</script>

<section>
  <header>
    <h2 class="h2">Games</h2>
  </header>
  <div
    class="match-grid"
    data-testid="match-grid"
  >
    {#if showExternal}
      {#each matches as match}
        <MatchTeaserCard {match}/>
      {/each}

      {#if matches.length === 0}
        <ContentFilteredUnavailable/>
      {/if}
    {:else}
      {#each skylarksGames as match}
        <MatchTeaserCard {match}/>
      {/each}

      {#if skylarksGames.length === 0}
        <ContentFilteredUnavailable/>
      {/if}
    {/if}
  </div>
</section>

<style>
  h2 {
    margin-block: calc(var(--spacing) * 3);
  }

  .match-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(var(--spacing) * 4);
    margin-block-end: calc(var(--spacing) * 6);

    @media (min-width: 40rem) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 48rem) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 64rem) {
      gap: calc(var(--spacing) * 6);
    }
  }
</style>
