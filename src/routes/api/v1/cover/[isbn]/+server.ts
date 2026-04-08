
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const { isbn } = params;
  const targetUrl = `https://oc-image.sugi2000.workers.dev/v1/cover/${isbn}`;

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      const errorText = await response.text();
      // Forward the error status from the upstream service
      return json(
        { error: 'Upstream service error', details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return json({ error: 'Internal Server Error' }, { status: 500 });
  }
};
