<script lang="ts">
  import type {ClubFunction} from "bsm.js";
  import ClubOfficialRow from "$lib/tib/components/club/officials/ClubOfficialRow.svelte";

  interface Props {
    clubOfficials: ClubFunction[];
  }

  let {clubOfficials = []}: Props = $props();
</script>

<article class="officials-list-wrapper">
  <section>
    <ul class="card officials-card preset-tonal shadow-xl">

      {#each clubOfficials as clubOfficial, index}
        <li class="official-item">
          <a href="/club/officials/{clubOfficial.id}">
            <ClubOfficialRow {clubOfficial}/>
          </a>
        </li>

        {#if index + 1 < clubOfficials.length}
          <hr>
        {/if}
      {:else}
        <li class="official-item">
          <p>No club officials available.</p>
        </li>
      {/each}
    </ul>
  </section>
</article>

<style>
  .officials-list-wrapper {
    margin-bottom: calc(var(--spacing) * 4) !important;
  }

  .officials-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .official-item {
    padding: calc(var(--spacing) * 0.5);
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
