<script lang="ts">
  import {CalendarDays, ClipboardList, Pen} from "lucide-svelte";
  import type {GameReport} from "$lib/tib/types/GameReport.ts";

  interface Props {
    report: GameReport;
    classes?: string;
  }

  let {report, classes = ""}: Props = $props();

  const date = $derived(new Date(report.date));
</script>

<section
  class="{classes} card report-header preset-tonal shadow-xl">
  <div class="row">
    <CalendarDays/>
    <span class="label">Veröffentlicht: </span>
    <span>{date.toLocaleDateString()}</span>
  </div>

  <hr>

  <div class="row">
    <ClipboardList/>
    <span class="label">Liga: </span>
    <span>{report.league.name} ({report.league.season})</span>
  </div>

  <hr>

  <div class="row">
    <Pen/>
    <span class="label">Autor: </span>
    <span>{report.author}</span>
  </div>

</section>

<style>
  .report-header {
    border-radius: var(--radius-base);
    padding: calc(var(--spacing) * 4);
    margin-block: calc(var(--spacing) * 4);

    @media (prefers-color-scheme: dark) {
      border: 1px solid var(--color-surface-500);
    }
  }

  .row {
    display: flex;
    gap: calc(var(--spacing) * 4);
  }

  .label {
    font-weight: bold;
  }

  hr {
    margin-block: calc(var(--spacing) * 2);
  }
</style>
