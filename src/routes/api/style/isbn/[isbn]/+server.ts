import { json } from '@sveltejs/kit';
import isbn3 from 'isbn3';
import { UPSTREAM } from '$lib/server/upstream';

export async function GET({ params }) {
  const parsed = isbn3.parse(params.isbn ?? '');
  if (!parsed?.isValid) {
    return json({ success: false, error: 'Invalid ISBN' }, { status: 400 });
  }
  const isbn = parsed.isbn13 as string;

  try {
    let response = await fetch(`${UPSTREAM.bib}/${encodeURIComponent(isbn)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch book data for ISBN: ${isbn}`);
    }
    const book = await response.json();
    if (!book) {
      return new Response('Book data not found', { status: 404 });
    }

    // シリーズ名・レーベル名には「/」「?」「#」などが含まれうるのでエンコードする
    const styleKey = encodeURIComponent(book.seriesTitle || book.label || '');
    response = await fetch(`${UPSTREAM.style}/api/v1/resolve/${styleKey}`);
    if (!response.ok) {
      throw new Error(`Failed to resolve style name for book: ${book.title}, ${book.seriesTitle}`);
    }
    const { name } = await response.json();
    if (!name) {
      return new Response('Style name not found', { status: 404 });
    }
    response = await fetch(`${UPSTREAM.style}/api/v1/styles/${encodeURIComponent(name)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch style data for book: ${book.title}`);
    }
    const result = await response.json();
    if (!result) {
      return new Response('Style data not found', { status: 404 });
    }
    // スタイル(判型の高さなど)はめったに変わらないので、ブラウザに 1 日キャッシュさせる。
    // 失敗時のレスポンスにはキャッシュヘッダを付けない(次のアクセスで取り直す)
    return json(result, {
      headers: { 'Cache-Control': 'public, max-age=86400' }
    });
  } catch (error) {
    console.error('Style lookup error:', error);
    const message = error instanceof Error ? error.message : String(error);
    return json({ success: false, error: message }, { status: 500 });
  }
}
