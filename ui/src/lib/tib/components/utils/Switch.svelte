<script lang="ts">
  import type {Snippet} from "svelte";

  interface Props {
    name?: string;
    checked?: boolean;
    disabled?: boolean;
    className?: string;
    children?: Snippet;
    onCheckedChange?: (e: { checked: boolean }) => void;
  }

  let {
    name,
    checked = $bindable(),
    disabled = false,
    className,
    onCheckedChange,
    children,
  }: Props = $props();

  function handleChange(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    checked = target.checked;
    onCheckedChange?.({checked});
  }
</script>

<label class={["root", className]} data-testid="switch">
  <input
    bind:checked={checked}
    class="sr-only"
    data-testid="switch-input"
    {disabled}
    name={name}
    onchange={handleChange}
    type="checkbox"
  />

  <span
    aria-hidden="true"
    class="switch-control"
    data-testid="switch-control"
  >
    <span
      aria-hidden="true"
      class="switch-thumb"
      data-testid="switch-thumb"
    >
    </span>

  </span>
  {@render children?.()}
</label>

<style>
  .root {
    display: inline-flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }

  input[type="checkbox"]:checked + .switch-control {
    justify-content: end;
    background-color: var(--switch-active-bg, var(--color-primary-600));
  }

  .switch-control {
    width: calc(var(--spacing) * 10);
    height: calc(var(--spacing) * 6);
    padding: calc(var(--spacing) * 0.5);
    border-radius: calc(infinity * 1px);
    border: 1px solid var(--color-surface-700-300);
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: light-dark(var(--color-surface-300), var(--color-surface-700));
  }

  .switch-thumb {
    aspect-ratio: 1 / 1;
    height: 100%;
    border-radius: calc(infinity * 1px);
    background-color: white;
    --tw-shadow: 0 1px 3px 0 var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 1px 2px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
  }

  .switch-control, .switch-thumb {
    transition-property: color, background-color, border-color, outline-color, text-decoration-color, fill, stroke, --tw-gradient-from, --tw-gradient-via, --tw-gradient-to, opacity, box-shadow, transform, translate, scale, rotate, filter, -webkit-backdrop-filter, backdrop-filter, display, content-visibility, overlay, pointer-events;
    transition-timing-function: var(--tw-ease, var(--default-transition-timing-function));
    --tw-duration: 200ms;
    transition-duration: 200ms;
  }
</style>
