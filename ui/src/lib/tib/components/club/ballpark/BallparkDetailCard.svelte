<script lang="ts">
  import type {Field} from "bsm.js";
  import {Diamond, Info, MapPin, Ticket, Users} from "lucide-svelte";
  import GenericDetailRow from "$lib/dp/components/utils/GenericDetailRow.svelte";
  import {MapUtility} from "$lib/dp/service/MapUtility.ts";

  interface Props {
    field: Field;
  }

  const {field}: Props = $props();

  const mapsLink = $derived(
    MapUtility.buildGoogleMapsURL(field?.name, field?.latitude, field?.longitude)
  );
</script>

<article class="card ballpark-detail-card preset-tonal shadow-xl">
  <GenericDetailRow categoryName="Ballpark Name" rowValue={field.name}>
    {#snippet icon()}
      <div class="primary-icon">
        <Diamond/>
      </div>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow categoryName="Address Addon" rowValue={field.address_addon}>
    {#snippet icon()}
      <Info/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow categoryName="Capacity" rowValue={field.spectator_total}>
    {#snippet icon()}
      <Users/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow categoryName="Seats" rowValue={field.spectator_seats}>
    {#snippet icon()}
      <Ticket/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <div class="address-container">
    <div class="tertiary-icon">
      <MapPin/>
    </div>
    <dl class="address-details">
      <dt><strong class="address-label">Address:</strong></dt>
      <dd>
        <a class="anchor" href="{mapsLink}" target="_blank">
          {field.street}, {field.postal_code} {field.city}
        </a>
      </dd>
    </dl>
  </div>

</article>

<style lang="postcss">
  .ballpark-detail-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .primary-icon {
    color: var(--color-primary-500);
  }

  .tertiary-icon {
    color: var(--color-secondary-500);

    @media (prefers-color-scheme: dark) {
      color: var(--color-tertiary-500);
    }
  }

  .address-container {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .address-details {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .address-label {
    font-weight: var(--font-weight-bold);
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
