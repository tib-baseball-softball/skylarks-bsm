<script lang="ts">
  import {onDestroy, onMount, type Snippet} from "svelte";
  import {browser} from "$app/environment";
  import type {Chart as ChartJS, ChartConfiguration} from "chart.js";

  interface Props {
    config: ChartConfiguration;
    beforeContent?: Snippet;
    height?: number; // in px, used to size the container
  }

  let {config, beforeContent, height = 350}: Props = $props();

  let canvasEl: HTMLCanvasElement;
  let chart: ChartJS | undefined;
  let darkModeQuery: MediaQueryList | null = null;
  let onThemeChange: ((e: MediaQueryListEvent) => void) | null = null;

  onMount(async () => {
    if (!browser) return;

    const ChartAuto = (await import("chart.js/auto")).default;

    // Initialize theme defaults before creating the chart
    darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function applyThemeDefaults(event: MediaQueryListEvent | MediaQueryList) {
      // Use global defaults for text and borders so we don't have to wire every nested option
      ChartAuto.defaults.color = event.matches ? "#ffffff" : "#000000";
      ChartAuto.defaults.borderColor = event.matches
        ? "rgba(255,255,255,0.15)"
        : "rgba(0,0,0,0.1)";
    }

    applyThemeDefaults(darkModeQuery);

    chart = new ChartAuto(canvasEl.getContext("2d")!, config);
    chart.update();

    onThemeChange = (e: MediaQueryListEvent) => {
      applyThemeDefaults(e);
      chart?.update();
    };

    darkModeQuery.addEventListener("change", onThemeChange);
  });

  onDestroy(() => {
    if (darkModeQuery && onThemeChange) {
      darkModeQuery.removeEventListener("change", onThemeChange);
    }
    chart?.destroy();
  });
</script>

<div class="chart-wrapper" style={`height:${height}px`}>
  {@render (beforeContent?.())}
  <canvas bind:this={canvasEl} class="chart-canvas"></canvas>
</div>

<style>
  .chart-wrapper {
    position: relative;
    width: 100%;
  }

  .chart-canvas {
    display: block;
    width: 100% !important;
    height: 100% !important;
    background: none;
  }
</style>
