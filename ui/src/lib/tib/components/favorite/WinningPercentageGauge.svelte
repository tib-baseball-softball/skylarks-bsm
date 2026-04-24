<script lang="ts">
  import type {TableRow} from "bsm.js";
  import Chart from "$lib/dp/components/charts/Chart.svelte";
  import {ColorUtility} from "$lib/tib/service/ColorUtility.ts";
  import type {ChartConfiguration, Plugin} from "chart.js";

  interface Props {
    tableRow: TableRow;
  }

  const {tableRow}: Props = $props();
  const percentage = $derived(Math.round(parseFloat(tableRow.quota) * 100));

  // Small plugin to render the percentage value in the center of the doughnut
  const centerTextPlugin: Plugin = {
    id: "centerText",
    afterDraw(chart) {
      const {ctx, chartArea} = chart;
      const x = (chartArea.left + chartArea.right) / 2;
      const y = (chartArea.top + chartArea.bottom) / 2;
      ctx.save();
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // Use the current canvas color (affected by Chart.defaults.color)
      ctx.fillStyle = getComputedStyle(chart.canvas).color || "#000";
      ctx.fillText(`${percentage}%`, x, y);
      ctx.restore();
    },
  };

  const config: ChartConfiguration = $derived({
    type: "doughnut",
    data: {
      labels: ["Pct.", ""],
      datasets: [
        {
          data: [percentage, Math.max(0, 100 - percentage)],
          backgroundColor: [
            ColorUtility.SkylarksSand,
            "rgba(128,128,128,0.25)",
          ],
          borderWidth: 0,
          cutout: "70%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {display: false},
        tooltip: {enabled: false},
      },
    },
    plugins: [centerTextPlugin],
  });
</script>

<Chart {config} height={280}/>
