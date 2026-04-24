<script lang="ts">
  import type {SingleStatElement} from "$lib/dp/types/SingleStatElement.ts";

  interface props {
    block: SingleStatElement;
  }

  const {block}: props = $props();
</script>

<div class="stat">
  <div class="stat-title">{block.title}</div>
  <div class="stat-value">{block.value}</div>
  <div class="stat-desc">{block.desc}</div>
</div>

<style>
  .stat-desc {
    overflow: hidden;
    text-wrap: wrap;
  }
</style>
