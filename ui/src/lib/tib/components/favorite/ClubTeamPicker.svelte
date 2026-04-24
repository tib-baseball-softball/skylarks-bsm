<script lang="ts">
  import type { Team } from "bsm.js";
  import { preferences } from "$lib/tib/globals.svelte.ts";

  interface Props {
    clubTeams?: Team[];
    onChange?: () => void;
  }

  const { clubTeams = [], onChange = () => {} }: Props = $props();

  const leagueEntries = $derived(
    clubTeams.map((team) => team.league_entries).flat(),
  );
</script>

<label>
  <span class=" label-text">Select Team:</span>
  <select
    bind:value={preferences.current.favoriteTeamID}
    class="select"
    data-testid="club-team-picker"
    onchange={() => onChange()}
  >
    <option value={0}>None</option>
    {#each leagueEntries as entry}
      <option value={entry.id}
        >{entry.league?.name}
        ({entry.league?.acronym})
      </option>
    {/each}
  </select>
</label>

<style>
  label {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  .label-text {
    font-weight: var(--font-weight-light);
    text-wrap: nowrap;
  }

  .select {
    margin: calc(var(--spacing) * 4);
  }
</style>
