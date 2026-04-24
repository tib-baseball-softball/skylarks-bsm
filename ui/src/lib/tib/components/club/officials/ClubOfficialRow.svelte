<script lang="ts">
  import type {ClubFunction} from "bsm.js";
  import ClubOfficialIcon from "$lib/tib/components/club/officials/ClubOfficialIcon.svelte";

  interface Props {
    clubOfficial: ClubFunction;
  }

  let {clubOfficial}: Props = $props();
</script>

<div class="official-row">
  <ClubOfficialIcon {clubOfficial}/>

  <dl class="official-details">
    <dt class="official-function">
      {clubOfficial.function}
    </dt>

    <dd class="official-name">
      {clubOfficial.person.last_name}, {clubOfficial.person.first_name}
    </dd>
  </dl>
</div>

<style>
  .official-row {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .official-details {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 0.5);
  }

  .official-function {
    font-weight: 300;
    font-size: var(--text-sm);
  }
</style>
