<script lang="ts">
  import type {Match} from "bsm.js";
  import {Share} from "lucide-svelte";
  import {ShareUtility} from "$lib/tib/service/ShareUtility.ts";

  interface Props {
    match: Match;
  }

  const {match}: Props = $props();

  const shareUtility = new ShareUtility();
</script>

<button
        class="btn preset-filled"
        onclick={() => shareUtility.shareGame(match, "de-DE")}
        title="Share game data using your browser"
>
  Share Game
  <Share/>
</button>