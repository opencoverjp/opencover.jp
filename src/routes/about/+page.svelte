<script>
  import {Book} from '@lucide/svelte';
  import BookIcon from '../../lib/BookIcon.svelte';
</script>

<div class="bg-slate-50 flex items-center justify-center !p-16">
  <h1 class="text-xl font-semibold">About</h1>
</div>

<div class="md:w-8/12 p-4 mx-auto">

<section>
  <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    opencoverとは</h3>
  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    opencoverは、本のカバー画像を配信するAPIです。
    インターネットで書籍をビジュアルで紹介するには、表紙の画像しかなく、背表紙の画像がありませんでした。
  </div>
  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    書籍のカバー画像は、文化を伝える公益性の高い共有財産です。
    そこで、非営利で自由に使える画像生成・配信APIとして開発しました。
  </div>
  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    このAPIを活用することで、書籍紹介や蔵書管理などのアプリやサービスを開発することができます。
  </div>
</section>

<section>
  <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    「みんなでつくる」とは</h3>
  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    opencoverは、みなさんの協力で対応書籍を増やしていきます。
    書籍カバーのレイアウトを指定するスタイルシートを共同編集することで、より多くの書籍に対応できるようになります。
    その仕組みを現在開発中です。
  </div>
</section>

<section>
  <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    出版社のみなさまへ</h3>
  <h4 class="font-semibold">ご理解とご協力のお願い</h4>
  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    opencoverが生成しているカバー画像は、実物の書籍を参考にあくまで簡易的に再現したものです。
    実際の書籍カバーの著作権を侵害する意図はありません。
    opencoverでは生成画像にたよらず、本来の画像を配信することを目指しています。
    ご協力いただける出版社の方は、ぜひお問い合わせください。
  </div>
</section>

<section>
  <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    リリース履歴</h3>

  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    2025-03-31: プレビュー版公開
  </div>
</section>

<section>
  <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    お問い合わせ</h3>

  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    opencoverへのお問い合わせは下記までお願いいたします。
  </div>
  
  <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
    191-0065<br>
    東京都日野市旭が丘6-6<br>
    東京都立大学システムデザイン学部インダストリアルアート学科<br>
    杉本達應研究室<br>
  </div>
  
  <div class="font-mono text-sm my-9">
    info <em>(at mark)</em> opencover.jp
  </div>
  
  <div class="text-slate-500 text-sm my-9">
    opencoverは、Amazonのアソシエイトとして適格販売により収入を得ることがあります。
  </div>

</section>

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


<style>
  :root {
    font-family: BlinkMacSystemFont, "Helvetica Neue", "Segoe UI",
      "Hiragino Kaku Gothic ProN", "Hiragino Sans", Arial, Meiryo, sans-serif;
    font-weight: 400;
    line-height: 2;
  }
  h3 {
    font-size: var(--text-xl);
    font-weight: var(--font-weight-semibold);
    margin-top: calc(var(--spacing) * 4);
    margin-bottom: calc(var(--spacing) * 4);
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
    color: var(--color-slate-900);
  }
</style>