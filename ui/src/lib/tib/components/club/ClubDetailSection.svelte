<script lang="ts">
  import type {Snippet} from "svelte";

  interface Props {
    title: string;
    icon?: Snippet;
    children?: Snippet;
  }

  let {title, icon, children}: Props = $props();
</script>

<article class="card detail-section preset-tonal shadow-xl">
  <div class="header">
    {@render icon?.()}
    <h2 class="h2 title">{title}</h2>
  </div>
  {@render children?.()}
</article>

<style>
  .detail-section {
    padding: calc(var(--spacing) * 4);
    border-radius: var(--radius-base);
    margin-bottom: calc(var(--spacing) * 4);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .header {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
    margin-bottom: calc(var(--spacing) * 2);
  }

  .title {
    font-size: var(--text-lg);
    font-weight: 600;
  }
</style>
