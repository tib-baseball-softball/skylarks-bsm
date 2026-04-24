<script lang="ts">
import type { OffensiveMatchStats } from "bsm.js"

interface Props {
  matchStats: OffensiveMatchStats
  teamName: string
}

let { matchStats, teamName }: Props = $props()
</script>

<div class="boxscore-table-wrap">
  <table class="table table-compact">
    <thead>
    <tr class="header-row">
      <th data-cell-for="player">
        {teamName} (Batters)
      </th>
      <th data-cell-for="ab">AB</th>
      <th data-cell-for="r">R</th>
      <th data-cell-for="h">H</th>
      <th data-cell-for="rbi">RBI</th>
      <th data-cell-for="k">K</th>
      <th data-cell-for="bb">BB</th>
      <th data-cell-for="avg">AVG</th>
      <th data-cell-for="ops">OPS</th>
    </tr>
    </thead>
    <tbody>
    {#each matchStats.lineup as player}
      <tr>
        <td class="player-cell" data-cell-for="player">
          <!-- svelte-ignore block_empty -->
          {#if !player.starter}
               
          {/if}
          {player.person.last_name}, {player.person.first_name.charAt(0)}.
          <div class="positions">
            {#each player.human_positions_short as position}
              <em>{position}</em>
            {/each}
          </div>
        </td>
        <td data-cell-for="ab">{player.values.at_bats}</td>
        <td data-cell-for="r">{player.values.runs}</td>
        <td data-cell-for="h">{player.values.hits}</td>
        <td data-cell-for="rbi">{player.values.runs_batted_in}</td>
        <td data-cell-for="k">{player.values.strikeouts}</td>
        <td data-cell-for="bb">{player.values.base_on_balls}</td>
        <td data-cell-for="avg">{player.values.batting_average}</td>
        <td data-cell-for="ops">{player.values.on_base_plus_slugging}</td>
      </tr>
    {/each}
    </tbody>
    <tfoot>
    <tr class="footer-row" data-row-for="summary">
      <td data-cell-for="player">
      </td>
      <td data-cell-for="ab">{matchStats.sum.at_bats}
      </td>
      <td data-cell-for="r">{matchStats.sum.runs}
      </td>
      <td data-cell-for="h">{matchStats.sum.hits}
      </td>
      <td data-cell-for="rbi">{matchStats.sum.runs_batted_in}
      </td>
      <td data-cell-for="k">{matchStats.sum.strikeouts}
      </td>
      <td data-cell-for="bb">{matchStats.sum.base_on_balls}
      </td>
      <td data-cell-for="avg">
      </td>
      <td data-cell-for="ops">
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
        
        :global([data-theme='dark']) & {
            border: 2px solid var(--color-surface-500);
        }
    }

    .header-row, .footer-row {
        background-color: var(--color-surface-50-950);
        color: var(--color-surface-950-50);
        
        :global([data-theme='dark']) & {
            background-color: var(--color-surface-300-700);
            color: var(--color-surface-contrast-300-700);
        }
    }

    .player-cell {
        display: flex;
        align-items: center;
    }

    .positions {
        margin-left: calc(var(--spacing) * 2);

        em::before {
            content: "-";
        }

        em:first-child::before {
            content: "";
        }
        
        em {
            text-transform: lowercase;
        }
    }
</style>