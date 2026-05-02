<script lang="ts">
  import {House, Shield, Table, Ticket, Users} from "lucide-svelte";
  import {page} from "$app/state";

  interface Props {
    classes?: string;
  }

  const {classes = ""}: Props = $props();
</script>

<ul>
  <li>
    <a
      class={classes}
      class:preset-filled-primary-500={page.url.pathname === "/"}
      href="/"
    >
      <House/>
      <span>Home</span>
    </a>
  </li>
  <li>
    <a
      class={classes}
      class:preset-filled-primary-500={page.url.pathname.startsWith(
        "/gamecenter",
      )}
      href="/gamecenter"
    >
      <Ticket/>
      <span>Games</span>
    </a>
  </li>

  <li>
    <a
      class={classes}
      class:preset-filled-primary-500={page.url.pathname.startsWith("/leagues")}
      href="/leagues"
    >
      <Table/>
      <span>Leagues</span>
    </a>
  </li>

  <li>
    <a
      class={classes}
      class:preset-filled-primary-500={page.url.pathname.startsWith("/teams")}
      href="/teams"
    >
      <Users/>
      <span>Teams</span>
    </a>
  </li>

  <li>
    <a
      class={classes}
      class:preset-filled-primary-500={page.url.pathname.startsWith("/club")}
      href="/club"
    >
      <Shield/>
      <span>Club</span>
    </a>
  </li>
</ul>

<style>
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color:inherit;
  }

  a:hover {
    background-color: var(--color-primary-50-950);
    color: var(--color-primary-950-50);
  }

  ul {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-block: calc(var(--spacing) * 2);
    gap: calc(var(--spacing) * 2);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-md);
    box-shadow: var(--shadow-sm);

    @media (min-width: 80rem) {
      gap: calc(var(--spacing) * 16);
    }
  }

  li {
    width: 20%;
  }
</style>
