<script lang="ts">
  import isbn3 from "isbn3";
  import { Play, Pause, RefreshCcw, MessageSquareWarning } from "@lucide/svelte";
  import { onDestroy, onMount } from "svelte";
  import PreviewBook from "./PreviewBook.svelte";
  import { createCarousel } from "./isbnCarousel.svelte";

  const isbns = [
    "9784087213126",
    "9784480076403",
    "9784004320340",
    "9784121028440",
  ];
  const bgColors = ["#EEE3B4", "#D9BD90", "#CE8282", "#689997"];
  const interval = 2000;

  // ユニークなIDを生成
  const playButtonId = `play-button-${Math.random().toString(36).substring(2, 11)}`;

  let isbn = $state(isbns[0]);
  let bgColor = $state(bgColors[0]);
  let showFront = $state(false);

  let displaySides = $derived(["spine", ...(showFront ? ["front"] : [])]);

  let books = $derived(
    isbn ? [{ isbn, displaySides }] : [],
  );

  let trimmedIsbn = $derived(isbn.trim().replace(/[^0-9Xx]/g, ""));
  let validIsbn = $derived(isbn3.parse(trimmedIsbn)?.isValid ?? false);

  const carousel = createCarousel({
    length: isbns.length,
    interval,
    onIndex: (i) => {
      isbn = isbns[i];
      bgColor = bgColors[i];
    },
    onStop: () => {
      isbn = "";
      bgColor = "#C0CDD9";
    },
  });
  let isPlaying = $derived(carousel.isPlaying);
  const togglePlayPause = carousel.toggle;

  function handleFeedbackClick() {
    window.open(
      `https://docs.google.com/forms/d/e/1FAIpQLSdxxGCl9lvrv06X3Tj0XPJThzDmBKux7S67ZEvw_sd8yKRdhQ/viewform?usp=pp_url&entry.1198644953=${isbn}`,
      "_blank",
    );
  }

  async function handleRandomButton() {
    const response = await fetch("/api/random-isbn");
    if (response.ok) {
      const json = await response.json();
      isbn = json?.isbn;
    }
  }

  onMount(() => {
    if (carousel.isPlaying) {
      carousel.start();
    }
  });

  onDestroy(() => {
    carousel.stop();
  });
</script>

<div class="flex items-center justify-center p-4">
  <div class="w-full max-w-6xl bg-slate-100 rounded-3xl p-4 md:p-8 shadow-lg">
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Left side - Input and controls -->

      <div class="flex flex-col p-4 gap-2 flex-1">
        <div class="flex items-center justify-start gap-4 hover:text-amber-800">
          <div class="isbn-controls">
            <button
              id={playButtonId}
              class="w-12 h-12 md:w-16 md:h-16 border border-slate-400 bg-slate-50 hover:bg-amber-50 hover:ring hover:ring-slate-400 rounded-full flex items-center justify-center transition-colors"
              onclick={togglePlayPause}
              aria-label={isPlaying ? "Stop" : "Play"}
            >
              {#if isPlaying}
                <Pause size={28} fill="currentColor" />
              {:else}
                <Play size={28} fill="currentColor" />
              {/if}
            </button>
          </div>
          <div>
            <label for={playButtonId} class="cursor-pointer">
              {#if isPlaying}
                <div class="text-lg md:text-xl font-semibold">
                  一時停止ボタンを押すとISBNを入力できます
                </div>
              {:else}
                <div class="text-lg md:text-xl font-semibold">
                  ISBNを入力してください
                </div>
                <div class="text-slate-500 text-sm">ハイフンは省略できます</div>
              {/if}
            </label>
          </div>
        </div>

        <div class="my-4">
          <input
            id="isbn"
            bind:value={isbn}
            class="border border-slate-500 p-2 md:p-4 text-lg md:text-2xl font-mono font-semibold bg-white rounded-lg"
            class:disabled-input={isPlaying}
            disabled={isPlaying}
            placeholder="ISBNを入力してください"
          />

          <div class="my-4" class:hidden={isPlaying}>
            <button
              class="px-4 py-2 flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-500 rounded cursor-pointer"
              onclick={handleRandomButton}
            >
              <RefreshCcw size={16} class="inline-block" />
              ランダム入力
            </button>
          </div>

          <div class="my-4 flex items-center gap-2">
            <label class="text-slate-800 font-semibold cursor-pointer">
              <input
                id="showFrontCheckbox"
                type="checkbox"
                bind:checked={showFront}
                class="inline-block"
              />
              表紙も表示する
            </label>
          </div>

          {#if validIsbn}
            <!-- <div class="text-slate-500 text-sm font-mono m-2 md:m-4">
              ISBN: {hyphenedIsbn}
            </div> -->
            <!-- <div class="text-sm font-mono hover:bg-white p-2 md:p-4 rounded-lg break-all">
              <Image size={16} class="inline-block" /><span class="ml-1">背表紙画像のURL</span><br>
              <a 
                href={spineUrl}
                target="_blank"
                class="text-orange-900 hover:text-orange-800 flex items-center gap-1"
              >
                {spineUrl}
                <ExternalLink size={16} class="inline-block" />
              </a>
            </div> -->
          {:else}
            <!-- <div class="text-red-500 text-sm font-mono">ISBNが正しくないようです</div> -->
          {/if}
        </div>

        <div class="debug hidden">
          {books.at(0)?.isbn}<br />
          {books.at(0)?.displaySides}<br />
          {displaySides}<br />
          {showFront}
        </div>

        <button
          class="text-sm px-4 py-2 flex items-center gap-2 size-fit border border-slate-500 bg-bg-slate-50 hover:bg-white rounded cursor-pointer"
          onclick={handleFeedbackClick}
        >
          <MessageSquareWarning />
          不具合を報告
        </button>
      </div>

      <!-- Right side - Book spine image -->
      <div class="flex-1 transform scale-75 md:scale-100">
        <PreviewBook {books} {bgColor} link={`/shelf/isbn/${isbn}`} />
      </div>
    </div>
  </div>
</div>

<style>
  .disabled-input {
    background-color: var(--color-gray-100);
    color: var(--color-gray-500);
  }
</style>
