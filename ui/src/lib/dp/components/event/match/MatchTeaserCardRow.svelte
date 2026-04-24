<script lang="ts">
  interface Props {
    logo: string;
    teamName: string;
    score: number | undefined;
    subduedScore: boolean;
  }

  let {logo, teamName, score, subduedScore}: Props = $props();
</script>

<div class="row">
  <img alt="team logo for {teamName}" loading="lazy" src="{logo}" width="50"/>
  <span>{teamName}</span>
  <span class="score" class:subdued={subduedScore}>{score ?? " "}</span>
</div>

<style>
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .score {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-extrabold);

    &.subdued {
      color: var(--color-surface-700-300);
    }
  }
</style>
