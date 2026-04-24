<script lang="ts">
  import type {Match} from "bsm.js";
  import {env} from "$env/dynamic/public";
  import {MatchState} from "$lib/dp/enum/MatchState.ts";
  import {MatchDecorator} from "$lib/dp/service/MatchDecorator.ts";

  interface Props {
    match: Match;
    teamName?: string;
  }

  const {match, teamName}: Props = $props();

  const matchDecorator = $derived(new MatchDecorator(match));
  const matchState = $derived(matchDecorator.getMatchState(teamName ?? env.PUBLIC_TEAM_NAME));
</script>

<div class="root">
  {#if matchState === MatchState.won}
    <span class="result won">W</span>
  {:else if matchState === MatchState.lost}
    <span class="result lost">L</span>
  {:else if matchState === MatchState.derby}
    <span class="result derby">♥</span>
  {:else if matchState === MatchState.final}
    <span class="result">F</span>
  {:else if matchState === MatchState.notYetPlayed}
    <span class="result tbd">TBD</span>
  {:else if matchState === MatchState.cancelled}
    <span class="result ppd">PPD</span>
  {/if}
</div>

<style>
  .root {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
  }

  .result {
    &.won {
      color: var(--color-success-700);
    }

    &.lost {
      color: var(--color-error-600);
    }

    &.derby {
      color: light-dark(var(--color-primary-600), var(--color-primary-400));
      font-size: var(--text-2xl);
    }

    &.tbd,
    &.ppd {
      font-size: var(--text-md);
    }
  }
</style>
