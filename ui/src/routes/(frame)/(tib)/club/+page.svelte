<script lang="ts">
  import ClubInfoSection from "$lib/tib/components/club/ClubInfoSection.svelte";
  import ClubGridItem from "$lib/tib/components/club/ClubGridItem.svelte";
  import type {PageProps} from "./$types";
  import {BookText, Diamond, Pencil, Users} from "lucide-svelte";

  let {data}: PageProps = $props();
</script>

<h1 class="h1 page-title">Club</h1>

<!-- Club Info Section -->
<ClubInfoSection club={data.bsmClubData}/>

<!-- Grid Section -->
<div class="club-grid">
  <ClubGridItem
    description="More Info"
    href="/club/details"
    label="Details"
  >
    {#snippet icon()}
      <BookText/>
    {/snippet}
  </ClubGridItem>

  <ClubGridItem
    description="Adult and Youth"
    href="/teams"
    label="Teams"
  >
    {#snippet icon()}
      <Users/>
    {/snippet}
  </ClubGridItem>

  <ClubGridItem
    description="Keeping statistics"
    href="/club/scorer"
    label="Scorer"
  >
    {#snippet icon()}
      <Pencil/>
    {/snippet}
  </ClubGridItem>

  <ClubGridItem
    description="Our Referees"
    href="/club/umpire"
    label="Umpire"
  >
    {#snippet icon()}
      <Users/>
    {/snippet}
  </ClubGridItem>

  <ClubGridItem
    description="The Lark's Nest"
    href="/club/ballpark"
    label="Ballpark"
  >
    {#snippet icon()}
      <Diamond/>
    {/snippet}
  </ClubGridItem>

  <ClubGridItem
    description="Club Administration"
    href="/club/officials"
    label="Officials"
  >
    {#snippet icon()}
      <Users/>
    {/snippet}
  </ClubGridItem>
</div>

<style>
    .page-title {
        margin-bottom: calc(var(--spacing) * 4);
    }

    .club-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: calc(var(--spacing) * 4);
        margin-bottom: calc(var(--spacing) * 4);
        
        @media (min-width: 48rem) {
            grid-template-columns: repeat(3, 1fr);
        }
        
        @media (min-width: 64rem) {
            gap: calc(var(--spacing) * 6);
        }
    }
</style>
