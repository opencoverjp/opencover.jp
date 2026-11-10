<script>
  import isbn3 from "isbn3";
  import { CircleAlert } from "@lucide/svelte";
  import Book from "./Book.svelte";

  let { books = [], bgColor = '#cccccc', link = '', linkLabel = '本棚ページを開く' } = $props();
  let validIsbn = $derived(books.every((book) => isbn3.parse(book?.isbn)?.isValid ?? false));
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
  class="book-frame relative flex-1 flex justify-center rounded-lg inset-shadow-sm inset-shadow-slate-500/50 min-h-[500px]"
  style={frameStyle}
  class:items-end={validIsbn && books.length > 0}
  class:items-center={!validIsbn}
>
  {#if link}
    <a
      href={link}
      target={linkTarget}
      class="absolute inset-0 rounded-lg"
      aria-label={linkLabel}
    ></a>
  {/if}

  {#if !validIsbn}
    <div class="relative pointer-events-none text-slate-800 text-sm flex items-center gap-2">
      <CircleAlert class="inline-block" />ISBNが正しくないようです
    </div>
  {:else if books.length > 0}
    <div class="relative pointer-events-none w-full h-full pt-4 md:pt-8 flex flex-col items-center justify-end">
      <div class="pointer-events-auto flex items-end gap-0.5">
        {#each books as book}
          <Book {book} />
        {/each}
      </div>
      <div class="w-full h-[32px] bg-slate-900/10">&nbsp;</div>
    </div>
  {:else}
    <div class="relative pointer-events-none text-slate-800 text-sm flex items-center gap-2">
      <CircleAlert class="inline-block" />ISBNを入力してください
    </div>
  {/if}
</div>

<style>
  .book-frame {
    background: linear-gradient(to bottom, var(--top-color), var(--bottom-color));
  }
  .book-frame:hover {
    background: linear-gradient(to bottom, var(--hovering-top-color), var(--hovering-bottom-color));
  }
</style>
