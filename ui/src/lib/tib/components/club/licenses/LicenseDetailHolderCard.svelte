<script lang="ts">
  import type {License} from "bsm.js";
  import {Calendar1, CalendarClock, Hash, User} from "lucide-svelte";
  import GenericDetailRow from "$lib/dp/components/utils/GenericDetailRow.svelte";
  import {DateTimeUtility} from "$lib/dp/service/DateTimeUtility.ts";

  interface Props {
    license: License;
  }

  const {license}: Props = $props();
  const expiryDate = $derived(new Date(license.valid_until));
</script>

<article class="card license-holder-card preset-tonal shadow-xl">
  <GenericDetailRow
    categoryName="Holder"
    rowValue={`${license?.person.first_name} ${license?.person.last_name}`}
  >
    {#snippet icon()}
      <User/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Number"
    rowValue={license.number}
  >
    {#snippet icon()}
      <Hash/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Valid until"
    rowValue={expiryDate.toLocaleDateString()}
  >
    {#snippet icon()}
      <Calendar1/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Relative Time"
    rowValue={DateTimeUtility.getRelativeTimeString(expiryDate)}
  >
    {#snippet icon()}
      <CalendarClock/>
    {/snippet}
  </GenericDetailRow>

</article>

<style>
  .license-holder-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
