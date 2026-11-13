import type { RequestHandler } from './$types';
import { cachedOgImage, fetchOgImage } from '$lib/server/og';
import { parseShelfIsbns } from '$lib/server/shelf';
import { shelfColorFor } from '$lib/shelfColor';

// ?style=preview で本棚ページの Bookshelf と同じ見た目の OG 画像にする
export const GET: RequestHandler = async ({ params, url, request, platform }) => {
  if (url.searchParams.get('style') !== 'preview') {
    return cachedOgImage(request, platform, () => fetchOgImage(params.isbn));
  }
  // 背景色は本棚ページと同じく、正規化した ISBN 列から決める（1 冊ならその本の色）
  const bgColor = shelfColorFor(parseShelfIsbns(params.isbn));
  return cachedOgImage(request, platform, () =>
    fetchOgImage(params.isbn, { style: 'preview', bgColor })
  );
};
