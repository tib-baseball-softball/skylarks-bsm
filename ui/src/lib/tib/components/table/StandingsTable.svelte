<script lang="ts">
  import type {Table} from "bsm.js";
  import {env} from "$env/dynamic/public";

  interface Props {
    table: Table;
  }

  let {table}: Props = $props();
</script>

<div class="table-wrap standings-table-wrap">
  <table class="table border">
    <thead class="standings-header">
    <tr class="preset-tonal-surface">
      <th>#</th>
      <th>Team</th>
      <th>W</th>
      <th>L</th>
      <th>Win %</th>
      <th>GB</th>
      <th>Serie</th>
    </tr>
    </thead>

    <tbody>
    {#each table?.rows ?? [] as row}
      <tr class:home-team-highlight={row.team_name.includes(env.PUBLIC_TEAM_NAME)}>
        <td>{row.rank}</td>
        <td>{row.team_name}</td>
        <td>{row.wins_count}</td>
        <td>{row.losses_count}</td>
        <td>{row.quota}</td>
        <td>{row.games_behind}</td>
        <td>{row.streak}</td>
      </tr>
    {/each}
    </tbody>
  </table>
</div>

<style>
  .standings-header {
    @media (prefers-color-scheme: dark) {
      color: var(--color-surface-contrast-500) !important;
    }
  }

  .home-team-highlight {
    color: var(--color-primary-600);

    @media (prefers-color-scheme: dark) {
      color: var(--color-primary-400);
    }
  }
</style>
