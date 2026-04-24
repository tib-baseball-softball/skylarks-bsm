<script lang="ts">
  import type {TableHandler} from "@vincjo/datatables";

  interface Props {
    handler: TableHandler;
  }

  let {handler}: Props = $props();
  const pageNumber = $derived(handler.currentPage);
  const pageCount = $derived(handler.pageCount);
  const pages = $derived(handler.pagesWithEllipsis);
</script>

<!-- Desktop buttons -->
<section class="desktop-section preset-outlined-primary-500 rounded-container">
  <button
    class="nav-button"
    class:disabled={pageNumber === 1}
    onclick={() => handler.setPage('previous')}
    type="button"
  >
    ←
  </button>
  {#each pages as page}
    <button
      type="button"
      class="nav-button"
      class:active={pageNumber === page}
      class:ellipse={page === null}
      onclick={() => handler.setPage(page)}
    >
      {page ?? '...'}
    </button>
  {/each}
  <button
    class="nav-button"
    class:disabled={pageNumber === pageCount}
    onclick={() => handler.setPage('next')}
    type="button"
  >
    →
  </button>
</section>

<!-- Mobile buttons -->
<section class="mobile-section">
  <button
    class="btn preset-outlined-primary-500"
    class:disabled={pageNumber === 1}
    onclick={() => handler.setPage('previous')}
    type="button"
  >
    ←
  </button>
  <button
    class="btn preset-outlined-primary-500"
    class:disabled={pageNumber === pageCount}
    onclick={() => handler.setPage('next')}
    type="button"
  >
    →
  </button>
</section>

<style>
  .desktop-section {
    display: none;
    align-items: center;
    height: calc(var(--spacing) * 10);

    @media (min-width: 64rem) {
      display: flex;
    }
  }

  .nav-button {
    padding: calc(var(--spacing) * 2);

    &:hover:not(.disabled) {
      background-color: color-mix(in srgb, var(--color-primary-500), transparent 80%);
    }

    &.active {
      background-color: var(--color-primary-500);
      color: white;
    }
  }

  .mobile-section {
    display: flex;
    gap: calc(var(--spacing) * 2);
    margin-block-end: calc(var(--spacing) * 2);

    @media (min-width: 64rem) {
      display: none;
    }
  }
</style>
