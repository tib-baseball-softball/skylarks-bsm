<script lang="ts">
  import type {Snippet} from "svelte";

  interface Props {
    icon: Snippet;
    categoryName: string;
    rowValue: string | number;
  }

  let {icon, categoryName, rowValue}: Props = $props();
</script>

<dl class="container">
  {@render icon()}
    <dt class="dt-label">{categoryName}:</dt>
    <dd class="value">{rowValue}</dd>
</dl>

<style>
  .container {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .dt-label {
    font-weight: 300;
    padding: var(--spacing);
  }

  .value {
    font-weight: bold;
  }
</style>
