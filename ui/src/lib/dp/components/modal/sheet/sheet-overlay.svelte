<script lang="ts">
import { Dialog as SheetPrimitive } from "bits-ui"

let {
  ref = $bindable(null),
  class: className,
  ...restProps
}: SheetPrimitive.OverlayProps = $props()

export { className as class }
</script>

<SheetPrimitive.Overlay
        {...restProps}
        bind:ref
        class={["drawer-overlay", className]}
/>

<style>
    :global {
        .drawer-overlay {
            position: fixed;
            inset: 0;
            z-index: 50;
            background-color: light-dark(var(--color-surface-100), #0a0a0a80);

            @media (prefers-color-scheme: light) {
                opacity: 50%;
            }

            &[data-state="closed"] {
                --tw-exit-opacity: 0;
                animation: exit var(--tw-animation-duration, var(--tw-duration, .15s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-iteration-count, 1) var(--tw-animation-direction, normal) var(--tw-animation-fill-mode, none);
            }

            &[data-state="open"] {
                --tw-enter-opacity: 0;
                animation: enter var(--tw-animation-duration, var(--tw-duration, .15s)) var(--tw-ease, ease) var(--tw-animation-delay, 0s) var(--tw-animation-iteration-count, 1) var(--tw-animation-direction, normal) var(--tw-animation-fill-mode, none);
            }
        }
    }
</style>