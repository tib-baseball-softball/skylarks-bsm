<script lang="ts">
  interface Props {
    content: string;
    classes?: string;
  }

  let {content, classes = "preset-filled-primary-500"}: Props = $props();
</script>

<span class="root {classes}">
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
  }
</style>
