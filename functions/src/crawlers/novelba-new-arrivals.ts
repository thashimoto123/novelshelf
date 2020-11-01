import admin from 'firebase-admin';
import puppeteer from 'puppeteer';
import { parseFromTimeZone } from 'date-fns-timezone';

import { siteName } from '../services/novelshelf/constants';
import { Novel, blankNovel } from '../services/novelshelf/models/novel';
import { getGenre, GenreMap } from '../utils/genre';
import { sleep } from '../utils/timer';

const genreMap: GenreMap = {
  'ファンタジー': '異世界ファンタジー',
  '恋愛': '恋愛/ラブコメ',
  '現代ドラマ': '現代/青春ドラマ/現代アクション',
  '学園': '現代/青春ドラマ/現代アクション',
  'SF': 'SF',
  'エッセイ': 'エッセイ/評論/コラム/ノンフィクション',
  'コメディー': 'その他',
  '文学': '文芸/純文学',
  'ホラー': 'ホラー',
  '詩': '詩/短歌',
  '現代アクション': '現代/青春ドラマ/現代アクション',
  '冒険': 'その他',
  '推理': 'ミステリー',
  '戦記': 'その他',
  '歴史': '歴史/時代/伝奇',
  '童話': 'その他',
  'リプレイ': 'その他',
  'その他': 'その他',
};

export const feedNewArrivals = async (page: puppeteer.Page) => {
  const baseUrl = 'https://novelba.com';

  await page.goto(`${baseUrl}/indies/new`, { waitUntil: 'domcontentloaded' });

  const novels: Novel[] = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const items = await page.$$('.result_list > li');
  for await (const item of items) {
    const novel: Novel = { ...blankNovel };

    novel.site = siteName.novelba;

    const novelUrlPath = await item.$eval('a', (e) => e.getAttribute('href'));
    if (novelUrlPath) novel.url = baseUrl + novelUrlPath;

    novel.title = await item.$eval(
      '.info_list > .title',
      (e) => e?.textContent?.trim() || null,
    );

    novel.author = await item.$eval(
      '.info_list .author ',
      (e) => e?.textContent?.trim() || null,
    );

    const genreName = await item.$eval(
      '.info_list .ganre',
      (e) => e?.textContent?.trim() || 'その他',
    );
    novel.originalGenre = {
      [genreName]: true,
    };
    novel.genre = getGenre(genreName, genreMap);

    novel.story = await item.$eval('.info_list .detail', (e) => e.textContent);

    const update = await item.$eval('.info_list .update time', (e) =>
      e.textContent?.trim(),
    );
    if (update && /\d{4}\/\d{1,2}\/\d{1,2}/.test(update)) {
      const updatedDateStr = update.replace(/\//g, '-');
      const updatedDate = parseFromTimeZone(updatedDateStr, {
        timeZone: 'Asia/Tokyo',
      });
      novel.updatedAt = admin.firestore.Timestamp.fromDate(updatedDate);
    } else {
      continue;
    }
    novels.push(novel);
  }

  let count = 0;
  for await (const novel of novels) {
    if (novel.url) {
      await page.goto(novel.url, { waitUntil: 'domcontentloaded' });
      // const detail = await page.$$('.work_section');
      const authorUrlPath = await page.$eval(
        '.work_section .info_list .author a',
        (e) => e.getAttribute('href'),
      );
      if (authorUrlPath) novel.authorUrl = baseUrl + authorUrlPath;
      await sleep(1000);
    }
    count += 1;
    console.log(`crawling ${count} of ${novels.length} Novelba novels.`);
    if (count >= 30) break;
  }

  return novels;
};
