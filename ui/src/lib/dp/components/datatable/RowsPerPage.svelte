<script lang="ts">
  import type {TableHandler} from "@vincjo/datatables";

  interface Props {
    handler: TableHandler;
  }

  let {handler}: Props = $props();
  const options = [5, 10, 20, 25, 50, 100];
</script>

<aside>
  Show
  <select class="select preset-outlined-primary-500" bind:value={handler.rowsPerPage}>
    {#each options as option}
      <option value={option}>
        {option}
      </option>
    {/each}
  </select>
</aside>

<style>
  aside {
    display: flex;
    place-items: center;

    select {
      margin-inline-start: calc(var(--spacing) * 2);
    }
  }
</style>
