export async function GET({ request, params }) {
  const [isbn, ext] = params.isbn.split('.');
  const url = `https://image.opencover.jp/v1/cover/spine/${isbn}.webp`;
  
  try {
    // Fetch the image
    const response = await fetch(url);
    
    if (!response.ok) {
      return new Response(`Failed to fetch image: ${response.statusText}`, { 
        status: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        }
      });
    }
    
    // Get the image data as an ArrayBuffer
    const imageData = await response.arrayBuffer();
    
    // Set CORS headers
    const headers = {
      'Content-Type': response.headers.get('Content-Type') || 'image/webp',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    // Handle OPTIONS request (preflight)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers
      });
    }
    
    // Return the image data directly
    return new Response(imageData, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return new Response(`Error fetching image: ${error.message}`, { 
      status: 500,
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      }
    });
  }
}