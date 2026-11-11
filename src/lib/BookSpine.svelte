<script>
  import CoverImage from "./CoverImage.svelte";
  import SpinePlaceholder from "./SpinePlaceholder.svelte";

  // 背表紙画像は実寸比(約 5px/mm、新書で高さ 865px)で生成されている。
  // 全冊に同じ倍率を掛けて表示することで、判型ごとの高さ・厚みの違いをそのまま出す
  // (honbaco-ui の Book と同じ考え方)。既定値は新書がこれまでどおり 400px になる倍率。
  const DEFAULT_SCALE = 400 / 865;

  // onheight: 表示高さ(px)が決まったら親に知らせる(表紙の高さを揃えるため)
  const { isbn, scale = DEFAULT_SCALE, onheight = undefined } = $props();

  // let imageSrc = $derived(`https://image.opencover.jp/v1/cover/spine/isbn/${isbn}.webp`);
  let imageSrc = $derived(`/api/v1/image/cover/spine/${isbn}.webp`);

  // 画像の実寸(読み込み前・失敗時は新書サイズで仮置き)
  let naturalHeight = $state(865);
  let height = $derived(Math.round(naturalHeight * scale));

  // 画像を先読みして実寸を取得する
  $effect(() => {
    const src = imageSrc;
    naturalHeight = 865;
    let cancelled = false;
    const img = new Image();
    const apply = () => {
      if (!cancelled && img.naturalHeight > 0) naturalHeight = img.naturalHeight;
    };
    img.onload = apply;
    img.src = src;
    // キャッシュ済みだと onload が発火しないことがあるため即時チェック
    if (img.complete) apply();
    return () => {
      cancelled = true;
      img.onload = null;
    };
  });

  $effect(() => {
    onheight?.(height);
  });
</script>

<div class="spine relative inline-block" style:height="{height}px">
  <CoverImage src={imageSrc} width={65} height={865} alt="背表紙画像">
    <!-- 背表紙画像の読み込み中は、書誌データからタイトル・著者を縦書きで描いたプレースホルダを出す -->
    {#snippet placeholder()}
      <SpinePlaceholder {isbn} />
    {/snippet}
  </CoverImage>
</div>

<style>
  .spine {
    border: 1px solid var(--border-color);
  }
</style>
