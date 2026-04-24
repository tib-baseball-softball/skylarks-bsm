<script lang="ts">
  import "../../css/dp/app.css"; // MARK: load diamond planner base styles
  import "../../css/skylarks-theme.css"; // ...and apply our custom theme (also requires setting the correct data attribute in app.html)
  import StaticNavigationLinks from "$lib/tib/components/navigation/StaticNavigationLinks.svelte";
  import type { LayoutProps } from "./$types";
  import LocalePicker from "$lib/dp/components/meta/LocalePicker.svelte";

  const { children }: LayoutProps = $props();
</script>

<StaticNavigationLinks classes="top-nav-link rounded-base" />
<LocalePicker />
{@render children?.()}
