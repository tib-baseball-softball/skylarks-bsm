<script lang="ts">
  import type {LeagueGroup} from "bsm.js";
  import {preferences} from "$lib/tib/globals.svelte.ts";

  interface Props {
    leagueGroups?: LeagueGroup[];
  }

  const {leagueGroups = []}: Props = $props();
</script>

<select bind:value={preferences.current.leagueGroupID} class="select">
  <option selected value="{0}">All Leagues</option>

  {#each leagueGroups as leagueGroup}
    <option value="{leagueGroup.id}">{leagueGroup.name} ({leagueGroup.acronym})</option>
  {/each}
</select>

<style>
  select {
    min-width: calc(var(--spacing) * 52);
  }
</style>
