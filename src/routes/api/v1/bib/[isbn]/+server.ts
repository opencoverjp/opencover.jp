import { json } from '@sveltejs/kit';
import { UPSTREAM } from '$lib/server/upstream';

export async function GET({ params }) {
  const isbn = params.isbn;
  if (!isbn) {
    return new Response('ISBN not provided', { status: 400 });
  }
  const response = await fetch(`${UPSTREAM.bib}/${isbn}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch book data for ISBN: ${isbn}`);
  }
  const responseJson = await response.json();
  return json(responseJson);
}
