<script lang="ts">
  import type {PageProps} from "./$types";
  import ClubOfficialsList from "$lib/tib/components/club/officials/ClubOfficialsList.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";

  let {data}: PageProps = $props();
</script>

<h1 class="h1 my-5!">Club Officials</h1>


{#await data.clubOfficials}
  <p>Loading Club Officials...</p>
  <ProgressRing/>

{:then clubOfficials}
  <ClubOfficialsList clubOfficials={clubOfficials}/>
{:catch error}
  <p>error loading: {error.message}</p>
{/await}
