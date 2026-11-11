<script>
  import CoverImage from "./CoverImage.svelte";
  import CoverPlaceholder from "./CoverPlaceholder.svelte";
  import { fetchCover, generatedFrontSrc, opencoverSource } from "./cover";

  // onsource: 表示中の表紙の出典 { name, link } を親(Book)に知らせる。
  // 表紙はボタンの中にあるのでリンクを置けず、出典は Book がボタンの外に出す。
  // displayHeight: 表示する高さ(px)。背表紙と揃えるため Book から渡す
  const {
    isbn,
    width = 174,
    height = 285,
    displayHeight = 400,
    onsource = undefined,
  } = $props();

  // 自前生成の表紙。外部書影が無い・取れない・読み込めないときに使う。
  let generatedSrc = $derived(isbn ? generatedFrontSrc(isbn) : "");

  // 表紙は /api/v1/cover/{isbn}(サーバー側で oc-api の /v1/admin/cover を鍵付きで中継)の
  // front の先頭を使う。openBD → Google Books → opencover の順なので、外部書影があればそれが先頭。
  // 取得結果は cover.ts で共有しているので、先読み済みならすぐに決まる。
  let imageSrc = $state("");

  $effect(() => {
    const target = isbn;
    imageSrc = "";
    onsource?.(null);
    if (!target) return;

    let cancelled = false;
    fetchCover(target).then((cover) => {
      if (cancelled) return;
      imageSrc = cover.imageUrl;
      onsource?.(cover.source);
    });
    return () => {
      cancelled = true;
    };
  });
</script>

<div class="book-front relative flex justify-end" style:height="{displayHeight}px">
  <CoverImage
    src={imageSrc || undefined}
    fallbackSrc={generatedSrc}
    {width}
    {height}
    alt="表紙画像"
    imgClass="h-full object-cover"
    referrerpolicy="no-referrer"
    onfallback={() => onsource?.(opencoverSource(isbn))}
  >
    <!-- 表紙画像の読み込み中は、書誌データからタイトル・著者を描いたプレースホルダを出す -->
    {#snippet placeholder()}
      <CoverPlaceholder {isbn} {width} {height} />
    {/snippet}
  </CoverImage>
</div>
