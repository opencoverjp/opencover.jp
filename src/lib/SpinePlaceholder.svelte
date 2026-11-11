<script lang="ts">
  // 背表紙画像の読み込み中に出すプレースホルダ。書誌データからタイトル・著者・叢書名を
  // 縦書きで描く(上からタイトル、著者、下端に叢書名。honbaco-ui の背表紙プレースホルダに倣う)。
  import { fetchBib, type Bib } from "./bib";

  type Props = {
    isbn: string;
    /** 背表紙の縦横比を決める幅・高さ(単位は任意。比だけを使う) */
    width?: number;
    height?: number;
  };
  let { isbn, width = 65, height = 865 }: Props = $props();

  let bib = $state<Bib | null>(null);
  $effect(() => {
    const target = isbn;
    bib = null;
    if (!target) return;
    let cancelled = false;
    fetchBib(target).then((b) => {
      if (!cancelled) bib = b;
    });
    return () => {
      cancelled = true;
    };
  });

  const authorName = $derived(
    bib?.jaAuthor ?? (bib?.author ?? "").split("/")[0].trim().replace(/\s*著.*$/, ""),
  );
</script>

<!-- 文字サイズは背表紙の幅に対する割合(cqw)で決める -->
<div
  class="spine-placeholder h-full border border-yslate-300 bg-yslate-50 flex flex-col items-center overflow-hidden"
  style:aspect-ratio="{width} / {height}"
  role="img"
  aria-label={bib?.title ?? "読み込み中"}
>
  <span class="title">{bib?.title ?? ""}</span>
  <span class="author">{authorName}</span>
  <span class="series">{bib?.seriesTitle ?? ""}</span>
</div>

<style>
  .spine-placeholder {
    container-type: size;
    padding-block: 6cqw;
    font-family: "Noto Serif JP", serif;
  }
  .spine-placeholder span {
    writing-mode: vertical-rl;
    text-orientation: upright;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-height: 0;
  }
  .title {
    max-height: 55%;
    margin-top: 6cqw;
    font-size: 50cqw;
    font-weight: 700;
    color: #1f2937;
  }
  .author {
    max-height: 30%;
    margin-top: 50cqw;
    font-size: 36cqw;
    color: #4b5563;
  }
  /* 叢書名は下端に寄せる */
  .series {
    max-height: 20%;
    margin-top: auto;
    font-size: 34cqw;
    color: #6b7280;
  }
</style>
