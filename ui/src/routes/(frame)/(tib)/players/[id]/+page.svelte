<script lang="ts">
  import BaseballStatsDatatable from "$lib/tib/components/stats/BaseballStatsDatatable.svelte";
  import PlayerDataCard from "$lib/dp/components/player/PlayerDataCard.svelte";
  import PlayerHeaderSection from "$lib/dp/components/player/PlayerHeaderSection.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";
  import type {StatsDataset} from "$lib/tib/types/StatsDataset.ts";
  import type {PageProps} from "./$types";

  const {data}: PageProps = $props();

  async function getData(): Promise<StatsDataset> {
    return {
      batting: await data.battingStats!,
      pitching: await data.pitchingStats!,
      fielding: await data.fieldingStats!,
    };
  }
</script>

{#await data.battingStats then batting}
  <h1 class="h1 page-title">
    Player Profile for {batting.person?.first_name}
    {batting.person?.last_name}
  </h1>
{/await}

{#await data.player}
  <ProgressRing/>
{:then player}
  {#if player}
    <div class="profile-section">
      <h2 class="h2 profile-title">Profile Data</h2>
      <section class="profile-grid">
        <PlayerHeaderSection {player}/>
        <PlayerDataCard {player}/>
      </section>
    </div>
  {/if}
{:catch error}
  <p>An error occurred fetching player data: {error.message}.<br>
    The data source might be temporarily unavailable, please try again later.</p>
{/await}

<h2 class="h2 stats-title">Stats</h2>

{#await getData()}
  <ProgressRing/>
{:then stats}
  <BaseballStatsDatatable data={stats} tableType="seasonal"/>
{:catch error}
  <p>error loading: {error.message}</p>
{/await}

<style>
    .page-title {
        margin-block: calc(var(--spacing) * 4);
    }

    .profile-section {
        margin-block: calc(var(--spacing) * 8);
    }

    .profile-title {
        margin-block: calc(var(--spacing) * 4);
    }

    .profile-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: calc(var(--spacing) * 3);
        
        @media (min-width: 48rem) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: calc(var(--spacing) * 4);
        }
    }

    .stats-title {
        margin-top: calc(var(--spacing) * 6);
        margin-bottom: calc(var(--spacing) * 8);
        
        @media (min-width: 64rem) {
            margin-top: calc(var(--spacing) * 10);
        }
    }
</style>
