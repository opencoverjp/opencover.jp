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

<div
  class="flex items-end gap-0.5 transition-all duration-300 ease-in-out"
  style="height: {height}px;"
>
  <button
    class="h-full flex items-end shadow-lg hover:ring hover:ring-slate-400 hover:-translate-y-2 hover:brightness-105 transition-transform cursor-pointer"
    onclick={(e) => handleBookClick(e, book.isbn)}
    {tabindex}
  >
    {#if displaySides?.find((d) => d === "front")}
      <BookFront isbn={book.isbn} />
      <!-- <BookFront isbn={book.isbn} --border-color={--border - color} /> -->
    {/if}
    {#if displaySides?.find((d) => d === "spine")}
      <BookSpine isbn={book.isbn} />
    {/if}
  </button>
</div>
