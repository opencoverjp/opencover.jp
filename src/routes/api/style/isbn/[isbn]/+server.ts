import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export async function GET({ params, platform }) {
  const isbn = params.isbn;

  try {
    let response = await fetch(`https://oc-bib.sugi2000.workers.dev/${isbn}`);
    // const response = await platform.env.BIB.search(isbn);
    if (!response.ok) {
      throw new Error(`Failed to fetch book data for ISBN: ${isbn}`);
    }
    const book = await response.json();
    if (!book) {
      return new Response('Book data not found', { status: 404 });
    }

    // Serviceバインディングを呼び出す
    response = await fetch(`https://oc-style.sugi2000.workers.dev/api/resolve/${book.seriesTitle || book.label || ''}`);
    if (!response.ok) {
      throw new Error(`Failed to resolve style name for book: ${book.title}`);
    }
    const {name} = await response.json();
    if (!name) {
      return new Response('Style name not found', { status: 404 });
    }
    response = await fetch(`https://oc-style.sugi2000.workers.dev/api/style/${name}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch style data for book: ${book.title}`);
    }
    const result = await response.json();
    if (!result) {
      return new Response('Style data not found', { status: 404 });
    }
    // const name = await platform.env.STYLE.resolveName(book.seriesTitle || book.label || '')
    // const result = await platform.env.STYLE.getStyle(name);
    return json(result);
  } catch (error) {
    console.error('Service binding error:', error);
    return json({ success: false, error: error.message }, { status: 500 });
  }
}
