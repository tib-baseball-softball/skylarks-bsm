<script lang="ts">
  import type {Field} from "bsm.js";
  import {Building2, LandPlot, Link, MapPin} from "lucide-svelte";
  import {MapUtility} from "$lib/dp/service/MapUtility.ts";

  type DisplayedLocation = Omit<
    Field,
    | "created_at"
    | "updated_at"
    | "description_html"
    | "other_information_html"
    | "groundrules_html"
    | "id"
  >

  interface Props {
    field: DisplayedLocation;
    classes?: string;
    showDividers?: boolean;
  }

  const {
    field,
    classes = "",
    showDividers = true,
  }: Props = $props();

  const googleMapsLink = $derived(
    MapUtility.buildGoogleMapsURL(field.address_addon, field.latitude, field.longitude, {
      street: field.street,
      postalCode: field.postal_code,
      city: field.city,
    })
  );
  const appleMapsLink = $derived(
    MapUtility.buildAppleMapsURL(field.address_addon, field.latitude, field.longitude)
  );
</script>

<div class="location-card card {classes}">
  <div class="location-row">
    <LandPlot/>
    <div>
      <p>{field.address_addon} ({field?.name})</p>
      <p class="location-label">Ballpark</p>
    </div>
  </div>

  <hr class="divider" class:hidden={!showDividers}/>

  <div class="location-row">
    <MapPin/>
    <div>
      <p>{field.street}</p>
      <p class="location-label">Address</p>
    </div>
  </div>

  <hr class="divider" class:hidden={!showDividers}/>

  <div class="location-row">
    <Building2/>
    <div>
      <p>{field.postal_code} {field.city}</p>
      <p class="location-label">City</p>
    </div>
  </div>

  <hr class="divider" class:hidden={!showDividers}/>

  <div class="location-row link-row">
    <Link/>
    <a class="anchor" href={googleMapsLink} target="_blank"
    >Open in Google Maps</a
    >
  </div>

  {#if field.latitude && field.longitude}
    <hr class="divider" class:hidden={!showDividers}/>

    <div class="location-row link-row">
      <Link/>
      <a class="anchor" href={appleMapsLink} target="_blank">Open in Apple Maps</a
      >
    </div>
  {/if}
</div>

<style>
  .location-card {
    display: flex;
    flex-direction: column;
    padding: calc(var(--spacing) * var(--location-padding));
    gap: calc(var(--spacing) * var(--location-spacing));
  }

  .location-row {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .location-label {
    font-size: var(--text-sm);
    font-weight: 300;
  }

  p {
    margin-block: 0;
  }

  .divider {
    margin-block: calc(var(--spacing) * 4);
  }
</style>
