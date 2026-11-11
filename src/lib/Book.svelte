<script>
  import { untrack } from "svelte";
  import { Tween } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";
  import BookFront from "./BookFront.svelte";
  import BookSpine from "./BookSpine.svelte";

  // tilt: 表紙を表示するときの斜めの角度(度)。表紙をこの角度だけ奥へ、背表紙を (90 - tilt) 度だけ奥へ回す
  // overlap: 表紙表示のとき、左隣の本の後ろに表紙を潜り込ませる割合(0〜1、見かけの表紙幅に対する比)
  // showCredit: 表紙の出典を本の下に表示するか(false のときは onsource で親に渡して、親が表示する)
  // onsource: 表示中の表紙の出典 { name, link }(表紙を表示していないときは null)を親に知らせる
  // spineShadow: 背表紙のみの表示で、本ごとに影をつけるか。並んだ本の影が隣に重ならないよう、
  //   親が並び全体に影をつける場合は false にする(表紙表示のときは常に本ごとの影)
  const {
    book,
    tabindex,
    scale = 2.5,
    tilt = 40,
    overlap = 0,
    showCredit = true,
    onsource = undefined,
    spineShadow = true,
  } = $props();

  // 表紙と背表紙の境目(下端)を視点にした透視投影。下端は棚に接したまま、奥の辺ほど上端が下がる
  const PERSPECTIVE = 1600;

  // scaleの初期値のみを取得して警告を抑制
  let height = $state(173 * untrack(() => scale));

  async function updateBookHeight(isbn, currentScale, signal) {
    try {
      const response = await fetch(`/api/style/isbn/${isbn}`, { signal });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const style = await response.json();
      if (!signal.aborted) {
        height = style.height * currentScale;
      }
    } catch (err) {
      if (err?.name !== "AbortError") console.error(err);
    }
  }

  let displaySides = $derived(book.displaySides);
  let showFront = $derived(!!displaySides?.find((d) => d === "front"));

  // 表紙表示の切り替えを、本が棚の上で回転するようにアニメーションする。
  // t = 0: 背表紙が正面(表紙は真横を向いて見えない) / t = 1: 表紙と背表紙を斜めから見た状態
  const turn = new Tween(untrack(() => (showFront ? 1 : 0)), {
    duration: 500,
    easing: cubicInOut,
  });
  $effect(() => {
    turn.target = showFront ? 1 : 0;
  });
  let t = $derived(turn.current);
  // 回転中・回転後(表紙が少しでも見えている)は立体表示にする
  let is3d = $derived(t > 0);

  let frontAngle = $derived(-90 + (90 - tilt) * t);
  let spineAngle = $derived((90 - tilt) * t);
  let frontTransform = $derived(`perspective(${PERSPECTIVE}px) rotateY(${frontAngle}deg)`);
  let spineTransform = $derived(`perspective(${PERSPECTIVE}px) rotateY(${spineAngle}deg)`);

  // 回転してもレイアウト上の幅は変わらないので、見かけの幅に合わせて余白を詰める
  // (表紙は左側、背表紙は右側が縮む)
  let frontWidth = $state(0);
  let spineWidth = $state(0);
  const rad = (deg) => (deg * Math.PI) / 180;
  let frontShrink = $derived(frontWidth * (1 - Math.cos(rad(frontAngle))));
  let spineShrink = $derived(spineWidth * (1 - Math.cos(rad(spineAngle))));
  // 左隣と重ねる幅(回転アニメーション中は見かけの表紙幅に比例して変わる)
  // 見かけの表紙の右端(本の左端からの距離)。出典をここに右揃えする
  let frontVisibleWidth = $derived(Math.max(0, frontWidth - frontShrink));
  let overlapPx = $derived(is3d ? overlap * frontVisibleWidth : 0);

  // 表紙の出典(opencover / Google Books / openBD)。BookFront から受け取り、ボタンの外にリンクで出す。
  let frontSource = $state(null);
  $effect(() => {
    onsource?.(showFront ? frontSource : null);
  });

  // 背表紙の表示高さ(画像の実寸から決まる)。表紙も同じ高さにして下揃えにする
  let spineHeight = $state(400);

  // book.isbnが変更されたときに高さを更新。
  // ISBN が切り替わったら前のリクエストを中断し、古いレスポンスで高さを上書きしないようにする
  $effect(() => {
    const isbn = book?.isbn;
    const currentScale = scale;
    if (!isbn) return;
    const controller = new AbortController();
    updateBookHeight(isbn, currentScale, controller.signal);
    return () => controller.abort();
  });

  function handleBookClick(event, isbn) {
    event.preventDefault();
    event.stopPropagation();
    const url = `/goto/amazon/${isbn}`;
    window.open(url, "_blank");
  }
