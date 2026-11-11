import { json } from '@sveltejs/kit';
import isbn3 from 'isbn3';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

/**
 * GET /api/v1/cover/{isbn} — BookFront が表紙に使う JSON(oc-api の /v1/cover と同じ形)。
 *
 * oc-api の公開 /v1/cover は opencover の生成画像しか返さない。表紙に openBD / Google Books の
 * 書影も使うため、鍵(ADMIN_API_KEY)が要る管理者向け /v1/admin/cover をサーバー側で中継する。
 * 鍵はブラウザに渡さない。鍵が無い・admin が失敗したときは公開 /v1/cover(生成画像のみ)に落とす。
 */
const OC_API = 'https://api.opencover.jp';

export const GET: RequestHandler = async ({ params }) => {
  const parsed = isbn3.parse(params.isbn.replace(/\.json$/, ''));
  if (!parsed?.isValid || !parsed.isbn13) {
    return json({ error: 'Invalid ISBN' }, { status: 400 });
  }
  const id = `isbn/${parsed.isbn13}`;

  const apiKey = env.ADMIN_API_KEY;
  if (apiKey) {
    try {
      const response = await fetch(`${OC_API}/v1/admin/cover/${id}`, {
        headers: { 'X-OPENCOVER-API-KEY': apiKey },
        redirect: 'manual'
      });
      if (response.ok) {
        // 上流障害で劣化した結果(X-Degraded)は短く、通常は 1 時間ブラウザにキャッシュさせる
        const degraded = response.headers.get('X-Degraded') === 'true';
        return relay(await response.text(), degraded ? 300 : 3600);
      }
      console.error(`oc-api /v1/admin/cover returned ${response.status} for ${id}`);
    } catch (e) {
      console.error('Error fetching admin cover from oc-api:', e);
    }
  } else {
    console.error('ADMIN_API_KEY is not set; falling back to public /v1/cover');
  }

  // フォールバック: 公開 /v1/cover(opencover の生成画像のみ)。外部書影は後で出るよう短めにキャッシュ
  try {
    const response = await fetch(`${OC_API}/v1/cover/${id}`, { redirect: 'manual' });
    if (response.ok) return relay(await response.text(), 300);
    return json({ error: 'Failed to fetch cover' }, { status: 502 });
  } catch (e) {
    console.error('Error fetching public cover from oc-api:', e);
    return json({ error: 'Failed to fetch cover' }, { status: 502 });
  }
};

function relay(body: string, maxAge: number): Response {
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${maxAge}`
    }
  });
}
