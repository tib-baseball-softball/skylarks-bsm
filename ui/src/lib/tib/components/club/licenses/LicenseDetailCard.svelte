<script lang="ts">
  import type {License} from "bsm.js";
  import LicenseLevelIndicator from "$lib/tib/components/club/licenses/LicenseLevelIndicator.svelte";
  import {Shirt} from "lucide-svelte";
  import GenericDetailRow from "$lib/dp/components/utils/GenericDetailRow.svelte";

  interface Props {
    license: License;
  }

  let {license}: Props = $props();
</script>

<article class="card license-detail-card preset-tonal shadow-xl">
  <GenericDetailRow
    categoryName="Level"
    rowValue={license?.level ?? ""}
  >
    {#snippet icon()}
      <LicenseLevelIndicator level={license?.level ?? ""}/>
    {/snippet}
  </GenericDetailRow>

  {#if license?.baseball}
    <hr>
    <GenericDetailRow
      categoryName="Baseball"
      rowValue={"yes"}
    >
      {#snippet icon()}
        <div class="emoji-icon">⚾️</div>
      {/snippet}
    </GenericDetailRow>

  {/if}

  {#if license?.softball}
    <hr>
    <GenericDetailRow
      categoryName="Softball"
      rowValue={"yes"}
    >
      {#snippet icon()}
        <div class="emoji-icon">🥎</div>
      {/snippet}
    </GenericDetailRow>
  {/if}

  {#if license?.sleeve_number}
    <hr>
    <GenericDetailRow
      categoryName="Sleeve Number"
      rowValue={license?.sleeve_number ?? ""}
    >
      {#snippet icon()}
        <Shirt/>
      {/snippet}
    </GenericDetailRow>
  {/if}

</article>

<style>
  .license-detail-card {
    padding: calc(var(--spacing) * 3);
    margin-bottom: 1.5rem;

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .emoji-icon {
    margin-left: calc(var(--spacing) * 1);
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
