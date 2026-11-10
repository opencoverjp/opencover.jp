import { UPSTREAM } from '$lib/server/upstream';
import { corsHeaders, preflightResponse } from '$lib/server/cors';

// CORS preflight（GET ハンドラには OPTIONS リクエストは届かないので別途 export する）
export function OPTIONS() {
  return preflightResponse();
}

export async function GET({ params }) {
  const [isbn] = params.isbn.split('.');
  const url = `${UPSTREAM.cdn}/v1/cover/spine/isbn/${encodeURIComponent(isbn)}.webp`;

  try {
    // Fetch the image
    const response = await fetch(url);

    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, {
        status: response.status,
        headers: corsHeaders()
      });
    }

    // Get the image data as an ArrayBuffer
    const imageData = await response.arrayBuffer();

    // Return the image data directly
    return new Response(imageData, {
      status: 200,
      headers: {
        ...corsHeaders(),
        'Content-Type': response.headers.get('Content-Type') || 'image/webp',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      }
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(`Error fetching image: ${error instanceof Error ? error.message : String(error)}`, {
      status: 500,
      headers: {
        ...corsHeaders(),
        'Content-Type': 'text/plain',
      }
    });
  }
}