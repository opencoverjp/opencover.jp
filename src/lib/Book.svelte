<script>
  import { untrack } from "svelte";
  import BookFront from "./BookFront.svelte";
  import BookSpine from "./BookSpine.svelte";

  const { book, tabindex, scale = 2.5 } = $props();

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

  // 表紙の出典(opencover / Google Books / openBD)。BookFront から受け取り、ボタンの外にリンクで出す。
  let frontSource = $state(null);

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

<div class="relative">
  <div
    class="flex items-end gap-0.5 transition-all duration-300 ease-in-out"
    style="height: {height}px;"
  >
    <button
      class="h-full flex items-end shadow-lg hover:ring hover:ring-slate-400 hover:-translate-y-2 hover:brightness-105 transition-transform cursor-pointer"
      onclick={(e) => handleBookClick(e, book.isbn)}
      {tabindex}
    >
      {#if showFront}
        <BookFront isbn={book.isbn} onsource={(s) => (frontSource = s)} />
        <!-- <BookFront isbn={book.isbn} --border-color={--border - color} /> -->
      {/if}
      {#if displaySides?.find((d) => d === "spine")}
        <BookSpine isbn={book.isbn} />
      {/if}
    </button>
  </div>

  <!-- 出典: 本の真下(棚板の上)に重ねる。レイアウトを押し上げないよう absolute -->
  {#if showFront && frontSource}
    {#if frontSource.link}
      <a
        href={frontSource.link}
        target="_blank"
        rel="noopener noreferrer"
        class="absolute top-full left-0 mt-1 text-xs text-slate-700 hover:text-slate-900 hover:underline whitespace-nowrap"
      >
        {frontSource.name}
      </a>
    {:else}
      <span class="absolute top-full left-0 mt-1 text-xs text-slate-700 whitespace-nowrap">
        {frontSource.name}
      </span>
    {/if}
  {/if}
</div>
