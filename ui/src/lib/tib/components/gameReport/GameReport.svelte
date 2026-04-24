<script lang="ts">
  import GameReportHeader from "$lib/tib/components/gameReport/GameReportHeader.svelte";
  import TypoImage from "$lib/tib/components/media/TypoImage.svelte";
  import type {GameReport} from "$lib/tib/types/GameReport.ts";

  interface Props {
    report: GameReport;
    classes?: string;
  }

  let {report, classes = ""}: Props = $props();
</script>

<div class="report-outer-wrapper">
  <!-- MARK: Language Tag (as long as we do not have English content) -->
  <div class="{classes} report-inner-container" lang="de">
    <h2 class="h2 report-title">{report.title}</h2>
    <article>
      <GameReportHeader report={report}/>

      <section class="prose">
        {#if report.header_image}
          {#each report.header_image as image}
            <TypoImage media={image}/>
          {/each}
        {/if}

        <div class="introduction">
          {@html report.introduction}
        </div>
      </section>

      <hr class="section-separator">

      <section class="prose game-report-section">
        <h3 class="h3">Bericht Spiel 1</h3>

        {@html report.report_first}
      </section>

      {#if report.report_second}
        <section class="prose game-report-section secondary-report">
          <h3 class="h3">Bericht Spiel 2</h3>

          {@html report.report_second}
        </section>
      {/if}

      {#if report.preview}
        <section class="card preview-section preset-tonal shadow-xl">
          <h3 class="h3">Ausblick</h3>

          {@html report.preview}
        </section>
      {/if}

      {#if report.gallery}
        <section class="gallery-section">
          <h3 class="h3 gallery-title">Bildergalerie</h3>

          <div class="gallery-grid">

            {#each report.gallery as image}
              <TypoImage media={image}/>
            {/each}

          </div>
        </section>
      {/if}
    </article>
  </div>
</div>

<style>
  .report-outer-wrapper {
    display: flex;
    justify-content: center;
  }

  .report-title {
    margin-bottom: calc(var(--spacing) * 3);
  }

  .introduction {
    margin-top: calc(var(--spacing) * 3);
  }

  .section-separator {
    margin-block: calc(var(--spacing) * 6) !important;
  }

  .game-report-section {
    margin-top: calc(var(--spacing) * 4);

    &.secondary-report {
      margin-top: calc(var(--spacing) * 3);
    }
  }

  .preview-section {
    border-radius: var(--radius-base);
    padding: calc(var(--spacing) * 4);
    margin-block: calc(var(--spacing) * 4);

    :global([data-theme='dark']) & {
      border: 1px solid var(--color-surface-500);
    }
  }

  .gallery-section {
    margin-block: calc(var(--spacing) * 5);
  }

  .gallery-title {
    margin-bottom: calc(var(--spacing) * 3);
  }

  .gallery-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: calc(var(--spacing) * 3);

    @media (min-width: 48rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  .prose :global {
    max-width: unset;
    text-align: justify;

    p {
      margin: 1rem 0;
    }
  }
</style>
