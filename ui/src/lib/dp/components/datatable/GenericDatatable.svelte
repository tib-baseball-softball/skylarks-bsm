<script lang="ts">
  import {type TableHandler} from "@vincjo/datatables";
  import type {Snippet} from "svelte";
  import Search from "$lib/dp/components/datatable/Search.svelte";
  import RowsPerPage from "$lib/dp/components/datatable/RowsPerPage.svelte";
  import ThSort from "$lib/dp/components/datatable/ThSort.svelte";
  import ThFilter from "$lib/dp/components/datatable/ThFilter.svelte";
  import RowCount from "$lib/dp/components/datatable/RowCount.svelte";
  import type {FilterSortOptions} from "$lib/dp/types/FilterSortOptions.ts";
  import Pagination from "$lib/dp/components/datatable/Pagination.svelte";

  type showInHeader = "filter" | "sort" | "all"

  interface Props {
    handler: TableHandler;
    filterSortOptions?: FilterSortOptions;
    showInHeader?: showInHeader;
    contentRows: Snippet;
    additionalFilters?: Snippet;
    additionalSort?: Snippet;
    caption?: string;
  }

  let {
    handler,
    filterSortOptions = {},
    showInHeader = "all",
    contentRows,
    additionalFilters,
    additionalSort,
    caption = "",
  }: Props = $props();

  let filters = $derived(filterSortOptions);
  let sorting = $derived(filterSortOptions);
</script>

<div class="table-wrap">
  <!-- Header -->
  <header class="table-header">
    <Search {handler}/>
    <RowsPerPage {handler}/>
  </header>

  <!-- Table -->
  <table class="table table-compact">
    {#if caption}
      <caption class="sr-only">{caption}</caption>
    {/if}

    <thead>
    {#if showInHeader === "all" || showInHeader === "sort"}
      <tr class="sticky preset-filled-surface-200-800">
        {#each Object.entries(sorting) as sort}
          <ThSort {handler} orderBy={sort[0]}>
            {sort[1].displayName}
          </ThSort>
        {/each}
        {@render additionalSort?.()}
      </tr>
    {/if}

    {#if showInHeader === "all" || showInHeader === "filter"}
      <tr class="sticky preset-filled-surface-200-800">
        {#each Object.entries(filters) as filter}
          <ThFilter {handler} filterBy={filter[0]}/>
        {/each}
        {@render additionalFilters?.()}
      </tr>
    {/if}
    </thead>

    <tbody>
    {@render contentRows()}
    </tbody>
  </table>

  <!-- Footer -->
  <footer class="table-footer">
    <RowCount {handler}/>
    <Pagination {handler}/>
  </footer>
</div>
