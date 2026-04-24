<script lang="ts">
  import type {PageProps} from "./$types";
  import LicenseDetailCard from "$lib/tib/components/club/licenses/LicenseDetailCard.svelte";
  import LicenseDetailHolderCard from "$lib/tib/components/club/licenses/LicenseDetailHolderCard.svelte";

  let {data}: PageProps = $props();
</script>

<h1 class="h1">License Details</h1>

{#if data.license}
  <LicenseDetailCard license={data.license}/>
  <LicenseDetailHolderCard license={data.license}/>
{:else }
  <p>No license data due to error.</p>
{/if}

