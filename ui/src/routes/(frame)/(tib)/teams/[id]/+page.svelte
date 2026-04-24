<script lang="ts">
  import type { Team } from "bsm.js";
  import BaseballStatsDatatable from "$lib/tib/components/stats/BaseballStatsDatatable.svelte";
  import TeamPlayerSection from "$lib/dp/components/player/TeamPlayerSection.svelte";
  import StandingsTable from "$lib/tib/components/table/StandingsTable.svelte";
  import TeamDetailInfoCard from "$lib/tib/components/team/TeamDetailInfoCard.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";
  import type { StatsDataset } from "$lib/tib/types/StatsDataset.ts";
  import type { PageProps } from "./$types";

  const { data }: PageProps = $props();
  const clubTeam = $derived(data.clubTeam as Team);

  async function getData(): Promise<StatsDataset> {
    return {
      batting: await data.battingStats!,
      pitching: await data.pitchingStats!,
      fielding: await data.fieldingStats!,
    };
  }
</script>

<h1 class="h1 page-title">{clubTeam.name} (Saison {clubTeam.season})</h1>

<section class="info-section">
  <h2 class="h2">Information</h2>

  <TeamDetailInfoCard {clubTeam} />
</section>

<section class="standings-section">
  <h2 class="h2">Standings</h2>

  {#await data?.table}
    <ProgressRing />
  {:then table}
    {#if table}
      <div class="standings-container">
        <StandingsTable {table} />
      </div>
    {:else}
      <div class="no-data">No Standings available.</div>
    {/if}
  {:catch error}
    <p>error loading: {error.message}</p>
  {/await}
</section>

<section class="players-section" data-testid="team-players-section">
  <h2 class="h2">Players</h2>

  {#await data.players}
    <ProgressRing />
  {:then players}
    {#if Array.isArray(players)}
      <TeamPlayerSection {players} />
    {:else}
      <p>No Players found for this team.</p>
    {/if}
  {:catch error}
    <p>error loading: {error.message}</p>
  {/await}
</section>

<section class="stats-section">
  <h2 class="h2">Stats</h2>
  {#await getData()}
    <ProgressRing />
  {:then stats}
    {#if stats.batting && stats.pitching && stats.fielding}
      <BaseballStatsDatatable data={stats} tableType="personal" />
    {/if}
  {:catch error}
    <p>error loading: {error.message}</p>
  {/await}
</section>

<style>
  .page-title {
    margin-block: calc(var(--spacing) * 4);
  }

  h2 {
    margin-bottom: calc(var(--spacing) * 3);
  }

  .info-section {
    margin-block: calc(var(--spacing) * 10);

    @media (min-width: 64rem) {
      max-width: 50%;
    }
  }

  .standings-section,
  .players-section {
    margin-block: calc(var(--spacing) * 10);
  }

  .stats-section {
    margin-top: calc(var(--spacing) * 10);
    margin-bottom: calc(var(--spacing) * 4);
  }

  /* prevent table overflow */
  @media (min-width: 1400px) and (max-width: 1800px) {
    .standings-container {
      max-width: 90%;
    }
  }
</style>
