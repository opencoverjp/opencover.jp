/**
 * Shared OpenGraph image generation: delegates rendering to the upstream
 * `oc-image` worker and returns the PNG (or a 500 on failure).
 */
import { UPSTREAM } from './upstream';

export async function fetchOgImage(isbn: string | null): Promise<Response> {
	const response = await fetch(`${UPSTREAM.image}/v1/og/${isbn}`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({})
	});

	if (!response.ok) {
		return new Response('Failed to generate image', { status: 500 });
	}

	const imageBuffer = await response.arrayBuffer();
	return new Response(imageBuffer, {
		status: response.status,
		headers: {
			'Content-Type': 'image/png'
			// 'Cache-Control': 'public, max-age=86400'
		}
	});
}
