// 本棚の背景色（黄みがかったグレー）。トップページの DemoPanel と本棚ページで共通に使う。

/** 0 冊・複数冊のときの背景色 */
export const defaultShelfColor = '#d2d2c2';

/**
 * yslate 系のランダムな色（明度の幅は狭く）。Bookshelf が hex を前提にしているので hex で返す。
 * 乱数ではなく ISBN のハッシュから決めるので、サーバーとブラウザで同じ色になる（読み込み時に色が切り替わらない）
 */
export function yslateFor(isbn: string): string {
  // FNV-1a ハッシュ
  let x = 2166136261;
  for (const ch of isbn) {
    x ^= ch.charCodeAt(0);
    x = Math.imul(x, 16777619);
  }
  const rand = (shift: number) => ((x >>> shift) & 0xff) / 255;
  const h = 50 + rand(0) * 15; // 黄みがかったグレー
  const s = 10 + rand(8) * 12;
  const l = 74 + rand(16) * 8;
  return hslToHex(h, s, l);
}

/** 本棚の背景色：1 冊だけならその本の色、それ以外は既定の色 */
export function shelfColorFor(isbns: string[]): string {
  return isbns.length === 1 ? yslateFor(isbns[0]) : defaultShelfColor;
}

function hslToHex(h: number, s: number, l: number): string {
  const sat = s / 100;
  const lig = l / 100;
  const a = sat * Math.min(lig, 1 - lig);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = lig - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(c * 255)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
