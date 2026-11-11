/**
 * 書誌データ(/api/v1/bib/{isbn})の取得。プレースホルダ表示などで同じ ISBN を
 * 何度も引くので、リクエストを共有する(失敗はキャッシュしない)。
 */
export type Bib = {
	isbn?: string;
	title?: string;
	author?: string;
	jaAuthor?: string;
	seriesTitle?: string;
	publisher?: string;
};

const cache = new Map<string, Promise<Bib | null>>();

export function fetchBib(isbn: string): Promise<Bib | null> {
	const cached = cache.get(isbn);
	if (cached) return cached;
	const promise = fetch(`/api/v1/bib/${encodeURIComponent(isbn)}`)
		.then((r) => (r.ok ? (r.json() as Promise<Bib>) : null))
		.catch(() => null)
		.then((bib) => {
			if (!bib) cache.delete(isbn);
			return bib;
		});
	cache.set(isbn, promise);
	return promise;
}
