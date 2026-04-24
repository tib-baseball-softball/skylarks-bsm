<script generics="T extends keyof RowByType" lang="ts">
  //@ts-nocheck - Generics trip up the type checker
  import {StatsType} from "bsm.js";
  import type {RowByType} from "$lib/tib/types/StatsDataset.ts";

  interface Props<T extends keyof RowByType> {
    type: T;
    row: RowByType[T] | any; // no other way to silence error
    tableType: "personal" | "seasonal";
  }

  const {type, row, tableType}: Props<T> = $props();
</script>

{#if type === StatsType.batting}
  <td>{row.values.games}</td>
  <td>{row.values.games_started}</td>
  <td>{row.values.plate_appearances}</td>
  <td>{row.values.at_bats}</td>
  <td>{row.values.runs}</td>
  <td>{row.values.runs_batted_in}</td>
  <td>{row.values.hits}</td>
  <td>{row.values.doubles}</td>
  <td>{row.values.triples}</td>
  <td>{row.values.homeruns}</td>
  <td>{row.values.strikeouts}</td>
  <td>{row.values.base_on_balls}</td>
  <td>{row.values.intentional_base_on_balls}</td>
  <td>{row.values.hit_by_pitches}</td>
  <td>{row.values.stolen_bases}</td>
  <td>{row.values.caught_stealings}</td>
  <td>{row.values.sacrifice_hits}</td>
  <td>{row.values.sacrifice_flys}</td>
  <td>{row.values.interferences}</td>
  <td class="font-semibold">{row.values.batting_average}</td>
  <td>{row.values.on_base_percentage}</td>
  <td>{row.values.slugging_percentage}</td>
  <td class="font-semibold">{row.values.on_base_plus_slugging}</td>
{/if}

{#if type === StatsType.pitching}
  <td>{row.values.games}</td>
  <td>{row.values.games_started}</td>
  <td>{row.values.complete_games}</td>
  <td>{row.values.batters_faced}</td>
  <td>{row.values.at_bats}</td>
  <td>{row.values.runs}</td>
  <td>{row.values.earned_runs}</td>
  <td>{row.values.hits}</td>
  <td>{row.values.doubles}</td>
  <td>{row.values.triples}</td>
  <td>{row.values.homeruns}</td>
  <td>{row.values.strikeouts}</td>
  <td>{row.values.balks}</td>
  <td>{row.values.wild_pitches}</td>
  <td>{row.values.base_on_balls_allowed}</td>
  <td>{row.values.intentional_base_on_balls}</td>
  <td>{row.values.hit_by_pitches}</td>
  <td>{row.values.interferences}</td>
  <td class="font-semibold">{row.values.earned_runs_average}</td>
  <td>{row.values.innings_pitched}</td>
  <td>{row.values.walks_and_hits_per_innings_pitched}</td>
  <td>{row.values.wins}</td>
  <td>{row.values.losses}</td>
  <td>{row.values.saves}</td>
{/if}

{#if type === StatsType.fielding}
  <td>{row.values.games}</td>
  <td>{row.values.games_started}</td>
  <td>{row.values.innings_played}</td>
  <td>{row.values.assists}</td>
  <td>{row.values.putouts}</td>
  <td>{row.values.errors}</td>
  <td>{row.values.double_plays}</td>
  <td>{row.values.triple_plays}</td>
  <td>{row.values.passed_balls}</td>
  <td>{row.values.stolen_bases}</td>
  <td>{row.values.caught_stealings}</td>
  <td class="font-semibold">{row.values.fielding_average}</td>
{/if}
{#if tableType === "seasonal" && type === StatsType.fielding}
  <td>{row.values.pitcher}</td>
  <td>{row.values.catcher}</td>
  <td>{row.values.first_baseman}</td>
  <td>{row.values.second_baseman}</td>
  <td>{row.values.third_baseman}</td>
  <td>{row.values.shortstop}</td>
  <td>{row.values.left_fielder}</td>
  <td>{row.values.center_fielder}</td>
  <td>{row.values.right_fielder}</td>
{/if}
