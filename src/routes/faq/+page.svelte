<div class="page bg-yslate-50 flex items-center justify-center !p-16">
  <h1 class="text-xl font-semibold">よくある質問</h1>
</div>

<div class="page md:w-8/12 p-4 mx-auto">

  <div class="faq">
    <details>
      <summary>無料で利用できますか？</summary>
      <p>
        はい、登録不要で無料で利用できます。
      </p>
    </details>
    
    <details>
      <summary>画像が表示されるまでに時間がかかるのはどうしてですか？</summary>
      <p>
        リクエストする書籍が初めてアクセスされるときは、画像が表示されるまでに数秒の時間がかかります。
        2回目以降ははやくなります。
      </p>
    </details>

    <details>
      <summary>ISBNを入力するのが面倒です。キーワード検索できませんか？</summary>
      <p>
        opencoverには本を検索する機能がありません。
        別途公開予定のWebアプリケーションでは、キーワードで検索できるようにします。
      </p>
    </details>

    <details>
      <summary>カバー画像の下部に「すかし」がありますか？</summary>
      <p>
        opencoverが自動生成した画像であることを示すため、画像の下部に「OC」というマークを付けています。
      </p>
    </details>

    <details>
      <summary>拡張子の<span class="font-mono">.webp</span>とは何ですか？</summary>
      <p>
        WebP（ウェッピー）は、JPEGやPNGよりも軽量で高画質の画像フォーマットです。
      </p>
    </details>

    <details>
      <summary>他の解像度や画像フォーマットはありませんか？</summary>
      <p>
        開発リソースが限られているため、現在の仕様の画像のみを提供しています。
      </p>
    </details>

    <details>
      <summary>商用利用できますか？</summary>
      <p>
        利用規約やライセンスをまだ定めていませんが、opencoverが生成した画像は、書籍の紹介や販売促進の目的に限りご自由にお使いいただけます。
        それ以外の表紙の画像などは各出版社の利用規約をご確認ください。
      </p>
    </details>

    <details>
      <summary>表紙と背表紙の位置関係がまちがっていませんか？</summary>
      <p>
        縦書きの本を想定して、背表紙の左側に表紙を配置しています。
        本の書字方向の情報を追加できれば、この問題を解決できるかもしれません。
      </p>
    </details>

    <details>
      <summary>開発に協力できますか？　プロジェクトを支援できますか？</summary>
      <p>
        ありがとうございます。
        スタイルの作成は、どなたでもご参加いただけるようにする予定です。
        サービスの維持に費用がかかっていますので、ご寄付も受け付ける予定です。
        ご協力いただける方は、ぜひ<a href="/about">お問い合わせ</a>ください。
      </p>
    </details>
  </div>
</div>

<svelte:head>
  <title>よくある質問 | opencover</title>
  <meta property="og:title" content="opencover : みんなでつくる書籍カバー画像" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="opencoverは、本のカバー画像を生成し配信するウェブAPIです。" />
  <meta property="og:image" content="https://opencover.jp/ogp.png" />
  <meta property="og:site_name" content="opencover : みんなでつくる書籍カバー画像" />
  <meta property="og:url" content="https://opencover.jp/faq" />
  <meta name="description" content="opencoverは、本のカバー画像を生成し配信するウェブAPIです。" />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<style>
  .page {
    font-family: BlinkMacSystemFont, "Helvetica Neue", "Segoe UI",
      "Hiragino Kaku Gothic ProN", "Hiragino Sans", Arial, Meiryo, sans-serif;
    font-weight: 400;
    line-height: 2;
  }
  .faq {
    border-top: 1px solid var(--color-yslate-300);
  }
  details {
    border-bottom: 1px solid var(--color-yslate-300);
    padding: 18px 4px;
  }
  summary {
    cursor: pointer;
    font-size: var(--text-lg);
    font-weight: var(--font-weight-bold);
    line-height: 2;
  }
  summary:hover {
    color: var(--color-amber-700);
  }
  details p {
    margin: 10px 0 0;
    color: var(--color-yslate-600);
    line-height: 2;
  }
  details a {
    color: var(--color-amber-700);
    text-decoration: underline;
    text-underline-offset: 4px;
  }
</style>
