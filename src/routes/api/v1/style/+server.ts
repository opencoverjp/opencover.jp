import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
  // CORSヘッダーを設定
  const headers = {
    'Access-Control-Allow-Origin': '*', // すべてのオリジンからのアクセスを許可
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // OPTIONSリクエスト（プリフライトリクエスト）への応答
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers
    });
  }

  try {
    // Serviceバインディングを呼び出す
    let response = await fetch(`https://oc-style.sugi2000.workers.dev/api/v1/style`);
    if (!response.ok) {
      throw new Error(`Failed to fetch style data`);
    }
    const result = await response.json();
    if (!result) {
      return new Response('Style data not found', { 
        status: 404,
        headers
      });
    }
    // jsonヘルパーを使用しつつ、ヘッダーを追加
    return json(result, {
      headers
    });
  } catch (error) {
    console.error('Service binding error:', error);
    return json({ success: false, error: error.message }, { 
      status: 500,
      headers
    });
  }
}