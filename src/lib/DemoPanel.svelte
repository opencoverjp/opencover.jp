<script lang="ts">
  import isbn3 from "isbn3";
  import { RefreshCcw, MessageSquareWarning, Check, GripVertical } from "@lucide/svelte";
  import { onDestroy, onMount, untrack } from "svelte";
  import Bookshelf from "./Bookshelf.svelte";
  import ShareButtons from "./ShareButtons.svelte";
  import { createCarousel } from "./isbnCarousel.svelte";
  import { preloadBook, whenIdle } from "./cover";
  import { takeRandomIsbn } from "./randomIsbn";

  type Props = {
    /** カルーセルで順に表示する ISBN の配列 */
    isbns: string[];
    /** 切り替え間隔（ミリ秒） */
    interval?: number;
  };

  let {
    isbns,
    interval = 3000,
  }: Props = $props();

  // 選択が 0 冊・複数冊のときの背景色
  const stoppedBgColor = "#d2d2c2";

  // yslate 系のランダムな色（明度の幅は狭く）。Bookshelf が hex を前提にしているので hex で返す。
  // 乱数ではなく ISBN のハッシュから決めるので、サーバーとブラウザで同じ色になる（読み込み時に色が切り替わらない）
  function yslateFor(isbn: string): string {
    // FNV-1a ハッシュ
    let x = 2166136261;
    for (const ch of isbn) {
      x ^= ch.charCodeAt(0);
      x = Math.imul(x, 16777619);
    }
    const rand = (shift: number) => ((x >>> shift) & 0xff) / 255;
    const h = 50 + rand(0) * 15; // 黄みがかったグレー
    const s = 10 + rand(8) * 12;
    const l = 74 + rand(16) * 8;
    return hslToHex(h, s, l);
  }

  function hslToHex(h: number, s: number, l: number): string {
    const sat = s / 100;
    const lig = l / 100;
    const a = sat * Math.min(lig, 1 - lig);
    const f = (n: number) => {
      const k = (n + h / 30) % 12;
      const c = lig - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
      return Math.round(c * 255).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  // テーブルの各行の ISBN（編集・ランダム入力・並べ替えのため props をコピーして保持）
  // 最後に空の入力行を 1 行追加する
  let rows = $state(untrack(() => [...isbns, ""]));
  // 各行のチェック状態（複数選択可）。再生中はカルーセルが表示中の 1 行だけをチェックする。
  let checkedRows = $state<boolean[]>(untrack(() => rows.map((_, i) => i === 0)));
  // 各行の ID（並べ替えても変わらない）。非同期処理の完了時に、どの行だったかを特定するのに使う
  let nextRowId = 0;
  let rowIds = $state<number[]>(untrack(() => rows.map(() => nextRowId++)));

  // 表紙画像の出典（プレビューの本の並び順）。下部のメッセージ欄に表示する
  let credits = $state<{ name: string; link?: string | null; isbn: string }[]>([]);

  // opencover の画像はサイト内の本棚ページへリンクする（外部の出典は出典元へ）
  const shelfLink = (isbn: string) => `/shelf/isbn/${isbn}`;
  const creditLink = (credit: { name: string; link?: string | null; isbn: string }) =>
    credit.name === "opencover" ? shelfLink(credit.isbn) : (credit.link ?? null);

  // ハイフン・空白などを除いた ISBN を画像取得・リンクに使う
  const normalize = (value: string) =>
    (value ?? "").trim().replace(/[^0-9Xx]/g, "").toUpperCase();

  const isValidIsbn = (value: string) =>
    isbn3.parse(normalize(value))?.isValid ?? false;

  // 空白・不正な ISBN の行はチェックできない（チェック済みでも外れた扱い）
  let rowValid = $derived(rows.map(isValidIsbn));
  let rowActive = $derived(checkedRows.map((c, i) => c && rowValid[i]));

  // チェックされた ISBN（テーブルの順）
  let checkedIsbns = $derived(
    rows.filter((_, i) => rowActive[i]).map(normalize),
  );
  // 表示する面（背表紙のみ / 表紙と背表紙）は、Bookshelf の「表紙を表示」で切り替える
  let books = $derived(checkedIsbns.map((isbn) => ({ isbn })));

  // 表の正しい ISBN はすべて先読みしておく(カルーセルの切り替えや、チェックを付けたときにすぐ表示する)。
  // 背表紙・書誌・高さはすぐに、表紙は空き時間に読み込む。取得結果は cover.ts で共有するので重複しない
  let validIsbns = $derived(rows.filter((_, i) => rowValid[i]).map(normalize));
  $effect(() => {
    const targets = validIsbns;
    for (const isbn of targets) preloadBook(isbn);
    return whenIdle(() => {
      for (const isbn of targets) preloadBook(isbn, { front: true });
    });
  });

  // 背景色：1 行だけ選ばれていればその行の色、それ以外は停止時の色
  let bgColor = $derived.by(() => {
    const indexes = rowActive.flatMap((c, i) => (c ? [i] : []));
    return indexes.length === 1 ? yslateFor(normalize(rows[indexes[0]])) : stoppedBgColor;
  });

  // カルーセルの回数・間隔はマウント時の props で固定する
  // 各回では、その時点で正しい ISBN が入っている行を上から順に 1 つずつ表示する
  const carousel = createCarousel({
    ...untrack(() => ({
      length: Math.max(isbns.length, 1),
      interval,
      initialPlaying: isbns.length > 0,
    })),
    onIndex: (i) => {
      const validIndexes = rowValid.flatMap((v, j) => (v ? [j] : []));
      const current = validIndexes.length
        ? validIndexes[i % validIndexes.length]
        : -1;
      checkedRows = rows.map((_, j) => j === current);
    },
  });

  function stopPlaying() {
    if (carousel.isPlaying) carousel.toggle();
  }

  // 左枠（チェックボックス）クリック：再生を止めてチェックを切り替える
  function toggleRow(i: number) {
    if (!rowValid[i]) return;
    stopPlaying();
    checkedRows[i] = !rowActive[i];
  }

  // 行の ISBN が変わったら再生を止めて、正しい ISBN ならその行をチェックする
  function handleRowInput(i: number) {
    stopPlaying();
    checkedRows[i] = rowValid[i];
  }

  function handleFeedbackClick() {
    window.open(
      `https://docs.google.com/forms/d/e/1FAIpQLSdxxGCl9lvrv06X3Tj0XPJThzDmBKux7S67ZEvw_sd8yKRdhQ/viewform?usp=pp_url&entry.1198644953=${encodeURIComponent(checkedIsbns.join(" "))}`,
      "_blank",
    );
  }

  // ---- つまみのドラッグで行を並べ替える ----
  let listEl: HTMLUListElement | undefined = $state();
  let dragIndex = $state<number | null>(null);
  // ドラッグ中の行をポインタに追従させるためのずれ（px）
  let dragOffset = $state(0);
  // ドラッグ開始時の各行の位置（DOM 上の行の位置は並べ替えても変わらない）
  let slotTops: number[] = [];
  let slotHeight = 0;
  // 行の上端からつかんだ位置までの距離
  let grabDelta = 0;

  // 行（ISBN とチェック状態）を from から to へ移動する
  function moveRow(from: number, to: number) {
    if (from === to || to < 0 || to >= rows.length) return;
    const [isbnValue] = rows.splice(from, 1);
    rows.splice(to, 0, isbnValue);
    const [checkedValue] = checkedRows.splice(from, 1);
    checkedRows.splice(to, 0, checkedValue);
    const [idValue] = rowIds.splice(from, 1);
    rowIds.splice(to, 0, idValue);
  }

  function handleGripDown(e: PointerEvent, i: number) {
    // マウスは左ボタンのときだけ（タッチ・ペンは button が 0）
    if (!listEl || e.button !== 0) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const rects = [...listEl.querySelectorAll<HTMLElement>("[data-row]")].map(
      (el) => el.getBoundingClientRect(),
    );
    slotTops = rects.map((r) => r.top);
    slotHeight = rects[0]?.height ?? 0;
    grabDelta = e.clientY - slotTops[i];
    dragIndex = i;
    dragOffset = 0;
  }

  function handleGripMove(e: PointerEvent) {
    if (dragIndex === null) return;
    // つかんだ行の上端が来るべき位置（リストの範囲内に収める）
    const top = Math.min(
      Math.max(e.clientY - grabDelta, slotTops[0]),
      slotTops[slotTops.length - 1],
    );
    // ドラッグ中の行以外で、中心がドラッグ中の行の中心より上にある行の数 = 移動先
    const center = top + slotHeight / 2;
    const to = slotTops.filter(
      (t, j) => j !== dragIndex && t + slotHeight / 2 < center,
    ).length;
    if (to !== dragIndex) {
      moveRow(dragIndex, to);
      dragIndex = to;
    }
    dragOffset = top - slotTops[dragIndex];
  }

  function handleGripUp() {
    dragIndex = null;
    dragOffset = 0;
  }

  // キーボード操作：↑↓で 1 行ずつ移動
  function handleGripKeydown(e: KeyboardEvent, i: number) {
    const to = e.key === "ArrowUp" ? i - 1 : e.key === "ArrowDown" ? i + 1 : i;
    if (to === i || to < 0 || to >= rows.length) return;
    e.preventDefault();
    moveRow(i, to);
    // 移動後の行のつまみにフォーカスを移す
    requestAnimationFrame(() =>
      listEl?.querySelectorAll<HTMLElement>("[data-grip]")[to]?.focus(),
    );
  }

  // ランダム入力の取得中の行(行 ID)と、失敗したときのメッセージ
  let randomPending = $state<number[]>([]);
  let randomError = $state("");
  let randomErrorTimer: ReturnType<typeof setTimeout> | undefined;

  function showRandomError(message: string) {
    randomError = message;
    clearTimeout(randomErrorTimer);
    randomErrorTimer = setTimeout(() => (randomError = ""), 4000);
  }

  // 行の ISBN をランダムに差し替える（入力したときと同じく、再生を止めてチェックする）
  // ISBN はページ全体の在庫（randomIsbn.ts）から取り出す。ほかの行に入っている ISBN は除く。
  // 取得中に行が並べ替えられても、押した行を書き換えるように行 ID で引き直す
  async function handleRowRandom(i: number) {
    const id = rowIds[i];
    randomPending = [...randomPending, id];
    try {
      const others = rows.filter((_, j) => j !== i).map(normalize).filter(Boolean);
      const random = await takeRandomIsbn(others);
      const index = rowIds.indexOf(id);
      if (index === -1) return;
      rows[index] = random;
      handleRowInput(index);
    } catch (err) {
      // 失敗したときは入力欄を変えずに、短いメッセージだけ出す
      console.error("random ISBN failed:", err);
      showRandomError("ランダムな ISBN を取得できませんでした。もう一度お試しください。");
    } finally {
      randomPending = randomPending.filter((p) => p !== id);
    }
  }

  onMount(() => {
    if (carousel.isPlaying) {
      carousel.start();
    }
  });

  onDestroy(() => {
    carousel.stop();
    clearTimeout(randomErrorTimer);
  });
</script>

{#snippet checkBox(checked: boolean, onclick: () => void, label: string, disabled = false)}
  <button
    type="button"
    {disabled}
    role="checkbox"
    aria-checked={checked}
    aria-label={label}
    class="size-11 sm:size-16 shrink-0 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yslate-400 enabled:hover:bg-yslate-200 enabled:cursor-pointer disabled:cursor-not-allowed flex items-center justify-center"
    {onclick}
  >
    <span class="size-7 sm:size-8 rounded border-2 {disabled ? 'border-transparent' : 'border-yslate-400'} bg-white flex items-center justify-center">
      {#if checked}
        <Check class="size-5 sm:size-6" />
      {/if}
    </span>
  </button>
{/snippet}

{#snippet creditItem(name: string, href: string | null)}
  {#if href}
    <a
      {href}
      target={href.startsWith("/") ? "_self" : "_blank"}
      rel={href.startsWith("/") ? undefined : "noopener noreferrer"}
      class="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yslate-400"
      >{name}</a
    >
  {:else}
    {name}
  {/if}
{/snippet}

{#snippet randomButton(onclick: () => void, pending = false)}
  <button
    class="size-11 sm:size-16 shrink-0 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yslate-400 text-yslate-400 hover:bg-yslate-200 hover:text-yslate-600 flex items-center justify-center cursor-pointer"
    {onclick}
    title="ランダム入力"
    aria-label="ランダム入力"
    aria-busy={pending}
  >
    <RefreshCcw class="size-5 sm:size-6 {pending ? 'animate-spin' : ''}" />
  </button>
{/snippet}

<div class="flex items-center justify-center p-2 sm:p-4">
  <!-- 外枠の padding（狭い画面は p-4、sm 以上は p-6）を唯一の余白とし、内部の要素は余白を持たずにその内側に揃える -->
  <div class="w-full max-w-6xl p-4 sm:p-6 border-2 border-black rounded-sm">
    <!-- 外枠の padding を打ち消して、枠線に密着させる -->
    <p class="-mx-4 -mt-4 mb-4 sm:-mx-6 sm:-mt-6 sm:mb-6 p-4 bg-yslate-100 border-b border-yslate-300 text-yslate-800">
      ISBNを入力し、表示したい本にチェックを付けてください。
    </p>
    <!-- 狭い画面（sm 未満）では行の各部品（ボタンはタップしやすい 44px）と文字を小さくして、幅 360px でもパネルに収める -->
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6">
      <!-- Left side - Input and controls -->

      <div class="flex flex-col gap-4 flex-1">
        <ul bind:this={listEl} class="font-mono flex flex-col gap-2">
          {#each rows as item, i}
            {@const current = rowActive[i]}
            <li
              data-row
              class="relative flex w-fit rounded-2xl bg-yslate-100 overflow-hidden"
              class:dragging={dragIndex === i}
              style:transform={dragIndex === i ? `translateY(${dragOffset}px)` : undefined}
            >
              <button
                type="button"
                data-grip
                class="w-6 sm:w-10 h-11 sm:h-16 shrink-0 rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-yslate-400 flex items-center justify-center text-yslate-500 hover:bg-yslate-200 cursor-grab active:cursor-grabbing touch-none"
                aria-label={`${i + 1} 行目を移動（↑↓キーでも移動できます）`}
                title="ドラッグして並べ替え"
                onpointerdown={(e) => handleGripDown(e, i)}
                onpointermove={handleGripMove}
                onpointerup={handleGripUp}
                onpointercancel={handleGripUp}
                onkeydown={(e) => handleGripKeydown(e, i)}
              >
                <GripVertical class="size-5 sm:size-6" />
              </button>
              {@render checkBox(
                current,
                () => toggleRow(i),
                item ? `${i + 1} 行目（${item}）を選択` : `${i + 1} 行目を選択`,
                !rowValid[i],
              )}
              <input
                bind:value={rows[i]}
                oninput={() => handleRowInput(i)}
                class="h-11 sm:h-16 w-[calc(13ch+0.7em+1rem+2px)] sm:w-[calc(13ch+0.7em+2rem+2px)] px-2 sm:px-4 bg-transparent text-base sm:text-2xl font-mono tracking-wider rounded-lg focus:outline-2 focus:-outline-offset-2 focus:outline-yslate-400"
                class:font-semibold={current}
                placeholder="ISBNを入力"
                aria-label={`${i + 1} 行目の ISBN`}
              />
              {@render randomButton(() => handleRowRandom(i), randomPending.includes(rowIds[i]))}
            </li>
          {/each}
        </ul>

        <!-- ランダム入力に失敗したときのメッセージ -->
        <p class="text-sm text-red-700 min-h-5" role="status" aria-live="polite">{randomError}</p>

        <button
          class="text-sm px-4 py-2 flex items-center gap-2 size-fit border border-yslate-500 bg-yslate-50 hover:bg-white rounded cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yslate-400"
          onclick={handleFeedbackClick}
        >
          <MessageSquareWarning />
          不具合を報告
        </button>
      </div>

      <!-- Right side - Book spine image -->
      <div class="flex-1 min-w-0 flex flex-col gap-3">
        <div class="flex">
          <Bookshelf
            {books}
            {bgColor}
            link={books.length ? shelfLink(books.map((b) => b.isbn).join(",")) : ""}
            showCredits={false}
            emptyMessage="本がありません"
            frontToggle
            bind:credits
          />
        </div>
        <!-- 共有するのは本棚ページ(OG 画像も本棚ページのもの) -->
        <ShareButtons
          url={`https://opencover.jp${shelfLink(books.map((b) => b.isbn).join(","))}`}
          text="opencoverの本棚"
          image={`/api/og/${books.map((b) => b.isbn).join(",")}?style=preview`}
          disabled={books.length === 0}
        />
      </div>
    </div>
    <!-- 下部のメッセージ欄（上部と同じ見た目。表紙画像のクレジットを表示）。外枠の padding を打ち消して枠線に密着させる -->
    <!-- 高さは上部のメッセージ欄（p-4 + 1 行 24px + 枠線 1px = 57px）に合わせて固定し、
         内容が長いときは横スクロールにする -->
    <div class="-mx-4 -mb-4 mt-4 sm:-mx-6 sm:-mb-6 sm:mt-6 px-4 h-[57px] flex items-center overflow-x-auto whitespace-nowrap bg-yslate-100 border-t border-yslate-300 text-xs text-yslate-800">
      {#if books.length}
        <!-- 背表紙はすべて opencover なので 1 回だけ表示する。リンク先はプレビュー中の全冊の本棚（ISBN をカンマ区切り） -->
        <span
          >画像　背表紙：{@render creditItem("opencover", shelfLink(books.map((b) => b.isbn).join(",")))}{#if credits.length}　表紙：{#each credits as credit, i}{#if i > 0}、{/if}{@render creditItem(
                credit.name,
                creditLink(credit),
              )}{/each}{/if}</span
        >
      {/if}
    </div>
  </div>
</div>

<style>
  /* ドラッグ中の行：他の行より手前に出して、浮いて見えるようにする */
  .dragging {
    z-index: 10;
    background-color: var(--color-yslate-200);
    box-shadow: 0 8px 20px rgb(0 0 0 / 0.2);
  }
</style>
