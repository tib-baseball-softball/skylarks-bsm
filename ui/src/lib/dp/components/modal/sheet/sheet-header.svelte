<script lang="ts">
  import type {HTMLAttributes} from "svelte/elements";
  import type {WithElementRef} from "bits-ui";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  {...restProps}
  bind:this={ref}
  class={["root", className]}
>
  {@render children?.()}
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    row-gap: calc(var(--spacing) * 2);
    text-align: center;
  }

  @media (min-width: 40rem) {
    .root {
      text-align: left;
    }
  }
</style>
