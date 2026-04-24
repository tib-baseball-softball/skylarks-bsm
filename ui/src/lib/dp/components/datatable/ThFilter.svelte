<script lang="ts">
  import type {TableHandler} from "@vincjo/datatables";

  interface Props {
    handler: TableHandler;
    filterBy: string;
  }

  let {handler, filterBy}: Props = $props();
  const filter = $derived(handler.createFilter(filterBy));
</script>

<th>
  <input
    class="input preset-outlined-primary-500"
    type="text"
    placeholder="Filter..."
    bind:value={filter.value}
    oninput={() => {
			if (filterBy) filter.set();
		}}
  />
</th>

<style>
  input {
    font-size: var(--text-sm);
    width: 100%;
  }
</style>
