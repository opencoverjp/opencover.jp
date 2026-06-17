import { json, text } from '@sveltejs/kit';
import { UPSTREAM } from '$lib/server/upstream';
import { corsHeaders, preflightResponse } from '$lib/server/cors';

/** @type {import('./$types').RequestHandler} */
export async function GET({ request, params }) {

  const { name } = params;

  const headers = corsHeaders();

  // OPTIONSリクエスト（プリフライトリクエスト）への応答
  if (request.method === 'OPTIONS') {
    return preflightResponse();
  }

  try {
    // Serviceバインディングを呼び出す
    let response = await fetch(`${UPSTREAM.style}/api/v1/css/${name}`);
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
