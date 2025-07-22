import { text } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, params }) {

  const { name } = params;

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
    let response = await fetch(`https://oc-style.sugi2000.workers.dev/api/v1/css/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch style data`);
    }
    const result = await response.text();
    if (!result) {
      return new Response('CSS data not found', { 
        status: 404,
        headers
      });
    }
    return text(result, {
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