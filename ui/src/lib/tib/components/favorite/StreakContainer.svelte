<script lang="ts">
  import StreakEmoji from "$lib/tib/components/favorite/StreakEmoji.svelte";
  import WinsOverSeasonChart from "$lib/tib/components/favorite/WinsOverSeasonChart.svelte";
  import type {HomeDataset} from "$lib/tib/types/HomeDataset.ts";

  interface Props {
    dataset: HomeDataset;
  }

  const {dataset}: Props = $props();
</script>

<section>
  <WinsOverSeasonChart streakData={dataset?.streak_data ?? []}/>
</section>

{#if dataset.table_row}
  <section>
    <StreakEmoji streak={dataset.table_row.streak}/>
  </section>
{/if}

<style>
  section {
    margin-block-start: calc(var(--spacing) * 6) !important;
  }
</style>
