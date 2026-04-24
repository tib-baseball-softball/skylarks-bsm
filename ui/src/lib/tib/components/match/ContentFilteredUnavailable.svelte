<script lang="ts">
  import {BookX} from "lucide-svelte";

  interface Props {
    text?: string;
  }

  let {text = "There is no data to display for the selected filters."}: Props = $props();
</script>

<div class="wrapper">
  <BookX size="35"/>
  <p>{text}</p>
</div>

<style>
  .wrapper {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 4);
    margin-block: calc(var(--spacing) * 3);
  }
</style>
