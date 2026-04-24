<script lang="ts">
  import type {MatchBoxscore} from "bsm.js";
  import Linescore from "$lib/tib/components/boxscore/Linescore.svelte";
  import MatchBoxscoreOffensiveTable from "$lib/tib/components/boxscore/MatchBoxscoreOffensiveTable.svelte";
  import MatchBoxscoreAdditionalStatsSection
    from "$lib/tib/components/boxscore/MatchBoxscoreAdditionalStatsSection.svelte";
  import MatchBoxscorePitchingTable from "$lib/tib/components/boxscore/MatchBoxscorePitchingTable.svelte";

  interface Props {
    boxscore: MatchBoxscore;
  }

  let {boxscore}: Props = $props();
  const awayTeamName = $derived(boxscore.linescore.away.league_entry.team?.name ?? "Away Team");
  const homeTeamName = $derived(boxscore.linescore.home.league_entry.team?.name ?? "Home Team");
</script>

<section class="linescore-section">
  <h2 class="h3 section-title">Linescore</h2>
  <Linescore linescore={boxscore.linescore}/>
</section>

<h2 class="h3 title-spaced">Offensive</h2>

<!--ROAD TEAM-->

<MatchBoxscoreOffensiveTable
  matchStats={boxscore.offensive_away}
  teamName={awayTeamName}
></MatchBoxscoreOffensiveTable>

<MatchBoxscoreAdditionalStatsSection
  stats={boxscore.additional_away}
></MatchBoxscoreAdditionalStatsSection>

<hr class="divider"/>

<!--HOME TEAM-->

<MatchBoxscoreOffensiveTable
  matchStats={boxscore.offensive_home}
  teamName={homeTeamName}
></MatchBoxscoreOffensiveTable>

<MatchBoxscoreAdditionalStatsSection
  stats={boxscore.additional_home}
></MatchBoxscoreAdditionalStatsSection>

<hr class="divider"/>

<section class="pitching-section">
  <h2 class="h3 section-title">Pitching</h2>

  <MatchBoxscorePitchingTable
    matchStats={boxscore.pitching_away}
    teamName={awayTeamName}
  ></MatchBoxscorePitchingTable>

  <div class="top-gap">
    <MatchBoxscorePitchingTable
      matchStats={boxscore.pitching_home}
      teamName={homeTeamName}
    ></MatchBoxscorePitchingTable>
  </div>
</section>


<style>
  .linescore-section {
    margin-top: calc(var(--spacing) * 2);
    margin-bottom: calc(var(--spacing) * 6);
  }

  .section-title {
    margin-block: calc(var(--spacing) * 2);
  }

  .title-spaced {
    margin-block: calc(var(--spacing) * 8);
  }

  .divider {
    margin-block: calc(var(--spacing) * 8);
  }

  .pitching-section {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);
    margin-bottom: calc(var(--spacing) * 3);
  }

  .top-gap {
    margin-top: calc(var(--spacing) * 4);
  }
</style>
