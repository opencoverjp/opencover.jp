/**
 * 表紙・背表紙・高さ(スタイル)の取得と先読み。
 * ISBN が分かった時点で画像の読み込みを始めておき、表示時の待ち時間を短くする。
 * 同じ ISBN を何度も引くので(カルーセル・表紙の切り替えなど)、リクエストを共有する。
 */
import { fetchBib } from "./bib";

export type CoverSource = { name: string; link: string | null };
export type Cover = { imageUrl: string; source: CoverSource };

/** 背表紙画像(サイト内のプロキシ経由) */
export const spineSrc = (isbn: string) => `/api/v1/image/cover/spine/${isbn}.webp`;

/** 自前生成の表紙。外部書影が無い・取れない・読み込めないときに使う */
export const generatedFrontSrc = (isbn: string) =>
	`https://image.opencover.jp/v1/cover/front/isbn/${isbn}.webp`;

export const opencoverSource = (isbn: string): CoverSource => ({
	name: "opencover",
	link: `https://opencover.jp/shelf/isbn/${isbn}`,
});

const coverCache = new Map<string, Promise<Cover>>();

/**
 * 表紙に使う画像と出典。/api/v1/cover/{isbn} の front の先頭
 * (openBD → Google Books → opencover の順)。取れなければ自前生成の表紙にする。
 * 失敗した結果はキャッシュしない。
 */
export function fetchCover(isbn: string): Promise<Cover> {
	const cached = coverCache.get(isbn);
	if (cached) return cached;
	const fallback: Cover = { imageUrl: generatedFrontSrc(isbn), source: opencoverSource(isbn) };
	const promise = fetch(`/api/v1/cover/${isbn}`)
		.then((r) => (r.ok ? r.json() : Promise.reject(new Error(`status ${r.status}`))))
		.then((sides) => {
			const first = sides?.find((s: { side: string }) => s.side === "front")?.images?.[0];
			if (!first?.imageUrl) return fallback;
			return {
				imageUrl: first.imageUrl as string,
				source: first.source?.name
					? { name: first.source.name, link: first.source.link ?? null }
					: opencoverSource(isbn),
			};
		})
		.catch(() => {
			coverCache.delete(isbn);
			return fallback;
		});
	coverCache.set(isbn, promise);
	return promise;
}

const styleCache = new Map<string, Promise<{ height: number } | null>>();

/** 本のスタイル(判型の高さなど)。失敗はキャッシュしない */
export function fetchStyle(isbn: string): Promise<{ height: number } | null> {
	const cached = styleCache.get(isbn);
	if (cached) return cached;
	const promise = fetch(`/api/style/isbn/${isbn}`)
		.then((r) => (r.ok ? r.json() : null))
		.catch(() => null)
		.then((style) => {
			if (typeof style?.height !== "number") {
				styleCache.delete(isbn);
				return null;
			}
			return style as { height: number };
		});
	styleCache.set(isbn, promise);
	return promise;
}

// 先読み中・先読み済みの画像。参照を持っておかないと読み込み前に GC されることがある
const images = new Map<string, HTMLImageElement>();
const MAX_IMAGES = 100;

/** 画像をブラウザのキャッシュに読み込んでおく */
export function preloadImage(url: string, referrerPolicy?: ReferrerPolicy) {
	if (typeof Image === "undefined" || !url || images.has(url)) return;
	const img = new Image();
	if (referrerPolicy) img.referrerPolicy = referrerPolicy;
	img.decoding = "async";
	img.src = url;
	images.set(url, img);
	if (images.size > MAX_IMAGES) images.delete(images.keys().next().value!);
}

/**
 * 1 冊分を先読みする。背表紙・書誌(プレースホルダ用)・高さは常に、
 * front: true のときは表紙(JSON → 画像)も読み込む。
 */
export function preloadBook(isbn: string, { front = false }: { front?: boolean } = {}) {
	if (typeof window === "undefined" || !isbn) return;
	preloadImage(spineSrc(isbn));
	fetchBib(isbn);
	fetchStyle(isbn);
	if (front) {
		// 外部書影は Referer を付けると弾かれることがあるので、表示時(BookFront)と同じく送らない
		fetchCover(isbn).then((c) => preloadImage(c.imageUrl, "no-referrer"));
	}
}

/** ブラウザが空いているときに実行する(初回表示の通信を邪魔しない) */
export function whenIdle(fn: () => void): () => void {
	if (typeof window === "undefined") return () => {};
	if ("requestIdleCallback" in window) {
		const id = window.requestIdleCallback(fn, { timeout: 2000 });
		return () => window.cancelIdleCallback(id);
	}
	const id = setTimeout(fn, 200);
	return () => clearTimeout(id);
}
