import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({}) {

  try {
    // Serviceバインディングを呼び出す
    let response = await fetch(`https://oc-style.sugi2000.workers.dev/api/styles`);
    if (!response.ok) {
      throw new Error(`Failed to fetch style data`);
    }
    const result = await response.json();
    if (!result) {
      return new Response('Style data not found', { status: 404 });
    }
    return json(result);
  } catch (error) {
    console.error('Service binding error:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}