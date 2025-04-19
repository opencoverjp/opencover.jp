<script>
  import { ExternalLink, OctagonAlert, CircleHelp, BookText, Palette, BookImage, Barcode } from "@lucide/svelte";
  import BookIcon from "../../lib/BookIcon.svelte";
</script>

<div class="bg-slate-50 flex items-center justify-center !p-16">
  <h1 class="text-xl font-semibold">つかいかた</h1>
</div>

<div class="md:w-8/12 p-4 mx-auto">
  <section class="my-9">
    <h3>    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
      つかいかた</h3>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      opencoverは、書籍のカバー画像を配信するAPIです。
      ISBNを指定したURLを呼び出すことで、書籍のカバー画像を取得できます。
    </div>

    <div
    class="text-sm md:text-base leading-[2] my-9 border border-slate-300 p-4 rounded"
  >
    <div class="flex items-center gap-2">
      <Barcode class="inline-block" /><strong>ISBNとは</strong>
    </div>
    書籍出版物を識別する国際標準のコードです。本の裏表紙や奥付に記載されています。
  </div>

    <div class="!p-8 bg-slate-50 max-w-full">
      <div
        class="bg-white md:text-lg font-mono !p-4 !px-8 border border-slate-500 rounded overflow-x-auto md:overflow-x-visible break-word"
      >
        https://image.opencover.jp/v1/cover/spine/<span class="text-amber-600"
          >{`{isbn}`}</span
        >.webp
      </div>
    </div>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      URLの<span class="text-amber-600 font-mono">{` {isbn} `}</span
      >に13桁のISBNを指定してください。 URLの <span class="font-mono"
        >{`spine`}</span
      > とは、背表紙を示します。
      今後、表紙や裏表紙の自動生成にも取り組みます。
    </div>

    <h4>例</h4>
    <div>
      ISBNが<span class="font-mono">9784087213126</span>の場合は、こちらのURLになります。
    </div>

    <a
      href="https://image.opencover.jp/v1/cover/spine/9784087213126.webp"
      target="_blank"
      class="font-mono text-orange-800 underline underline-offset-4 decoration-orange-800
    hover:bg-yellow-50 max-w-full p-2 rounded flex items-center gap-1 overflow-x-auto md:overflow-x-visible break-word"
    >
      https://image.opencover.jp/v1/cover/spine/9784087213126.webp
      <ExternalLink size={16} class="inline-block" />
    </a>
  </section>

  <section>
    <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    しくみ</h3>

    <div
      class="flex flex-col md:flex-row items-center gap-4 !p-8 bg-slate-50 size-fit"
    >
      <div
        class="bg-white text-lg md:text-lg font-mono !p-4 !px-8 size-fit border border-slate-500 rounded"
      ><BookText class="inline-block" />
        書誌情報
      </div>
      <div class="text-lg font-bold">+</div>
      <div
        class="bg-white text-lg md:text-lg font-mono !p-4 !px-8 size-fit border border-slate-500 rounded"
      ><Palette class="inline-block" />
        スタイル
      </div>
      <div class="text-lg font-bold">
        <span class="sm:hidden">↓</span>
        <span class="hidden sm:inline md:hidden">↓</span>
        <span class="hidden md:inline">→</span>
      </div>
      <div
        class="bg-white text-lg md:text-lg font-mono !p-4 !px-8 size-fit border border-slate-500 rounded"
      ><BookImage class="inline-block" />
        カバー画像
      </div>
    </div>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      ISBNから書誌情報を取得し、書籍の種類に応じたスタイルを適用することで、書籍のカバー画像を生成しています。
    </div>
  </section>

  <section>
    <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    対応している書籍</h3>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      <strong>主要な新書と一部の文庫のみ</strong>対応しています。
      文庫はノンフィクションのレーベルが中心です。
    </div>
    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      その他の書籍については、順次対応予定です。
      対応する書籍を増やすため、協力いただける方でスタイルを作成していく予定です。
    </div>
  </section>

  <section>
    <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    わかっている問題</h3>

    <h4 class="flex items-center gap-2"><OctagonAlert size={24} class="inline-block" />背表紙画像が出ない／正しくないことがあります</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      未対応の書籍のほうが多いため、表示されなかったり、レイアウトが崩れることがあります。
      出版時期によって装丁がリニューアルされている場合は対応できていません。
    </div>

    <h4 class="flex items-center gap-2"><OctagonAlert size={24} class="inline-block" />レイアウトが崩れていることがあります</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      対応している書籍であっても、タイトルや著者名が長いと切れていたり重なっていたりします。
      この問題には対処する予定です。
    </div>

    <h4 class="flex items-center gap-2"><OctagonAlert size={24} class="inline-block" />背表紙の大きさがおかしいです</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      はい、認識しています。この問題には対処する予定です。
    </div>

    <h4 class="flex items-center gap-2"><OctagonAlert size={24} class="inline-block" />表紙の画像がぼやけています</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      表紙の画像は、Google Books APIと<a href="https://openbd.jp/" target="_blank" class="underline underline-offset-4 hover:text-amber-600">openBD</a>を使用しています。
      これらの画像の解像度が低いためぼやけています。
    </div>
  </section>

  <section>
    <h3>
    <img src="/favicon.svg" alt="Book" class="w-6 h-6" />
    質問</h3>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      いただきそうな質問をあらかじめまとめました。
    </div>

    <h4 class="flex items-center gap-2"><CircleHelp size={24} class="inline-block" />画像が表示されるまでに時間がかかります</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      リクエストする書籍が初めてアクセスされるときは、画像が表示されるまでに数秒の時間がかかります。
      2回目以降ははやくなります。
    </div>

    <h4 class="flex items-center gap-2"><CircleHelp size={24} class="inline-block" />ISBNを入力するのが面倒なのでキーワード検索したい</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      opencoverには本を検索する機能がありません。
      別途公開予定のWebアプリケーションでは、キーワードで検索できるようにします。
    </div>

    <h4 class="flex items-center gap-2"><CircleHelp size={24} class="inline-block" />背表紙の下部に「すかし」のようなものが見えます</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      opencoverが自動生成した画像であることを示すため、画像の下部に「OC」というマークを付けています。
    </div>

    <h4 class="flex items-center gap-2"><CircleHelp size={24} class="inline-block" />拡張子の<span class="font-mono">.webp</span>とは何ですか</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      WebP（ウェッピー）は、JPEGやPNGよりも軽量で高画質の画像フォーマットです。
    </div>

    <h4 class="flex items-center gap-2"><CircleHelp size={24} class="inline-block" />他の解像度や画像フォーマットはありませんか</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      開発リソースが限られているため、現在の仕様の画像のみを提供しています。
    </div>

    <h4 class="flex items-center gap-2"><CircleHelp size={24} class="inline-block" />商用利用できますか</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      利用規約やライセンスをまだ定めていませんが、opencoverが生成した画像は、書籍の紹介や販売促進の目的に限りご自由にお使いいただけます。
      それ以外の表紙の画像などは各出版社の利用規約をご確認ください。
    </div>

    <h4 class="flex items-center gap-2"><CircleHelp size={24} class="inline-block" />表紙と背表紙の位置関係がまちがっています</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      縦書きの本を想定して、背表紙の左側に表紙を配置しています。
      本の書字方向の情報を追加できれば、この問題を解決できるかもしれません。
    </div>

    <h4 class="flex items-center gap-2"><CircleHelp size={24} class="inline-block" />開発に協力したいです　プロジェクトを支援したいです</h4>

    <div class="text-md sm:text-lg md:text-lg lg:text-lg leading-[2] my-9">
      ありがとうございます。
      スタイルの作成は、どなたでもご参加いただけるようにする予定です。
      サービスの維持に費用がかかっていますので、ご寄付も受け付ける予定です。
      ご協力いただける方は、ぜひお問い合わせください。
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
  h4 {
    font-size: var(--text-lg);
    font-weight: var(--font-weight-semibold);
    margin-top: calc(var(--spacing) * 2);
  }
</style>

