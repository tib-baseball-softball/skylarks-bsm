<script lang="ts" module>
export const sheetVariants = {
  base: "drawer shadow-lg transition",
  side: {
    top: "drawer-top",
    bottom: "drawer-bottom",
    left: "drawer-horizontal drawer-left",
    right: "drawer-horizontal drawer-right",
  },
}

export type Side = "top" | "right" | "bottom" | "left"
</script>

<script lang="ts">
  import {
    Dialog as SheetPrimitive,
    type WithoutChildrenOrChild,
  } from "bits-ui";
  import X from "lucide-svelte/icons/x";
  import type {Snippet} from "svelte";
  import SheetOverlay from "./sheet-overlay.svelte";

  let {
    ref = $bindable(null),
    class: className,
    side = "right",
    portalProps,
    children,
    ...restProps
  }: WithoutChildrenOrChild<SheetPrimitive.ContentProps> & {
    portalProps?: SheetPrimitive.PortalProps;
    side?: Side;
    children: Snippet;
  } = $props();
</script>

<SheetPrimitive.Portal {...portalProps}>
  <SheetOverlay/>
  <SheetPrimitive.Content
          {...restProps}
          bind:ref
          class={["drawer-content", sheetVariants.base, sheetVariants.side[side], className]}
  >
    <SheetPrimitive.Close
            class="btn preset-tonal-surface sheet-close-button"
    >
      <X/>
      <span class="sr-only">Close</span>
    </SheetPrimitive.Close>

    {@render children?.()}
  </SheetPrimitive.Content>
</SheetPrimitive.Portal>
