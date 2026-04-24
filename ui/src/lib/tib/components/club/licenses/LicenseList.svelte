<script lang="ts">
  import type {License} from "bsm.js";
  import LicenseRow from "$lib/tib/components/club/licenses/LicenseRow.svelte";

  interface Props {
    licenses: License[];
    showSoftballSection: boolean;
  }

  let {licenses, showSoftballSection}: Props = $props();
  let baseballLicenses = $derived(licenses.filter((license) => license.baseball === true));
  let softballLicenses = $derived(licenses.filter((license) => license.softball === true));
</script>

<article class="license-list-wrapper">
  <section class="license-section">
    {#if showSoftballSection}
      <header class="section-header">
        <h2 class="h2">Baseball</h2>
      </header>
    {/if}

    <ul class="card license-card preset-tonal shadow-xl">

      {#each baseballLicenses as license, index}
        <li class="license-item">
          <LicenseRow {license}/>
        </li>

        {#if index + 1 < baseballLicenses.length}
          <hr>
        {/if}
      {:else}
        <li class="license-item">
          <p>No baseball licenses available.</p>
        </li>
      {/each}
    </ul>
  </section>

  {#if showSoftballSection}
    <section class="license-section">
      <header class="section-header">
        <h2 class="h2">Softball</h2>
      </header>

      <ul class="card license-card preset-tonal shadow-xl">

        {#each softballLicenses as license, index}
          <li class="license-item">
            <LicenseRow {license}/>
          </li>

          {#if index + 1 < softballLicenses.length}
            <hr>
          {/if}
        {:else}
          <li class="license-item">
            <p>No softball licenses available.</p>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</article>

<style>
  .license-list-wrapper {
    margin-bottom: calc(var(--spacing) * 4) !important;
  }

  .license-section {
    margin-top: calc(var(--spacing) * 5);
  }

  .section-header {
    margin-bottom: calc(var(--spacing) * 2);
  }

  .license-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .license-item {
    padding: calc(var(--spacing) * 0.5);
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
