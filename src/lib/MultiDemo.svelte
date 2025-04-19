<script lang="ts">
  import ISBN from "@pubdate/isbn";
  import { Play, Pause } from '@lucide/svelte';
  import { onDestroy, onMount } from "svelte";
  import PreviewBook from "./PreviewBook.svelte";

  const isbns = ["9784087213126", "9784480076403", "9784004320340", "9784121028440"];
  const bgColors = ["#D9BD90"];
  const interval = 2000;

  let isbnsString = $state(isbns.join("\n"));
  let isbnsArray = $derived(
    isbnsString.trim().split(/[\s,;]+/)
      .map(isbn => isbn.trim().replace(/[^0-9Xx]/g, ""))
      .map((isbn) => isbn.trim())
      .filter(isbn => isbn.length > 0)
      .slice(0, 10)
  );
  let isBlankISBN = $derived(isbnsArray.length === 0);
  let validIsbn = $derived(isbnsArray.every((isbn) => ISBN.parse(isbn).isValid));
  // $inspect(isbnsString);
  // $inspect(isbnsArray);
  // $inspect(isBlankISBN);
  let books = $derived(isbnsArray.length === 0 ? [] : isbnsArray.map(isbn => ({
    isbn,
    displaySides: ['spine']
  })));

  let isbn = $state(isbns[0]);
  let bgColor = $state(bgColors[0]);
  // $inspect(bgColor);

  let currentIndex = 0;
  let intervalId;
  let isPlaying = $state(true); 
  let showFront = $state(false);


  function togglePlayPause() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      startInterval();
    } else {
      stopInterval();
    }
  }

  function startInterval() {
    if (intervalId) {
      clearInterval(intervalId);
    }

    isbnsString = isbns.join('\n');
    bgColor = bgColors[currentIndex];

    intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % isbns.length;
      isbn = isbns[currentIndex];
      bgColor = bgColors[currentIndex % bgColors.length];
    }, interval);
  }

  function stopInterval() {
    clearInterval(intervalId);
    intervalId = null;
    isbnsString = '';
    bgColor = "#C0CDD9";
  }

  onMount(() => {
    if (isPlaying) {
      startInterval();
    }
  });

  onDestroy(() => {
    stopInterval();
  });
</script>

<div class="flex items-center justify-center p-4">
  <div class="w-full max-w-6xl bg-slate-100 rounded-3xl p-4 md:p-8 shadow-lg">
    <div class="flex flex-col lg:flex-row gap-6">
      <!-- Left side - Input and controls -->
      
        <div class="flex flex-col p-4 gap-2 flex-1">

          <div class="flex items-center justify-start gap-4">
            <div class="isbn-controls">
              <button 
                id="playPause"
                class="w-12 h-12 md:w-16 md:h-16 border border-slate-400 bg-slate-50 hover:bg-slate-200 hover:ring hover:ring-slate-400 rounded-full flex items-center justify-center transition-colors text-slate-800"
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
              <label for="playPause" class="cursor-pointer">
              {#if isPlaying}
                  <div class="text-lg md:text-xl font-semibold">一時停止ボタンを押すとISBNのリストを入力できます</div>
              {:else}
                <div class="text-lg md:text-xl font-semibold">ISBNのリストを入力してください</div>
                <div class="text-slate-500 text-sm">改行かスペース、コンマで区切って入力してください</div>
              {/if}
              </label>
            </div>
          </div>
        
        <div class="my-4">
          <textarea 
            id="isbns" 
            bind:value={isbnsString} 
            rows="5"
            class="border border-slate-500 p-2 md:p-4 text-lg md:text-2xl font-mono font-semibold bg-white rounded-lg"
            class:disabled-input={isPlaying}
            disabled={isPlaying} 
            placeholder="ISBNのリストを入力してください"
          ></textarea>
        
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
        
    </div>
      
      <!-- Right side - Book spine image -->
      <div class="flex-1">
        <PreviewBook {books} {bgColor} link={`/shelf/isbn/${isbnsArray.join(',')}`}/>
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