<script lang="ts">
  const SITE_NAME = "opencover : みんなでつくる書籍カバー画像";
  const DEFAULT_IMAGE = "https://opencover.jp/ogp.png";
  const DEFAULT_DESCRIPTION =
    "opencoverは、本のカバー画像を生成し配信するウェブAPIです。";

  interface Props {
    /** <title> と og:title */
    title?: string;
    description?: string;
    /** ページの正規 URL（絶対 URL）。canonical と og:url に使う */
    url: string;
    /** OG 画像の絶対 URL。サイトの既定画像も oc-image の OG 画像も 1200×630 */
    image?: string;
    /** OG 画像の MIME タイプ。既定画像は PNG。oc-image の画像は形式が上流で決まるので省略して出さない */
    imageType?: string;
    imageAlt?: string;
    type?: string;
  }

  let {
    title = SITE_NAME,
    description = DEFAULT_DESCRIPTION,
    url,
    image = DEFAULT_IMAGE,
    imageAlt = title,
    imageType = image === DEFAULT_IMAGE ? "image/png" : undefined,
    type = "website",
  }: Props = $props();
</script>

<!-- 画像のサイズを書いておくと、初回シェア時に Facebook などが画像の取得を待たずにカードを描ける -->
<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={url} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:locale" content="ja_JP" />
  <meta property="og:type" content={type} />
  <meta property="og:url" content={url} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
  {#if imageType}
    <meta property="og:image:type" content={imageType} />
  {/if}
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content={imageAlt} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>
