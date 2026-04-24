<script lang="ts">
  import Chart from "$lib/dp/components/charts/Chart.svelte";
  import {ColorUtility} from "$lib/tib/service/ColorUtility.ts";
  import type {StreakDataEntry} from "$lib/tib/types/HomeDataset.ts";
  import type {ChartConfiguration} from "chart.js";

  interface Props {
    streakData: StreakDataEntry[];
  }

  const {streakData}: Props = $props();

  const labels = $derived(streakData.map((d) => Number(d.game)));
  const seriesData = $derived(streakData.map((d) => d.wins_count));

  const config: ChartConfiguration = $derived({
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Wins Count",
          data: seriesData,
          borderColor: ColorUtility.SkylarksRed,
          backgroundColor: ColorUtility.SkylarksRed,
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 5,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: "Gamedays",
          },
        },
        y: {
          title: {
            display: true,
            text: "Wins Count",
          },
        },
      },
      plugins: {
        legend: {align: "start"},
      },
      interaction: {
        intersect: true,
        mode: "index",
      },
    },
  });
</script>

<Chart {config} height={350}>
  {#snippet beforeContent()}
    <h5 class="h5">Season Progression</h5>
  {/snippet}
</Chart>
