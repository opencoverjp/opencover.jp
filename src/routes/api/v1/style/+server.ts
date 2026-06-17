import { json } from '@sveltejs/kit';
import { UPSTREAM } from '$lib/server/upstream';
import { corsHeaders, preflightResponse } from '$lib/server/cors';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request }) {
  const headers = corsHeaders();

  // OPTIONSリクエスト（プリフライトリクエスト）への応答
  if (request.method === 'OPTIONS') {
    return preflightResponse();
  }

  try {
    // Serviceバインディングを呼び出す
    let response = await fetch(`${UPSTREAM.style}/api/v1/style`);
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
