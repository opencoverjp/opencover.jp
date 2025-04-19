<script>
  import * as d3 from "d3";
  import ISBN from "@pubdate/isbn";
  import { CircleAlert } from "@lucide/svelte";
  import { preloadData } from "$app/navigation";
  import Book from "./Book.svelte";

  let { books = [], bgColor = '#cccccc', link = '' } = $props();
  let validIsbn = $derived(books.every((book) => ISBN.parse(book?.isbn).isValid));
  let isHovering = $state(false);

  $effect (async () => {
    // await preloadData(link);
    // console.log('preloadData', link);
    document.documentElement.style.setProperty('--top-color', bgColor);
    document.documentElement.style.setProperty('--bottom-color', d3.color(bgColor).darker(0.5));
    document.documentElement.style.setProperty('--hovering-top-color', d3.color(bgColor).darker(0.5));
    document.documentElement.style.setProperty('--hovering-bottom-color', d3.color(bgColor).darker(1));
  });

  function handleFeedbackClick() {
    const popup = document.querySelector('.feedback-popup');
    popup.classList.toggle('hidden');
  }

  function handleFeedbackSendClick() {
    const popup = document.querySelector('.feedback-popup');
    popup.classList.add('hidden');
  }

</script>

<a href={link} target={(link?.startsWith('/') && ! link?.startsWith('/goto')) ? '_self' : '_blank'}>
<div
  class="book-frame flex-1 flex justify-center rounded-lg inset-shadow-sm inset-shadow-slate-500/50 min-h-[500px]"
  class:hovering={isHovering}
  class:items-end={validIsbn && books.length > 0}
  class:items-center={!validIsbn}
  onmouseenter={() => isHovering = true}
  onmouseleave={() => isHovering = false} role="button" tabindex="0">
  {#if !validIsbn}
    <div class="text-slate-800 text-sm flex items-center gap-2">
      <CircleAlert class="inline-block" />ISBNが正しくないようです
    </div>
  {:else if books.length > 0}
    <div class="relative w-full h-full pt-4 md:pt-8 flex flex-col items-center justify-end">
      <div class="flex items-end gap-0.5">
        {#each books as book, i}
          <Book {book} tabindex={i+1} />
        {/each}
      </div>
      <div class="w-full h-[32px] bg-slate-900/10">&nbsp;</div>
      <div class="w-full flex justify-end">
        <button
          class="flex text-slate-600 text-sm justify-end items-center gap-1 hidden"
          onclick={handleFeedbackClick}
        >
          <CircleAlert size={16} class="inline-block" />報告
        </button>
      </div>
      <div
        class="feedback-popup absolute bottom-4 right-0 p-4 bg-white shadow-lg rounded-lg hidden"
      >
        <div class="text-slate-800 text-sm font-semibold">
          フィードバックをお寄せください
        </div>
        <input
          type="radio"
          id="feedback1"
          name="feedback"
          value="good"
          class="mr-2"
        />
        <label for="feedback1" class="mr-4">良い</label>
        <input
          type="radio"
          id="feedback2"
          name="feedback"
          value="bad"
          class="mr-2"
        />
        <label for="feedback2" class="mr-4">悪い</label>
        <input
          type="radio"
          id="feedback3"
          name="feedback"
          value="other"
          class="mr-2"
        />
        <label for="feedback3" class="mr-4">その他</label>
        <textarea
          class="w-full p-2 border border-slate-400 rounded-lg"
          placeholder="フィードバックをお寄せください"
        ></textarea>
        <button
          class="bg-slate-800 text-white px-4 py-2 rounded-lg mt-4"
          onclick={handleFeedbackSendClick}>送信</button
        >
      </div>
    </div>
  {:else}
    <!-- {:else if isBlankISBN} -->
    <div class="text-slate-800 text-sm flex items-center gap-2">
      <CircleAlert class="inline-block" />ISBNを入力してください
    </div>
  {/if}
</div>
</a>

<style>
  .book-frame {
    background: linear-gradient(to bottom, var(--top-color), var(--bottom-color));
  }
  .hovering {
    background: linear-gradient(to bottom, var(--hovering-top-color), var(--hovering-bottom-color));
  }
</style>