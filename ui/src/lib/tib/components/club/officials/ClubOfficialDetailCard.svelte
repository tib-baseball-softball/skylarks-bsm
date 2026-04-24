<script lang="ts">
  import GenericDetailRow from "$lib/dp/components/utils/GenericDetailRow.svelte";
  import type {ClubFunction} from "bsm.js";
  import ClubOfficialIcon from "$lib/tib/components/club/officials/ClubOfficialIcon.svelte";
  import {Calendar, Diamond, Mail, Tag} from "lucide-svelte";

  interface Props {
    clubOfficial: ClubFunction;
  }

  let {clubOfficial}: Props = $props();

  const admissionDate = $derived(new Date(clubOfficial.admission_date));
</script>

<article class="card official-detail-card preset-tonal shadow-xl">
  <GenericDetailRow
    categoryName="Title"
    rowValue={clubOfficial.function}
  >
    {#snippet icon()}
      <ClubOfficialIcon {clubOfficial}/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Category"
    rowValue={clubOfficial.category}
  >
    {#snippet icon()}
      <Tag/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Name"
    rowValue={`${clubOfficial.person.last_name}, ${clubOfficial.person.first_name}`}
  >
    {#snippet icon()}
      <Diamond/>
    {/snippet}
  </GenericDetailRow>

  <hr>

  <GenericDetailRow
    categoryName="Since"
    rowValue={admissionDate.toLocaleDateString()}
  >
    {#snippet icon()}
      <Calendar/>
    {/snippet}
  </GenericDetailRow>

</article>

<article class="card official-contact-card preset-tonal shadow-xl">
  <a class="anchor" href="mailto:{clubOfficial.mail}">
    <GenericDetailRow
      categoryName="Contact"
      rowValue={clubOfficial.mail}
    >
      {#snippet icon()}
        <Mail/>
      {/snippet}
    </GenericDetailRow>
  </a>
</article>

<style>
  .official-detail-card, .official-contact-card {
    padding: calc(var(--spacing) * 3);
    margin-bottom: 1.5rem;

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
