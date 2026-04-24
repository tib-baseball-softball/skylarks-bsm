<script lang="ts">
  import PlayerNumberGraphic from "$lib/dp/components/player/PlayerNumberGraphic.svelte";
  import type {Player} from "$lib/dp/types/Player.ts";

  interface Props {
    player: Player;
  }

  let {player}: Props = $props();
</script>

<div class="card preset-tonal-surface shadow-xl">
  <div class="wrapper">
    {#if player.media?.length > 0}
      <img src="{player.media.at(0)?.url}" alt="{player.media.at(0)?.alt}" loading="lazy">
    {:else}
      <img src="/team-placeholder-white.jpg" alt="Player fallback" loading="lazy">
    {/if}
  </div>

  <div class="wrapper graphic-wrapper">
    <PlayerNumberGraphic content={player.number}/>
    <p class="h3">{player.fullname}</p>
  </div>

</div>

<style>
  .card {
    padding: calc(var(--spacing) * 3);
  }

  img {
    max-height: calc(var(--spacing) * 72);
    border-radius: var(--radius-lg);
  }

  .wrapper {
    display: flex;
    justify-content: center;
  }

  .graphic-wrapper {
    gap: calc(var(--spacing) * 4);
    margin-block-start: calc(var(--spacing) * 3);
  }
</style>
