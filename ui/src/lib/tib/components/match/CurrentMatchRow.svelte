<script lang="ts">
  import type {Match} from "bsm.js";
  import {env} from "$env/dynamic/public";
  import {DateTimeUtility} from "$lib/dp/service/DateTimeUtility.ts";
  import {GameWinner} from "$lib/dp/enum/GameWinner.ts";
  import {MatchState} from "$lib/dp/enum/MatchState.ts";
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
  const matchState = $derived(matchDecorator.getMatchState(env.PUBLIC_TEAM_NAME));
  const matchDate = $derived(DateTimeUtility.parseDateFromBSMString(match.time));
  const formattedMatchDate = $derived(DateTimeUtility.timeFormatShort(appLocale.current).format(matchDate));
</script>

<a class="match-row"
   href="gamecenter/game-detail/{match.id}">
  <div class="team-container away-team">
    <div class="team-name">{match.away_league_entry.team?.short_name}</div>
    <img alt="team logo for {match.away_team_name}" class="team-logo" loading="lazy" src="{awayLogo}" width="35"/>
  </div>

  {#if matchState === MatchState.notYetPlayed}

    <div class="state-container">
            <span class="state-badge">
                {formattedMatchDate}
            </span>
    </div>

  {:else if matchState === MatchState.cancelled}

    <div class="state-container">
            <span class="state-badge">
                PPD
            </span>
    </div>

  {:else}

    <div class="score-container">
      <span class:subdued={winner === GameWinner.home}>{match.away_runs ?? " "}</span>
      <span class="score-separator"> : </span>
      <span class:subdued={winner === GameWinner.away}>{match.home_runs ?? " "}</span>
    </div>

  {/if}

  <div class="team-container home-team">
    <img alt="team logo for {match.away_team_name}" class="team-logo" loading="lazy" src="{homeLogo}" width="35"/>
    <div class="team-name">{match.home_league_entry.team?.short_name}</div>
  </div>
</a>

<style>
  .match-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    padding-inline: calc(var(--spacing) * 3);
    padding-block: calc(var(--spacing) * 1);
    gap: calc(var(--spacing) * 2);
    border-bottom: 1px solid var(--color-surface-500);
    align-items: center;
    text-decoration: none;
    color: inherit;
  }

  .team-container {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);

    &.away-team {
      justify-content: flex-end;
    }

    &.home-team {
      justify-content: flex-start;
    }
  }

  .team-logo {
    flex-shrink: 0;
  }

  .state-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .state-badge {
    background-color: var(--color-surface-50-950);
    color: var(--color-surface-950-50);
    padding-block: calc(var(--spacing) * 0.5);
    padding-inline: calc(var(--spacing) * 2);
    border-radius: var(--radius-sm, 2px);
    font-size: var(--text-sm);

    @media (prefers-color-scheme: dark) {
      background-color: var(--color-surface-500);
      color: var(--color-surface-contrast-500);
    }
  }

  .score-container {
    display: flex;
    justify-content: center;
    font-weight: 800;
    font-size: var(--text-lg);
  }

  .score-separator {
    padding-inline: calc(var(--spacing) * 1);
  }

  .subdued {
    color: var(--color-surface-700);

    @media (prefers-color-scheme: dark) {
      color: var(--color-surface-300);
    }
  }
</style>
