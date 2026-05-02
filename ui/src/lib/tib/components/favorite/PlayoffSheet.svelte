<script lang="ts">
  import {Trophy} from "lucide-svelte";
  import MatchTeaserCard from "$lib/dp/components/event/match/MatchTeaserCard.svelte";
  import type {PlayoffSeries} from "$lib/tib/types/PlayoffSeries.ts";

  interface Props {
    playoffSeries: PlayoffSeries;
  }

  const {playoffSeries}: Props = $props();

  const teams = $derived(Object.values(playoffSeries.teams));
</script>

<div class="playoff-sheet">
  <button class="btn preset-filled-primary-500" commandfor="playoff-dialog" command="show-modal">
    <Trophy/>
    <span>Show Playoff Series</span>
  </button>


  <dialog id="playoff-dialog" closedby="any">
    <h2 class="h3 title-space">Playoff Series</h2>

    <div class="outer">
      <article class="card preset-outlined-primary panel">
        <div class="stack">
          {#if playoffSeries.status === "leading"}
            <p>{playoffSeries.leading_team.name} lead series</p>
            <p class="series-score">
              {playoffSeries.leading_team.wins} - {playoffSeries.trailing_team
              .wins}
            </p>
          {:else if playoffSeries.status === "won"}
            <p>{playoffSeries.leading_team.name} win series</p>
            <p class="series-score">
              {playoffSeries.leading_team.wins} - {playoffSeries.trailing_team
              .wins}
            </p>
          {:else if playoffSeries.status === "tied"}
            <p>Series tied</p>
            <p>{teams.at(0)?.wins} - {teams.at(1)?.wins}</p>
          {/if}
          <p class="sub">
            Length of series: Best of {playoffSeries.series_length}
          </p>
        </div>
      </article>
    </div>
  </dialog>

  <div class="cards-grid">
    {#each playoffSeries.series_games as match}
      <MatchTeaserCard {match}/>
    {/each}
  </div>
</div>

<style>
  button {
    padding: calc(var(--spacing) * 2);
    margin-block: calc(var(--spacing) * 2);
  }

  .title-space {
    margin-bottom: calc(var(--spacing) * 3);
  }

  .outer {
    margin-inline: calc(var(--spacing) * 2);
    margin-block: calc(var(--spacing) * 4);
  }

  .panel {
    padding: calc(var(--spacing) * 4);
  }

  .stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .sub {
    font-weight: var(--font-weight-light);
    font-size: var(--text-sm);
  }

  .cards-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(var(--spacing) * 4);
    margin: calc(var(--spacing) * 2);
  }

  @media (min-width: 48rem) {
    .cards-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 64rem) {
    .cards-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .series-score {
    font-size: 2rem;
    font-weight: bold;
  }
</style>
