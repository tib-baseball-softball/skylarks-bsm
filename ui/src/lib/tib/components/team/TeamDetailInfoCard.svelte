<script lang="ts">
  import type {Team} from "bsm.js";
  import {Check, File, Tag, Users, Volleyball, X} from "lucide-svelte";

  interface Props {
    clubTeam: Team;
  }

  let {clubTeam}: Props = $props();
</script>

<div class="card team-info-card preset-tonal shadow-xl">

  <div class="detail-row">
    <File/>
    <div>
      <p>{clubTeam.name}</p>
      <p class="category-label">Name</p>
    </div>
  </div>

  <hr>

  <div class="detail-row">
    <Tag/>
    <div>
      <p>{clubTeam.short_name}</p>
      <p class="category-label">Acronym</p>
    </div>
  </div>

  {#if clubTeam.league_entries.at(0)}

    <hr>

    <div class="detail-row">
      <Volleyball/>
      <div>
        <p>{clubTeam.league_entries.at(0)?.league?.sport}</p>
        <p class="category-label">Sport</p>
      </div>
    </div>

    <hr>

    <div class="detail-row">
      <Users/>
      <div>
        <p>{clubTeam.league_entries.at(0)?.league?.age_group}</p>
        <p class="category-label">Age Group</p>
      </div>
    </div>

    <hr>

    <div class="detail-row info-row">
      <p>Antritt außer Konkurrenz (aK):</p>

      {#if clubTeam.league_entries.at(0)?.not_competing}
        <div class="text-success-500">
          <Check/>
        </div>
      {:else }
        <div class="text-error-500">
          <X/>
        </div>
      {/if}

    </div>

  {/if}
</div>

<style>
  .team-info-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .detail-row {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .info-row {
    margin-top: calc(var(--spacing) * 3);
  }

  .category-label {
    font-size: var(--text-sm);
    font-weight: 300;
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
