import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import isbn3 from 'isbn3';

export const load: PageServerLoad = async ({ params }) => {
  if (params.isbn) {
    const isbn = params.isbn.split(',').at(0) || '';
    const parsedIsbn = isbn3.parse(isbn);
    const isbn10 = parsedIsbn?.isbn10;
    const service = params.service;
    let linkUrl = `https://opencover.jp/`;

    if (parsedIsbn?.isValid) {
      switch (service) {
        case 'amazon':
          linkUrl = `https://www.amazon.co.jp/dp/${isbn10}?tag=opencoverjp-22`;
          break;
        case 'rakuten': {
          const searchUrl = new URL('https://openapi.rakuten.co.jp/services/api/BooksBook/Search/20170404');
          searchUrl.searchParams.append('applicationId', 'bab1c19a-f28a-4f46-8264-b3476e703edb');
          searchUrl.searchParams.append('accessKey', 'pk_4QGzkvrKuhf5fEh2wv2H66NonA8c8DbUvx2bo7n2pE7');
          const affiliateId = '06f792e1.d28000ea.06f792e2.e995fb0d';
          searchUrl.searchParams.append('affiliateId', affiliateId);
          searchUrl.searchParams.append('isbn', isbn);
          searchUrl.searchParams.append('hits', '1');
          searchUrl.searchParams.append('outOfStockFlag', '1');

          const response = await fetch(searchUrl.toString(), {
            headers: {
              'Referer': 'https://opencover.jp',
              'Origin': 'https://opencover.jp'
            }
          });
          const data = await response.json();
          const item = data?.Items?.[0]?.Item;

          if (item?.affiliateUrl) {
            linkUrl = item.affiliateUrl;
          } else {
            const rakutenUrl = item?.itemUrl || `https://books.rakuten.co.jp/`;
            linkUrl = `https://hb.afl.rakuten.co.jp/hgc/${affiliateId}/?pc=${encodeURIComponent(rakutenUrl)}&m=${encodeURIComponent(rakutenUrl)}`;
          }
          break;
        }
        case 'kinokuniya':
          const kinokuniyaUrl = `https://www.kinokuniya.co.jp/f/dsg-01-${isbn}`;
          linkUrl = `https://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3459152&pid=891514999&vc_url=${encodeURIComponent(kinokuniyaUrl)}`;
          break;
        case 'maruzenjunkudo':
          linkUrl = `https://www.maruzenjunkudo.co.jp/products/${isbn}`;
          break;
        case 'honto':
          const hontoUrl = `https://honto.jp/isbn/${isbn}`;
          linkUrl = `http://ck.jp.ap.valuecommerce.com/servlet/referral?sid=3459152&pid=891515139&vc_url=${encodeURIComponent(hontoUrl)}`;
          break;
        case 'openbs':
          linkUrl = `https://demo.openbs.jp/${isbn}`;
          break;
        case 'calil':
          linkUrl = `https://calil.jp/book/${isbn10}`;
          break;
        case 'booklog':
          linkUrl = `https://booklog.jp/item/1/${isbn10}`;
          break;
        case 'bookmeter':
          linkUrl = `https://bookmeter.com/b/${isbn10}`;
          break;
        case 'googlebooks':
          linkUrl = `https://books.google.co.jp/books?vid=${isbn}`;
          break;
        case 'cinii':
          linkUrl = `https://ci.nii.ac.jp/books/openurl/query?isbn=${isbn}`;
          break;
        default:
          break;
      }
    }

    // console.log({ isbn, service, linkUrl });
    redirect(302, linkUrl);
  }
  error(404, 'Not found');
};