import { json } from '@sveltejs/kit';

export async function GET() {
  // console.log('GET /api/random-isbn');

  try {
    const timestamp = Date.now();
    const response = await fetch(`https://oc-image.sugi2000.workers.dev/v1/random-isbn?${timestamp}`);
    
    if (!response.ok) {
      // console.error('API response not OK:', response.status);
      return json({ error: 'Failed to fetch ISBN', status: response.status }, { status: 500 });
    }
    
    const responseJson = await response.json();
    // console.log({ responseJson });
    return json(responseJson);
  } catch (error) {
    // console.error({ error });
    return json({ error: 'An error occurred', message: error.message }, { status: 500 });
  }
}