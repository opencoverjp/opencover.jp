<script>
  // 表紙・背表紙で共通の「プレースホルダ → 画像読み込み → エラー時フォールバック」表示。
  const {
    src,
    alt,
    width = 174,
    height = 285,
    imgClass = "h-full w-auto",
    referrerpolicy = undefined,
    // src が読み込めなかったときに 1 回だけ切り替える画像(例: 外部書影 → 自前生成の表紙)
    fallbackSrc = undefined,
    // fallbackSrc に切り替えたときに呼ぶ(出典表示を切り替えるため)
    onfallback = undefined,
    placeholderAlt = "読み込み中",
    // 読み込み中(と読み込み失敗時)に、単色の矩形の代わりに描画するスニペット
    placeholder = undefined,
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
  let useFallback = $state(false);

  let currentSrc = $derived(useFallback ? fallbackSrc : src);

  // srcが変わったら読み込み状態をリセット
  $effect(() => {
    src;
    imageLoaded = false;
    imageError = false;
    useFallback = false;
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
    if (fallbackSrc && !useFallback && fallbackSrc !== src) {
      useFallback = true;
      onfallback?.();
      return;
    }
    imageError = true;
  }
</script>

<!-- プレースホルダ画像 -->
{#if !imageLoaded && !imageError}
  {#if placeholder}
    {@render placeholder()}
  {:else}
    <img src={placeholderImageSrc} alt={placeholderAlt} class="h-full w-auto" />
  {/if}
{/if}

<!-- 本来の画像（読み込まれるまで非表示） -->
<img
  bind:this={imgElement}
  src={currentSrc}
  {alt}
  class={`${imgClass} ${!imageLoaded || imageError ? "hidden" : ""}`}
  onload={handleImageLoad}
  onerror={handleImageError}
  {referrerpolicy}
/>

<!-- エラー時の表示 -->
{#if imageError}
  {#if placeholder}
    {@render placeholder()}
  {:else}
    <img src={notFoundImageSrc} alt={notFoundAlt} class="h-full w-auto" />
  {/if}
{/if}
