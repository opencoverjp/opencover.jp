<script lang="ts">
  // 表紙画像の読み込み中に出すプレースホルダ。書誌データからタイトル・著者・叢書名を
  // SVG で描く(honbaco-ui の BookCover のプレースホルダを移植)。
  import { fetchBib, type Bib } from "./bib";

  type Props = {
    isbn: string;
    /** 表紙の縦横比を決める幅・高さ(単位は任意。比だけを使う) */
    width?: number;
    height?: number;
  };
  let { isbn, width = 174, height = 285 }: Props = $props();

  // テキストのレイアウトは幅 120 の座標系で行い、高さは表紙の縦横比から決める
  const W = 120;
  let H = $derived((W * height) / width);

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

  // max 文字ごとに改行し、maxLines を超えたら末尾を「…」にする(CJK 向け、空白不要)
  function wrap(text: string | undefined, max: number, maxLines: number): string[] {
    const chars = Array.from(text ?? "");
    const lines: string[] = [];
    for (let i = 0; i < chars.length; i += max) lines.push(chars.slice(i, i + max).join(""));
    if (lines.length > maxLines) {
      lines.length = maxLines;
      lines[maxLines - 1] = lines[maxLines - 1].slice(0, -1) + "…";
    }
    return lines;
  }

  const authorName = $derived(
    bib?.jaAuthor ?? (bib?.author ?? "").split("/")[0].trim().replace(/\s*著.*$/, ""),
  );
  const titleLines = $derived(wrap(bib?.title, 8, 4));
  const authorLines = $derived(wrap(authorName, 12, 2));
  const seriesLines = $derived(wrap(bib?.seriesTitle, 12, 2));

  // タイトルと著者は上下中央、叢書名は下端付近に置く
  const layout = $derived.by(() => {
    const groups = [
      { lines: titleLines, size: 11, weight: 700, fill: "#1f2937" },
      { lines: authorLines, size: 8, weight: 400, fill: "#4b5563" },
    ].filter((g) => g.lines.length);
    const gap = 12;
    const heights = groups.map((g) => g.lines.length * g.size * 1.35);
    const total = heights.reduce((a, b) => a + b, 0) + gap * (groups.length - 1);
    let y = (H - total) / 2;
    const placed = groups.map((g, i) => {
      const top = y;
      y += heights[i] + gap;
      return { ...g, top };
    });
    if (seriesLines.length) {
      const size = 7;
      const h = seriesLines.length * size * 1.35;
      placed.push({ lines: seriesLines, size, weight: 400, fill: "#6b7280", top: H - 10 - h });
    }
    return placed;
  });
</script>

<svg
  class="h-full w-auto border border-yslate-300"
  style:aspect-ratio="{width} / {height}"
  viewBox="0 0 {W} {H}"
  preserveAspectRatio="xMidYMid meet"
  role="img"
  aria-label={bib?.title ?? "読み込み中"}
>
  <rect width={W} height={H} fill="#f8fafc" />
  {#each layout as g}
    <text
      text-anchor="middle"
      font-family="'Noto Serif JP', serif"
      font-size={g.size}
      font-weight={g.weight}
      fill={g.fill}
    >
      {#each g.lines as line, i}
        <tspan x={W / 2} y={g.top + g.size * (1.1 + i * 1.35)}>{line}</tspan>
      {/each}
    </text>
  {/each}
</svg>
