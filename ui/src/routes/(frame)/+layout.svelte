<script lang="ts">
  import StaticNavigationLinks from "$lib/tib/components/navigation/StaticNavigationLinks.svelte";
  import type { LayoutProps } from "./$types";

  const { children }: LayoutProps = $props();
</script>

<StaticNavigationLinks classes="top-nav-link rounded-base" />
{@render children?.()}
