/* eslint camelcase: ["warn", {properties: "never"}] */

export type NarouNovelItem = {
  title: string; // 小説名
  ncode: string; // Nコード
  userid: number | string; // 作者のユーザID(数値)
  writer: string; // 作者名
  story: string; // 小説のあらすじ
  biggenre: number | string; // 大ジャンル
  genre: number | string; // ジャンル
  gensaku: string; // 現在未使用項目(常に空文字列が返ります)
  keyword: string; // キーワード
  general_firstup: string; // 初回掲載日YYYY-MM-DD HH:MM:SSの形式
  general_lastup: string; // 最終掲載日YYYY-MM-DD HH:MM:SSの形式
  novel_type: number; // 連載の場合は1、短編の場合は2
  end: number; // 短編小説と完結済小説は0となっています。連載中は1です。
  general_all_no: number; // 全掲載部分数です。短編の場合は1です。
  length: number; // 小説文字数です。スペースや改行は文字数としてカウントしません。
  time: number; // 読了時間(分単位)です。読了時間は小説文字数÷500を切り上げした数値です。
  isstop: number; // 長期連載停止中なら1、それ以外は0です。
  isr15: number; // 登録必須キーワードに「R15」が含まれる場合は1、それ以外は0です。
  isbl: number; // 登録必須キーワードに「ボーイズラブ」が含まれる場合は1、それ以外は0です。
  isgl: number; // 登録必須キーワードに「ガールズラブ」が含まれる場合は1、それ以外は0です。
  iszankoku: number; // 登録必須キーワードに「残酷な描写あり」が含まれる場合は1、それ以外は0です。
  istensei: number; // 登録必須キーワードに「異世界転生」が含まれる場合は1、それ以外は0です。
  istenni: number; // 登録必須キーワードに「異世界転移」が含まれる場合は1、それ以外は0です。
  pc_or_k: number; //	1はケータイのみ、2はPCのみ、3はPCとケータイで投稿された作品です。対象は投稿と次話投稿時のみで、どの端末で執筆されたかを表すものではありません。
  global_point: number; //	総合評価ポイント(=(ブックマーク数×2)+評価ポイント)
  daily_point: number; // 日間ポイント(ランキング集計時点から過去24時間以内で新たに登録されたブックマークや評価が対象)
  weekly_point: number; // 週間ポイント(ランキング集計時点から過去7日以内で新たに登録されたブックマークや評価が対象)
  monthly_point: number; // 月間ポイント(ランキング集計時点から過去30日以内で新たに登録されたブックマークや評価が対象)
  quarter_point: number; // 四半期ポイント(ランキング集計時点から過去90日以内で新たに登録されたブックマークや評価が対象)
  yearly_point: number; // 年間ポイント(ランキング集計時点から過去365日以内で新たに登録されたブックマークや評価が対象)
  fav_novel_cnt: number; // ブックマーク数
  impression_cnt: number; // 感想数
  review_cnt: number; // レビュー数
  all_point: number; // 評価ポイント
  all_hyoka_cnt: number; // 評価者数
  sasie_cnt: number; // 挿絵の数
  kaiwaritu: number; // 会話率
  novelupdated_at: number; // 小説の更新日時
  updated_at: string; // 最終更新日時(注意：システム用で小説更新時とは関係ありません)
};
