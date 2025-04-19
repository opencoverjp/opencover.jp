<script lang="ts">
  import type { LayoutProps } from './$types';

  let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
  <title>opencover : Test</title>
  {#if data.meta}
    {#each data.meta as meta}
      <meta property={meta.property} content={meta.content} />
    {/each}
  {/if}
</svelte:head>

{@render children()}