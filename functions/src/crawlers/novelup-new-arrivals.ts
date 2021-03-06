import admin from 'firebase-admin';
import puppeteer from 'puppeteer';
import { parseFromTimeZone } from 'date-fns-timezone';

import { siteName } from '../services/novelshelf/constants';
import { Novel, blankNovel } from '../services/novelshelf/models/novel';
import { getGenre, GenreMap } from '../utils/genre';
import { sleep } from '../utils/timer';
import { zeroPad } from '../utils/text-processor';

const genreMap: GenreMap = {
  '異世界ファンタジー': 'fantasy',
  '現代/その他ファンタジー': 'contemporary',
  'SF': 'sf',
  '恋愛/ラブコメ': 'romance',
  'ホラー': 'horror',
  'ミステリー': 'mystery',
  'エッセイ/評論/コラム': 'essay',
  '歴史/時代': 'history',
  '文芸/純文学': 'literature',
  'ブログ/活動報告': 'other',
  '現代/青春ドラマ': 'drama',
  '詩/短歌': 'poetry',
  '作品紹介': 'other',
  '二次創作': 'other',
  '童話/絵本/その他': 'other',
};

const scrollToBottom = async (
  page: puppeteer.Page,
  maxScrollPosition: number,
) => {
  const scroll = async (currentPos: number, prevPos: number) => {
    let currentPosition = currentPos;
    let prevPosition = prevPos;
    const bodyHeight = await page.evaluate(() =>
      Promise.resolve(document.body.clientHeight),
    );

    await page.evaluate((scrollTo: number) => {
      return Promise.resolve(window.scrollTo(0, scrollTo));
    }, bodyHeight);

    await sleep(500);

    prevPosition = currentPos;
    currentPosition = await page.evaluate(() => {
      return Promise.resolve(window.scrollY);
    });
    if (currentPosition < maxScrollPosition && prevPosition < currentPosition) {
      await scroll(currentPosition, prevPosition);
    }
  };
  await scroll(1, 0);
};

export const feedNewArrivals = async (page: puppeteer.Page, lim = 100) => {
  const url = 'https://novelup.plus/search?q=';

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const novels: Novel[] = [];

  await scrollToBottom(page, 36000);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const items = await page.$$('.section .content_item .one_set.type_accordion');
  let count = 0;
  for await (const item of items) {
    const novel: Novel = { ...blankNovel };

    novel.site = siteName.novelup;
    novel.url = await item.$eval('.novel_title a', (e) =>
      e.getAttribute('href'),
    );
    novel.title = await item.$eval(
      '.novel_title a',
      (e) => e?.textContent?.trim() || null,
    );
    novel.author = await item.$eval(
      '.novel_author a',
      (e) => e?.textContent?.trim() || null,
    );
    novel.authorUrl = await item.$eval('.novel_author a', (e) =>
      e.getAttribute('href'),
    );

    const genreName = await item.$eval(
      '.novel_author span',
      (e) => e?.textContent?.split('･')[0].trim() || 'その他',
    );
    novel.originalGenre = [genreName];

    novel.genre = getGenre(genreName, genreMap);
    novel.story = await item.$eval('.novel_synopsis p', (e) => e.textContent);

    const update = await item.$eval('.novel_update p', (e) =>
      e.textContent?.trim(),
    );
    if (update && /\d{4}年\d{1,2}月\d{1,2}日更新/.test(update)) {
      const updatedDateStr = update
        .replace(/日更新/g, '')
        .replace(/年|月/g, '-');
      const updatedDate = parseFromTimeZone(updatedDateStr, {
        timeZone: 'Asia/Tokyo',
      });
      novel.updatedAt = admin.firestore.Timestamp.fromDate(updatedDate);
    } else {
      continue;
    }

    novels.push(novel);
    count += 1;

    if (count >= lim) break;
  }

  for await (const novel of novels) {
    if (novel.url) {
      await page.goto(novel.url, { waitUntil: 'domcontentloaded' });

      const created = await page.$eval(
        '#section_episode_info_table > .content_wrapper tbody tr:nth-child(6) td',
        (e) => e?.textContent?.trim() || null,
      );
      if (created) {
        const arr = created.split(/年|月|日\s|時|分/);
        const createdDateStr = `${arr[0]}-${zeroPad(arr[1], 2)}-${zeroPad(
          arr[2],
          2,
        )} ${zeroPad(arr[3], 2)}:${zeroPad(arr[4], 2)}:00`;
        const createdDate = parseFromTimeZone(createdDateStr, {
          timeZone: 'Asia/Tokyo',
        });
        novel.createdAt = admin.firestore.Timestamp.fromDate(createdDate);
      }

      const updated = await page.$eval(
        '#section_episode_info_table > .content_wrapper tbody tr:nth-child(7) td',
        (e) => e?.textContent?.trim() || null,
      );
      if (updated) {
        const arr = updated.split(/年|月|日\s|時|分/);
        const updatedDateStr = `${arr[0]}-${zeroPad(arr[1], 2)}-${zeroPad(
          arr[2],
          2,
        )} ${zeroPad(arr[3], 2)}:${zeroPad(arr[4], 2)}:00`;
        const updatedDate = parseFromTimeZone(updatedDateStr, {
          timeZone: 'Asia/Tokyo',
        });
        novel.updatedAt = admin.firestore.Timestamp.fromDate(updatedDate);
      }

      await sleep(1000);
    }
  }

  return novels;
};
