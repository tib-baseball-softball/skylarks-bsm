<script lang="ts">
  import StandingsTable from "$lib/tib/components/table/StandingsTable.svelte";
  import LeagueDetailInfoCard from "$lib/tib/components/league/LeagueDetailInfoCard.svelte";
  import type {PageProps} from "./$types";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";

  let {data}: PageProps = $props();
  let expectedTable = $derived(data.table);
  let leagueGroup = $derived(data.leagueGroup);
</script>

<h1 class="h1">{leagueGroup.name} ({leagueGroup.season})</h1>

<section>
  <h2 class="h2">Information</h2>
  <div class="page-grid">

    <LeagueDetailInfoCard {leagueGroup}/>

    <article class="card preset-tonal-surface">
      <header class="card-header">
        <h3 class="h3">League Stats</h3>
      </header>

      <div class="card-content">

        <p>
          Statistics about current league leaders in various statistical categories can be found on a
          dedicated subpage.
        </p>

        <footer class="card-footer">
          <a class="btn preset-tonal-primary border border-primary-500" href="/ligen/{leagueGroup.id}/stats">Go to
            stats</a>
        </footer>
      </div>
    </article>

  </div>
</section>

<section>

  <h2 class="h2">Tabelle</h2>
  {#await expectedTable}
    <ProgressRing/>
  {:then table}
    {#if table}
      <StandingsTable {table}/>
    {/if}
  {:catch error}
    <p>error loading: {error.message}</p>
  {/await}

</section>

<style>
  h2 {
    margin-bottom: calc(var(--spacing) * 3);
  }
  
  .page-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(var(--spacing) * 5);
    
    @media (min-width: 32rem) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  .card-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: end;
    
    > p {
      padding: calc(var(--spacing) * 4);
    }
  }
  
  section {
    margin-block: calc(var(--spacing) * 6);
  }
</style>
