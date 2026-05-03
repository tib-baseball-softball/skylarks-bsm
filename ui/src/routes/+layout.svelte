<script lang="ts">
  import "berlin-skylarks-theme/theme.css"
  import "../css/skylarks-theme.css";
  import type { LayoutProps } from "./$types";
  import StaticNavigationLinks from "$lib/tib/components/navigation/StaticNavigationLinks.svelte";

  const { children }: LayoutProps = $props();
</script>

<div class="root-layout">
  <!-- Header -->


  <!-- Grid Column -->

  <div class="sidebar-grid">
    <!-- hack: render empty div to not mess up the grid -->
    <div class="shame-div" aria-hidden="true"></div>

    <!-- Main -->

    <main>
      <StaticNavigationLinks classes="top-nav-link rounded-base" />
      {@render children?.()}
    </main>
  </div>
</div>

<style>
  .root-layout {
    height: 100%;
    display: grid;
    grid-auto-rows: auto 1fr auto;
  }

  .sidebar-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));

    @media (min-width: 48rem) {
      grid-template-columns: auto 1fr;
    }
  }

  main {
    max-width: 1200px;
    width: 93%;
    justify-self: center;
    margin-bottom: 2em;
    grid-column: span 1 / span 1;

    @media (min-width: 48rem) {
      width: 90%;
    }

    @media (min-width: 64rem) {
      width: 85%;
    }
  }

  .shame-div {
    display: none;

    @media (min-width: 48em) {
      display: block;
    }
  }
</style>
