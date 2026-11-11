<script>
  import { untrack } from "svelte";
  import isbn3 from "isbn3";
  import { CircleAlert } from "@lucide/svelte";
  import Book from "./Book.svelte";

  // showCredits: 表紙の出典を各本の下に表示するか。false のときは credits(bindable)で親に渡す
  let {
    books = [],
    bgColor = '#cccccc',
    link = '',
    linkLabel = '本棚ページを開く',
    // 本が 1 冊もないときに表示するメッセージ
    emptyMessage = 'ISBNを入力してください',
    showCredits = true,
    // controls: 右上に浮かべて表示する操作（スニペット）
    controls = undefined,
    credits = $bindable([]),
  } = $props();

  // 各本の表紙の出典(本の並び順)。表紙を表示していない本は null
  let sources = $state([]);
  // 冊数が減ったら、不要になった出典を捨てる
  $effect(() => {
    const length = books.length;
    untrack(() => {
      if (sources.length > length) sources.length = length;
    });
  });
  $effect(() => {
    // 各出典に、どの本(isbn)の表紙かを添える
    credits = books
      .map((book, i) => (sources[i] ? { ...sources[i], isbn: book.isbn } : null))
      .filter(Boolean);
  });
  // 背表紙のみの並びでは、本ごとではなく並び全体に影(drop-shadow)をつける。
  // 並び全体の輪郭に沿った 1 つの影になるので、本の影が隣の背表紙に重ならない。
  // 表紙表示のときは重なった表紙の前後を見せるため、本ごとの影にする
  let anyFront = $derived(books.some((book) => book.displaySides?.includes('front')));
  let validIsbn = $derived(books.every((book) => isbn3.parse(book?.isbn)?.isValid ?? false));
  // 本の並びが枠に収まらないとき(表紙付きで複数冊など)は、下端中央を基準に全体を縮小する。
  // transform はレイアウト幅を変えないので、縮小前の幅(offsetWidth)で比を計算できる
  let areaWidth = $state(0);
  let rowWidth = $state(0);
  // 棚の奥行き(側板・天板・棚板の見かけの幅, px)
  const DEPTH = 40;
  // clientWidth は左右の padding(側板の幅 + 8px)を含むので差し引く
  let contentWidth = $derived(areaWidth - 2 * (DEPTH + 8));
  let fitScale = $derived(
    contentWidth > 0 && rowWidth > contentWidth ? contentWidth / rowWidth : 1,
  );

  let linkTarget = $derived(link?.startsWith('/') && !link?.startsWith('/goto') ? '_self' : '_blank');

  // d3.color(hex).darker(k) 相当: RGBを 0.7^k 倍する
  function darken(hex, k) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const num = parseInt(h, 16);
    const f = Math.pow(0.7, k);
    const clamp = (v) => Math.max(0, Math.min(255, Math.round(v * f)));
    return `rgb(${clamp((num >> 16) & 255)}, ${clamp((num >> 8) & 255)}, ${clamp(num & 255)})`;
  }

  // 背景色はインスタンスごとに要素の style で持つ（documentElement に書くと複数インスタンスで干渉する）
  let frameStyle = $derived(
    `--top-color: ${bgColor}; --bottom-color: ${darken(bgColor, 0.5)}; ` +
    `--hovering-top-color: ${darken(bgColor, 0.5)}; --hovering-bottom-color: ${darken(bgColor, 1)};`
  );
</script>

<!--
  リンクとボタン（Book）を入れ子にしないよう、背景全体を覆うリンクを兄弟要素として置き、
  その上にコンテンツを重ねる。コンテンツは pointer-events-none にして、本（ボタン）だけクリックを受ける。
-->
<div
  class="book-frame relative flex-1 min-w-0 flex justify-center overflow-hidden h-[500px]"
  style={frameStyle}
  style:--depth="{DEPTH}px"
  class:items-end={validIsbn && books.length > 0}
  class:items-center={!validIsbn}
