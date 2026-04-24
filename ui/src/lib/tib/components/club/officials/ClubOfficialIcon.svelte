<script lang="ts">
import type { ClubFunction } from "bsm.js"
import { Crown, Euro, type Icon as IconType, Pen, Pencil, User, Users } from "lucide-svelte"

interface Props {
  clubOfficial: ClubFunction
}

let { clubOfficial }: Props = $props()

// this is kind of hacky, but on the iOS side it has been working for 3 years now
//@wc-ignore
let icon: typeof IconType = $derived.by(() => {
  if (clubOfficial.function.includes("Abteilungsleit")) {
    return Crown
  } else if (clubOfficial.category.includes("Kasse")) {
    return Euro
  } else if (clubOfficial.function.includes("Schriftwart")) {
    return Pen
  } else if (clubOfficial.category.includes("Jugend")) {
    return Users
  } else if (clubOfficial.category.includes("Umpire")) {
    return User
  } else if (clubOfficial.category.includes("Scorer")) {
    return Pencil
  } else {
    return User
  }
})
</script>

{#snippet iconSnippet()}
  {@const Icon = icon}
  <Icon/>
{/snippet}

<div
        class="wrapper"
        class:primary={clubOfficial.category === "Vorstand/Abteilungsleitung" || clubOfficial.category === "Kasse/Finanzen"}
>
  {@render iconSnippet()}
</div>

<style lang="postcss">
    .wrapper {
        color: light-dark(rgb(var(--color-secondary-500)), rgb(var(--color-tertiary-500)));
    }

    .wrapper.primary {
        color: rgb(var(--color-primary-500));
    }
</style>