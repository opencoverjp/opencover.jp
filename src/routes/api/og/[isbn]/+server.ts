import type { RequestHandler } from './$types';
import { cachedOgImage, fetchOgImage } from '$lib/server/og';

// ?style=preview で本棚ページの Bookshelf と同じ見た目の OG 画像にする
export const GET: RequestHandler = async ({ params, url, request, platform }) => {
  const style = url.searchParams.get('style') === 'preview' ? 'preview' : undefined;
  return cachedOgImage(request, platform, () => fetchOgImage(params.isbn, { style }));
};
