<script lang="ts">
  import PlayerNumberGraphic from "$lib/dp/components/player/PlayerNumberGraphic.svelte";
  import type {Player} from "$lib/dp/types/Player.ts";

  interface Props {
    player: Player;
    visual?: "image" | "number";
  }

  let {player, visual = "number"}: Props = $props();
</script>

{#if player.bsm_id > 0}
  <a class="player-container" href="/players/{player.bsm_id}">
    {@render rowContent()}
  </a>
{:else }
  <div class="player-container">
    {@render rowContent()}
  </div>
{/if}

{#snippet rowContent()}
  {#if visual === "number"}
    <PlayerNumberGraphic content={player.number} classes="preset-filled-primary-500"/>
  {:else }

    {#if player.media?.length > 0}
      <img class="player-image" src="{player.media.at(0)?.url}" alt="{player.media.at(0)?.alt}" loading="lazy">
    {:else}
      <img class="player-image" src="/team-placeholder-white.jpg" alt="Player fallback" loading="lazy">
    {/if}
  {/if}

  <div class="player-info">
    <p>{player.fullname}</p>
    <p class="player-positions">{player.positions.join(", ")}</p>
  </div>
{/snippet}

<style>
  .player-container {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .player-image {
    border-radius: var(--radius-lg);
    max-height: calc(var(--spacing) * 20);
  }

  .player-info {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 0.5);
  }

  .player-positions {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
    font-weight: var(--font-weight-light);
  }
</style>
