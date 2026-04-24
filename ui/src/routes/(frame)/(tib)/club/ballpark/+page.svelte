<script lang="ts">
  import type {PageProps} from "./$types";
  import BallparkGrid from "$lib/tib/components/club/ballpark/BallparkGrid.svelte";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";

  let {data}: PageProps = $props();
</script>

<h1 class="h1">Ballpark</h1>


{#await data.fields}
  <p>Loading Club Officials...</p>
  <ProgressRing/>

{:then fields}
  <BallparkGrid fields={fields}/>
{:catch error}
  <p>error loading: {error.message}</p>
{/await}
