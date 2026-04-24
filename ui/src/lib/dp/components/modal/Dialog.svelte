<script lang="ts">
  import type { Snippet } from "svelte";
  import { Dialog, type WithoutChild } from "bits-ui";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { X } from "lucide-svelte";

  /**
   * Modal dialog based on headless bits-ui building blocks.
   * Replacement for Skeleton modal.
   */

  type Props = Dialog.RootProps & {
    triggerClasses?: string;
    title: Snippet;
    description?: Snippet;
    contentProps?: WithoutChild<Dialog.ContentProps>;
    triggerProps?: WithoutChild<Dialog.TriggerProps>;
    triggerContent: Snippet;
    closeButtonClasses?: string;
    disabled?: boolean;
  };

  let {
    open = $bindable(false),
    children,
    triggerClasses = "",
    contentProps,
    triggerProps,
    title,
    description,
    triggerContent,
    closeButtonClasses = "",
    disabled = false,
    ...restProps
  }: Props = $props();
</script>

<Dialog.Root {...restProps} bind:open>
  <Dialog.Trigger
    {...triggerProps}
    class="{triggerClasses} trigger"
    {disabled}
    type="button"
  >
    {@render triggerContent()}
  </Dialog.Trigger>

  <Dialog.Portal>
    <Dialog.Overlay class="dialog-overlay" />
    <Dialog.Content
      {...contentProps}
      class="card dialog-content shadow-2xl"
      forceMount
    >
      {#snippet child({ props, open })}
        {#if open}
          <div
            {...props}
            transition:fly={{ y: 150, duration: 100, easing: cubicInOut }}
          >
            <div class="header">
              <Dialog.Close
                class="close-button btn preset-tonal-surface {closeButtonClasses}"
              >
                <X />
              </Dialog.Close>

              <div class="title">
                <Dialog.Title>
                  {@render title()}
                </Dialog.Title>
              </div>
            </div>

            {#if description}
              <Dialog.Description>
                {@render description?.()}
              </Dialog.Description>
            {/if}

            {@render children?.()}
          </div>
        {/if}
      {/snippet}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<style>
  .trigger {
    display: flex;
    gap: calc(var(--spacing) * 1);
  }

  .header {
    display: flex;
    gap: calc(var(--spacing) * 5);
    align-items: center;
    margin-bottom: calc(var(--spacing) * 2);
  }

  .title {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-semibold);
  }

  .close-button {
    border: 1px solid;
  }
</style>
