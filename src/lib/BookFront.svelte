<script>
  const { isbn, width = 174, height = 285 } = $props();

  // プレースホルダー画像をSVGで動的生成
  let placeholderImageSrc = $derived(
    generatePlaceholderSvg(width, height, "#f0f0f0"),
  );
  let notFoundImageSrc = $derived(
    generatePlaceholderSvg(width, height, "#f8d7da"),
  );

  // SVGプレースホルダーを動的に生成する関数
  function generatePlaceholderSvg(w, h, color) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="${color}"><rect width="${w}" height="${h}"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }

  let imageSrc = $derived(
    isbn ? `https://image.opencover.jp/v1/cover/front/${isbn}.webp` : "",
  );

  let imageLoaded = $state(false);
  let imageError = $state(false);

  // Reset states when isbn changes
  $effect(() => {
    // access isbn to track dependency
    if (isbn) {
      imageLoaded = false;
      imageError = false;
    }
  });

  let imgElement;

  $effect(() => {
    if (imgElement && imgElement.complete) {
      handleImageLoad();
    }
  });

  function handleImageLoad() {
    imageLoaded = true;
  }

  function handleImageError() {
    imageError = true;
  }
</script>

<div class="book-front relative flex justify-end h-[400px]">
  <!-- プレースホルダー画像 -->
  {#if !imageLoaded && !imageError}
    <img src={placeholderImageSrc} alt="読み込み中" class="h-full w-auto" />
  {/if}

  <!-- 本来の画像（読み込まれるまで非表示） -->
  <img
    bind:this={imgElement}
    src={imageSrc}
    alt="表紙画像"
    class="h-full object-cover {!imageLoaded || imageError ? 'hidden' : ''}"
    onload={handleImageLoad}
    onerror={handleImageError}
    referrerpolicy="no-referrer"
  />

  <!-- エラー時の表示 -->
  {#if imageError}
    <img
      src={notFoundImageSrc}
      alt="画像が見つかりません"
      class="h-full w-auto"
    />
  {/if}
</div>

<style>
  .book-front {
    /* width: var(--width); */
    /* transition: all ease-out .3s; */
  }
</style>
