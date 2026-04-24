<script lang="ts">
  import type {PitchingMatchStats} from "bsm.js";

  interface Props {
    matchStats: PitchingMatchStats;
    teamName: string;
  }

  let {matchStats, teamName}: Props = $props();
</script>

<div class="boxscore-table-wrap">
  <table class="table table-compact">
    <thead>
    <tr class="header-row">
      <th data-cell-for="player">{teamName} (Pitchers)</th>
      <th data-cell-for="ip">IP</th>
      <th data-cell-for="bf">BF</th>
      <th data-cell-for="ab">AB</th>
      <th data-cell-for="h">H</th>
      <th data-cell-for="r">R</th>
      <th data-cell-for="er">ER</th>
      <th data-cell-for="k">K</th>
      <th data-cell-for="bb">BB</th>
      <th data-cell-for="era">ERA</th>
    </tr>
    </thead>

    <tbody>
    {#each matchStats.lineup as player}
      <tr>
        <td data-cell-for="player">
          {player.person.last_name}, {player.person.first_name.charAt(0)}. 
          {#if player.values.win_loss_save}
            ({player.values.win_loss_save})
          {/if}
        </td>
        <td data-cell-for="ip">{player.values.innings_pitched}</td>
        <td data-cell-for="bf">{player.values.batters_faced}</td>
        <td data-cell-for="ab">{player.values.at_bats}</td>
        <td data-cell-for="h">{player.values.hits}</td>
        <td data-cell-for="r">{player.values.runs}</td>
        <td data-cell-for="er">{player.values.earned_runs}</td>
        <td data-cell-for="k">{player.values.strikeouts}</td>
        <td data-cell-for="bb">{player.values.base_on_balls_allowed}</td>
        <td data-cell-for="era">{player.values.earned_runs_average}</td>
      </tr>
    {/each}
    </tbody>

    <tfoot>
    <tr class="footer-row" data-row-for="summary">
      <td data-cell-for="player">
      </td>
      <td data-cell-for="ip">{matchStats.sum.innings_pitched}
      </td>
      <td data-cell-for="bf">{matchStats.sum.batters_faced}
      </td>
      <td data-cell-for="ab">{matchStats.sum.at_bats}
      </td>
      <td data-cell-for="h">{matchStats.sum.hits}
      </td>
      <td data-cell-for="r">{matchStats.sum.runs}
      </td>
      <td data-cell-for="er">{matchStats.sum.earned_runs}
      </td>
      <td data-cell-for="k">{matchStats.sum.strikeouts}
      </td>
      <td data-cell-for="bb">{matchStats.sum.base_on_balls_allowed}
      </td>
      <td data-cell-for="era">
      </td>
    </tr>
    </tfoot>
  </table>
</div>

<style>
  .boxscore-table-wrap {
    @media (min-width: 64rem) {
      max-width: 75%;
    }

    @media (prefers-color-scheme: dark) {
      border: 2px solid var(--color-surface-500);
    }
  }

  .header-row, .footer-row {
    background-color: var(--color-surface-50-950);
    color: var(--color-surface-950-50);

    @media (prefers-color-scheme: dark) {
      background-color: var(--color-surface-300-700);
      color: var(--color-surface-contrast-300-700);
    }
  }
</style>
