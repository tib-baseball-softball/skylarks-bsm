<script lang="ts">
  import {Dialog as SheetPrimitive} from "bits-ui";

  let {ref = $bindable(null), class: className, ...restProps}: SheetPrimitive.TitleProps = $props();
</script>

<SheetPrimitive.Title
  {...restProps}
  bind:ref
  class={["text-foreground", className]}
/>
