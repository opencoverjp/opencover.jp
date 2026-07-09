<script>
  import CoverImage from "./CoverImage.svelte";

  const { isbn, width = 174, height = 285 } = $props();

  let imageSrc = $derived(
    isbn ? `https://image.opencover.jp/v1/cover/front/${isbn}.webp` : "",
  );
</script>

<div class="book-front relative flex justify-end h-[400px]">
  <CoverImage
    src={imageSrc}
    {width}
    {height}
    alt="表紙画像"
    imgClass="h-full object-cover"
    referrerpolicy="no-referrer"
  />
</div>

<style>
  .book-front {
    /* width: var(--width); */
    /* transition: all ease-out .3s; */
  }
</style>
