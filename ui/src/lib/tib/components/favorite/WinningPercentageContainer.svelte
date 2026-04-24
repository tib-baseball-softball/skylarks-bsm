<script lang="ts">
  import type { TableRow } from "bsm.js";
  import { Crown, Hash } from "lucide-svelte";
  import WinningPercentageGauge from "$lib/tib/components/favorite/WinningPercentageGauge.svelte";

  interface Props {
    tableRow: TableRow;
  }

  let { tableRow }: Props = $props();
</script>

<section class="root">
  <div class="grid-root">
    <dl>
      <dt>Rank</dt>
      <dd class="stat-value value-flex text-details-element">
        {#if tableRow.rank === "1."}
          <div class="crown-wrapper">
            <Crown color="var(--color-primary-500)" />
          </div>
        {:else}
          <Hash />
        {/if}

        {tableRow.rank}
      </dd>
    </dl>

    <dl>
      <dt>Wins/Losses</dt>
      <dd class="stat-value text-details-element">
        {tableRow.wins_count} - {tableRow.losses_count}
      </dd>
    </dl>

    <dl aria-hidden="true">
      <dt>Percentage</dt>
      <dd>
        <WinningPercentageGauge {tableRow} />
      </dd>
    </dl>
  </div>
</section>

<style>
  .root {
    container-type: inline-size;
  }

  .grid-root {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(var(--spacing) * 4);
    justify-items: center;
  }

  dt {
    font-weight: var(--font-weight-light);
  }

  dl {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
  }

  .stat-value {
    font-size: var(--text-2xl);
    font-weight: 800;
    text-align: center;
  }

  .value-flex {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: calc(var(--spacing) * 3);
  }

  @container (width >= 32rem) {
    dl {
      flex-direction: column;
      gap: 0.5rem;
    }

    .text-details-element {
      padding: 3rem 0;
    }
  }

  @container (width >= 64rem) {
    .grid-root {
      grid-template-columns: repeat(3, 1fr);
    }
  }
</style>
