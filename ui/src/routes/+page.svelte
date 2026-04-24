<script lang="ts">
  import CurrentMatchesOverviewCard from "$lib/tib/components/match/CurrentMatchesOverviewCard.svelte";
  import type {PageProps} from "./$types";

  let {data}: PageProps = $props();
</script>

<div class="hero-wrapper">
  <section id="Scores">
    <CurrentMatchesOverviewCard
      matchesCurrent={data.matchesCurrent}
      matchesNext={data.matchesNext}
      matchesPrevious={data.matchesPrevious}
    />
  </section>

</div>

<style>
  .hero-wrapper {
    width: 100%;
    margin-block-start: calc(var(--spacing) * 2);
    margin-block-end: calc(var(--spacing) * 5);
  }
</style>
