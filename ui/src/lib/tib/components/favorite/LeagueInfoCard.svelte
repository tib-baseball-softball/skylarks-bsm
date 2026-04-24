<script lang="ts">
  import GenericDetailRow from "$lib/dp/components/utils/GenericDetailRow.svelte";
  import {Crown, Hash, Percent, Sigma, Signpost} from "lucide-svelte";
  import type {LeagueGroup, TableRow} from "bsm.js";

  interface Props {
    leagueGroup: LeagueGroup;
    tableRow: TableRow;
  }

  let {leagueGroup, tableRow}: Props = $props();
</script>

<article class="card league-card preset-tonal shadow-xl">
  <GenericDetailRow
    categoryName="Acronym"
    rowValue={leagueGroup.acronym}
  >
    {#snippet icon()}
      <Signpost/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Record"
    rowValue={`${tableRow.wins_count} - ${tableRow.losses_count}`}
  >
    {#snippet icon()}
      <Sigma/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Pct."
    rowValue={tableRow.quota}
  >
    {#snippet icon()}
      <Percent/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Rank"
    rowValue={tableRow.rank}
  >
    {#snippet icon()}
      {#if tableRow.rank === "1."}
        <Crown class="stroke-primary-500"/>
      {:else }
        <Hash/>
      {/if}
    {/snippet}
  </GenericDetailRow>

</article>

<style>
  .league-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
