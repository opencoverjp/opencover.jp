/**
 * Upstream service base URLs used by the API proxy endpoints.
 * Centralized here so the host names live in one place.
 */
export const UPSTREAM = {
	/** Cover image generation / metadata / OG / random-isbn (oc-image) */
	image: 'https://oc-image.sugi2000.workers.dev',
	/** Bibliographic data (oc-bib) */
	bib: 'https://oc-bib.sugi2000.workers.dev',
	/** Book styling (oc-style) */
	style: 'https://oc-style.sugi2000.workers.dev',
	/** Public image CDN */
	cdn: 'https://image.opencover.jp'
} as const;
