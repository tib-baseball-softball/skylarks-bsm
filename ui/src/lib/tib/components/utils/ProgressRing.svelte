<script lang="ts">
  interface Props {
    classes?: string;
  }

  let {classes = ""}: Props = $props();
</script>

<svg class="root {classes}" height="250" viewBox="0 0 250 250" width="250">
  <circle class="bg" r="0"></circle>
  <circle class="fg" r="0"></circle>
</svg>

<style>
  .root {
    --size: 150px;
    --half-size: calc(var(--size) / 2);
    --stroke-width: 20px;
    --radius: calc((var(--size) - var(--stroke-width)) / 2);
    --circumference: calc(var(--radius) * 3.1416 * 2);

    circle {
      cx: var(--half-size);
      cy: var(--half-size);
      r: var(--radius);
      stroke-width: var(--stroke-width);
      fill: none;
      stroke-linecap: round;
    }

    circle.bg {
      stroke: light-dark(var(--color-surface-50), var(--color-surface-500));
    }

    circle.fg {
      stroke: var(--color-tertiary-500);
      stroke-dasharray: calc(var(--circumference) * 0.75),
      var(--circumference);
      stroke-dashoffset: 0;
      transform-origin: var(--half-size) var(--half-size);
      animation: spin 1.5s linear infinite;
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
