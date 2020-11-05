export const collectionName = {
  novels: 'novels',
  docCounters: 'docCounters',
} as const;

export const siteName = {
  narou: '小説家になろう',
  novelup: 'ノベルアップ＋',
  kakuyomu: 'カクヨム',
  novelba: 'ノベルバ',
} as const;

export const genre: { [labelName: string]: string } = {
  fantasy: '異世界ファンタジー',
  contemporary: '現代/その他ファンタジー',
  sf: 'SF',
  romance: '恋愛/ラブコメ',
  horror: 'ホラー',
  mystery: 'ミステリー',
  essay: 'エッセイ/評論/コラム/ノンフィクション',
  history: '歴史/時代/伝奇',
  drama: '現代/青春ドラマ/現代アクション',
  poetry: '詩/短歌',
  literature: '文芸/純文学',
  other: 'その他',
} as const;
