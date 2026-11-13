import { error, redirect } from '@sveltejs/kit';
import isbn3 from 'isbn3';
import type { PageServerLoad } from './$types';

/** 1つの本棚に並べられる最大冊数（上流へのサブリクエスト数の上限も兼ねる） */
const MAX_BOOKS = 20;

export const load: PageServerLoad = async ({ fetch, params, url }) => {
  // 正規化（ISBN-13）・重複除去・件数制限
  const isbns = [
    ...new Set(
      params.isbn
        .split(',')
        .map((s) => isbn3.parse(s.trim()))
        .filter((p) => p?.isValid)
        .map((p) => p!.isbn13 as string)
    )
  ].slice(0, MAX_BOOKS);

  if (isbns.length === 0) {
    error(404, 'Not found');
  }

  // 正規URL（ISBN-13・ハイフンなし・重複なし・上限内）以外で来たら恒久リダイレクト。
  // 書誌取得の成否に左右されないよう、取得前のISBNリストから決める。
  const canonicalPath = isbns.join(',');
  if (params.isbn !== canonicalPath) {
    redirect(301, `/shelf/isbn/${canonicalPath}${url.search}`);
  }

  const results = await Promise.all(
    isbns.map(async (isbn) => {
      const response = await fetch(`/api/v1/bib/${isbn}`);
      if (!response.ok) return null;
      const book = await response.json();
      return book ? { book, isbn, displaySides: ['spine'] } : null;
    })
  );
  // 取得できなかった本は除外して、取得できた本だけで本棚を作る
  const books = results.filter((b) => b !== null);

  if (books.length === 0) {
    error(404, 'Not found');
  }

  const isSingleBook = books.length === 1;
  const firstTitle = books[0].book?.title;
  const title = isSingleBook
    ? `『${firstTitle}』の本棚`
    : `『${firstTitle}』など${books.length}冊の本棚`;

  return {
    books,
    bgColor: '#f0f0f0',
    isSingleBook,
    title,
    meta: {
      title: `${title} – opencover`,
      description: `opencoverの${title}です。あなたの本棚を作りましょう。`,
      image: `https://opencover.jp/api/og/${canonicalPath}?style=preview`,
      url: `https://opencover.jp/shelf/isbn/${canonicalPath}`,
      type: 'article'
    }
  };
};
