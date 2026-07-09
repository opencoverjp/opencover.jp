import type { RequestHandler } from './$types';
import { fetchOgImage } from '$lib/server/og';

export const GET: RequestHandler = async ({ url }) => {
  return fetchOgImage(url.searchParams.get('isbn'));
};