>
  {#if link}
    <a
      href={link}
      target={linkTarget}
      class="absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-slate-400"
      aria-label={linkLabel}
    ></a>
  {/if}

  <!-- 箱型の棚の陰影：天板(暗)・左右の側板(やや暗)・棚板(明)を台形で描き、奥の背板を囲む。
       半透明の白黒を重ねるだけなので、背景色の変化とグレインはそのまま透ける -->
  <div class="shelf-top" aria-hidden="true"></div>
  <div class="shelf-left" aria-hidden="true"></div>
  <div class="shelf-right" aria-hidden="true"></div>
  <div class="shelf-floor" aria-hidden="true"></div>

  {#if controls}
    <!-- 本や背景のリンクより手前に出す -->
    <div class="absolute top-3 right-3 z-30">
      {@render controls()}
    </div>
  {/if}

  {#if !validIsbn}
    <div class="relative pointer-events-none text-slate-800 text-sm flex items-center gap-2">
      <CircleAlert class="inline-block" />ISBNが正しくないようです
    </div>
  {:else if books.length > 0}
    <!-- 本は棚板の上(奥行きの中ほど)に立てる -->
    <div
      class="relative pointer-events-none w-full h-full flex flex-col items-center justify-end"
      style:padding-top="{DEPTH + 16}px"
      style:padding-bottom="{DEPTH * 0.55}px"
    >
      <!-- 側板の内側に収める -->
      <div
        class="w-full flex justify-center overflow-x-clip"
        style:padding-inline="{DEPTH + 8}px"
        bind:clientWidth={areaWidth}
      >
        <div
          class="pointer-events-auto flex w-max shrink-0 items-end gap-0.5 origin-bottom {anyFront
            ? ''
            : 'drop-shadow-xl drop-shadow-black/50'}"
          style:transform={fitScale < 1 ? `scale(${fitScale})` : undefined}
          bind:offsetWidth={rowWidth}
        >
          <!-- 表紙表示で複数冊のときは、左の本ほど手前に置き、2 冊目以降は表紙の半分を左隣の後ろに重ねる -->
          {#each books as book, i}
            <div class="relative" style:z-index={books.length - i}>
              <Book
                {book}
                overlap={i > 0 ? 0.5 : 0}
                showCredit={showCredits}
                spineShadow={false}
                onsource={(s) => (sources[i] = s)}
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <div class="relative pointer-events-none text-slate-800 text-sm flex items-center gap-2">
      <CircleAlert class="inline-block" />{emptyMessage}
    </div>
  {/if}
</div>

<style>
  /* 背景：色のグラデーションの上にグレイン(fractalNoise)のテクスチャを overlay で重ねる。
     色は --top-color / --bottom-color で変わり、テクスチャは共通 */
  .book-frame {
    --grain: url("data:image/svg+xml,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg'%20width%3D'200'%20height%3D'200'%3E%3Cfilter%20id%3D'n'%20color-interpolation-filters%3D'sRGB'%3E%3CfeTurbulence%20type%3D'fractalNoise'%20baseFrequency%3D'0.85'%20numOctaves%3D'3'%20seed%3D'1'%20stitchTiles%3D'stitch'%2F%3E%3CfeColorMatrix%20type%3D'saturate'%20values%3D'0'%2F%3E%3CfeComponentTransfer%3E%3CfeFuncR%20type%3D'linear'%20slope%3D'2.2'%20intercept%3D'-0.6'%2F%3E%3CfeFuncG%20type%3D'linear'%20slope%3D'2.2'%20intercept%3D'-0.6'%2F%3E%3CfeFuncB%20type%3D'linear'%20slope%3D'2.2'%20intercept%3D'-0.6'%2F%3E%3C%2FfeComponentTransfer%3E%3C%2Ffilter%3E%3Crect%20width%3D'100%25'%20height%3D'100%25'%20filter%3D'url(%23n)'%20opacity%3D'0.55'%2F%3E%3C%2Fsvg%3E");
    background-image:
      var(--grain),
      linear-gradient(to bottom, var(--top-color), var(--bottom-color));
    background-blend-mode: overlay, normal;
  }
  /* 棚の各面。--depth は側板などの見かけの幅 */
  .shelf-top,
  .shelf-left,
  .shelf-right,
  .shelf-floor {
    position: absolute;
    pointer-events: none;
  }
  .shelf-top {
    inset: 0 0 auto 0;
    height: var(--depth);
    clip-path: polygon(0 0, 100% 0, calc(100% - var(--depth)) 100%, var(--depth) 100%);
    background: rgb(0 0 0 / 0.26);
  }
  .shelf-left {
    inset: 0 auto 0 0;
    width: var(--depth);
    clip-path: polygon(0 0, 100% var(--depth), 100% calc(100% - var(--depth)), 0 100%);
    background: rgb(0 0 0 / 0.14);
  }
  .shelf-right {
    inset: 0 0 0 auto;
    width: var(--depth);
    clip-path: polygon(0 var(--depth), 100% 0, 100% 100%, 0 calc(100% - var(--depth)));
    background: rgb(0 0 0 / 0.07);
  }
  .shelf-floor {
    inset: auto 0 0 0;
    height: var(--depth);
    clip-path: polygon(var(--depth) 0, calc(100% - var(--depth)) 0, 100% 100%, 0 100%);
    background: rgb(255 255 255 / 0.22);
  }
  .book-frame:hover {
    background-image:
      var(--grain),
      linear-gradient(to bottom, var(--hovering-top-color), var(--hovering-bottom-color));
  }
</style>
