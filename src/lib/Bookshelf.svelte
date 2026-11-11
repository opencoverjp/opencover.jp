<script>
  import { untrack } from "svelte";
  import { Spring } from "svelte/motion";
  import isbn3 from "isbn3";
  import { CircleAlert } from "@lucide/svelte";
  import Book from "./Book.svelte";

  // showCredits: 表紙の出典を各本の下に表示するか。false のときは credits(bindable)で親に渡す
  let {
    // 表示する本。切り替わったときは、表示中の本(下の books)を短くフェードアウトしてから入れ替える
    books: incomingBooks = [],
    bgColor = '#cccccc',
    link = '',
    linkLabel = '本棚ページにいく',
    // 本が 1 冊もないときに表示するメッセージ
    emptyMessage = 'ISBNを入力してください',
    showCredits = true,
    // frontToggle: 右上に「表紙を表示」チェックボックスを出す。
    //   true のときは各本の displaySides を使わず、チェックの状態で「背表紙のみ / 表紙と背表紙」を切り替える
    frontToggle = false,
    // showFront: 「表紙を表示」の状態(bindable。初期値の指定や、親での参照に使う)
    showFront = $bindable(false),
    // controls: 右上に浮かべて表示する、追加の操作（スニペット）
    controls = undefined,
    credits = $bindable([]),
  } = $props();

  // 実際に並べる本。frontToggle のときは、チェックの状態で表示する面を決める
  let shownBooks = $derived(
    frontToggle
      ? books.map((book) => ({
          ...book,
          displaySides: ['spine', ...(showFront ? ['front'] : [])],
        }))
      : books,
  );

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
  // ---- 本の切り替え時のフェード ----
  // 並ぶ本(ISBN の並び)が変わったら、今の本を FADE_MS かけて消してから入れ替え、FADE_MS かけて出す。
  // 同じ ISBN の並びのまま中身だけ変わったとき(表示する面など)は、フェードせずにすぐ反映する
  const FADE_MS = 250;
  const keyOf = (list) => list.map((book) => book?.isbn ?? '').join(',');
  // 実際に表示している本
  let books = $state.raw(untrack(() => incomingBooks));
  // true の間はフェードアウト中(透明)
  let fading = $state(false);
  $effect(() => {
    const next = incomingBooks;
    const current = untrack(() => books);
    // 同じ並び・最初の表示・動きを減らす設定では、すぐ入れ替える
    if (keyOf(next) === keyOf(current) || current.length === 0 || untrack(() => reduceMotion)) {
      books = next;
      fading = false;
      return;
    }
    fading = true;
    const timer = setTimeout(() => {
      books = next;
      fading = false;
    }, FADE_MS);
    // フェード中にさらに切り替わったら、タイマーを掛け直す(フェードアウトは続けたまま)
    return () => clearTimeout(timer);
  });

  let anyFront = $derived(shownBooks.some((book) => book.displaySides?.includes('front')));

  // 表紙表示の本を、枠の中のマウスの位置に応じて少しだけ回す(見る人が左右に動いたように見せる)。
  // マウスが右にあるほど右から見た形(背表紙が広く、表紙が狭く)になる。
  // 背表紙のみの表示では Book が tilt を使わないので、何も変わらない
  const TILT = 40; // Book の既定の角度(度)
  const TILT_RANGE = 8; // 枠の左端・右端で TILT から変える角度(度)
  // マウスの横位置(-1: 左端 〜 0: 中央 〜 1: 右端)。ばねでなめらかに追従させる
  const pointerX = new Spring(0, { stiffness: 0.08, damping: 0.6 });
  let reduceMotion = $state(false);
  $effect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    reduceMotion = query.matches;
    const onchange = () => (reduceMotion = query.matches);
    query.addEventListener('change', onchange);
    return () => query.removeEventListener('change', onchange);
  });
  function handlePointerMove(event) {
    // タッチ操作(スクロールやタップ)では回さない
    if (event.pointerType !== 'mouse' || !anyFront || reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointerX.target = Math.max(-1, Math.min(1, x));
  }
  function handlePointerLeave() {
    pointerX.target = 0;
  }
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
  role="presentation"
  onpointermove={handlePointerMove}
  onpointerleave={handlePointerLeave}
>
  {#if link}
    <a
      href={link}
      target={linkTarget}
      class="peer absolute inset-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yslate-400"
      aria-label={linkLabel}
    ></a>
    <!-- 背景(リンク)にホバー・フォーカスしている間だけ、右下にリンク先を表示する(本の上では出さない) -->
    <div
      class="absolute bottom-3 right-3 z-30 px-3 py-1.5 rounded bg-white shadow-md text-sm text-yslate-800 pointer-events-none opacity-0 transition-opacity peer-hover:opacity-100 peer-focus-visible:opacity-100"
      aria-hidden="true"
    >
      {linkLabel}
    </div>
  {/if}

  <!-- 箱型の棚の陰影：天板(暗)・左右の側板(やや暗)・棚板(明)を台形で描き、奥の背板を囲む。
       半透明の白黒を重ねるだけなので、背景色の変化とグレインはそのまま透ける -->
  <div class="shelf-top" aria-hidden="true"></div>
  <div class="shelf-left" aria-hidden="true"></div>
  <div class="shelf-right" aria-hidden="true"></div>
  <div class="shelf-floor" aria-hidden="true"></div>

  {#if (frontToggle && books.length > 0) || controls}
    <!-- 本や背景のリンクより手前に出す -->
    <div class="absolute top-3 right-3 z-30 flex items-center gap-2">
      {#if frontToggle && books.length > 0}
        <label
          class="flex items-center gap-2 px-3 py-1.5 rounded bg-white shadow-md text-sm text-yslate-800 cursor-pointer"
        >
          <input
            type="checkbox"
            bind:checked={showFront}
            class="accent-yslate-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yslate-400"
          />
          表紙を表示
        </label>
      {/if}
      {@render controls?.()}
    </div>
  {/if}

  <!-- 本の並び(とメッセージ)。切り替え時にここだけをフェードする(棚と背景はそのまま)。
       背景のリンクを覆うので pointer-events-none にし、本の並びだけ pointer-events-auto でクリックを受ける -->
  <div
    class="relative pointer-events-none flex-1 min-w-0 self-stretch flex justify-center transition-opacity ease-in-out"
    class:items-end={validIsbn && books.length > 0}
    class:items-center={!validIsbn || books.length === 0}
    class:opacity-0={fading}
    style:transition-duration="{FADE_MS}ms"
  >
  {#if !validIsbn}
    <div class="relative pointer-events-none text-yslate-800 text-sm flex items-center gap-2">
      <CircleAlert class="inline-block" />ISBNが正しくないようです
    </div>
  {:else if books.length > 0}
    <!-- 本は棚板の上(奥行きの中ほど)に立てる。棚板の見かけの奥行きはスクロールで変わるので、本もそれに乗って上下する -->
    <div
      class="relative pointer-events-none w-full h-full flex flex-col items-center justify-end"
      style:padding-top="{DEPTH + 16}px"
      style:padding-bottom="calc(var(--depth-bottom) * 0.55)"
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
          {#each shownBooks as book, i}
            <div class="relative" style:z-index={books.length - i}>
              <Book
                {book}
                overlap={i > 0 ? 0.5 : 0}
                showCredit={showCredits}
                spineShadow={false}
                tilt={TILT + TILT_RANGE * pointerX.current}
                onsource={(s) => (sources[i] = s)}
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {:else}
    <div class="relative pointer-events-none text-yslate-800 text-sm flex items-center gap-2">
      <CircleAlert class="inline-block" />{emptyMessage}
    </div>
  {/if}
  </div>
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

  /* 立体感：棚が画面のどこにあるかで、見る人の目の高さが変わったように見せる。
     棚が画面の下のほうにあるとき → 上から見下ろす：天板は細く明るく、棚板は広く見える。
     棚が画面の上のほうにあるとき → 下から見上げる：天板は広く暗く、棚板は細く見える。
     画面の中央で、どちらも --depth(40px)になる。
     CSS のスクロール連動アニメーション(view timeline)で動かす。対応していないブラウザと
     動きを減らす設定では、中央の見た目のまま動かさない。
     @property で型を登録して、値をなめらかに補間できるようにする */
  @property --depth-top {
    syntax: '<length>';
    inherits: true;
    initial-value: 40px;
  }
  @property --depth-bottom {
    syntax: '<length>';
    inherits: true;
    initial-value: 40px;
  }
  @property --shade-top {
    syntax: '<number>';
    inherits: true;
    initial-value: 0.26;
  }
  @property --shade-floor {
    syntax: '<number>';
    inherits: true;
    initial-value: 0.22;
  }
  @keyframes shelf-viewpoint {
    /* 画面の下端から入ってくるところ(上から見下ろす) */
    from {
      --depth-top: 28px;
      --depth-bottom: 52px;
      --shade-top: 0.2;
      --shade-floor: 0.28;
    }
    /* 画面の上端から出ていくところ(下から見上げる) */
    to {
      --depth-top: 52px;
      --depth-bottom: 28px;
      --shade-top: 0.32;
      --shade-floor: 0.16;
    }
  }
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      .book-frame {
        animation: shelf-viewpoint linear both;
        animation-timeline: view();
        /* 棚全体が画面に入っている間に変化させる(下端が画面の下端 → 上端が画面の上端) */
        animation-range: contain;
      }
    }
  }

  /* 棚の各面。--depth は側板の見かけの幅、--depth-top / --depth-bottom は天板・棚板の見かけの奥行き */
  .shelf-top,
  .shelf-left,
  .shelf-right,
  .shelf-floor {
    position: absolute;
    pointer-events: none;
  }
  .shelf-top {
    inset: 0 0 auto 0;
    height: var(--depth-top);
    clip-path: polygon(0 0, 100% 0, calc(100% - var(--depth)) 100%, var(--depth) 100%);
    background: rgb(0 0 0 / var(--shade-top));
  }
  .shelf-left {
    inset: 0 auto 0 0;
    width: var(--depth);
    clip-path: polygon(0 0, 100% var(--depth-top), 100% calc(100% - var(--depth-bottom)), 0 100%);
    background: rgb(0 0 0 / 0.14);
  }
  .shelf-right {
    inset: 0 0 0 auto;
    width: var(--depth);
    clip-path: polygon(0 var(--depth-top), 100% 0, 100% 100%, 0 calc(100% - var(--depth-bottom)));
    background: rgb(0 0 0 / 0.07);
  }
  .shelf-floor {
    inset: auto 0 0 0;
    height: var(--depth-bottom);
    clip-path: polygon(var(--depth) 0, calc(100% - var(--depth)) 0, 100% 100%, 0 100%);
    background: rgb(255 255 255 / var(--shade-floor));
  }
  .book-frame:hover {
    background-image:
      var(--grain),
      linear-gradient(to bottom, var(--hovering-top-color), var(--hovering-bottom-color));
  }
</style>
