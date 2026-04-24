<script lang="ts">
  import type {PageProps} from "./$types";
  import ClubDetailSection from "$lib/tib/components/club/ClubDetailSection.svelte";
  import {Info, MapPinHouse, Section, Trophy} from "lucide-svelte";

  let {data}: PageProps = $props();
</script>

<h1 class="h1">Club Details</h1>

<ClubDetailSection title="Team Basics">
  {#snippet icon()}
    <Info/>
  {/snippet}

  <div class="logo-box">
    <img
      alt="Skylarks Logo"
      src="/icon_dp.svg"
    />
  </div>

  <div>
    <p><strong>Name:</strong> {data.bsmClubData?.name}</p>
    <p><strong>Acronym:</strong> {data.bsmClubData?.acronym} /
      0{data.bsmClubData?.organization_id} {data.bsmClubData?.number}</p>
    <p><strong>Main Club:</strong> {data.bsmClubData?.main_club}</p>
  </div>
</ClubDetailSection>

<ClubDetailSection title="Achievements">
  {#snippet icon()}
    <Trophy/>
  {/snippet}

  <p>{data.bsmClubData?.successes}</p>
</ClubDetailSection>

<ClubDetailSection title="Legal Info">
  {#snippet icon()}
    <Section/>
  {/snippet}

  <p><strong>Chairman:</strong> {data.bsmClubData?.chairman}</p>
  <p><strong>Registered Association:</strong> {data.bsmClubData?.registered_association}</p>
  <p><strong>Court:</strong> {data.bsmClubData?.court}</p>
</ClubDetailSection>

<ClubDetailSection title="Location">
  {#snippet icon()}
    <MapPinHouse/>
  {/snippet}

  <p><strong>Address:</strong> {data.bsmClubData?.address_addon}</p>
  <p><strong>Street:</strong> {data.bsmClubData?.street}, {data.bsmClubData?.postal_code} {data.bsmClubData?.city}
    , {data.bsmClubData?.country}</p>
</ClubDetailSection>

<style>
  .logo-box {
    display: flex;
    justify-content: center;
  }

  img {
    width: 6rem;
  }
</style>
