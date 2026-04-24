<script lang="ts">
  import type {Table} from "bsm.js";
  import Chart from "$lib/dp/components/charts/Chart.svelte";
  import {ColorUtility} from "$lib/tib/service/ColorUtility.ts";
  import type {ChartConfiguration} from "chart.js";

  interface Props {
    table: Table;
  }

  const {table}: Props = $props();

  const labels = $derived(table.rows.map((row) => row.short_team_name));
  const data = $derived(table.rows.map((row) => row.wins_count));
  const backgroundColor = $derived(
    table.rows.map((row) =>
      row.short_team_name.includes("BEA")
        ? ColorUtility.SkylarksRed
        : ColorUtility.getDynamicColorNavySand(),
    ),
  );

  const config: ChartConfiguration = $derived({
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Wins",
          data,
          backgroundColor,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          title: {
            display: true,
            text: "Total Wins",
          },
        },
      },
      plugins: {
        legend: {display: false},
        tooltip: {enabled: true},
      },
    },
  });
</script>

<Chart {config} height={350}>
  {#snippet beforeContent()}
    <h5 class="h5">League Wins Visualisation</h5>
  {/snippet}
</Chart>
