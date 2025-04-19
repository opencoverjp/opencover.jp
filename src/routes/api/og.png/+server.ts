import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
  const { searchParams } = url;
  const isbn = searchParams.get('isbn');

  const endpoint = 'https://oc-image.sugi2000.workers.dev/v1/og';
  const response = await fetch(`${endpoint}/${isbn}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ }),
  });
  if (!response.ok) {
    return new Response('Failed to generate image', { status: 500 });
  }

  const imageBuffer = await response.arrayBuffer();

  return new Response(imageBuffer, {
    status: response.status,
    headers: {
      'Content-Type': 'image/png',
      // 'Cache-Control': 'public, max-age=86400'
    }
  });
};