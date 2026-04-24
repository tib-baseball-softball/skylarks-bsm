<script lang="ts">
  import {appLocale} from "$lib/dp/locale.svelte.ts";

  // formats a date in PocketBase string format to local date for display

  interface Props {
    date: string;
  }

  let {date}: Props = $props();

  const formattedDate = $derived(new Date(date));
</script>

{formattedDate.toLocaleString(appLocale.current)}
