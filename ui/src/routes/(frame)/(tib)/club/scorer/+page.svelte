<script lang="ts">
  import type {PageProps} from "./$types";
  import LicenseList from "$lib/tib/components/club/licenses/LicenseList.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";

  let {data}: PageProps = $props();
</script>

<h1 class="h1 my-4!">Scorer Licenses</h1>

{#await data.scorerLicenses}
  <p>Loading Licenses...</p>
  <ProgressRing/>

{:then scorerLicenses}
  <LicenseList licenses={scorerLicenses} showSoftballSection={false}/>
{:catch error}
  <p>error loading: {error.message}</p>
{/await}
