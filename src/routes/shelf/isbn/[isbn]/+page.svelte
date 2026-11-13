<script>
  import { ChevronLeft, ChevronRight } from "@lucide/svelte";
  import Bookshelf from "../../../../lib/Bookshelf.svelte";
  import BookCard from "./BookCard.svelte";
  import { spineSrc } from "../../../../lib/cover";
  import ShareButtons from "../../../../lib/ShareButtons.svelte";

  let { data } = $props();
  let books = $derived(data.books);
  let bgColor = $derived(data.bgColor);
  let title = $derived(data.title);
  let isSingleBook = $derived(data.isSingleBook);
  let meta = $derived(data.meta);

  // ---- 複数冊のとき：BookCard を横に並べ、左右に移動する ----
  // 横スクロール領域は画面の幅いっぱいに広げ、表示中のカードは本文の列に揃える。
  // 左右には前後のカードがはみ出して見える(切り取らない)
  let column = $state(); // 本文の列(md:w-8/12)
  let scroller = $state();
  // 表示中のカードの番号(0 始まり)
  let current = $state(0);
  // カードの幅(= 本文の列の内側の幅)と、画面左端から本文の列の内側までの距離
  let cardWidth = $state(0);
  let inset = $state(0);
  let viewportWidth = $state(0);

  function measure() {
    if (!column) return;
    const rect = column.getBoundingClientRect();
    const style = getComputedStyle(column);
    const padLeft = parseFloat(style.paddingLeft);
    const padRight = parseFloat(style.paddingRight);
    // 縦スクロールバーを含まない幅
    viewportWidth = document.documentElement.clientWidth;
    cardWidth = rect.width - padLeft - padRight;
    inset = rect.left + padLeft;
  }

  $effect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  });

  // スクロール位置から、本文の列の位置に最も近いカードを表示中とする
  function handleScroll() {
    if (!scroller) return;
    const cards = [...scroller.children];
    const target = (card) => card.offsetLeft - inset;
    let nearest = 0;
    cards.forEach((card, i) => {
      if (
        Math.abs(target(card) - scroller.scrollLeft) <
        Math.abs(target(cards[nearest]) - scroller.scrollLeft)
      ) {
        nearest = i;
      }
    });
    current = nearest;
  }

  function goTo(index) {
    const card = scroller?.children[index];
    if (!card) return;
    scroller.scrollTo({ left: card.offsetLeft - inset, behavior: "smooth" });
  }

  // 本棚が変わったら先頭に戻す
  $effect(() => {
    books;
    current = 0;
    scroller?.scrollTo({ left: 0 });
  });
</script>

<div class="md:w-8/12 p-4 mx-auto" bind:this={column}>
  <h3 class="title text-xl font-bold my-8">
    {title}
  </h3>

  <div class="my-8">
    <Bookshelf
      {books}
      {bgColor}
      link={`/goto/amazon/${books.at(0).book?.isbn}`}
      linkLabel="Amazonで見る"
      frontToggle
    >
      <!-- 共有ボタンは本棚の左下に重ね、ホバー時に表示する -->
      {#snippet bottomControls()}
        <ShareButtons
          url={meta.url}
          text={meta.title}
          image={`/api/og/${books.map((b) => b.isbn).join(",")}`}
        />
      {/snippet}
    </Bookshelf>
  </div>

  {#if books.length > 1}
    <!-- 前後への移動ボタンと現在位置 -->
    <div class="flex items-center justify-end gap-2 mb-2">
      <button
        type="button"
        class="size-9 flex items-center justify-center rounded border border-yslate-300 bg-white enabled:hover:bg-yslate-100 enabled:cursor-pointer disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yslate-400"
        onclick={() => goTo(current - 1)}
        disabled={current === 0}
        aria-label="前の本"
      >
        <ChevronLeft class="size-5" />
      </button>
      <span class="text-sm text-yslate-600 tabular-nums min-w-14 text-center" aria-live="polite">
        {current + 1} / {books.length}
      </span>
      <button
        type="button"
        class="size-9 flex items-center justify-center rounded border border-yslate-300 bg-white enabled:hover:bg-yslate-100 enabled:cursor-pointer disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yslate-400"
        onclick={() => goTo(current + 1)}
        disabled={current === books.length - 1}
        aria-label="次の本"
      >
        <ChevronRight class="size-5" />
      </button>
    </div>

    <!-- カードを横に並べる。スワイプ・横スクロールでも移動でき、1 枚ずつ吸着する。
         領域を画面の左端から右端まで広げ、左右の padding(= inset)で表示中のカードを本文の列に揃える -->
    <div
      bind:this={scroller}
      class="cards relative flex items-start gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth"
      style:width={viewportWidth ? `${viewportWidth}px` : undefined}
      style:margin-left={viewportWidth ? `${-inset}px` : undefined}
      style:padding-inline={viewportWidth ? `${inset}px` : undefined}
      style:scroll-padding-inline={viewportWidth ? `${inset}px` : undefined}
      onscroll={handleScroll}
      aria-label="本の一覧"
      role="region"
    >
      {#each books as book, i (book.isbn)}
        <div
          class="relative shrink-0 snap-start transition-opacity duration-300"
          class:opacity-40={i !== current}
          style:width={cardWidth ? `${cardWidth}px` : "100%"}
        >
          <BookCard {book} index={i + 1} />
          {#if i !== current}
            <!-- 前後のカードは薄く表示し、クリックでそのカードへ移動する -->
            <button
              type="button"
              class="absolute inset-0 cursor-pointer"
              onclick={() => goTo(i)}
              aria-label={`${i + 1}冊目を表示`}
              tabindex="-1"
            ></button>
          {/if}
        </div>
      {/each}
    </div>
  {:else}
    {#each books as book (book.isbn)}
      <BookCard {book} index={0} />
    {/each}
  {/if}
</div>

<svelte:head>
  <title>{meta.title}</title>
  <!-- 本棚の背表紙は ISBN だけで URL が決まるので、JS の読み込みを待たずに取得を始める -->
  {#each books as book}
    <link rel="preload" as="image" href={spineSrc(book.isbn)} />
  {/each}
  <link rel="canonical" href={meta.url} />
  <meta property="og:url" content={meta.url} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.image} />
  <meta property="og:type" content={meta.type} />
  <meta
    property="og:site_name"
    content="opencover : みんなでつくる書籍カバー画像"
  />
  <meta name="description" content={meta.description} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<style>
  .title {
    font-feature-settings: "palt";
  }
  /* カード列のスクロールバーを隠す(移動は ‹ › ボタン・スワイプ・横スクロールで行う) */
  .cards {
    scrollbar-width: none;
  }
  .cards::-webkit-scrollbar {
    display: none;
  }
</style>
