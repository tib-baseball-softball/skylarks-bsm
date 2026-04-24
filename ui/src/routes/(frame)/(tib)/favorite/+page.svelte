<script lang="ts">
  import { goto } from "$app/navigation";
  import FavoriteTeamInfoCard from "$lib/tib/components/favorite/FavoriteTeamInfoCard.svelte";
  import LeagueInfoCard from "$lib/tib/components/favorite/LeagueInfoCard.svelte";
  import PlayoffSheet from "$lib/tib/components/favorite/PlayoffSheet.svelte";
  import StreakGraphSection from "$lib/tib/components/favorite/StreakGraphSection.svelte";
  import MatchTeaserCard from "$lib/dp/components/event/match/MatchTeaserCard.svelte";
  import StandingsTable from "$lib/tib/components/table/StandingsTable.svelte";
  import { preferences } from "$lib/tib/globals.svelte.ts";
  import type { PageProps } from "./$types";
  import ClubTeamPicker from "$lib/tib/components/favorite/ClubTeamPicker.svelte";

  const { data }: PageProps = $props();
  const clubTeams = $derived(data.clubTeams ?? []);

  const favoriteTeam = $derived(
    clubTeams.find(
      (clubTeam) => clubTeam.league_entries.at(0)?.id === preferences.current.favoriteTeamID,
    ),
  );

  function reloadOnTeamChange() {
    const queryString = `?team=${preferences.current.favoriteTeamID}&season=${preferences.current.selectedSeason}&gameClass=${favoriteTeam?.league_entries.at(0)?.league?.id}`;
    goto(queryString);
  }
</script>

<div class="favorite-header">
  <h1 class="h1">Favorite Team</h1>

  <div class="picker-container">
    <ClubTeamPicker {clubTeams} onChange={reloadOnTeamChange} />
  </div>
</div>

<section class="details-section">
  <h2 class="h2 section-subtitle">Quick Details</h2>
  {#if preferences.current.favoriteTeamID !== 0 && favoriteTeam}
    <FavoriteTeamInfoCard clubTeam={favoriteTeam} />
  {:else}
    <p>You have not selected a favorite team yet.</p>
  {/if}
</section>

{#if favoriteTeam?.league_entries?.length ?? 0 > 0}
  <section>
    <h2 class="h2 links-title">Team Stats Links</h2>
    <div class="links-container">
      {#each favoriteTeam?.league_entries ?? [] as entry}
        <a
          href="/league_entries/{entry.id}?team={favoriteTeam?.name}"
          class="btn preset-filled-primary-500 stats-link"
          title="to stats page for league entry {entry.league?.name}"
        >
          {entry.league?.name}
        </a>
      {/each}
    </div>
  </section>
{/if}

{#if favoriteTeam}
  <section>
    <h2 class="h2 data-title">Data per League</h2>
    <p class="data-info">
      A single team can be associated to several leagues per season in BSM.
    </p>
  </section>

  {#await data.datasets}
    <p>Loading...</p>
  {:then datasets}
    {#each datasets as dataset}
      <section class="details-section">
        <h3 class="h3 section-subtitle">{dataset.league_group.name}</h3>

        {#if dataset.table_row}
          <LeagueInfoCard
            leagueGroup={dataset.league_group}
            tableRow={dataset.table_row}
          />
        {:else}
          <p>
            The team "{favoriteTeam?.name}" does not have a league entry in this
            league.
          </p>
        {/if}
      </section>

      <section>
        <h4 class="h4 section-subtitle">Standings</h4>

        <StandingsTable table={dataset.table} />
      </section>

      {#if dataset.playoff_series && (dataset.playoff_series?.series_games?.length ?? 0) > 0}
        <section>
          <h4 class="h4 playoff-title">Playoffs</h4>
          <PlayoffSheet playoffSeries={dataset.playoff_series}></PlayoffSheet>
        </section>
      {/if}

      {#if dataset.streak_data?.length ?? 0 > 0}
        <section>
          <h4 class="h4 section-subtitle">Graphs and Mood</h4>
          <StreakGraphSection {dataset} />
        </section>
      {/if}

      <section>
        <h4 class="h4 section-subtitle">Games</h4>

        <div class="games-grid">
          <div class="game-column">
            <h5 class="h5 game-title">Previous Game</h5>
            {#if dataset.last_game}
              <MatchTeaserCard match={dataset.last_game} />
            {:else}
              <p class="game-empty">No previous game found.</p>
            {/if}
          </div>

          <div class="game-column">
            <h5 class="h5 game-title">Next Game</h5>
            {#if dataset.next_game}
              <MatchTeaserCard match={dataset.next_game} />
            {:else}
              <p class="game-empty">No next game found.</p>
            {/if}
          </div>
        </div>
      </section>
    {:else}
      <p>No data found.</p>
    {/each}
  {:catch error}
    <p>Error: {error.message}</p>
  {/await}
{/if}

<style>
  section {
    margin-block: calc(var(--spacing) * 10);
  }

  .favorite-header {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 4);

    @media (min-width: 64rem) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    h1 {
      flex-shrink: 0;
    }
  }

  .picker-container {
    flex-grow: 0;
  }

  .details-section {
    max-width: 28rem;
  }

  .section-subtitle {
    margin-block: calc(var(--spacing) * 3);
  }

  .links-title {
    margin-top: calc(var(--spacing) * 5);
    margin-bottom: calc(var(--spacing) * 1);
  }

  .links-container {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--spacing) * 2);
  }

  .stats-link {
    margin-inline-end: calc(var(--spacing) * 1);
    margin-block: calc(var(--spacing) * 2);
  }

  .data-title {
    margin-top: calc(var(--spacing) * 5);
    margin-bottom: calc(var(--spacing) * 1);
  }

  .data-info {
    font-size: var(--text-sm);
    font-weight: 300;
  }

  .playoff-title {
    margin-top: calc(var(--spacing) * 5);
    margin-bottom: calc(var(--spacing) * 1);
  }

  .games-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: calc(var(--spacing) * 3);

    @media (min-width: 64rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: calc(var(--spacing) * 6);
    }

    @media (min-width: 80rem) {
      gap: calc(var(--spacing) * 12);
    }
  }

  .game-title {
    margin-block: calc(var(--spacing) * 3);
  }

  .game-empty {
    margin-block: calc(var(--spacing) * 3);
  }
</style>
