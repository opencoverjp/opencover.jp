/**
 * Shared OpenGraph image generation: delegates rendering to the upstream
 * `oc-image` worker and returns the PNG (or a 500 on failure).
 */
import { UPSTREAM } from './upstream';

/** 生成した OG 画像をキャッシュする秒数(SNS のクローラが来るたびに作り直さない) */
const OG_MAX_AGE = 60 * 60 * 24;

export interface OgOptions {
	/** 'preview' で本棚ページの Bookshelf と同じ見た目にする。省略時は従来の見た目 */
	style?: 'preview';
	/** style=preview の背景色（#rrggbb）。省略時は oc-image の既定の色 */
	bgColor?: string;
}

export async function fetchOgImage(isbn: string | null, options: OgOptions = {}): Promise<Response> {
	const response = await fetch(`${UPSTREAM.image}/v1/og/${isbn}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(options)
	});

	if (!response.ok) {
		return new Response('Failed to generate image', { status: 500 });
	}

	const imageBuffer = await response.arrayBuffer();
	return new Response(imageBuffer, {
		status: response.status,
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': `public, max-age=${OG_MAX_AGE}`
		}
	});
}

/**
 * fetchOgImage をエッジのキャッシュ(Cache API)越しに呼ぶ。キーはリクエストの URL。
 * Cache API が使えない環境(開発サーバーなど)では毎回生成する。
 */
export async function cachedOgImage(
	request: Request,
	platform: App.Platform | undefined,
	generate: () => Promise<Response>
): Promise<Response> {
	const cache = platform?.caches?.default;
	if (!cache) return generate();

	const key = new Request(request.url, { method: 'GET' });
	const hit = await cache.match(key);
	if (hit) return hit;

	const response = await generate();
	if (response.ok) {
		const put = cache.put(key, response.clone());
		if (platform?.context) platform.context.waitUntil(put);
		else await put;
	}
	return response;
}
