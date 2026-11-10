import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
import isbn3 from 'isbn3';

const AMAZON_TAG = 'opencoverjp-22';

/** 楽天ブックスのアフィリエイトURLを取得する。APIが失敗した場合は汎用のアフィリエイトリンクにフォールバックする。 */
async function rakutenUrl(isbn13: string): Promise<string> {
  const affiliateId = env.RAKUTEN_AFFILIATE_ID ?? '';
  let item: { affiliateUrl?: string; itemUrl?: string } | undefined;

  try {
    const searchUrl = new URL('https://openapi.rakuten.co.jp/services/api/BooksBook/Search/20170404');
    searchUrl.searchParams.append('applicationId', env.RAKUTEN_APPLICATION_ID ?? '');
    searchUrl.searchParams.append('accessKey', env.RAKUTEN_ACCESS_KEY ?? '');
    searchUrl.searchParams.append('affiliateId', affiliateId);
    searchUrl.searchParams.append('isbn', isbn13);
    searchUrl.searchParams.append('hits', '1');
    searchUrl.searchParams.append('outOfStockFlag', '1');

    const response = await fetch(searchUrl.toString(), {
      headers: {
        Referer: 'https://opencover.jp',
        Origin: 'https://opencover.jp'
      },
      signal: AbortSignal.timeout(5000)
    });
    if (response.ok) {
      const data = await response.json();
      item = data?.Items?.[0]?.Item;
    } else {
      console.error('Rakuten API error:', response.status);
    }
  } catch (err) {
    console.error('Rakuten API request failed:', err);
  }

  if (item?.affiliateUrl) {
    return item.affiliateUrl;
  }
  const fallbackUrl = item?.itemUrl || 'https://books.rakuten.co.jp/';
  if (!affiliateId) {
    return fallbackUrl;
  }
  return `https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=${encodeURIComponent(fallbackUrl)}&m=${encodeURIComponent(fallbackUrl)}`;
}

function valueCommerceUrl(pid: string | undefined, targetUrl: string): string {
  return `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=${env.VALUECOMMERCE_SID ?? ''}&pid=${pid ?? ''}&vc_url=${encodeURIComponent(targetUrl)}`;
}

export const load: PageServerLoad = async ({ params }) => {
  if (!params.isbn) {
    error(404, 'Not found');
  }

  const parsedIsbn = isbn3.parse(params.isbn.split(',').at(0) ?? '');
  let linkUrl = 'https://opencover.jp/';

  if (parsedIsbn?.isValid) {
    const isbn13 = parsedIsbn.isbn13 as string;
    // 979 で始まる ISBN には ISBN-10 が存在しない
    const isbn10 = parsedIsbn.isbn10 as string | undefined;
    const isbn10or13 = isbn10 ?? isbn13;

    switch (params.service) {
      case 'amazon':
        linkUrl = isbn10
          ? `https://www.amazon.co.jp/dp/${isbn10}?tag=${AMAZON_TAG}`
          : `https://www.amazon.co.jp/s?k=${isbn13}&i=stripbooks&tag=${AMAZON_TAG}`;
        break;
      case 'rakuten':
        linkUrl = await rakutenUrl(isbn13);
        break;
      case 'kinokuniya':
        linkUrl = valueCommerceUrl(
          env.VALUECOMMERCE_PID_KINOKUNIYA,
          `https://www.kinokuniya.co.jp/f/dsg-01-${isbn13}`
        );
        break;
      case 'maruzenjunkudo':
        linkUrl = `https://www.maruzenjunkudo.co.jp/products/${isbn13}`;
        break;
      case 'honto':
        linkUrl = valueCommerceUrl(env.VALUECOMMERCE_PID_HONTO, `https://honto.jp/isbn/${isbn13}`);
        break;
      case 'openbs':
        linkUrl = `https://demo.openbs.jp/${isbn13}`;
        break;
      case 'calil':
        linkUrl = `https://calil.jp/book/${isbn10or13}`;
        break;
      case 'booklog':
        linkUrl = `https://booklog.jp/item/1/${isbn10or13}`;
        break;
      case 'bookmeter':
        linkUrl = `https://bookmeter.com/b/${isbn10or13}`;
        break;
      case 'googlebooks':
        linkUrl = `https://books.google.co.jp/books?vid=${isbn13}`;
        break;
      case 'cinii':
        linkUrl = `https://ci.nii.ac.jp/books/openurl/query?isbn=${isbn13}`;
        break;
      default:
        break;
    }
  }

  redirect(302, linkUrl);
};
