<script lang="ts">
  import type {Match} from "bsm.js";
  import CurrentMatchRow from "$lib/tib/components/match/CurrentMatchRow.svelte";
  import ProgressRing from "$lib/dp/components/utils/ProgressRing.svelte";

  interface Props {
    matches: Promise<Match[]>;
  }

  let {matches}: Props = $props();
</script>

{#await matches}
  <p>Loading matches...</p>
  <ProgressRing/>
{:then results}
  <section>
    {#each results as match}
      <CurrentMatchRow {match}/>
    {/each}

    {#if results.length === 0}
      <p>No games for this timeframe.</p>
    {/if}
  </section>

{:catch error}
  <p>error loading matches: {error.message}</p>
{/await}

<style>
  section {
    display: grid;
    grid-template-rows: repeat(5, minmax(0, 1fr));
    grid-template-columns: 1fr;
    row-gap: calc(var(--spacing) * 2);

    @media (min-width: 48rem) {
      grid-template-columns: 1fr 1fr;
      grid-auto-flow: column;
    }
  }
</style>
