<script lang="ts">
  import type {TableHandler} from "@vincjo/datatables";

  interface Props {
    handler: TableHandler;
    orderBy: string;
    children?: import("svelte").Snippet;
  }

  let {handler, orderBy, children}: Props = $props();

  const sort = $derived(handler.createSort(orderBy));
</script>

<th onclick={() => sort.set()}>
  <div class="th-sort-container">
    {@render children?.()}
  </div>
</th>

<style>
  th {
    cursor: pointer;
    -webkit-user-select: none;
    user-select: none;

    .th-sort-container {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: start;
      row-gap: calc(var(--spacing) * 2);
    }
  }
</style>
