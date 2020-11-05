import admin from 'firebase-admin';
import puppeteer from 'puppeteer';
import { parseFromTimeZone } from 'date-fns-timezone';

import { siteName } from '../services/novelshelf/constants';
import { Novel, blankNovel } from '../services/novelshelf/models/novel';
import { getGenre, GenreMap } from '../utils/genre';
import { sleep } from '../utils/timer';

const genreMap: GenreMap = {
  'ファンタジー': 'fantasy',
  '恋愛': 'romance',
  '現代ドラマ': 'drama',
  '学園': 'drama',
  'SF': 'sf',
  'エッセイ': 'essay',
  'コメディー': 'other',
  '文学': 'literature',
  'ホラー': 'horror',
  '詩': 'poetry',
  '現代アクション': 'drama',
  '冒険': 'other',
  '推理': 'mystery',
  '戦記': 'other',
  '歴史': 'history',
  '童話': 'other',
  'リプレイ': 'other',
  'その他': 'other',
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
    novel.originalGenre = [genreName];
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
