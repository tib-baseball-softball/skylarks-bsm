<script lang="ts">
  import type {Match} from "bsm.js";
  import {Hourglass, Info, Link, Tag} from "lucide-svelte";

  interface Props {
    match: Match;
  }

  let {match}: Props = $props();
</script>

<div class="card preset-tonal-surface root">
  <div class="row">
    <Tag/>
    <div>
      <p>{match.league.name} ({match.league.acronym})</p>
      <p class="sub">Liga</p>
    </div>
  </div>

  <hr>

  <div class="row">
    <Info/>
    <div>
      <p>{match.match_id}</p>
      <p class="sub">Spiel-ID</p>
    </div>
  </div>

  <hr>

  <div class="row">
    <Hourglass/>
    <div>
      <p>{match.planned_innings}</p>
      <p class="sub">geplante Innings</p>
    </div>
  </div>

  <hr>

  <div class="row">
    <Link/>
    {#if match.scoresheet_url}
      <a class="anchor" target="_blank" href="{match.scoresheet_url}">Link zum Scoresheet</a>
    {:else}
      <span>Kein Scoresheet vorhanden.</span>
    {/if}
  </div>
</div>

<style>
  .root {
    border: 1px solid var(--color-surface-500);
    padding: calc(var(--spacing) * 3);
  }

  .row {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .sub {
    font-size: var(--text-sm);
    font-weight: 300;
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
