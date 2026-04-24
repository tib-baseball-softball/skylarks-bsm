<script lang="ts">
  import type {TableHandler} from "@vincjo/datatables";

  interface Props {
    handler: TableHandler;
  }

  let {handler}: Props = $props();
  const rowCount = $derived(handler.rowCount);
</script>

<aside>
  {#if rowCount.total > 0}
    <b>{rowCount.start}</b>
    - <b>{rowCount.end}</b>
    / <b>{rowCount.total}</b>
  {:else}
    No Elements found.
  {/if}
</aside>

<style>
  aside {
    font-size: var(--text-sm);
    margin-inline-end: calc(var(--spacing) * 6);
    line-height: calc(var(--spacing) * 8);
  }
</style>
