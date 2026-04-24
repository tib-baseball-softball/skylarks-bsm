<script lang="ts">
  import type {Club} from "bsm.js";
  import {ClipboardList, Shield, Tag} from "lucide-svelte";

  interface Props {
    club: Club;
  }

  let {club}: Props = $props();
</script>

<section>
  <article class="logo-wrapper">
    <img
      alt="Skylarks Logo"
      class="club-logo"
      src="/icon_dp.svg"
    />
  </article>

  <article class="card club-info-card preset-tonal shadow-xl">
    <div class="row">
      <ClipboardList/>
      <span>{club.short_name}</span>
    </div>

    <hr>

    <div class="row">
      <Tag/>
      <span>
        {club.acronym} / 0{club?.organization_id} {club.number}
      </span>
    </div>

    <hr>

    <div class="row">
      <Shield/>
      <span>{club.main_club}</span>
    </div>
  </article>
</section>

<style>
  .logo-wrapper {
    display: flex;
    justify-content: center;
    margin-block: 1.5rem;
  }

  .club-logo {
    width: 6rem;
    height: auto;
    margin-bottom: calc(var(--spacing) * 1);
  }

  .club-info-card {
    padding: calc(var(--spacing) * 3);
    margin-block: 1.5rem;

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .row {
    display: flex;
    gap: 1rem;
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
