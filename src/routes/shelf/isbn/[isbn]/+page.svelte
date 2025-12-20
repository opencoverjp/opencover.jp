<script>
  import PreviewBook from "../../../../lib/PreviewBook.svelte";
  import BookCard from "./BookCard.svelte";

  let { data } = $props();
  let books = $derived(data.books);
  let bgColor = $derived(data.bgColor);
  let title = $derived(data.title);
  let isSingleBook = $derived(data.isSingleBook);
  let meta = $derived(data.meta);
</script>

<div class="md:w-8/12 p-4 mx-auto">
  <h3 class="title text-xl font-bold my-8">
    {title}
  </h3>

  <div class="my-8">
    <PreviewBook
      {books}
      {bgColor}
      link={`/goto/amazon/${books.at(0).book?.isbn}`}
    />
  </div>

  {#each books as book, i (book.isbn)}
    <BookCard {book} index={books.length > 1 ? i + 1 : 0} />
  {/each}
</div>

<svelte:head>
  <title>{meta.title}</title>
  <meta property="og:url" content={meta.url} />
  <meta property="og:title" content={meta.title} />
  <meta property="og:description" content={meta.description} />
  <meta property="og:image" content={meta.image} />
  <meta property="og:type" content="article" />
  <meta
    property="og:site_name"
    content="opencover : みんなでつくる書籍カバー画像"
  />
  <meta name="description" content={meta.description} />
  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<style>
  .title {
    font-feature-settings: "palt";
  }
</style>
