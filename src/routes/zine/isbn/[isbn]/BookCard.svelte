<script lang="ts">
  import ISBN from "@pubdate/isbn";

  const links = [
    {
      name: "buy",
      label: "買う",
      sites: [
        { name: "amazon", label: "Amazon" },
        { name: "rakuten", label: "楽天ブックス" },
        { name: "kinokuniya", label: "紀伊国屋書店" },
        { name: "maruzenjunkudo", label: "丸善ジュンク堂"},
        { name: "honto", label: "honto" },
        { name: "openbs", label: "近くの書店在庫" }
      ],
    },
    {
      name: "search",
      label: "探す",
      sites: [
        { name: "calil", label: "図書館 (カーリル)" },
        { name: "cinii", label: "大学図書館 (CiNii Books)" },
      ],
    },
    {
      name: "record",
      label: "記録する",
      sites: [
        { name: "bookmeter", label: "読書メーター" },
        { name: "booklog", label: "ブクログ" },
        { name: "googlebooks", label: "Google ブックス" },
      ],
    },
  ];

  const {book, index} = $props();

  const hyphenedIsbn = $derived(
    ISBN.parse(book.book?.isbn).isValid ? ISBN.parse(book.book?.isbn).toString({version: "isbn13", hyphens: [true]}) : "");

</script>

<section class="mb-4 border border-slate-200 p-6 rounded">
  {#if index > 0}
    <div class="px-4 py-2 text-sm bg-slate-100 size-fit rounded">{index}冊目</div>
  {/if}
    <h3 class="book-title flex items-center gap-2 text-xl font-bold mt-4">
    <span>
      {book.book?.title}{book.book?.subtitle
        ? `──${book.book?.subtitle}`
        : ""}
    </span>
  </h3>

  <div class="my-3">
    {book.book?.author}
  </div>
  <div class="my-3">
    {book.book?.label}　{book.book?.publisher}
  </div>
  <div class="my-3 text-xs md:text-sm font-mono">
    ISBN: {hyphenedIsbn}
  </div>

  <div class="my-4">
    <div class="flex flex-col gap-3">
      {#each links as { name, label, sites }}
        <div class="flex items-center gap-2">
          <div class="text-sm font-semibold text-slate-800">
            {label}
          </div>
          <div class="flex flex-wrap gap-2">
            {#each sites as { name, label }}
              <a
                href={`/goto/${name}/${book.book?.isbn}`}
                target="_blank"
                class="px-2 py-1 text-xs md:text-sm border border-gray-300 rounded hover:bg-slate-100"
                >{label}</a
              >
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>