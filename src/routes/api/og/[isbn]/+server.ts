import PreviewBook from '../../../../lib/PreviewBook.svelte';
import { render } from 'svelte/server';

async function renderPreviewBook(props) {
  const { body } = await render(PreviewBook, { props });
  return body;
}

export async function GET({ params }) {

  const isbn = params.isbn;

  // const books = [{
  //   isbn,
  //   displaySides: ['spine']
  // }];

  // const html = await renderPreviewBook({ books });

  // console.log({ html });

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