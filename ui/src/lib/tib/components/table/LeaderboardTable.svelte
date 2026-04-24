<script lang="ts">
  import {LeaderboardUtility} from "$lib/tib/service/LeaderboardUtility.ts";
  import type {LeaderboardData} from "$lib/tib/types/LeaderboardData.ts";

  interface Props {
    data: LeaderboardData;
  }

  const {data}: Props = $props();

  const statName = $derived(LeaderboardUtility.getHumanReadableStatName(data.stats_category));
</script>

<section class="leaderboard-section">
  <header class="leaderboard-header">
    <h3 class="h3">{statName}</h3>
  </header>

  <div class="leaderboard-table-wrap">
    <table class="table table-compact">
      <thead>
      <tr>
        <th class="table-cell-fit">#</th>
        <th>Name</th>
        <th class="table-cell-fit">Value</th>
      </tr>
      </thead>

      <tbody>
      {#each data.data as dataset}
        <tr>
          <td class="table-cell-fit">{dataset.rank}</td>
          <td>{dataset.person.first_name} {dataset.person.last_name}
          </td>
          <td class="table-cell-fit">{dataset.value}</td>
        </tr>
      {/each}
      </tbody>
    </table>
  </div>
</section>

<style>
  .leaderboard-header {
    margin-bottom: calc(var(--spacing) * 2);
  }

  .leaderboard-table-wrap {
    @media (prefers-color-scheme: dark) {
      border: 2px solid var(--color-surface-500);
    }
  }
</style>
