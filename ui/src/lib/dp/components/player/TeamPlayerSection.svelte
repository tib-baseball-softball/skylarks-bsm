<script lang="ts">
  // @ts-ignore
  import {Tabs} from "bits-ui";
  import PlayerRow from "$lib/dp/components/player/PlayerRow.svelte";
  import type {Player} from "$lib/dp/types/Player.ts";

  interface Props {
    players: Player[];
  }

  let {players}: Props = $props();
  let visual: "number" | "image" = $state("number");
</script>

<label class="label visual-selector-container">
  <span>Visualization</span>
  <Tabs.Root bind:value={visual}>
    <Tabs.List class="tabs-list selector-tabs">
      <Tabs.Trigger class="tabs-trigger btn" value="number">Number</Tabs.Trigger>
      <Tabs.Trigger class="tabs-trigger btn" value="image">Image</Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
</label>

<div class="card players-list-card preset-tonal shadow-xl">
  {#each players as player (player.uid)}
    <PlayerRow {player} {visual}/>

    <hr class="row-divider">
  {/each}
</div>

<style>
  .visual-selector-container {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 1);
    margin-block: calc(var(--spacing) * 4);
  }

  .players-list-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .row-divider {
    margin-block: calc(var(--spacing) * 3);
  }
</style>
