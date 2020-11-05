import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import { parseFromTimeZone } from 'date-fns-timezone';

import { fetchNovelsFromNarouApi } from './services/narou/api';
import { saveNovels } from './firestore-admin/novel';
import { siteName } from './services/novelshelf/constants';
import { Novel, blankNovel } from './services/novelshelf/models/novel';
import { getGenre, GenreMap } from './utils/genre';

const integratedGenreMap: GenreMap = {
  '101': 'romance',
  '102': 'romance',
  '201': 'fantasy',
  '202': 'fantasy',
  '301': 'literature',
  '302': 'literature',
  '303': 'history',
  '304': 'mystery',
  '305': 'horror',
  '306': 'literature',
  '307': 'literature',
  '401': 'sf',
  '402': 'sf',
  '403': 'sf',
  '404': 'sf',
  '9901': 'other',
  '9902': 'poetry',
  '9903': 'essay',
  '9904': 'other',
  '9999': 'other',
  '9801': 'other',
};

const originalGenreMap: GenreMap = {
  '101': '異世界〔恋愛〕',
  '102': '現実世界〔恋愛〕',
  '201': 'ハイファンタジー〔ファンタジー〕',
  '202': 'ローファンタジー〔ファンタジー〕',
  '301': '純文学〔文芸〕',
  '302': 'ヒューマンドラマ〔文芸〕',
  '303': '歴史〔文芸〕',
  '304': '推理〔文芸〕',
  '305': 'ホラー〔文芸〕',
  '306': 'アクション〔文芸〕',
  '307': 'コメディー〔文芸〕',
  '401': 'VRゲーム〔SF〕',
  '402': '宇宙〔SF〕',
  '403': '空想科学〔SF〕',
  '404': 'パニック〔SF〕',
  '9901': '童話〔その他〕',
  '9902': '詩〔その他〕',
  '9903': 'エッセイ〔その他〕',
  '9904': 'リプレイ〔その他〕',
  '9999': 'その他〔その他〕',
  '9801': 'ノンジャンル〔ノンジャンル〕',
};

export default functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 200,
    memory: '2GB',
  })
  .pubsub.schedule('0 0,4,8,12,16,20 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const novelItems = await fetchNovelsFromNarouApi({
      lim: 300,
    });
    const db = admin.firestore();

    const novels = novelItems.map((novelItem) => {
      const url = novelItem.ncode
        ? `https://ncode.syosetu.com/${novelItem.ncode.toLowerCase()}/`
        : null;
      const authorUrl = novelItem.userid
        ? `https://mypage.syosetu.com/${novelItem.userid}/`
        : null;

      const genre = getGenre(novelItem.genre, integratedGenreMap);
      const originalGenre = getGenre(novelItem.genre, originalGenreMap);

      const createdDate = parseFromTimeZone(novelItem.general_firstup, {
        timeZone: 'Asia/Tokyo',
      });
      const updatedDate = parseFromTimeZone(novelItem.general_lastup, {
        timeZone: 'Asia/Tokyo',
      });

      const novel: Novel = {
        ...blankNovel,
        site: siteName.narou,
        url,
        title: novelItem.title,
        author: novelItem.writer,
        authorUrl,
        genre,
        originalGenre,
        story: novelItem.story,
        createdAt: admin.firestore.Timestamp.fromDate(createdDate),
        updatedAt: admin.firestore.Timestamp.fromDate(updatedDate),
      };

      return novel;
    });

    const fetchCounts = await saveNovels(db, novels, siteName.narou);

    console.log(
      `Fetched Narou novels. Create ${fetchCounts.create} novels. Update ${fetchCounts.update} novels.`,
    );
  });
