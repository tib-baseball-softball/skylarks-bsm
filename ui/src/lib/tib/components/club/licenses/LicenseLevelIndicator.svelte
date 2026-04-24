<script lang="ts">
  interface Props {
    level: string;
  }

  let {level}: Props = $props();
</script>

<div aria-label="License level {level}:" class="level" data-level="{level}">
  {level}
</div>

<style>
  .level {
    padding-block: calc(var(--spacing) * 0.5);
    padding-inline: calc(var(--spacing) * 2);
    border-radius: var(--radius-sm);
  }

  [data-level="A"] {
    background-color: var(--color-red-500);
    color: black;
  }

  [data-level="B"] {
    background-color: var(--color-orange-500);
    color: black;
  }

  [data-level="C"] {
    background-color: var(--color-yellow-500);
    color: black;
  }

  [data-level="D"] {
    background-color: var(--color-teal-500);
    color: black;
  }
</style>
