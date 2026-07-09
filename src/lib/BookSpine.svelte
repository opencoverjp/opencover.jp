<script>
  import CoverImage from "./CoverImage.svelte";

  const { isbn } = $props();

  // let imageSrc = $derived(`https://image.opencover.jp/v1/cover/spine/${isbn}.webp`);
  let imageSrc = $derived(`/api/v1/image/cover/spine/${isbn}.webp`);
</script>

<div class="spine h-[400px] relative inline-block">
  <CoverImage src={imageSrc} width={65} height={865} alt="背表紙画像" />
</div>

<style>
  .spine {
    border: 1px solid var(--border-color);
  }
</style>
