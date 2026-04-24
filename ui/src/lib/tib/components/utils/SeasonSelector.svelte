<script lang="ts">
  import {range} from "$lib/dp/utility/range.ts";
  import {preferences} from "$lib/tib/globals.svelte.ts";

  const seasonOptions = range(2021, new Date().getFullYear());

  /**
   * Favorite Team always needs to align with the selected season.
   */
  function resetFavoriteTeam() {
    preferences.current.favoriteTeamID = 0;
  }
</script>

<select bind:value={preferences.current.selectedSeason} class="select" onchange={resetFavoriteTeam}>
  {#each seasonOptions as option}
    <option value="{option}">{option}</option>
  {/each}
</select>