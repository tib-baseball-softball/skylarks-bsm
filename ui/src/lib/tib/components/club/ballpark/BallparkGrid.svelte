<script lang="ts">
  import type {Field} from "bsm.js";

  interface Props {
    fields: Field[];
  }

  let {fields}: Props = $props();
</script>

<div class="ballpark-grid">
  {#each fields as field}
    <a href="/club/ballpark/{field.id}">
      <article class="card ballpark-card preset-tonal shadow-xl">
        <img class="ballpark-thumb" width="80" height="80" loading="lazy" src="{field.photo_url}"
             alt="a baseball or softball field: {field.name}">
        <p class="ballpark-name">
          {field.name}
        </p>
      </article>
    </a>
  {:else}
    <p>No ballparks found.</p>
  {/each}
</div>

<style>
  .ballpark-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(var(--spacing) * 3);

    @media (min-width: 48rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: calc(var(--spacing) * 4);
    }
  }

  .ballpark-card {
    padding: calc(var(--spacing) * 3);
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .ballpark-thumb {
    border-radius: var(--radius-base);
  }
</style>
