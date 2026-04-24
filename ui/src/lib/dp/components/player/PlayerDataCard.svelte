<script lang="ts">
  import {Calendar, Dna, Hand, Users, UsersRound} from "lucide-svelte";
  import {getAgeFromTimestamp} from "$lib/dp/utility/getAgeFromTimestamp.js";
  import type {Player} from "$lib/dp/types/Player.ts";

  interface Props {
    player: Player;
    showTeams?: boolean;
  }

  let {player, showTeams = true}: Props = $props();
</script>

<div class="card preset-tonal-surface shadow-xl player-card">
  {#if showTeams}
    <dl class="info-row">
      <Users aria-hidden="true"/>
      <div>
        <dd>{player.teams.map((team) => team.name)}</dd>
        <dt class="info-label">Teams</dt>
      </div>
    </dl>

    <hr class="divider"/>
  {/if}

  <div class="info-row">
    <UsersRound aria-hidden="true"/>
    <dl>
      <!--do not calculate age for falsy values-->
      <dd>{player.birthday ? getAgeFromTimestamp(player.birthday) : "Not specified"}</dd>
      <dt class="info-label">Age</dt>
    </dl>
  </div>

  <hr class="divider"/>

  <div class="info-row">
    <Calendar aria-hidden="true"/>
    <dl>
      <dd>{player.admission}</dd>
      <dt class="info-label">Member since</dt>
    </dl>
  </div>

  <hr class="divider"/>

  <div class="info-row">
    <Dna aria-hidden="true"/>
    <dl>
      <dd>
        <div class="positions-list">
          {#each player.positions as position}
            <span class="position-item">{position}</span>
          {/each}
        </div>
      </dd>
      <dt class="info-label">Positions</dt>
    </dl>
  </div>

  <hr class="divider"/>

  <div class="info-row">
    <Hand aria-hidden="true"/>
    <dl>
      <dd class="capitalize">{player.batting}</dd>
      <dt class="info-label">Bats</dt>
    </dl>
  </div>

  <hr class="divider"/>

  <div class="info-row">
    <Hand aria-hidden="true"/>
    <dl>
      <dd class="capitalize">{player.throwing}</dd>
      <dt class="info-label">Throws</dt>
    </dl>
  </div>
</div>

<style>
  .player-card {
    padding: calc(var(--spacing) * 3);
  }

  .info-row {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .info-label {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
    font-weight: var(--font-weight-light);
  }

  .divider {
    margin-block: calc(var(--spacing) * 2);
  }

  .positions-list {
    display: flex;
    flex-wrap: wrap;
  }

  .position-item:not(:last-child)::after {
    content: ",\00a0";
  }
</style>
