<script lang="ts">
import type { AdditionalStat } from "bsm.js"

interface Props {
  entries: AdditionalStat[]
}

let { entries }: Props = $props()
</script>

<span class="entries">
    {#each entries as entry}
        <span>{entry.person.last_name} {entry.person.first_name.charAt(0)}.
            {#if entry.count > 1}
                ({entry.count})
            {/if}
        </span>
    {/each}
</span>

<style>
    .entries span:not(:last-child)::after {
        content: ", ";
    }
</style>