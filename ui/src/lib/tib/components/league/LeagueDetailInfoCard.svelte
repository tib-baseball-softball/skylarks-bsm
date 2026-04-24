<script lang="ts">
  import type {LeagueGroup} from "bsm.js";
  import {Info, Tag, Users, Volleyball} from "lucide-svelte";

  interface Props {
    leagueGroup: LeagueGroup;
  }

  let {leagueGroup}: Props = $props();
</script>

<article class="card preset-tonal-surface">

  <div class="container">
    <Info/>
    <div>
      <p>{leagueGroup.name}</p>
      <p class="text">Name</p>
    </div>
  </div>

  <hr>

  <div class="container">
    <Tag/>
    <div>
      <p>{leagueGroup.acronym}</p>
      <p class="text">Acronym</p>
    </div>
  </div>

  <hr>

  <div class="container">
    <Volleyball/>
    <div>
      <p>{leagueGroup.sport}</p>
      <p class="text">Sport</p>
    </div>
  </div>

  <hr>

  <div class="container">
    <Users/>
    <dl>
      <dd>{leagueGroup.age_group}</dd>
      <dt class="text">Age Group</dt>
    </dl>
  </div>

</article>

<style>
  .card {
    padding: calc(var(--spacing) * 4);
  }

  .container {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }

  .text {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
    font-weight: var(--font-weight-light);
  }
</style>
