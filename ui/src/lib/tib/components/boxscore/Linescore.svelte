<script lang="ts">
  import type {Linescore} from "bsm.js";
  import {range} from "$lib/dp/utility/range.ts";

  interface Props {
    linescore: Linescore;
  }

  let {linescore}: Props = $props();

  const innings = $derived(range(1, linescore.played_innings));
</script>

<div class="table-wrap linescore-wrap">
  <!-- Native Table Element -->
  <table class="linescore">

    <thead>
    <tr>
      <th></th>
      {#each innings as inning}
        <th>{inning}</th>
      {/each}
      <th>R</th>
      <th>H</th>
      <th>E</th>
    </tr>
    </thead>

    <tbody>
    <tr>
      <td>{linescore.away.league_entry.team?.name}</td>
      {#each linescore.away.innings as awayInning}
        <td>{awayInning}</td>
      {/each}
      <td class="runs-cell">{linescore.away.runs}</td>
      <td>{linescore.away.hits}</td>
      <td>{linescore.away.errors}</td>
    </tr>
    <tr>
      <td>{linescore.home.league_entry.team?.name}</td>
      {#each linescore.home.innings as homeInning}
        <td>{homeInning}</td>
      {/each}
      <td class="runs-cell">{linescore.home.runs}</td>
      <td>{linescore.home.hits}</td>
      <td>{linescore.home.errors}</td>
    </tr>
    </tbody>

  </table>
</div>

<style>
  .linescore {
    width: 100%;
    background-color: var(--color-surface-50);

    @media (prefers-color-scheme: dark) {
      background-color: var(--color-surface-800);
    }

    th, td {
      padding: calc(var(--spacing) * 2);
      text-align: center;
      border: 1px solid var(--color-surface-200);

      @media (prefers-color-scheme: dark) {
        border-color: var(--color-surface-400);
      }
    }

    th {
      background-color: var(--color-surface-100);
      font-weight: 600;

      @media (prefers-color-scheme: dark) {
        background-color: var(--color-surface-900);
      }
    }

    td:first-child {
      text-align: left;
      font-weight: 500;
    }
  }

  .runs-cell {
    font-weight: var(--font-weight-extrabold);
  }
</style>
