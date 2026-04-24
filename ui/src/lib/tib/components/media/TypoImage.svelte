<script lang="ts">
  import type {Media} from "$lib/dp/types/MediaData.ts";

  interface Props {
    media: Media;
  }

  let {media}: Props = $props();
</script>

<img alt="{media?.alt}"
     loading="lazy"
     src="{media.url}"
     title="{media?.title}"
>

<style>
  img {
    height: auto;
    max-width: 100%;
    border-radius: var(--radius-lg);
  }
</style>
