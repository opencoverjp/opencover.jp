<script>
  const { isbn } = $props();  
  const scale = 0.5;
  let width = $state(65 * scale);
  let height = $state(865 * scale);
  let containerStyle = $state('');

  // プレースホルダー画像をSVGで動的生成
  let placeholderImageSrc = $derived(generatePlaceholderSvg(width, height, '#f0f0f0'));
  let notFoundImageSrc = $derived(generatePlaceholderSvg(width, height, '#f8d7da'));
  
  function generatePlaceholderSvg(w, h, color) {
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" fill="${color}"><rect width="${w}" height="${h}"/></svg>`;
    return `data:image/svg+xml,${encodeURIComponent(svgContent)}`;
  }

  let imageSrc = $derived(`https://image.opencover.jp/v1/cover/spine/${isbn}.webp`);
  // let imageLoaded = $derived(isbn ? false : true);
  // let imageError = $derived(isbn ? false : true);

  let imageLoaded = $state(false);
  let imageError = $state(false);

  function handleImageLoad(event) {
    width = event.target.naturalWidth * scale;
    height = event.target.naturalHeight * scale;
    // containerStyle = `height: ${height}px; width: ${width}px;`;

    // console.log(event.target.naturalWidth, event.target.naturalHeight, {width, height});
    imageLoaded = true;
  }
  
  function handleImageError() {
    imageError = true;
  }
</script>

<div class="h-full relative inline-block" style={containerStyle}>
<!-- <div class="flex h-[250px] md:h-[400px] w-auto"> -->
<!-- <div class="relative inline-block h-[250px] md:h-[400px] w-auto"> -->
<!-- <div class="relative h-[250px] md:h-[400px] inline-block w-auto"> -->
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
    alt="背表紙画像"
    class={`h-full w-auto ${!imageLoaded || imageError ? 'hidden' : ''}`}
    onload={handleImageLoad}
    onerror={handleImageError}
  />
  <!-- width={width}
  height={height} -->

  <!-- エラー時の表示 -->
  {#if imageError}
    <img 
      src={notFoundImageSrc}
      alt="画像が見つかりません"
      class="h-full w-auto" 
    />
  {/if}
</div>