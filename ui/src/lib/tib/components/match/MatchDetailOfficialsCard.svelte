<script lang="ts">
  import type {Match} from "bsm.js";
  import {Pencil, User} from "lucide-svelte";

  interface Props {
    match: Match;
  }

  let {match}: Props = $props();
</script>

<div class="card preset-tonal-surface root">
  <h4 class="h6">Umpire</h4>

  <div class="list">
    {#each match.umpire_assignments as umpire}
      <div class="entry">
        <User/>
        <div>
          <p>{umpire.license.person.last_name}, {umpire.license.person.first_name}</p>
          <p class="sub">{umpire.license.number}</p>
        </div>
      </div>
    {:else }
      <p class="sub">No umpires assigned yet.</p>
    {/each}
  </div>

  <hr>

  <h4 class="h6">Scorer</h4>

  <div class="list">
    {#each match.scorer_assignments as scorer}
      <div class="entry">
        <Pencil/>
        <div>
          <p>{scorer.license.person.last_name}, {scorer.license.person.first_name}</p>
          <p class="sub">{scorer.license.number}</p>
        </div>
      </div>
    {:else }
      <p class="sub">No scorers assigned yet.</p>
    {/each}
  </div>
</div>

<style>
  .root {
    border: 1px solid var(--color-surface-500);
    padding: calc(var(--spacing) * 3);
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
    margin-top: calc(var(--spacing) * 1);
  }

  .entry {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 3);
  }

  .sub {
    font-size: var(--text-sm);
    font-weight: 300;
  }

  hr {
    margin-block: calc(var(--spacing) * 3);
  }
</style>
