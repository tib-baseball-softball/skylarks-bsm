<script lang="ts">
  // @ts-ignore
  import {Tabs} from "bits-ui";
  import {TableHandler} from "@vincjo/datatables";
  import type {StatisticsData, StatisticsSummary} from "bsm.js";
  import {StatsType} from "bsm.js";
  import Pagination from "$lib/dp/components/datatable/Pagination.svelte";
  import RowCount from "$lib/dp/components/datatable/RowCount.svelte";
  import RowsPerPage from "$lib/dp/components/datatable/RowsPerPage.svelte";
  import Search from "$lib/dp/components/datatable/Search.svelte";
  import StatsContentRow from "$lib/tib/components/stats/StatsContentRow.svelte";
  import StatsTableContent from "$lib/tib/components/stats/StatsTableContent.svelte";
  import StatsBlock from "$lib/tib/components/stats/StatsBlock.svelte";
  import type {StatsDataset} from "$lib/tib/types/StatsDataset.ts";

  interface Props {
    data: StatsDataset;
    rowsPerPage?: number;
    tableType: "personal" | "seasonal";
  }

  const {data, rowsPerPage = 10, tableType}: Props = $props();

  let type: StatsType = $state(StatsType.batting);

  // svelte-ignore state_referenced_locally - manual state management with $effect
  let summaryData:
    | StatisticsSummary<"BattingStatistics" | "PitchingStatistics" | "FieldingStatistics">
    | undefined = $state(data.batting.summaries.at(0));

  const handler = $derived(
    new TableHandler<StatisticsData<"BattingStatistics" | "PitchingStatistics" | "FieldingStatistics">>
    (data.batting.data, {rowsPerPage: rowsPerPage})
  );

  function changeDataForHandler(type: StatsType) {
    switch (type) {
      case StatsType.batting:
        handler.setRows(data.batting.data);
        summaryData = data.batting.summaries.at(0);
        break;
      case StatsType.pitching:
        summaryData = data.pitching.summaries.at(0);
        handler.setRows(data.pitching.data);
        break;
      case StatsType.fielding:
        summaryData = data.fielding.summaries.at(0);
        handler.setRows(data.fielding.data);
        break;
    }
  }

  $effect.pre(() => {
    changeDataForHandler(type);
  });
</script>

<div class="table-wrap">
  <!-- Header -->
  <header class="table-header">
    <Search {handler}/>

    <div class="tabs-wrapper">
      <Tabs.Root bind:value={type}>
        <Tabs.List class="tabs-list">
          <Tabs.Trigger class="tabs-trigger btn flex-grow" value={StatsType.batting}>Batting</Tabs.Trigger>
          <Tabs.Trigger class="tabs-trigger btn flex-grow" value={StatsType.pitching}>Pitching</Tabs.Trigger>
          <Tabs.Trigger class="tabs-trigger btn flex-grow" value={StatsType.fielding}>Fielding</Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </div>

    <RowsPerPage {handler}/>
  </header>

  <div class="flex flex-col">
    <div class="stats preset-tonal-surface rounded-container">
      {#if summaryData}
        <StatsBlock row={summaryData} {type}/>
      {/if}
    </div>
  </div>

  <!-- Table -->
  <table class="table table-compact">
    <StatsTableContent {handler} {tableType} {type}/>

    <tfoot>
    {#if summaryData}
      <tr>
        <th>Total</th>

        <StatsContentRow {type} {tableType} row={summaryData}/>
      </tr>
    {/if}
    </tfoot>
  </table>
  <!-- Footer -->
  <footer>
    <RowCount {handler}/>
    <Pagination {handler}/>
  </footer>
</div>

<style>
  .stats {
    margin-top: 1rem !important;
    margin-bottom: 0.75rem !important;
  }

  @media (min-width: 1024px) {
    .stats {
      margin-top: 1.5rem !important;
      margin-bottom: 1rem !important;
    }
  }

  /* ugly hack to prevent table overflow */
  @media (min-width: 1400px) and (max-width: 1800px) {
    .table-wrap {
      max-width: 90%;
    }
  }

  footer {
    display: flex;
    justify-content: space-between;
  }

  .tabs-wrapper {
    border: 1px solid var(--color-primary-500);
    border-radius: var(--radius-container);
  }
</style>
