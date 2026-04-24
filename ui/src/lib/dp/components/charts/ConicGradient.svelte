<script lang="ts">
  interface ConicStop {
    /** The legend label value. */
    label?: string;
    /** The desired color value. */
    color: string;
    /** Starting stop value (0-100) */
    start: number;
    /** Ending stop value (0-100) */
    end: number;
  }

  const {
    stops = [{color: "neutral", start: 0, end: 100}],
    legend = false,
    spin = false,
    size = "6rem",
    hover = "bg-primary-hover-token",
    digits = 0,
    regionCaption = "",
    regionCone = "",
    regionLegend = "",
  } = $props<{
    /** Provide a data set of color stops and labels. */
    stops?: ConicStop[]
    /** Enable a contextual legend. */
    legend?: boolean
    /** When enabled, the conic gradient will spin. */
    spin?: boolean
    /** Set the conic gradient size (CSS length), defaults to 6rem. */
    size?: string
    /** Style the legend hover effect. */
    hover?: string
    /** Set the number of digits on the legend values. */
    digits?: number
    /** Style the caption region above the gradient. */
    regionCaption?: string
    /** Style the conic gradient region. */
    regionCone?: string
    /** Style the legend region below the gradient. */
    regionLegend?: string
  }>();

  // Local variables
  let cone: string = $state("");
  let generatedLegendList: any[] = $state([]);

  // Styles - semantic class names
  const cBase = "conic-base";
  const cCaption = "conic-caption-text";
  const cCone = "conic-cone-shape";
  const cLegend = "conic-legend-list";
  const cSwatch = "conic-swatch-indicator";

  // Generate Conic Gradient style
  function genConicGradient(): void {
    let d: any = stops?.map((v: ConicStop) => `${v.color} ${v.start}% ${v.end}%`);
    cone = `conic-gradient(${d.join(", ")})`;
  }

  // Generate Legend
  function genLegend(): any {
    if (!legend) return;
    generatedLegendList = stops?.map((v: ConicStop) => {
      return {
        label: v.label,
        color: v.color,
        value: (v.end - v.start).toFixed(digits),
      };
    });
  }

  $effect(() => {
    genConicGradient();
    genLegend();
  });

  const classesBase = $derived(`${cBase}`);
  const classesCaption = $derived(`${cCaption} ${regionCaption}`);
  const classesCone = $derived(`${cCone} ${regionCone}`);
  const classesLegend = $derived(`${cLegend} ${regionLegend}`);
</script>

<!--
@component Converted from Skeleton v2
-->

<figure class="conic-gradient {classesBase}" data-testid="conic-gradient">
  <!-- Label -->
  <figcaption class="conic-caption {classesCaption}"></figcaption>
  <!-- Conic Gradient -->
  {#if cone}
    <div class="conic-cone {classesCone}" class:animate-spin={spin} style:background={cone} style:width={size}></div>
  {/if}
  <!-- Legend -->
  {#if legend && generatedLegendList}
    <ul class="conic-list list {classesLegend}">
      {#each generatedLegendList as {color, label, value}}
        <li class="conic-item {hover}">
          <span class="conic-swatch {cSwatch}" style:background={color}></span>
          <span class="conic-label">{label}</span>
          <strong class="conic-value">{value}%</strong>
        </li>
      {/each}
    </ul>
  {/if}
</figure>

<style>
  .conic-base {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: calc(var(--spacing) * 4);
  }

  .conic-caption-text {
    text-align: center;
  }

  .conic-cone-shape {
    display: block;
    aspect-ratio: 1;
    border-radius: 9999px;
  }

  .conic-legend-list {
    font-size: var(--text-sm);
    line-height: var(--tw-leading, var(--text-sm--line-height));
    width: 100%;
  }

  .conic-item {
    font-size: var(--text-xs);
    line-height: var(--tw-leading, var(--text-xs--line-height));
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
    margin-block: calc(var(--spacing) * 2);
  }

  .conic-label {
    flex: 1 1 auto;
  }

  .conic-swatch-indicator {
    display: block;
    aspect-ratio: 1;
    background-color: black;
    width: calc(var(--spacing) * 5);
    border-radius: 9999px;
  }
</style>
