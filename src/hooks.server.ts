/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
  const response = await resolve(event);
  
  // 環境に基づいてCSP設定を調整
  const isDev = process.env.NODE_ENV === 'development';
  
  const cspValue = isDev 
    ? `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' www.googletagmanager.com static.cloudflareinsights.com www.instagram.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: image.opencover.jp;
      font-src 'self' data:;
      connect-src 'self' ws: wss: cloudflareinsights.com;
      frame-src 'self' www.googletagmanager.com www.instagram.com;
      object-src 'none';
    `
    : `
      default-src 'self';
      script-src 'self' www.googletagmanager.com static.cloudflareinsights.com www.instagram.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: image.opencover.jp;
      font-src 'self' data:;
      connect-src 'self' cloudflareinsights.com;
      frame-src 'self' www.googletagmanager.com www.instagram.com;
      object-src 'none';
    `;
  
  response.headers.set('Content-Security-Policy', cspValue.replace(/\s+/g, ' ').trim());
  
  return response;
}