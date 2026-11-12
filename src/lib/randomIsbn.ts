/**
 * 「ランダム入力」ボタンが使う ISBN の在庫。ページ全体で 1 つだけ持ち、全ボタンがここから取り出す。
 *
 * - API(GET /v1/random-isbn)は、いずれかのボタンが初めて押されたときに呼ぶ(ページ表示時には呼ばない)
 * - 1 回に 50 件取得し、在庫が 10 件を切ったら裏で次の 50 件を足す
 * - 取得中に呼ばれたら、新しく取得せず進行中の Promise を共有する(連打・同時押しで多重に呼ばない)
 * - 一度払い出した ISBN は補充時に除外する。サーバーは 60 秒間同じ 200 件の候補から選ぶので、
 *   除外した結果 1 件も増えなかったときは、払い出し済みの記録をクリアして重複を許す
 */
import { preloadImage, spineSrc } from "./cover";

// *.workers.dev ではサーバー側のキャッシュが効かないので、必ずこのホストを使う
const API = "https://image.opencover.jp/v1/random-isbn";
const BATCH = 50;
const LOW_WATER = 10;

type RandomIsbnResponse = { isbn: string; isbns?: string[] };

let stock: string[] = [];
const issued = new Set<string>();
let inflight: Promise<void> | null = null;

async function fetchOnce(): Promise<string[]> {
	const response = await fetch(`${API}?count=${BATCH}`);
	if (!response.ok) throw new Error(`random-isbn: status ${response.status}`);
	const json = (await response.json()) as RandomIsbnResponse;
	// isbns が無い古い形式は [isbn] として扱う(空文字なら 0 件)
	const isbns = json.isbns ?? (json.isbn ? [json.isbn] : []);
	if (isbns.length === 0) throw new Error("random-isbn: empty");
	return isbns;
}

// 自動での再試行は 1 回まで
async function fetchBatch(): Promise<string[]> {
	try {
		return await fetchOnce();
	} catch {
		return await fetchOnce();
	}
}

/** 在庫を補充する。取得中なら進行中の Promise を返す */
function refill(): Promise<void> {
	if (inflight) return inflight;
	inflight = fetchBatch()
		.then((isbns) => {
			const inStock = new Set(stock);
			let fresh = isbns.filter((isbn) => !issued.has(isbn) && !inStock.has(isbn));
			if (fresh.length === 0) {
				// 同じ候補しか返ってこない(60 秒以内の補充など)。止まるよりは重複を許す
				issued.clear();
				fresh = isbns.filter((isbn) => !inStock.has(isbn));
			}
			stock.push(...fresh);
			preloadNext();
		})
		.finally(() => {
			inflight = null;
		});
	return inflight;
}

/** 次に払い出す 1 件の背表紙を先読みしておき、ボタンを押したらすぐ表示できるようにする */
function preloadNext() {
	if (stock[0]) preloadImage(spineSrc(stock[0]));
}

/** 在庫から exclude に含まれない 1 件を取り出す(無ければ null) */
function takeFromStock(exclude: Set<string>): string | null {
	const index = stock.findIndex((isbn) => !exclude.has(isbn));
	if (index === -1) return null;
	const [isbn] = stock.splice(index, 1);
	issued.add(isbn);
	return isbn;
}

/**
 * ランダムな ISBN(13 桁)を 1 件返す。在庫が空なら取得を待つ。
 * exclude には、ほかの入力欄に入っている ISBN を渡す(同じ ISBN が 2 つの欄に入らないように)。
 * 取得に失敗したときは reject する(呼び出し元は入力欄を変えずにエラーを出す)。
 */
export async function takeRandomIsbn(exclude: Iterable<string> = []): Promise<string> {
	const excluded = new Set(exclude);
	let isbn = takeFromStock(excluded);
	if (!isbn) {
		await refill();
		isbn = takeFromStock(excluded);
	}
	if (!isbn) throw new Error("random-isbn: no unused ISBN");

	if (stock.length < LOW_WATER) {
		// 裏で補充する。失敗しても、次にボタンが押されたときにやり直す
		refill().catch((err) => console.error("random-isbn refill failed:", err));
	}
	preloadNext();
	return isbn;
}
