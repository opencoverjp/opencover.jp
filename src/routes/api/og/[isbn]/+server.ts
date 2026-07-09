import { fetchOgImage } from '$lib/server/og';

export async function GET({ params }) {
  return fetchOgImage(params.isbn);
}
