import { json } from '@sveltejs/kit';
import isbn3 from 'isbn3';
import { UPSTREAM } from '$lib/server/upstream';

export async function GET({ params }) {
  const parsed = isbn3.parse(params.isbn ?? '');
  if (!parsed?.isValid) {
    return json({ error: 'Invalid ISBN' }, { status: 400 });
  }
  const isbn = parsed.isbn13;

  let response: Response;
  try {
    response = await fetch(`${UPSTREAM.bib}/${encodeURIComponent(isbn)}`);
  } catch (err) {
    console.error('bib upstream fetch failed:', err);
    return json({ error: 'Upstream service unavailable' }, { status: 502 });
  }

  if (!response.ok) {
    // 上流の 404 はそのまま、それ以外は 502 として返す
    const status = response.status === 404 ? 404 : 502;
    return json({ error: `Failed to fetch book data for ISBN: ${isbn}` }, { status });
  }

  const responseJson = await response.json();
  if (!responseJson) {
    return json({ error: 'Not Found' }, { status: 404 });
  }
  // 書誌データはめったに変わらないので、ブラウザに 1 日キャッシュさせる。
  // 失敗時のレスポンスにはキャッシュヘッダを付けない(次のアクセスで取り直す)
  return json(responseJson, {
    headers: { 'Cache-Control': 'public, max-age=86400' }
  });
}
