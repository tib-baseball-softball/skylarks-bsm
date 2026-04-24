<script lang="ts">
  import type {TableHandler} from "@vincjo/datatables";

  interface Props {
    handler: TableHandler;
  }

  let {handler}: Props = $props();
  const search = $derived(handler.createSearch());
</script>

<input
  class="input preset-outlined-primary-500"
  type="search"
  placeholder="Search..."
  bind:value={search.value}
  oninput={() => search.set()}
/>

<style>
  input {
    width: calc(var(--spacing) * 32);

    @media (min-width: 40rem) {
      width: calc(var(--spacing) * 64);
    }
  }
</style>
