<script>
  import { fade } from 'svelte/transition';
  export let isbn;
  export let width = 174;
  export let height = 285;

  // プレースホルダー画像をSVGで動的生成
  $: placeholderImageSrc = generatePlaceholderSvg(width, height, '#f0f0f0');
  $: notFoundImageSrc = generatePlaceholderSvg(width, height, '#f8d7da');
  
  // SVGプレースホルダーを動的に生成する関数
  function generatePlaceholderSvg(w, h, color) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="${color}"><rect width="${w}" height="${h}"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }
  let imageLoaded = false;
  let imageError = false;
  let imageSrc = "";

  $: {
    if (isbn) {
      imageSrc = `https://image.opencover.jp/v1/cover/front/${isbn}.jpg`;
      // imageSrc = `https://ndlsearch.ndl.go.jp/thumbnail/${isbn}.jpg`;
      imageLoaded = false;
      imageError = false;
    }
  }

  function handleImageLoad() {
    imageLoaded = true;
  }
  
  function handleImageError() {
    imageError = true;
  }
</script>

<div class="book-front relative flex justify-end h-full">
  <!-- プレースホルダー画像 -->
  {#if !imageLoaded && !imageError}
    <img 
      src={placeholderImageSrc} 
      alt="読み込み中"
      class="h-full w-auto" 
    />
  {/if}
  
  <!-- 本来の画像（読み込まれるまで非表示） -->
  <img
    src={imageSrc} 
    alt="表紙画像"
    class="h-full object-cover {!imageLoaded || imageError ? 'hidden' : ''}" 
    on:load={handleImageLoad}
    on:error={handleImageError}
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
    width: var(--width);
    /* transition: all ease-out .3s; */
  }
</style>