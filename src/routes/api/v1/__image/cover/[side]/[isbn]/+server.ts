
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const { side, isbn } = params;

  if (!side || !['front', 'spine', 'back'].includes(side)) {
    error(400, 'Invalid side. Must be front, spine, or back.');
  }

  const metadataUrl = `https://oc-image.sugi2000.workers.dev/v1/cover/${isbn}`;

  try {
    const metaResponse = await fetch(metadataUrl);
    if (!metaResponse.ok) {
      // Forward upstream error if possible, or generic 502
      error(metaResponse.status === 404 ? 404 : 502, 'Failed to fetch cover metadata');
    }

    const data = (await metaResponse.json()) as Array<{ side: string; imageUrl: string }>;
    const item = data.find((d) => d.side === side);

    if (!item || !item.imageUrl) {
      error(404, `No image found for side: ${side}`);
    }

    const imgResponse = await fetch(item.imageUrl);

    if (!imgResponse.ok) {
      error(imgResponse.status, 'Failed to fetch image content from upstream');
    }

    return new Response(imgResponse.body, {
      status: imgResponse.status,
      headers: {
        'Content-Type':
          imgResponse.headers.get('Content-Type') || 'application/octet-stream',
        'Cache-Control':
          imgResponse.headers.get('Cache-Control') || 'public, max-age=86400'
      }
    });
  } catch (err: any) {
    console.error('Image Proxy Error:', err);
    if (err.status) throw err;
    error(500, 'Internal Server Error');
  }
};
