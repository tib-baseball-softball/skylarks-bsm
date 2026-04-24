<script lang="ts">
  import ThSort from "$lib/dp/components/datatable/ThSort.svelte";
  import {StatsType} from "bsm.js";
  import type {TableHandler} from "@vincjo/datatables";

  interface Props {
    type: StatsType;
    handler: TableHandler<any>;
    tableType: "personal" | "seasonal";
  }

  let {type, handler, tableType}: Props = $props();
</script>

{#if type === StatsType.batting}
  <ThSort {handler} orderBy="values.games">G</ThSort>
  <ThSort {handler} orderBy="games_started">GS</ThSort>
  <ThSort {handler} orderBy="plate_appearances">PA</ThSort>
  <ThSort {handler} orderBy="at_bats">AB</ThSort>
  <ThSort {handler} orderBy="runs">R</ThSort>
  <ThSort {handler} orderBy="runs_batted_in">RBI</ThSort>
  <ThSort {handler} orderBy="hits">H</ThSort>
  <ThSort {handler} orderBy="doubles">2B</ThSort>
  <ThSort {handler} orderBy="triples">3B</ThSort>
  <ThSort {handler} orderBy="homeruns">HR</ThSort>
  <ThSort {handler} orderBy="strikeouts">K</ThSort>
  <ThSort {handler} orderBy="base_on_balls">BB</ThSort>
  <ThSort {handler} orderBy="intentional_base_on_balls">IBB</ThSort>
  <ThSort {handler} orderBy="hit_by_pitches">HP</ThSort>
  <ThSort {handler} orderBy="stolen_bases">SB</ThSort>
  <ThSort {handler} orderBy="caught_stealings">CS</ThSort>
  <ThSort {handler} orderBy="sacrifice_hits">SH</ThSort>
  <ThSort {handler} orderBy="sacrifice_flys">SF</ThSort>
  <ThSort {handler} orderBy="interferences">I</ThSort>
  <ThSort {handler} orderBy="batting_average">AVG</ThSort>
  <ThSort {handler} orderBy="on_base_percentage">OBP</ThSort>
  <ThSort {handler} orderBy="slugging_percentage">SLG</ThSort>
  <ThSort {handler} orderBy="on_base_plus_slugging">OPS</ThSort>
{/if}

{#if type === StatsType.pitching}
  <ThSort {handler} orderBy="games">G</ThSort>
  <ThSort {handler} orderBy="games_started">GS</ThSort>
  <ThSort {handler} orderBy="complete_games">CG</ThSort>
  <ThSort {handler} orderBy="batters_faced">BF</ThSort>
  <ThSort {handler} orderBy="at_bats">AB</ThSort>
  <ThSort {handler} orderBy="runs">R</ThSort>
  <ThSort {handler} orderBy="earned_runs">ER</ThSort>
  <ThSort {handler} orderBy="hits">H</ThSort>
  <ThSort {handler} orderBy="doubles">2B</ThSort>
  <ThSort {handler} orderBy="triples">3B</ThSort>
  <ThSort {handler} orderBy="homeruns">HR</ThSort>
  <ThSort {handler} orderBy="strikeouts">K</ThSort>
  <ThSort {handler} orderBy="balks">BK</ThSort>
  <ThSort {handler} orderBy="wild_pitches">WP</ThSort>
  <ThSort {handler} orderBy="base_on_balls_allowed">BB</ThSort>
  <ThSort {handler} orderBy="intentional_base_on_balls">IBB</ThSort>
  <ThSort {handler} orderBy="hit_by_pitches">HBP</ThSort>
  <ThSort {handler} orderBy="interferences">I</ThSort>
  <ThSort {handler} orderBy="earned_runs_average">ERA</ThSort>
  <ThSort {handler} orderBy="innings_pitched">IP</ThSort>
  <ThSort {handler} orderBy="walks_and_hits_per_innings_pitched">WHIP</ThSort>
  <ThSort {handler} orderBy="wins">W</ThSort>
  <ThSort {handler} orderBy="losses">L</ThSort>
  <ThSort {handler} orderBy="saves">SV</ThSort>

{/if}

{#if type === StatsType.fielding}
  <ThSort {handler} orderBy="games">G</ThSort>
  <ThSort {handler} orderBy="games_started">GS</ThSort>
  <ThSort {handler} orderBy="innings_played">IP</ThSort>
  <ThSort {handler} orderBy="assists">A</ThSort>
  <ThSort {handler} orderBy="putouts">PO</ThSort>
  <ThSort {handler} orderBy="errors">E</ThSort>
  <ThSort {handler} orderBy="double_plays">DP</ThSort>
  <ThSort {handler} orderBy="triple_plays">TP</ThSort>
  <ThSort {handler} orderBy="passed_balls">PB</ThSort>
  <ThSort {handler} orderBy="stolen_bases">SB</ThSort>
  <ThSort {handler} orderBy="caught_stealings">CS</ThSort>
  <ThSort {handler} orderBy="fielding_average">FA</ThSort>
{/if}
{#if tableType === "seasonal" && type === StatsType.fielding}
  <ThSort {handler} orderBy="pitcher">P</ThSort>
  <ThSort {handler} orderBy="catcher">C</ThSort>
  <ThSort {handler} orderBy="first_baseman">1B</ThSort>
  <ThSort {handler} orderBy="second_baseman">2B</ThSort>
  <ThSort {handler} orderBy="third_baseman">3B</ThSort>
  <ThSort {handler} orderBy="shortstop">SS</ThSort>
  <ThSort {handler} orderBy="left_fielder">LF</ThSort>
  <ThSort {handler} orderBy="center_fielder">CF</ThSort>
  <ThSort {handler} orderBy="right_fielder">RF</ThSort>
{/if}
