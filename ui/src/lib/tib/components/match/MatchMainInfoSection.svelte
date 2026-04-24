<script lang="ts">
  import type {Match} from "bsm.js";
  import {Calendar, ClipboardList} from "lucide-svelte";
  import {DateTimeUtility} from "$lib/dp/service/DateTimeUtility.ts";
  import {GameWinner} from "$lib/dp/enum/GameWinner.ts";
  import {LogoUtility} from "$lib/dp/utility/LogoUtility.ts";
  import {MatchDecorator} from "$lib/dp/service/MatchDecorator.ts";
  import {appLocale} from "$lib/dp/locale.svelte.ts";

  interface Props {
    match: Match;
  }

  const {match}: Props = $props();

  const awayLogo = $derived(LogoUtility.getLogoPathForTeamName(match.away_league_entry.team));
  const homeLogo = $derived(LogoUtility.getLogoPathForTeamName(match.home_league_entry.team));

  const matchDecorator = $derived(new MatchDecorator(match));

  const winner = $derived(matchDecorator.getWinnerForMatch());
  const matchDate = $derived(DateTimeUtility.parseDateFromBSMString(match.time));
</script>

<article class="card preset-tonal-primary root">
  <header class="header">
    <h2 class="h4 title">Main Info</h2>
  </header>

  <div class="score-row">
    <div class="teams-grid">
      <img alt="team logo for {match.away_team_name}" class="team-logo" loading="lazy" src="{awayLogo}"/>

      <div class="score">
        {#if match.away_runs !== undefined && match.home_runs !== undefined}
          <span class:dimmed={winner === GameWinner.home}>{match.away_runs}</span>
          <span> - </span>
          <span class:dimmed={winner === GameWinner.away}>{match.home_runs}</span>
        {/if}
      </div>

      <img alt="team logo for {match.home_team_name}" class="team-logo" loading="lazy" src="{homeLogo}"/>

      <div>{match.away_team_name}</div>
      <div></div>
      <div>{match.home_team_name}</div>
    </div>
  </div>

  <div class="info-grid">
    <div class="card sub-item item preset-tonal-primary">
      <div class="item-header">
        <Calendar/>
        <p class="label">Date</p>
      </div>

      <p>{DateTimeUtility.dateTimeFormatMedium(appLocale.current).format(matchDate)}</p>
    </div>
    <div class="card sub-item item preset-tonal-primary">
      <div class="item-header">
        <ClipboardList/>
        <p class="label">Status</p>
      </div>
      <p>{match.human_state}</p>
    </div>
  </div>

</article>

<style>
  .root {
    border: 2px solid var(--color-primary-500);
    padding-inline: calc(var(--spacing) * 2);
  }

  @media (min-width: 48rem) {
    .root {
      padding-inline: calc(var(--spacing) * 5);
    }
  }

  .header {
    padding-top: calc(var(--spacing) * 2);
    padding-bottom: calc(var(--spacing) * 3);
  }

  .title {
    font-weight: 500;
  }

  .score-row {
    display: flex;
    justify-content: center;
  }

  .teams-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    place-items: center;
    gap: calc(var(--spacing) * 3);
    width: 100%;
  }

  @media (min-width: 40rem) {
    .teams-grid {
      width: 80%;
    }
  }

  .team-logo {
    width: 3.5rem; /* was w-14 */
  }

  @media (min-width: 80rem) {
    .team-logo {
      width: 6rem; /* was xl:w-24 */
    }
  }

  .score {
    font-weight: 700;
    font-size: var(--text-2xl);
  }

  @media (min-width: 40rem) {
    .score {
      font-size: var(--text-3xl);
    }
  }

  @media (min-width: 64rem) {
    .score {
      font-size: var(--text-4xl);
    }
  }

  @media (min-width: 80rem) {
    .score {
      font-size: var(--text-5xl);
    }
  }

  @media (min-width: 96rem) {
    .score {
      font-size: var(--text-6xl);
    }
  }

  .dimmed {
    color: var(--color-surface-600);
  }

  @media (prefers-color-scheme: dark) {
    .dimmed {
      color: var(--color-surface-400);
    }
  }

  .info-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    gap: calc(var(--spacing) * 3);
    margin-block: calc(var(--spacing) * 2);
    padding-bottom: calc(var(--spacing) * 2);
  }

  @media (min-width: 40rem) {
    .info-grid {
      padding-bottom: calc(var(--spacing) * 4);
    }
  }

  @media (min-width: 48rem) {
    .info-grid {
      gap: calc(var(--spacing) * 8);
      margin-block: calc(var(--spacing) * 5);
    }
  }

  @media (min-width: 64rem) {
    .info-grid {
      padding-bottom: calc(var(--spacing) * 5);
    }
  }

  .item {
    padding: calc(var(--spacing) * 3);
  }

  .sub-item {
    border: 2px solid var(--color-primary-500);
  }

  .item-header {
    display: flex;
    gap: calc(var(--spacing) * 2);
  }

  .label {
    margin-bottom: calc(var(--spacing) * 2);
    font-weight: 500;
  }
</style>
