<script>
  import CoverImage from "./CoverImage.svelte";

  // onsource: 表示中の表紙の出典 { name, link } を親(Book)に知らせる。
  // 表紙はボタンの中にあるのでリンクを置けず、出典は Book がボタンの外に出す。
  const { isbn, width = 174, height = 285, onsource = undefined } = $props();

  const opencoverSource = (target) => ({
    name: "opencover",
    link: `https://opencover.jp/shelf/isbn/${target}`,
  });

  // 自前生成の表紙。外部書影が無い・取れない・読み込めないときに使う。
  let generatedSrc = $derived(
    isbn ? `https://image.opencover.jp/v1/cover/front/isbn/${isbn}.webp` : "",
  );

  // 表紙は /api/v1/cover/{isbn}(サーバー側で oc-api の /v1/admin/cover を鍵付きで中継)の
  // front の先頭を使う。openBD → Google Books → opencover の順なので、外部書影があればそれが先頭。
  let imageSrc = $state("");

  $effect(() => {
    const target = isbn;
    const fallback = generatedSrc;
    imageSrc = "";
    onsource?.(null);
    if (!target) return;

    const controller = new AbortController();
    fetch(`/api/v1/cover/${target}`, { signal: controller.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((sides) => {
        const first = sides?.find((s) => s.side === "front")?.images?.[0];
        imageSrc = first?.imageUrl ?? fallback;
        onsource?.(
          first?.source?.name
            ? { name: first.source.name, link: first.source.link ?? null }
            : opencoverSource(target),
        );
      })
      .catch((err) => {
        if (err?.name === "AbortError") return;
        imageSrc = fallback;
        onsource?.(opencoverSource(target));
      });
    return () => controller.abort();
  });
</script>

<div class="book-front relative flex justify-end h-[400px]">
  <CoverImage
    src={imageSrc || undefined}
    fallbackSrc={generatedSrc}
    {width}
    {height}
    alt="表紙画像"
    imgClass="h-full object-cover"
    referrerpolicy="no-referrer"
    onfallback={() => onsource?.(opencoverSource(isbn))}
  />
</div>
