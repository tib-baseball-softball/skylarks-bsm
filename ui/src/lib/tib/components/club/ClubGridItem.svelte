<script lang="ts">
  import type {Snippet} from "svelte";

  interface Props {
    href: string;
    icon: Snippet;
    label: string;
    description: string;
  }

  let {href, icon, label, description}: Props = $props();
</script>

<a
  class="card club-grid-item preset-tonal shadow-xl"
  href={href}
>
  <article>
    {@render icon()}
    <h3 class="item-label h4">{label}</h3>
    <p class="item-description">{description}</p>
  </article>
</a>

<style>
  .club-grid-item {
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 4);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .item-label {
    margin-top: calc(var(--spacing) * 2);
    font-weight: 600;
  }

  .item-description {
    font-weight: 300;
  }
</style>
