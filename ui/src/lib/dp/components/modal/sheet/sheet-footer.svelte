<script lang="ts">
  import type {WithElementRef} from "bits-ui";
  import type {HTMLAttributes} from "svelte/elements";

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
    flex-direction: column-reverse;
  }

  @media (min-width: 40rem) {
    .root {
      flex-direction: row;
      justify-content: end;
      column-gap: calc(var(--spacing) * 2);
    }
  }
</style>
