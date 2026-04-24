<script lang="ts">
  import type {Match} from "bsm.js";
  import GameResultIndicator from "$lib/dp/components/event/match/GameResultIndicator.svelte";
  import MatchTeaserCardRow from "$lib/dp/components/event/match/MatchTeaserCardRow.svelte";
  import {DateTimeUtility} from "$lib/dp/service/DateTimeUtility.ts";
  import {GameWinner} from "$lib/dp/enum/GameWinner.ts";
  import {LogoUtility} from "$lib/dp/utility/LogoUtility.ts";
  import {MatchDecorator} from "$lib/dp/service/MatchDecorator.ts";
  import {appLocale} from "$lib/dp/locale.svelte.ts";

  interface Props {
    match: Match;
    teamName?: string;
  }

  const {match, teamName}: Props = $props();

  const awayLogo = $derived(LogoUtility.getLogoPathForTeamName(match?.away_league_entry?.team));
  const homeLogo = $derived(LogoUtility.getLogoPathForTeamName(match?.home_league_entry?.team));

  const matchDecorator = $derived(new MatchDecorator(match));
  const winner = $derived(matchDecorator.getWinnerForMatch());
  const matchDate = $derived(DateTimeUtility.parseDateFromBSMString(match.time));
</script>

<a
  class="root card card-hover {matchDecorator.isPlayoffGame() ===
    true
        ? 'preset-tonal-primary border-primary-500'
        : 'preset-tonal-surface border-surface-500'}"
  href="/gamecenter/game-detail/{match.id}"
>
  <header class="card-header">
    <div class="header-container">
      <div>
        <h3 class="league-name">{match.league?.name}</h3>
        <p class="match-date">
          {DateTimeUtility.dateTimeFormatMedium(appLocale.current).format(matchDate)}
        </p>
      </div>
      <GameResultIndicator {match} {teamName}/>
    </div>
  </header>

  <hr class="separator"/>

  <section>
    <MatchTeaserCardRow
      logo={awayLogo}
      score={match.away_runs}
      subduedScore={winner === GameWinner.home}
      teamName={match.away_team_name}
    />
    <MatchTeaserCardRow
      logo={homeLogo}
      score={match.home_runs}
      subduedScore={winner === GameWinner.away}
      teamName={match.home_team_name}
    />
  </section>
</a>

<style>
  .root {
    display: block;
    font-size: var(--text-sm);
    border: 1px solid transparent;

    &.border-primary-500 {
      border-color: var(--color-primary-500);
    }

    &.border-surface-500 {
      border-color: var(--color-surface-500);
    }
  }

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .league-name {
    font-weight: var(--font-weight-medium);
  }

  .match-date {
    font-weight: var(--font-weight-light);
  }

  .separator {
    margin-top: calc(var(--spacing) * 2);
    margin-left: calc(var(--spacing) * 3);
    margin-right: calc(var(--spacing) * 3);
  }

  section {
    padding: calc(var(--spacing) * 4);
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
  }
</style>
