<script lang="ts">
  import type {Snippet} from "svelte";
  import {Minus, Plus} from "lucide-svelte";

  interface Props {
    startOpen?: boolean;
    panelInset?: "none" | "default";
    control?: Snippet;
    lead?: Snippet;
    panel?: Snippet;
  }

  const {startOpen = true, panelInset = "default", control, lead, panel}: Props = $props();
  let open = $derived(startOpen);
</script>

<details bind:open={open}>
  <summary>
    <span class="accordion-control-wrapper">
      {@render lead?.()}
      {@render control?.()}
    </span>
    <span>
      {#if open}
        <Minus size="16"/>
        {:else }
        <Plus size="16"/>
      {/if}
    </span>
  </summary>

  <div class={["panel", panelInset === "default" && "panel-inset-default"]}>
    {@render panel?.()}
  </div>
</details>

<style>
  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    padding: 0.75rem;
    margin: 0.2rem 0;

    &:hover, &:focus {
      background-color: var(--color-primary-50-950);
      color: var(--color-primary-950-50);
      border-radius: var(--radius-container);
    }
  }

  .accordion-control-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .panel {
    padding-block: 0;
  }

  .panel-inset-default {
    padding-inline: calc(var(--spacing) * 4);
  }
</style>
