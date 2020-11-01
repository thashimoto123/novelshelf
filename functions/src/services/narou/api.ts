import fetch from 'node-fetch';
import forEach from 'lodash/forEach';
import { NarouNovelItem } from './models/novel-item';

const BASE_URL = 'https://api.syosetu.com/novelapi/api/';

type SearchParams = {
  out?: string | null; // 出力形式をyamlまたはjsonまたはphpを指定。
  of?: string | null; // 出力する項目
  lim?: number | null; // 最大出力数(1～500)
  st?: number | null; // 表示開始位置(1～2000)
  order?: string | null; // 出力順序
  word?: string | null; // 単語を指定
  notword?: string | null; // 含みたくない単語を指定
  title?: 1 | null; // 	1の場合はタイトルをwordとnotwordの抽出対象に指定
  ex?: 1 | null; // 1の場合はあらすじをwordとnotwordの抽出対象に指定
  keyword?: 1 | null; // 1の場合はあらすじをwordとnotwordの抽出対象に指定
  wname?: 1 | null; // 1の場合は作者名をwordとnotwordの抽出対象に指定
  biggenre?: string | null; // 大ジャンル指定
  notbiggenre?: string | null; // 大ジャンル除外指定
  genre?: string | null; // ジャンル指定
  notgenre?: string | null; // ジャンル除外指定
  userid?: string | null; // ユーザID指定
};

const defaultSearchParams: SearchParams = {
  out: 'json',
  lim: 100,
  order: 'new', // 	新着更新順
};

export const fetchNovelsFromNarouApi = async (params: SearchParams = {}) => {
  const searchParams = { ...defaultSearchParams, ...params };
  const queries = new URLSearchParams();

  forEach(searchParams, (v, k) => {
    const value = String(v || '').trim();
    if (value) queries.set(k, value);
  });

  const url = `${BASE_URL}?${queries.toString()}`;
  const novelItems: NarouNovelItem[] = [];
  const res = await fetch(url);
  const data = await res.json();

  if (data && data.length > 1) {
    data.slice(1).forEach((item: NarouNovelItem) => novelItems.push(item));
  }

  return novelItems;
};
