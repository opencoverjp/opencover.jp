import ISBN from '@pubdate/isbn';
import { json } from '@sveltejs/kit';
import * as d3 from 'd3';

export async function GET({ params }) {
  const isbn = params.isbn;
  if (!ISBN.parse(isbn).isValid) {
    return json({ error: 'Invalid ISBN' }, { status: 400 });
  }
  const hyphenedISBN = ISBN.parse(isbn).toString({ version: 'isbn13', hyphens: true });
  // 978-4-12
  if (hyphenedISBN.substring(0, 5) !== '978-4') {
    return json({ error: 'Not Found' }, { status: 404 });
  }
  const publisherCode = hyphenedISBN.split('-').at(2);

  const publisher = publishers.find(d => d.code === publisherCode);
  if (!publisher) {
    return json({ error: 'Not Found' }, { status: 404 });
  }
  return json(publisher, { status: 200 });
}

const publishersStr = `code	name	url
00	岩波書店	http://www.iwanami.co.jp/
01	旺文社	http://www.obunsha.co.jp/
02	朝日新聞出版	http://publications.asahi.com/index.shtml
03	偕成社	http://www.kaiseisha.co.jp/
04	KADOKAWA	http://www.kadokawa.co.jp/
05	学研マーケティング	http://gakken-marketing.co.jp/
06	講談社	http://www.kodansha.co.jp/
07	主婦の友社	http://www.shufunotomo.co.jp/
08	集英社	http://www.shueisha.co.jp/
09	小学館	http://www.shogakukan.co.jp/
10	新潮社	http://www.shinchosha.co.jp/
11	全音楽譜出版社	http://www.zen-on.co.jp/top/CSfTop.jsp
12	中央公論新社	http://www.chuko.co.jp/
13	東京大学出版会	http://www.utp.or.jp/
14	ＮＨＫ出版	https://www.nhk-book.co.jp/shop/main.jsp?trxID=C0010101
15	早川書房	http://www.hayakawa-online.co.jp/
16	文藝春秋	http://www.bunshun.co.jp/
17	国立印刷局	http://www.npb.go.jp/
18	明治図書出版	http://www.meijitosho.co.jp/
19	徳間書店	http://www.tokuma.jp/
250	青木書店	http://www.aokishoten.co.jp/contents/list/index.html
251	あかね書房	http://akaneshobo.co.jp/
252	暁教育図書	
253	秋田書店	http://www.akitashoten.co.jp/index2.html
254	朝倉書店	http://www.asakura.co.jp/
255	朝日出版社	http://www.asahipress.com/
256	平凡社	http://www.heibonsha.co.jp/
258	アジア経済研究所	http://www.ide.go.jp/Japanese/index.html
259	家の光協会	http://www.ienohikari.net/
260	医学書院	http://www.igaku-shoin.co.jp/top.do
261	郁文堂	http://www.ikubundo.com/
262	池田書店	http://www.ikedashoten.co.jp/
263	医歯薬出版	http://www.ishiyaku.co.jp/
264	いのちのことば社	http://www.wlpm.or.jp/index.htm
265	岩崎書店	http://www.iwasakishoten.co.jp/
266	いんなあとりっぷ社	http://www.bukkyomanga.jp/
267	潮出版社	http://www.usio.co.jp/
268	英潮社フェニックス	http://www.onephe.com/
269	英宝社	http://www.eihosha.co.jp/
271	大阪教育図書	http://www2.osk.3web.ne.jp/~daikyopb/
272	大月書店	http://www.otsukishoten.co.jp/
273	おうふう	http://www.ohfu.co.jp/index.html
274	オーム社	http://www.ohmsha.co.jp/
275	御茶の水書房	http://www.ochanomizushobo.co.jp/contents/list/index.html
276	音楽之友社	http://www.ongakunotomo.co.jp/
278	大泉書店	http://www.oizumishoten.co.jp/
281	医歯薬出版	http://www.ishiyaku.co.jp/
283	大空社	http://www.ozorasha.co.jp/
284	日本図書センター	http://www.nihontosho.co.jp/
285	ドレミ楽譜出版社	http://www.doremi.co.jp/Doremi/ATC01.do
286	文芸社	http://www.bungeisha.co.jp/
287	医学出版	http://www.igaku.co.jp/
288	イーブックイニシアティブジャパン	http://www.ebookjapan.jp/ebj/
290	教英出版	http://kyoei-syuppan.net/
291	カーサ・フェミニナ教育研究所	http://www.casa-feminina.com/
303	海文堂出版	http://www.kaibundo.jp/
304	開隆堂出版	http://www.kairyudo.co.jp/index.htm
305	笠間書院	http://kasamashoin.jp/index.html
306	鹿島出版会	http://www.kajima-publishing.co.jp/
307	金原出版	http://www.kanehara-shuppan.co.jp/index.html
309	河出書房新社	http://www.kawade.co.jp/np/index.html
311	学生社	http://www.gakusei.co.jp/
312	學燈社	http://www.gakutousya.co.jp/contents/list/index.html
313	学陽書房	http://gakuyo.co.jp/
314	紀伊國屋書店出版部	http://www.kinokuniya.co.jp/
315	ニュートンプレス	http://www.newtonpress.co.jp/
316	教育出版	http://www.kyoiku-shuppan.co.jp/
318	教学研究社	http://www.kyougaku-kenkyuusha.co.jp/
319	協同出版	http://www.kyodo-s.jp/
320	共立出版	http://www.kyoritsu-pub.co.jp/
321	金園社	http://www.kin-en-sha.co.jp/
322	きんざい	http://store.kinzai.jp/book/
323	金の星社	http://www.kinnohoshi.co.jp/
324	ぎょうせい	http://gyosei.jp/
325	教学社	http://www.kyogakusha.co.jp/
326	勁草書房	http://www.keisoshobo.co.jp/
327	研究社	http://www.kenkyusha.co.jp/modules/00_top/index.php?content_id=1
328	芸術生活社	http://www.lifeisart.co.jp/
329	現代思潮新社	http://www.gendaishicho.co.jp/
330	交通新聞社	http://www.kotsu.co.jp/
331	廣済堂出版	http://www.kosaido-pub.co.jp/
332	光生館	http://www.koseikan.co.jp/
333	佼成出版社	http://www.kosei-shuppan.co.jp/
334	光文社	http://www.kobunsha.com/
335	弘文堂	http://www.koubundou.co.jp/
336	国書刊行会	http://www.kokusho.co.jp/np/index.html
337	国土社	http://www.kokudosha.co.jp/
338	小峰書店	http://www.komineshoten.co.jp/
339	コロナ社	http://www.coronasha.co.jp/np/index.html
340	梧桐書院	http://www.gotoshoin.com/
341	ごま書房新社	http://gomashobo.com/
342	桐原書店	http://www.kirihara.co.jp/
343	神戸新聞総合出版センター	http://ec.kobe-np.co.jp/syuppan/html/
344	幻冬舎	http://www.gentosha.co.jp/
378	さ・え・ら書房	http://www.saela.co.jp/
380	三一書房	http://31shobo.com/
382	産業能率大学出版部	http://www.sannopub.co.jp/
384	三修社	http://www.sanshusha.co.jp/np/index.do
385	三省堂	http://www.sanseido-publ.co.jp/
387	サンリオ	http://www.sanrio.co.jp/
388	柴田書店	http://www.shibatashoten.co.jp/
389	清水書院	http://www.shimizushoin.co.jp/
391	主婦と生活社	http://www.shufu.co.jp/
393	春秋社	http://www.shunjusha.co.jp/index.html
394	春陽堂書店	http://www.shun-yo-do.co.jp/
395	彰国社	http://www.shokokusha.co.jp/
396	祥伝社	http://www.shodensha.co.jp/
398	昭文社	http://www.mapple.co.jp/
399	昇龍堂出版	http://www.shoryudo.co.jp/index.html
400	新教出版社	http://www.shinkyo-pb.com/
401	シンコーミュージック・エンタテイメント	http://www.shinko-music.co.jp/main/Top.do
402	新興出版社啓林館	http://www.shinko-keirin.co.jp/
403	新書館	http://www.shinshokan.co.jp/
405	新星出版社	http://www.shin-sei.co.jp/np/index.html
406	新日本出版社	http://www.shinnihon-net.co.jp/
407	実教出版	http://www.jikkyo.co.jp/
408	実業之日本社	http://www.j-n.co.jp/
409	人文書院	http://www.jimbunshoin.co.jp/
410	数研出版	http://www.chart.co.jp/
411	駿河台出版社	http://www.e-surugadai.com/
412	聖教新聞社	http://www.seikyoonline.jp/
413	青春出版社	http://seishun.co.jp/
414	誠信書房	http://www.seishinshobo.co.jp/
415	成美堂出版	http://www.seibidoshuppan.co.jp/
416	誠文堂新光社	http://www.seibundo-shinkosha.net/
417	青林書院	http://www.seirin.co.jp/
418	世界文化社	http://www.sekaibunka.com/
419	税務経理協会	http://www.zeikei.co.jp/
420	創美社	http://sobisha.shueisha.co.jp/
421	近代消防社	http://www.ff-inc.co.jp/
422	創元社	http://www.sogensha.co.jp/
423	創文社	http://www.sobunsha.co.jp/
424	増進堂・受験研究社	http://www.zoshindo.co.jp/
425	成山堂書店	http://www.seizando.co.jp/
426	自由国民社	http://www.jiyu.co.jp/
431	シュプリンガー・ジャパン	http://www.springer.jp/
432	ゼンリン	http://www.zenrin.co.jp/
433	清文社	http://www.skattsei.co.jp/
434	星雲社	
469	大修館書店	http://www.taishukan.co.jp/
471	高橋書店	http://www.takahashishoten.co.jp/
472	玉川大学出版部	http://tamagawa.hondana.jp/
473	淡交社	http://www.tankosha.co.jp/
474	第一法規	http://www.daiichihoki.co.jp/dh/
475	大学書林	http://www.daigakusyorin.co.jp/
476	第三文明社	http://www.daisanbunmei.co.jp/
477	大日本図書	http://www.dainippon-tosho.co.jp/
478	ダイヤモンド社	http://www.diamond.co.jp/
479	大和書房	http://www.daiwashobo.co.jp/
480	筑摩書房	http://www.chikumashobo.co.jp/
481	中央経済社	http://www.chuokeizai.co.jp/
482	中央図書出版社	http://www.chuotosho.com/
484	阪急コミュニケーションズ	http://www.hankyu-com.co.jp/
485	電気書院	http://www.denkishoin.co.jp/denkishoin/info/
486	東海大学出版会	http://www.press.tokai.ac.jp/top.jsp
487	東京書籍	http://www.tokyo-shoseki.co.jp/
488	東京創元社	http://www.tsogen.co.jp/np/index.html
489	東京図書	http://www.tokyo-tosho.co.jp/
490	東京堂出版	http://www.tokyodoshuppan.com/
491	東洋館出版社	http://www.toyokan.co.jp/
492	東洋経済新報社	http://toyokeizai.net/
494	童心社	http://www.doshinsha.co.jp/
495	同文舘出版	http://www.dobunkan.co.jp/pub/
496	同友館	http://www.doyukan.co.jp/
497	東方書店	http://www.toho-shoten.co.jp/
498	中外医学社	https://www.chugaiigaku.jp/modules/shop/
499	大日本絵画	http://www.kaiga.co.jp/emp-bin/pro1.cgi/www/default.html
500	大東出版社	http://www.daitopb.co.jp/
501	東京電機大学出版局	http://www.tdupress.jp/
502	中央経済社	http://www.chuokeizai.co.jp/
503	地方・小出版流通センター	http://neil.chips.jp/chihosho/
521	中山書店	http://www.nakayamashoten.co.jp/contents/list/index.html
522	永岡書店	http://www.nagaokashoten.co.jp/
523	南雲堂	http://www.nanun-do.co.jp/
524	南江堂	http://www.nankodo.co.jp/wasyo/main/top.asp
525	南山堂	http://www.nanzando.com/
526	日刊工業新聞社	http://www.nikkan.co.jp/
529	日本ヴォーグ社	http://www.nihonvogue.co.jp/
530	日本共産党中央委員会出版局	http://www.jcp.or.jp/web_book/
531	日本教文社	http://www.kyobunsha.jp/
532	日本経済新聞出版社	http://www.nikkeibook.com/
533	JTBパブリッシング	http://www.jtbpublishing.com/index.html
534	日本実業出版社	http://www.njg.co.jp/
535	日本評論社	http://www.nippyo.co.jp/
536	日本文教出版	http://www.nichibun-g.co.jp/
537	日本文芸社	http://www.nihonbungeisha.co.jp/
538	労働政策研究・研修機構	http://www.jil.go.jp/
539	日本法令	http://www.horei.co.jp/
540	農山漁村文化協会	http://www.ruralnet.or.jp/
541	農林統計協会	http://www.aafs.or.jp/
542	日本規格協会	http://www.jsa.or.jp/default.asp
544	二玄社	http://nigensha.co.jp/
560	白水社	http://www.hakusuisha.co.jp/
561	白桃書房	http://www.hakutou.co.jp/
562	原書房	http://www.harashobo.co.jp/
563	培風館	http://www.baifukan.co.jp/
564	ひかりのくに	http://www.hikarinokuni.co.jp/
565	一ツ橋書店	http://www.one-bridge.jp/
566	評論社	http://www.hyoronsha.co.jp/
567	廣川書店	http://www.hirokawa-shoten.co.jp/
568	美術出版社	http://www.bijutsu.co.jp/bss/
569	ＰＨＰ研究所	http://www.php.co.jp/
571	福村出版	http://www.fukumura.co.jp/
572	冨山房	http://fuzambo.net/
573	ハースト婦人画報社	http://www.hearst.co.jp/
575	双葉社	http://www.futabasha.co.jp/
576	二見書房	http://www.futami.co.jp/index.php
577	フレーベル館	http://www.froebel-kan.co.jp/
578	文英堂	http://www.bun-eido.co.jp/
579	文化出版局	http://books.bunka.ac.jp/np/index.do
580	文研出版	http://www.shinko-bunken.com/bunken/
581	文理	http://www.bunri.co.jp/
583	ベースボールマガジン社	http://www.bbm-japan.com./
584	ベストセラーズ	http://www.kk-bestsellers.com/
585	勉誠出版	http://bensei.jp/
586	保育社	http://www.hoikusha.co.jp/
587	法学書院	http://www.hougakushoin.co.jp/
588	法政大学出版局	http://www.h-up.com/
589	法律文化社	http://www.hou-bun.com/index.html
590	北星堂出版	http://www.hokuseido.com/
591	ポプラ社	http://www.poplar.co.jp/
592	白泉社	http://www.hakusensha.co.jp/index.shtml
593	ほるぷ出版	http://www.holp-pub.co.jp/
594	扶桑社	http://www.fusosha.co.jp/
595	放送大学教育振興会	http://www.ua-book.or.jp/
596	ハーレクイン	http://www.harlequin.co.jp/
620	毎日新聞社	http://www.mainichi.co.jp/
621	丸善出版	http://pub.maruzen.co.jp/
622	みすず書房	http://www.msz.co.jp/
623	ミネルヴァ書房	http://www.minervashobo.co.jp/
624	未来社	http://http://www.miraisha.co.jp/np/index.html
625	明治書院	http://www.meijishoin.co.jp/
626	名著出版	http://www.meicho.co.jp/
627	森北出版	http://www.morikita.co.jp/
634	山川出版社	http://www.yamakawa.co.jp/
635	山と溪谷社	http://www.yamakei.co.jp/
636	ヤマハミュージックメディア	http://www.ymm.co.jp/
638	有紀書房	http://www.yukishobo.co.jp/
639	雄山閣	http://www.yuzankaku.co.jp/index.html
641	有斐閣	http://www.yuhikaku.co.jp/
642	吉川弘文館	http://www.yoshikawa-k.co.jp/
643	読売新聞	http://info.yomiuri.co.jp/
650	理想社	
652	理論社	http://www.rironsha.com/
653	臨川書店	http://www.rinsen.com/
654	黎明書房	http://www.reimei-shobo.com/
656	河中自治振興財団	
657	早稲田大学出版部	http://www.waseda-up.co.jp/`;

const publishers = d3.tsvParse(publishersStr);
