<script lang="ts">
  interface Props {
    content: string;
  }

  let {content}: Props = $props();
</script>

<span class="root">
    {content}
</span>

<style>
  .root {
    display: block;
    height: 4rem;
    width: 4rem;
    line-height: 4rem;
    border-radius: 50%;
    font-size: 2rem;
    text-align: center;
    color: white;
    font-weight: bold;
    scale: 75%;
    background: var(--color-primary);
  }
</style>
