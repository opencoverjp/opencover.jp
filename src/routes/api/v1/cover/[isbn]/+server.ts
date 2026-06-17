
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { UPSTREAM } from '$lib/server/upstream';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const { isbn } = params;
  const targetUrl = `${UPSTREAM.image}/v1/cover/${isbn}`;

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
