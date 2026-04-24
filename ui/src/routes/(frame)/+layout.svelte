<script lang="ts">
  import StaticNavigationLinks from "$lib/tib/components/navigation/StaticNavigationLinks.svelte";
  import type { LayoutProps } from "./$types";
  import LocalePicker from "$lib/dp/components/meta/LocalePicker.svelte";

  const { children }: LayoutProps = $props();
</script>

<StaticNavigationLinks classes="top-nav-link rounded-base" />
<LocalePicker />
{@render children?.()}
