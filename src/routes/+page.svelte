<script lang="ts">
  import "../app.css";
  import { Barcode, Book, LibraryBig } from "@lucide/svelte";
  import SingleDemo from "../lib/SingleDemo.svelte";
  import MultiDemo from "../lib/MultiDemo.svelte";
  import InstagramEmbed from "../lib/InstagramEmbed.svelte";
</script>

<div
  class="relative overflow-hidden bg-no-repeat bg-cover h-[300px] md:h-[500px]"
  style="
  background-image: url('/bookshelf-bg.jpg');
  background-repeat: repeat-y;
  background-size: 100%;
  background-attachment: fixed;
  "
>
  <div
    class="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-linear-to-b from-orange-300/50 to-orange-900/60"
  >
    <div class="flex justify-center items-center h-full">
      <div
        class="flex flex-col items-center text-center text-white px-6 md:px-12"
      >
        <h1
          class="text-4xl md:text-6xl font-bold drop-shadow-[0_12px_12px_rgba(0,0,0,1)] md:drop-shadow-[0_16px_16px_rgba(0,0,0,1)] mt-0 mb-6 tracking-widest"
        >
          opencover
        </h1>
        <h2
          class="text-lg md:text-2xl font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,1)] md:drop-shadow-[0_8px_8px_rgba(0,0,0,1)] mb-8"
        >
          みんなでつくる書籍カバー
        </h2>
        <div
          class="text-sm md:text-base font-semibold bg-orange-900/10 border border-white rounded px-4 py-2 size-fit"
        >
          プレビュー版
        </div>
      </div>
    </div>
  </div>
  <div
    class="absolute right-2 bottom-2 bg-black text-gray-200 opacity-70 text-xs px-2 py-1 rounded"
  >
    opencover背表紙で作成した本棚画像
  </div>
</div>

<div class="container mx-auto p-4">
  <h3 class="text-xl font-bold my-8">opencoverとは</h3>

  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    opencoverは、本のカバー画像を生成し配信するウェブAPIです。
    非営利のプロジェクトです。どなたでもご自由にお使いいただけます。
    ISBNを指定したURLを呼び出すことで、かんたんに背表紙画像を取得できます。
    対応している書籍は、新書を中心に約70,000冊です。
    <a href="how-to-use" class="p-2 px-4 text-sm border border-slate-300 rounded-full hover:bg-slate-100">
      もっとくわしく…
    </a>
  </div>

  <h3 class="text-xl font-bold my-8">使用例</h3>

  <h3 class="text-xl font-bold my-8 flex items-center gap-2">
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    1冊の本の背表紙を見るサンプル
  </h3>

  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    ISBNから本の背表紙画像を生成しています。
  </div>

  <SingleDemo />

  <h3 class="text-xl font-bold my-8 flex items-center gap-2">
    <LibraryBig />
    複数冊の本棚を見るサンプル
  </h3>

  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    複数冊の背表紙を並べて配置すると、本棚のようなイメージを作ることができます。
    ここでは、ISBNのリストから最大10冊までの本棚を表示しています。
  </div>

  <MultiDemo />

  <h3 class="text-xl font-bold my-8">活用例</h3>

  <h4 class="text-lg font-bold my-8">Biblisist</h4>
  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    opencoverの画像を活用した、ユーザが本棚を作成し共有できるサービスを開発中です。
    2025年リリース予定です。
  </div>
  
  <InstagramEmbed postUrl="https://www.instagram.com/reel/DG0P1tFMy5O/" />

</div>

<svelte:head>
  <meta property="og:title" content="opencover : みんなでつくる書籍カバー画像" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="opencoverは、本のカバー画像を生成し配信するウェブAPIです。" />
  <meta property="og:image" content="https://opencover.jp/ogp.png" />
  <meta property="og:site_name" content="opencover : みんなでつくる書籍カバー画像" />
  <meta property="og:url" content="https://opencover.jp/" />
  <meta name="description" content="opencoverは、本のカバー画像を生成し配信するウェブAPIです。" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
