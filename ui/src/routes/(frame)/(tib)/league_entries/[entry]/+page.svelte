<script lang="ts">
  import BaseballStatsDatatable from "$lib/tib/components/stats/BaseballStatsDatatable.svelte";
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

<h1 class="h1 mb-6!">Stats for {data.teamName ?? "Team"}</h1>
<section class="my-2 mb-4!">
  {#await getData()}
    <ProgressRing/>
  {:then stats}
    {#if stats.batting && stats.pitching && stats.fielding}
      <BaseballStatsDatatable data={stats} tableType="personal"/>
    {/if}
  {:catch error}
    <p>error loading: {error.message}</p>
  {/await}
</section>
