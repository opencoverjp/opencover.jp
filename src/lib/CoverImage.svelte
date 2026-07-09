<script>
  // 表紙・背表紙で共通の「プレースホルダ → 画像読み込み → エラー時フォールバック」表示。
  const {
    src,
    alt,
    width = 174,
    height = 285,
    imgClass = "h-full w-auto",
    referrerpolicy = undefined,
    placeholderAlt = "読み込み中",
    notFoundAlt = "画像が見つかりません",
  } = $props();

  // プレースホルダ画像をSVGで動的生成
  let placeholderImageSrc = $derived(
    generatePlaceholderSvg(width, height, "#f0f0f0"),
  );
  let notFoundImageSrc = $derived(
    generatePlaceholderSvg(width, height, "#f8d7da"),
  );

  function generatePlaceholderSvg(w, h, color) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="${color}"><rect width="${w}" height="${h}"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }

  let imageLoaded = $state(false);
  let imageError = $state(false);

  // srcが変わったら読み込み状態をリセット
  $effect(() => {
    src;
    imageLoaded = false;
    imageError = false;
  });

  let imgElement;

  $effect(() => {
    if (imgElement && imgElement.complete && imgElement.naturalWidth > 0) {
      imageLoaded = true;
    }
  });

  function handleImageLoad() {
    imageLoaded = true;
  }

  function handleImageError() {
    imageError = true;
  }
</script>

<!-- プレースホルダ画像 -->
{#if !imageLoaded && !imageError}
  <img src={placeholderImageSrc} alt={placeholderAlt} class="h-full w-auto" />
{/if}

<!-- 本来の画像（読み込まれるまで非表示） -->
<img
  bind:this={imgElement}
  {src}
  {alt}
  class={`${imgClass} ${!imageLoaded || imageError ? "hidden" : ""}`}
  onload={handleImageLoad}
  onerror={handleImageError}
  {referrerpolicy}
/>

<!-- エラー時の表示 -->
{#if imageError}
  <img src={notFoundImageSrc} alt={notFoundAlt} class="h-full w-auto" />
{/if}
