<script lang="ts">
  import DemoPanel from "$lib/DemoPanel.svelte";

  const isbns = [
    "9784087213126",
    "9784480076403",
    "9784004320340",
    "9784121028440",
  ];
</script>

<svelte:head>
  <title>DemoPanel | OpenCover.jp</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="py-8">
  <h1 class="text-xl font-semibold text-center">DemoPanel 確認用</h1>
  <DemoPanel {isbns} />

  <h2 class="text-lg font-semibold text-center mt-8">別の ISBN セット</h2>
  <DemoPanel isbns={["9784004320340", "9784121028440"]} interval={3000} />
</div>
