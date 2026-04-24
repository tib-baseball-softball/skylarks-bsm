<script lang="ts">
  // @ts-ignore
  import { Tabs } from "bits-ui";
  import LeagueChartGraph from "$lib/tib/components/favorite/LeagueChartGraph.svelte";
  import StreakContainer from "$lib/tib/components/favorite/StreakContainer.svelte";
  import WinningPercentageContainer from "$lib/tib/components/favorite/WinningPercentageContainer.svelte";
  import type { HomeDataset } from "$lib/tib/types/HomeDataset.ts";

  interface Props {
    dataset: HomeDataset;
  }

  const { dataset }: Props = $props();

  let tabSet: "graph" | "percentage" | "series" | string = $state("percentage");
</script>

<div class="streak-graph-section">
  <Tabs.Root bind:value={tabSet}>
    <Tabs.List class="tabs-list preset-tonal-surface">
      <Tabs.Trigger class="tabs-trigger btn" value="graph">Graph</Tabs.Trigger>
      <Tabs.Trigger class="tabs-trigger btn" value="percentage"
        >Percentage
      </Tabs.Trigger>
      <Tabs.Trigger class="tabs-trigger btn" value="series"
        >Series
      </Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content class="panel" value="graph">
      <LeagueChartGraph table={dataset.table} />
    </Tabs.Content>

    <Tabs.Content class="panel" value="percentage">
      {#if dataset.table_row}
        <WinningPercentageContainer tableRow={dataset.table_row} />
      {:else}
        <p>No data available.</p>
      {/if}
    </Tabs.Content>

    <Tabs.Content class="panel" value="series">
      {#if dataset.table_row}
        <StreakContainer {dataset} />
      {:else}
        <p>No data available.</p>
      {/if}
    </Tabs.Content>
  </Tabs.Root>
</div>

<style>
  :global(.streak-graph-section .panel) {
    padding-top: calc(var(--spacing) * 4);
  }
</style>
