<script lang="ts">
  // @ts-ignore
  import {Tabs} from "bits-ui";
  import {StatsType} from "bsm.js";
  import LeaderboardTable from "$lib/tib/components/table/LeaderboardTable.svelte";
  import {goto} from "$app/navigation";
  import ProgressRing from "$lib/tib/components/utils/ProgressRing.svelte";

  let {data} = $props();

  let type: StatsType = $state(StatsType.batting);

  const reloadWithQuery = () => {
    let queryString = `?statsType=${type.toString()}`;

    goto(queryString, {
      noScroll: true,
    });
  };

  $effect.pre(() => {
    console.log(type);
    reloadWithQuery();
  });
</script>

<h1 class="h1">Leaderboards for {data.leagueGroup.name} ({data.leagueGroup.season})</h1>

<Tabs.Root bind:value={type}>
  <Tabs.List class="tabs-list preset-tonal-surface">
    <Tabs.Trigger class="tabs-trigger btn" value={StatsType.batting}>Batting</Tabs.Trigger>
    <Tabs.Trigger class="tabs-trigger btn" value={StatsType.pitching}>Pitching</Tabs.Trigger>
    <Tabs.Trigger class="tabs-trigger btn" value={StatsType.fielding}>Fielding</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>

{#await data.leaderboardData}
  <ProgressRing/>
  <div class="placeholder"></div>
{:then leaderboardData}
  <header>
    <h2 class="h2">{leaderboardData.stats_type}</h2>
  </header>

  <div class="leaderboard-grid">
    {#each leaderboardData.data as data}
      <LeaderboardTable {data}/>
    {/each}
  </div>
{:catch error}
  <p class="col-span-2">error loading matches: {error.message}</p>
{/await}

<style>
  header {
    margin-block: calc(var(--spacing) * 4);
  }
  
  .leaderboard-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(var(--spacing) * 6);
    
    @media (min-width: 32rem) {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @media (min-width: 48rem) {
      grid-template-columns: repeat(3, 1fr);
      gap: calc(var(--spacing) * 8);
    }
    
    @media (min-width: 64rem) {
      gap: calc(var(--spacing) * 10);
    }
  }
</style>