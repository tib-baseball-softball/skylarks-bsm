<script lang="ts">
  import type {PageProps} from "./$types";
  import LicenseList from "$lib/tib/components/club/licenses/LicenseList.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";

  let {data}: PageProps = $props();
</script>

<h1 class="h1 my-4!">Umpire Licenses</h1>

{#await data.umpireLicenses}
  <p>Loading Licenses...</p>
  <ProgressRing/>

{:then umpireLicenses}
  <LicenseList licenses={umpireLicenses} showSoftballSection={true}/>
{:catch error}
  <p>error loading: {error.message}</p>
{/await}
