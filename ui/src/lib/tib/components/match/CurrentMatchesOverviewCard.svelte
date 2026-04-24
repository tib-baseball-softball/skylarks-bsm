<script lang="ts">
  // @ts-ignore
  import {Tabs} from "bits-ui";
  import type {Match} from "bsm.js";
  import CurrentMatchBlock from "$lib/tib/components/match/CurrentMatchBlock.svelte";

  let tabSet: "previous" | "current" | "next" | string = $state("current");

  interface Props {
    matchesCurrent: Promise<Match[]>;
    matchesPrevious: Promise<Match[]>;
    matchesNext: Promise<Match[]>;
  }

  let {matchesCurrent, matchesPrevious, matchesNext}: Props = $props();
</script>

<div
  class="card overview-card current-matches"
>
  <header class="card-header">
    <h2 class="h3">Current Games</h2>
  </header>
  <section class="card-body">
    <Tabs.Root
      bind:value={tabSet}
      class="tabs-container"
    >
      <Tabs.List
        class="tabs-list"
      >
        <Tabs.Trigger
          class="tabs-trigger btn"
          value="previous"
        >
          Previous
          <span class="gameday-text">Gameday</span>
        </Tabs.Trigger>
        <Tabs.Trigger
          class="tabs-trigger btn"
          value="current"
        >Current
          <span class="gameday-text">Gameday</span>
        </Tabs.Trigger>
        <Tabs.Trigger
          class="tabs-trigger btn"
          value="next"
        >Next
          <span class="gameday-text">Gameday</span>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content class="tabs-content" value="previous">
        <CurrentMatchBlock matches={matchesPrevious}/>
      </Tabs.Content>
      <Tabs.Content class="tabs-content" value="current">
        <CurrentMatchBlock matches={matchesCurrent}/>
      </Tabs.Content>
      <Tabs.Content class="tabs-content" value="next">
        <CurrentMatchBlock matches={matchesNext}/>
      </Tabs.Content>
    </Tabs.Root>
  </section>
  <footer class="card-footer gamecenter-footer">
    <a
      class="btn preset-filled-primary-500"
      href="/gamecenter"
    >Gamecenter</a
    >
  </footer>
</div>

<style>
  .overview-card {
    background-color: var(--color-surface-50-950);
    color: var(--color-surface-950-50);
    border: 1px solid var(--color-surface-500);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-tertiary-600-400);
    }
  }

  .card-body {
    padding: calc(var(--spacing) * 4);
  }

  .gameday-text {
    display: none;

    @media (min-width: 64rem) {
      display: inline;
    }
  }

  :global(.current-matches .tabs-list) {
    border: 1px var(--tw-border-style);
  }

  :global(.current-matches .tabs-content) {
    margin-block-start: calc(var(--spacing) * 4);
  }

  .gamecenter-footer {
    display: flex;
    justify-content: flex-end;
  }
</style>
