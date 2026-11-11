<script lang="ts">
  import isbn3 from "isbn3";
  import BookSpine from "$lib/BookSpine.svelte";

  // 背表紙は Bookshelf(新書で高さ 400px)の 2 倍の大きさで表示し、カードの下端で切り取る
  const SPINE_SCALE = (2 * 400) / 865;
  // 背表紙の列の幅(背表紙の実際の幅に合わせる。読み込み前は新書の幅相当)
  let spineWidth = $state(76);

  const links = [
    {
      name: "buy",
      label: "買う",
      sites: [
        { name: "amazon", label: "Amazon" },
        { name: "rakuten", label: "楽天ブックス" },
        { name: "kinokuniya", label: "紀伊国屋書店" },
        { name: "maruzenjunkudo", label: "丸善ジュンク堂"},
        // { name: "honto", label: "honto" },
        { name: "openbs", label: "近くの書店在庫" }
      ],
    },
    {
      name: "search",
      label: "探す",
      sites: [
        { name: "calil", label: "図書館 (カーリル)" },
        { name: "cinii", label: "大学図書館 (CiNii Books)" },
      ],
    },
    {
      name: "record",
      label: "記録する",
      sites: [
        { name: "bookmeter", label: "読書メーター" },
        { name: "booklog", label: "ブクログ" },
        { name: "googlebooks", label: "Google ブックス" },
      ],
    },
  ];

  const {book, index} = $props();

  const hyphenedIsbn = $derived(
    isbn3.parse(book.book?.isbn)?.isValid ? isbn3.parse(book.book?.isbn)?.isbn13h : "");

</script>

<!-- 背景は上が明るく下が暗いグラデーション。
     高さは Bookshelf(h-[500px])に揃え、内容が多いときだけ伸ばす -->
<section class="relative mb-4 flex flex-col min-h-[500px] border-2 border-yslate-600 bg-linear-to-b from-yslate-50 to-yslate-200 p-6 rounded overflow-hidden">
  {#if index > 0}
    <!-- 右上に浮かべる -->
    <div class="absolute top-4 right-4 z-10 px-4 py-2 text-sm bg-white/70">{index}冊目</div>
  {/if}
  <!-- 背表紙 | コンテンツ -->
  <div class="flex flex-1 gap-6">
    <!-- 背表紙：高さはコンテンツに合わせて伸び、カードの下端(padding を打ち消して枠線まで)で
         カード(overflow-hidden)に切り取られる。列では切り取らないので、左右に大きめの影が見える。
         背表紙自体は絶対配置にして、列の高さに影響させない -->
    <div
      class="relative shrink-0 -mb-6 mx-2"
      style:width="{spineWidth}px"
      aria-hidden="true"
    >
      <div
        class="absolute top-0 left-0 w-max shadow-[0_6px_28px_rgb(0_0_0/0.35)]"
        bind:clientWidth={spineWidth}
      >
        <BookSpine isbn={book.isbn} scale={SPINE_SCALE} />
      </div>
    </div>

    <!-- 書誌情報を上端、リンクを下端に揃える -->
    <div class="min-w-0 flex-1 flex flex-col justify-between gap-6">
    <div>
    <!-- 右上の「n冊目」と重ならないよう、タイトルの右側をあける -->
    <h3 class="book-title flex items-center gap-2 text-xl font-bold" class:pr-20={index > 0}>
    <span>
      {book.book?.title}{book.book?.subtitle
        ? `──${book.book?.subtitle}`
        : ""}
    </span>
  </h3>

  <div class="my-3">
    {book.book?.author}
  </div>
  <div class="my-3">
    {book.book?.label}　{book.book?.publisher}
  </div>
  <div class="mt-3 text-xs md:text-sm font-mono">
    ISBN: {hyphenedIsbn}
  </div>
  </div>

  <div class="pt-4 border-t border-yslate-300">
    <div class="flex flex-col gap-3">
      {#each links as { name, label, sites }}
        <div class="flex items-center gap-2">
          <div class="text-sm font-semibold text-yslate-800">
            {label}
          </div>
          <div class="flex flex-wrap gap-2">
            {#each sites as { name, label }}
              <a
                href={`/goto/${name}/${book.book?.isbn}`}
                target="_blank"
                class="px-2 py-1 text-xs md:text-sm border border-gray-300 rounded bg-white/70 hover:bg-white"
                >{label}</a
              >
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
    </div>
  </div>
</section>