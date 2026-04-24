<script lang="ts">
  import type {Field} from "bsm.js";

  interface Props {
    field: Field;
  }

  let {field}: Props = $props();

  function convertLineBreaksToHTML(input: string): string {
    return input.replace(/\n{2,}/g, "</p><p>").replace(/\n/g, "<br>");
  }
</script>

<article class="card traffic-card preset-tonal shadow-xl">
  <div class="traffic-content">
    {@html convertLineBreaksToHTML(field.description_html)}
  </div>
</article>

<style>
  .traffic-card {
    padding: calc(var(--spacing) * 3);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .traffic-content {
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 3);
  }
</style>
