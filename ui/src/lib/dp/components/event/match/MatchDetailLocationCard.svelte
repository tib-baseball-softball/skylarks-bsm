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
    MapUtility.buildGoogleMapsURL(field.address_addon, field.latitude, field.longitude)
  );
  const appleMapsLink = $derived(
    MapUtility.buildAppleMapsURL(field.address_addon, field.latitude, field.longitude)
  );
</script>

<div class="location-card {classes}">
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

  <hr class="divider" class:hidden={!showDividers}/>

  <div class="location-row link-row">
    <Link/>
    <a class="anchor" href={appleMapsLink} target="_blank">Open in Apple Maps</a
    >
  </div>
</div>

<style>
  .location-card {
    display: flex;
    flex-direction: column;
    padding: calc(var(--spacing) * var(--location-padding));
    border-radius: var(--radius-base);
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

  .divider {
    margin-block: calc(var(--spacing) * 2);
    border: 0;
    border-top: 1px solid var(--color-surface-200);

    @media (prefers-color-scheme: dark) {
      border-color: var(--color-surface-700);
    }

    &.hidden {
      display: none;
    }
  }
</style>
