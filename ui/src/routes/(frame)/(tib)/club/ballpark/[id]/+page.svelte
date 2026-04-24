<script lang="ts">
  import type {PageProps} from "./$types";
  import BallparkDetailCard from "$lib/tib/components/club/ballpark/BallparkDetailCard.svelte";
  import BallparkTrafficCard from "$lib/tib/components/club/ballpark/BallparkTrafficCard.svelte";

  let {data}: PageProps = $props();
</script>

<h1 class="h1 page-title">Ballpark Details</h1>

<div class="ballpark-details-grid">
  <img alt="a baseball or softball field: {data.field.name}" class="ballpark-photo" loading="lazy"
       src="{data.field.photo_url}">

  <BallparkDetailCard field={data.field}/>

  <div class="traffic-section">
    <h2 class="h3 traffic-title">How to get there</h2>
    <BallparkTrafficCard field={data.field}/>
  </div>
</div>

<style>
    .page-title {
        margin-bottom: calc(var(--spacing) * 4);
    }

    .ballpark-details-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: calc(var(--spacing) * 4);
        
        @media (min-width: 48rem) {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        
        @media (min-width: 64rem) {
            gap: calc(var(--spacing) * 6);
        }
        
        @media (min-width: 80rem) {
            gap: calc(var(--spacing) * 8);
        }
    }

    .ballpark-photo {
        border-radius: var(--radius-base);
        width: 100%;
        height: auto;
    }

    .traffic-title {
        margin-bottom: calc(var(--spacing) * 2);
    }
</style>
