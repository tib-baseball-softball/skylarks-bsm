<script lang="ts">
  import type {Team} from "bsm.js";
  import GenericDetailRow from "$lib/dp/components/utils/GenericDetailRow.svelte";
  import {Calendar, Star, TableProperties} from "lucide-svelte";

  interface Props {
    clubTeam: Team;
  }

  let {clubTeam}: Props = $props();
</script>

<article class="card team-info-card preset-tonal shadow-xl">
  <GenericDetailRow
    categoryName="Name"
    rowValue={`${clubTeam.name} (${clubTeam.short_name})`}
  >
    {#snippet icon()}
      <Star class="fill-primary-500"/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="League"
    rowValue={clubTeam.league_entries.at(0)?.league?.name ?? ""}
  >
    {#snippet icon()}
      <TableProperties/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Season"
    rowValue={clubTeam.league_entries.at(0)?.league?.season ?? ""}
  >
    {#snippet icon()}
      <Calendar/>
    {/snippet}
  </GenericDetailRow>
</article>

<style>
  .team-info-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
