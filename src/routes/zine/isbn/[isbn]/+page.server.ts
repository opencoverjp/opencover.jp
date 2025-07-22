import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
  if (params.isbn) {
    const isbns = params.isbn.split(',');

    const promises = isbns.map((isbn) => fetch(`/api/bib/${isbn}`).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    }));
    let books = await Promise.all(promises);
    books = books.map((book) => ({
      book,
      isbn: book.isbn,
      displaySides: ['spine'],
    }));

    const isSingleBook = books.length === 1;
    const title = isSingleBook
      ? `『${books.at(0).book?.title}』の本棚`
      : `『${books.at(0).book?.title}』など${books.length}冊の本棚`;

    return {
      books,
      bgColor: '#f0f0f0',
      isSingleBook,
      title,
      meta: {
        title: `${title} – opencover`,
        description: `opencoverの${title}です。あなたの本棚を作りましょう。`,
        image: `https://opencover.jp/api/og/${params.isbn}`,
        // image: `https://opencover.jp/api/og.png?isbn=${params.isbn}`,
        url: `https://opencover.jp/shelf/isbn/${params.isbn}`,
        type: 'website',
      }
    };
  } 
  error(404, 'Not found');
};
