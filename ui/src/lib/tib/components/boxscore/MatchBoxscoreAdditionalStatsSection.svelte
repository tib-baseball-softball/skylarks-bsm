<script lang="ts">
  import type {AdditionalMatchStats} from "bsm.js";
  import MatchBoxscoreAdditionalStatsSectionEntry
    from "$lib/tib/components/boxscore/MatchBoxscoreAdditionalStatsSectionEntry.svelte";

  interface Props {
    stats: AdditionalMatchStats;
  }

  let {stats}: Props = $props();
</script>

<section>
  <h3 class="bold-heading">BATTING</h3>

  {#if stats.batting.doubles.length > 0}
        <span>
            <span class="bold-heading">2B:</span>
            <MatchBoxscoreAdditionalStatsSectionEntry
              entries={stats.batting.doubles}
            />
        </span>
  {/if}

  {#if stats.batting.triples.length > 0}
    <div>
      <span class="bold-heading">3B:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.batting.triples}
      />
    </div>
  {/if}

  {#if stats.batting.homeruns.length > 0}
    <div>
      <span class="bold-heading">HR:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.batting.homeruns}
      />
    </div>
  {/if}

  {#if stats.batting.sacrifice_hits.length > 0}
    <div>
      <span class="bold-heading">SH:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.batting.sacrifice_hits}
      />
    </div>
  {/if}

  {#if stats.batting.sacrifice_flys.length > 0}
    <div>
      <span class="bold-heading">SF:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.batting.sacrifice_flys}
      />
    </div>
  {/if}
</section>

<section>
  <h3 class="bold-heading">BASERUNNING</h3>

  {#if stats.baserunning.stolen_bases.length > 0}
    <div>
      <span class="bold-heading">SB:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.baserunning.stolen_bases}
      />
    </div>
  {/if}

  {#if stats.baserunning.caught_stealings.length > 0}
    <div>
      <span class="bold-heading">CS:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.baserunning.caught_stealings}
      />
    </div>
  {/if}
</section>

<section>
  <h3 class="bold-heading">FIELDING</h3>

  {#if stats.fielding.errors.length > 0}
    <div>
      <span class="bold-heading">E:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.fielding.errors}
      />
    </div>
  {/if}

  {#if stats.fielding.passed_balls.length > 0}
    <div>
      <span class="bold-heading">PB:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.fielding.passed_balls}
      />
    </div>
  {/if}

  {#if stats.fielding.double_plays.length > 0}
    <div>
      <span class="bold-heading">DP:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.fielding.double_plays}
      />
    </div>
  {/if}

  {#if stats.fielding.triple_plays.length > 0}
    <div>
      <span class="bold-heading">TP:</span>
      <MatchBoxscoreAdditionalStatsSectionEntry
        entries={stats.fielding.triple_plays}
      />
    </div>
  {/if}
</section>

<style>
  .bold-heading {
    font-weight: var(--font-weight-bold);
  }

  section {
    margin-block: calc(var(--spacing) * 3);
  }
</style>