</script>

<div class="relative" style:margin-left={overlapPx ? `${-overlapPx}px` : undefined}>
  <div
    class="flex items-end gap-0.5 transition-all duration-300 ease-in-out"
    style="height: {height}px;"
  >
    <!-- 本の画像(表紙・背表紙)は選択・ドラッグさせない。
         dragstart は中の img から上がってくるので、ここでまとめて止める。
         iOS の長押しメニュー(画像の保存など)も出さない -->
    <button
      ondragstart={(e) => e.preventDefault()}
      class="select-none [-webkit-touch-callout:none] flex items-end hover:-translate-y-2 hover:brightness-105 transition-transform cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 {is3d
        ? 'drop-shadow-xl drop-shadow-black/50'
        : spineShadow
          ? 'shadow-xl shadow-black/50 hover:ring hover:ring-slate-400'
          : 'hover:ring hover:ring-slate-400'}"
      onclick={(e) => handleBookClick(e, book.isbn)}
      {tabindex}
    >
      {#if is3d}
        <!-- 表紙：右下(背表紙との境目)を軸に、左側を奥へ倒す -->
        <div
          class="flex origin-bottom-right"
          style:transform={frontTransform}
          style:margin-left="{-frontShrink}px"
          bind:clientWidth={frontWidth}
        >
          <BookFront
            isbn={book.isbn}
            displayHeight={spineHeight}
            onsource={(s) => (frontSource = s)}
          />
        </div>
        <!-- <BookFront isbn={book.isbn} --border-color={--border - color} /> -->
      {/if}
      {#if displaySides?.find((d) => d === "spine")}
        <!-- 表紙を表示するときは、背表紙を左下(表紙との境目)を軸に右側を奥へ倒し、少し暗くする -->
        <div
          class="flex origin-bottom-left"
          style:transform={is3d ? spineTransform : undefined}
          style:filter={is3d ? `brightness(${1 - 0.1 * t})` : undefined}
          style:margin-right={is3d ? `${-spineShrink}px` : undefined}
          bind:clientWidth={spineWidth}
        >
          <BookSpine isbn={book.isbn} onheight={(h) => (spineHeight = h)} />
        </div>
      {/if}
    </button>
  </div>

  <!-- 出典: 表紙の真下(棚板の上)に、表紙の右端に揃えて重ねる。レイアウトを押し上げないよう absolute -->
  {#if showCredit && showFront && frontSource}
    {#if frontSource.link}
      <a
        href={frontSource.link}
        target="_blank"
        rel="noopener noreferrer"
        class="absolute top-full -translate-x-full mt-1 text-xs text-slate-700 hover:text-slate-900 hover:underline whitespace-nowrap"
        style:left="{frontVisibleWidth}px"
      >
        {frontSource.name}
      </a>
    {:else}
      <span
        class="absolute top-full -translate-x-full mt-1 text-xs text-slate-700 whitespace-nowrap"
        style:left="{frontVisibleWidth}px"
      >
        {frontSource.name}
      </span>
    {/if}
  {/if}
</div>
