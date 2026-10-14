import { useMemo, useState } from "react";

type Page = "home" | "brand" | "compare";
type Rating = "◎" | "○" | "△" | "×";

type Model = {
  id: string;
  brand: string;
  name: string;
  year?: string;
  feature: string;
  price: string;
  weight: string;
  use: string;
  image: string;
  colors: string[];
  pros: string[];
  cons: string[];
  ratings: Rating[];
};

type Brand = {
  name: string;
  country: string;
  tagline: string;
  forWhom: string;
  code: string;
};

const heroImage =
  "https://images.unsplash.com/photo-1751395087527-b7af2a412147?auto=format&fit=crop&w=1600&q=85";
const modelImages = [
  "https://shop.akachan.jp/img/goods/5/264521100_63b6e7efea9a409ea51d6b8d36619ad7.jpg",
  "https://www.aprica.jp/assets/4969220011424_01_72.jpg",
  "https://shop.akachan.jp/img/goods/D2/264152900_4489f13a5aaf4916bbbeacd37184519e.jpg",
  "https://m.media-amazon.com/images/I/61MTVbOfBqL.jpg",
  "https://shop.akachan.jp/img/goods/5/264635700_cff61ceb3af54578afed2a5ae307dca9.jpg",
  "https://img21.shop-pro.jp/PA01481/780/product/189076413.jpg?cmsp_timestamp=20260213223745",
  "https://www.combi.co.jp/img/goods/L/119813.jpg",
  "https://www.combi.co.jp/img/goods/L/119353.jpg",
  "https://www.combi.co.jp/img/goods/L/119888.jpg",
  "https://www.airbuggy.com/wp-content/uploads/2022/10/airbuggy_coco_premier_white_ash_front.png",
  "https://airbuggy.itembox.cloud/product/011/000000001193/000000001193-16.jpg?size=l&w=ODAw&t=20261007093622",
  "https://www.katoji.co.jp/lsc/upfile/item/37/03/3703_1_l.jpg",
  "https://www.katoji.co.jp/lsc/upfile/item/31/50/3150_1_l.jpg",
  "https://katojifs.itembox.cloud/product/012/000000001213/000000001213-01.jpg?size=l&w=ODAw&t=20240401154631",
  "https://katojifs.itembox.cloud/product/016/000000001645/000000001645-01.jpg?size=l&w=ODAw&t=20260120110613",
  "https://katojifs.itembox.cloud/product/016/000000001616/000000001616-01.jpg?size=l&w=ODAw&t=20251204172030",
  "https://shop.akachan.jp/img/goods/5/264007500_c5c2e27085fc42adb5b0b37b9991da1a.jpg",
  "https://cybex-japan.com/cdn/shop/files/CYB_26_INT_y045_Mios_ROGO_SEBL_Style_screen_HD.jpg?v=1776743502",
  "https://www.bugaboo.com/dw/image/v2/BDLP_PRD/on/demandware.static/-/Library-Sites-BugabooSharedLibrary/default/dw2aec6f84/Accessories/Babynest/Desert%20taupe/bugaboo-baby-nest-mobile.png?sw=716",
  "https://www.bugaboo.com/dw/image/v2/BDLP_PRD/on/demandware.static/-/Library-Sites-BugabooSharedLibrary/default/dw4f8a797a/Strollers/dragonfly%20plus/pdp/Bugaboo-Dragonfly-plus-2-in-1-PDP-Highlights-component-3.jpg?sw=496",
  "https://item-shopping.c.yimg.jp/i/n/recommendo_ms-yy-6pstylest_4_d_20250709123020",
  "https://babynug.jp/cdn/shop/files/ms-yy3-0p-nbp_1.jpg?v=1736910225&width=1445",
  "https://nuna-baby.jp/cdn/shop/files/41412_16.png?v=1755067675",
  "https://nuna-baby.jp/cdn/shop/files/41445_2.jpg?v=1764309866",
  "https://nuna-baby.jp/cdn/shop/files/4143641439_1.webp?v=1764309297",
  "https://nuna-baby.jp/cdn/shop/files/01_mixxnext_caviar2026.jpg?v=1783500160",
  "https://nunababy.com/media/catalog/product/N/u/Nuna_TRVLlx_Caviar_Angle_GL_web_cfa8.png?optimize=high&fit=bounds&height=730&width=730&canvas=730:730&format=jpeg",
  "https://tshop.r10s.jp/nuna-onlineshop/cabinet/08082227/08082229/11449802/41483_01.jpg?fitin=720%3A720",
];

const brands: Brand[] = [
  {
    name: "Aprica",
    country: "日本",
    tagline: "快適性・振動吸収・軽量設計",
    forWhom: "乗り心地と機能性を重視",
    code: "AP",
  },
  {
    name: "Combi",
    country: "日本",
    tagline: "コンパクト・軽量・エッグショック",
    forWhom: "持ち運びやすさを重視",
    code: "CO",
  },
  {
    name: "AIRBUGGY",
    country: "日本",
    tagline: "3輪・エアタイヤ・安定走行",
    forWhom: "段差や不整地への強さを重視",
    code: "AB",
  },
  {
    name: "Joie",
    country: "イギリス",
    tagline: "コスパ・両対面・機能性",
    forWhom: "価格と機能のバランスを重視",
    code: "JO",
  },
  {
    name: "CYBEX",
    country: "ドイツ",
    tagline: "高級感・安全性・デザイン",
    forWhom: "上質さとデザインを重視",
    code: "CY",
  },
  {
    name: "Bugaboo",
    country: "オランダ",
    tagline: "走行性・高級感・洗練デザイン",
    forWhom: "長く使える上質モデルを重視",
    code: "BU",
  },
  {
    name: "Stokke",
    country: "ノルウェー",
    tagline: "ハイシート・北欧デザイン",
    forWhom: "新生児から長期間使いたい",
    code: "ST",
  },
  {
    name: "Nuna",
    country: "オランダ",
    tagline: "機能美・高級感・両対面",
    forWhom: "走行性とデザインを両立",
    code: "NU",
  },
];

const quickComparisonRows = [
  {
    brand: "Aprica",
    price: "4〜10万円前後",
    weight: "3.9〜7.3kg",
    fit: "赤ちゃんの快適性を重視する家族",
    note: "振動吸収と乗り心地が強み。軽量機種も多い。",
  },
  {
    brand: "Combi",
    price: "4〜7万円前後",
    weight: "5.6kg前後",
    fit: "電車・階段の多い家族",
    note: "押しやすさと日差し対策が良く、コンパクトに使いやすい。",
  },
  {
    brand: "AIRBUGGY",
    price: "8〜9万円前後",
    weight: "10.2〜10.3kg",
    fit: "段差が多い地域や長く使う家族",
    note: "3輪の安定感と大きなキャノピーが強み。",
  },
  {
    brand: "Joie",
    price: "2.5〜6万円前後",
    weight: "4.25〜7.37kg",
    fit: "価格と機能のバランスを重視する家族",
    note: "コスパがよく、両対面の選択肢も多い。",
  },
  {
    brand: "CYBEX",
    price: "7〜9万円前後",
    weight: "5.9〜10kg前後",
    fit: "高品質さとデザインを重視する家族",
    note: "軽さと上質感のバランスが良く、日常使いに向く。",
  },
  {
    brand: "Bugaboo",
    price: "8〜14万円前後",
    weight: "7.3〜10kg前後",
    fit: "上質さと街中の使いやすさを重視する家族",
    note: "走行性が高く、長く使うなら満足度が高い。",
  },
  {
    brand: "Stokke",
    price: "6〜9万円前後",
    weight: "約6〜7kg",
    fit: "新生児から長く使う家族",
    note: "育児の長期利用に向くが、シート交換や価格は要検討。",
  },
  {
    brand: "Nuna",
    price: "7万円前後〜",
    weight: "約6〜11kg",
    fit: "快適性とデザインの両立を重視する家族",
    note: "両対面と高い走行性が魅力。ただし重めなモデルもある。",
  },
];

const models: Model[] = [
  {
    id: "mar",
    brand: "Aprica",
    name: "マール AB（2026）",
    year: "2026",
    feature: "最上位モデル・快適性重視",
    price: "99,880円",
    weight: "7.3kg",
    use: "赤ちゃんの乗り心地を最優先にしたい人",
    image: modelImages[0],
    colors: ["#B8AAA0", "#313231", "#D8D0C7"],
    pros: ["クッション性が高い", "高級感がある", "振動吸収に強い"],
    cons: [
      "価格が高い",
      "持ち運びしにくい",
      "機能が多くオーバースペックになりやすい",
    ],
    ratings: ["◎", "○", "◎", "◎", "△", "◎"],
  },
  {
    id: "lacuna",
    brand: "Aprica",
    name: "ラクーナ クッション フリー AF（2026）",
    year: "2026",
    feature: "小回り・操作性重視",
    price: "-",
    weight: "5.8kg",
    use: "狭い場所やエレベーターで使いやすさを重視する人",
    image: modelImages[1],
    colors: ["#837B70", "#242725", "#CBB9A7"],
    pros: [
      "4輪フリーで横移動がしやすい",
      "5.8kgでバランスが良い",
      "駅やマンション向き",
    ],
    cons: [
      "超軽量モデルより重い",
      "ハンドル高さ調整ができない",
      "付属装備が少ない",
    ],
    ratings: ["◎", "◎", "◎", "◎", "○", "○"],
  },
  {
    id: "lacuna-plus",
    brand: "Aprica",
    name: "ラクーナ クッション フリー プラス AE（2026）",
    year: "2026",
    feature: "アカチャンホンポ限定・高機能",
    price: "76,450円",
    weight: "6.1kg",
    use: "横移動と快適装備を両立したい人",
    image: modelImages[2],
    colors: ["#B7A78F", "#2F2E2C", "#D8D0C5"],
    pros: [
      "4輪フリーで横移動が可能",
      "9段階のハンドル調整が便利",
      "快適装備が充実",
    ],
    cons: ["AFより重い", "価格が高め", "アカチャンホンポ限定で比較しにくい"],
    ratings: ["◎", "◎", "◎", "◎", "○", "○"],
  },
  {
    id: "lacuna-ai",
    brand: "Aprica",
    name: "ラクーナ クッション AI（2026）",
    year: "2026",
    feature: "軽さと機能のバランス重視",
    price: "-",
    weight: "5.7kg",
    use: "シンプルで使いやすい両対面モデルを探す人",
    image: modelImages[3],
    colors: ["#A29E98", "#2A2E2D", "#D7CFC4"],
    pros: [
      "軽く、快適性とシンプルさのバランスが良い",
      "両対面が使いやすい",
      "使い続けやすい",
    ],
    cons: ["4輪フリーがない", "狭い場所での取り回しがやや不利", "装備が控えめ"],
    ratings: ["○", "◎", "○", "◎", "○", "○"],
  },
  {
    id: "karoon",
    brand: "Aprica",
    name: "カルーンエアー メッシュ AD（2026）",
    year: "2026",
    feature: "超軽量・持ち運び重視",
    price: "-",
    weight: "3.9kg",
    use: "階段や電車移動が多い人",
    image: modelImages[4],
    colors: ["#24343C", "#BBAEA0", "#687273"],
    pros: ["約3.9kgで軽い", "片手で持ち運びしやすい", "軽さを最優先できる"],
    cons: [
      "快適装備が控えめ",
      "段差や荒れた路面では走行性が落ちやすい",
      "長時間使用にはやや不安",
    ],
    ratings: ["△", "○", "△", "◎", "◎", "○"],
  },
  {
    id: "luche",
    brand: "Aprica",
    name: "ルーチェ フリー AC（2025・2026新色）",
    year: "2025",
    feature: "デザイン・走行性重視",
    price: "76,890円",
    weight: "6.2kg",
    use: "スタイリッシュな外観と機能性を重視する人",
    image: modelImages[5],
    colors: ["#A9A299", "#2F2A26", "#D9CFC3"],
    pros: ["スタイリッシュなデザイン", "横移動が便利", "走行性が安定している"],
    cons: [
      "シート切替時の付け替えが必要",
      "軽さ優先の人には向かない",
      "高級感重視モデルで価格がやや高い",
    ],
    ratings: ["○", "○", "○", "○", "△", "◎"],
  },
  {
    id: "sugocal",
    brand: "Combi",
    name: "スゴカルR エッグショック ZA",
    feature: "シングルタイヤで押しやすさ重視",
    price: "69,300円（税込）",
    weight: "5.6kg",
    use: "押しやすさと日差し対策を重視する人",
    image: modelImages[6],
    colors: ["#9D9283", "#343737", "#C7BBAA"],
    pros: [
      "シングルタイヤで押しやすい",
      "日差し対策が充実",
      "新しいモデルで使いやすい",
    ],
    cons: ["価格が高め", "最軽量クラスではない", "本格的な悪路は弱い"],
    ratings: ["◎", "◎", "◎", "◎", "○", "○"],
  },
  {
    id: "sugos",
    brand: "Combi",
    name: "スゴカルS エッグショック JA",
    feature: "シンクロシート搭載",
    price: "68,200円（税込）",
    weight: "-",
    use: "赤ちゃんとの距離を近くしたい人",
    image: modelImages[7],
    colors: ["#A19A8E", "#2A2C2D", "#DCC7B8"],
    pros: ["シンクロシートで親子の距離が近い", "快適性が高い", "使いやすい"],
    cons: ["価格が高め", "軽さ最優先には向かない", "使い勝手は標準レベル"],
    ratings: ["◎", "◎", "◎", "◎", "○", "○"],
  },
  {
    id: "sugo-compact",
    brand: "Combi",
    name: "スゴカルL compact エッグショック CB",
    feature: "広めのシートとコンパクトな折りたたみ",
    price: "60,000円（税込）",
    weight: "-",
    use: "収納スペースを確保しつつ使いやすさを重視する人",
    image: modelImages[8],
    colors: ["#B5A58D", "#2D2D2A", "#E7D9CE"],
    pros: ["コンパクトに折りたためる", "広めのシート", "収納を確保しやすい"],
    cons: [
      "超軽量モデルより重い",
      "自動折りたたみ機能がない",
      "大型クラスより寝かせ方は普通",
    ],
    ratings: ["○", "◎", "○", "◎", "○", "○"],
  },
  {
    id: "coco",
    brand: "AIRBUGGY",
    name: "COCO PREMIER FROM BIRTH",
    feature: "最上位・走行性と快適性重視",
    price: "85,800円（税込）",
    weight: "10.3kg",
    use: "新生児から長く使いたい人",
    image: modelImages[9],
    colors: ["#972E33", "#253337", "#B1A696"],
    pros: [
      "エアタイヤで段差や凹凸に強い",
      "足元まで覆う大型キャノピー",
      "新生児から使える",
    ],
    cons: ["10.3kgと重い", "両対面ではない", "タイヤ管理が必要", "価格が高い"],
    ratings: ["◎", "○", "◎", "×", "△", "◎"],
  },
  {
    id: "coco-next",
    brand: "AIRBUGGY",
    name: "COCO BRAKE NEXT",
    feature: "2026年新モデル・総合バランス重視",
    price: "82,500円（税込）",
    weight: "10.2kg",
    use: "3輪での安定走行と日差し対策を重視する人",
    image: modelImages[10],
    colors: ["#7F8E9E", "#C4B29A", "#262626"],
    pros: [
      "3輪で小回りが利く",
      "深いキャノピーで日差し対策が充実",
      "安定走行がしやすい",
    ],
    cons: ["10.2kgと重い", "両対面ではない", "階段での持ち運びに不向き"],
    ratings: ["◎", "◎", "◎", "×", "△", "◎"],
  },
  {
    id: "smartaigi-drift",
    brand: "Joie",
    name: "スマバギ 4WD ドリフト フレックス",
    feature: "快適装備・操作性重視",
    price: "51,700円",
    weight: "7.37kg",
    use: "狭い場所での操作を重視する人",
    image: modelImages[11],
    colors: ["#A2998E", "#1E2122", "#D6C9BA"],
    pros: [
      "横移動ができる",
      "前後サスペンションとハンドル高さ調整が便利",
      "使いやすい",
    ],
    cons: ["7kg超で重め", "5モデル中で最も高価", "高価な分予算重視には不向き"],
    ratings: ["◎", "○", "◎", "◎", "△", "○"],
  },
  {
    id: "smartaigi-4wd",
    brand: "Joie",
    name: "スマバギ 4WD",
    feature: "総合バランス重視",
    price: "43,780円",
    weight: "5.8kg",
    use: "価格と性能のバランスを取りたい人",
    image: modelImages[12],
    colors: ["#9D948C", "#2A2A29", "#D8CEC2"],
    pros: ["比較的軽い", "両対面で押しやすい", "価格と性能のバランスが良い"],
    cons: ["横移動機能なし", "超軽量モデルより重い", "細部はシンプル"],
    ratings: ["○", "◎", "◎", "◎", "○", "○"],
  },
  {
    id: "smartaigi-mesh",
    brand: "Joie",
    name: "スマバギ（メッシュインナークッション付き）",
    feature: "コスパ・シンプルな両対面",
    price: "32,780円",
    weight: "-",
    use: "低価格で両対面を希望する人",
    image: modelImages[13],
    colors: ["#BBAEA1", "#2B2D2A", "#E8DCCA"],
    pros: [
      "3万円台で両対面が購入しやすい",
      "メッシュクッション付き",
      "シンプルで使いやすい",
    ],
    cons: [
      "ドリフト機能なし",
      "上位モデルより機能がシンプル",
      "長期利用は標準レベル",
    ],
    ratings: ["○", "◎", "○", "◎", "○", "○"],
  },
  {
    id: "pact-pro",
    brand: "Joie",
    name: "Pact Pro",
    feature: "コンパクト収納・長期間使用",
    price: "32,780円",
    weight: "-",
    use: "長く使えるコンパクトモデルを探す人",
    image: modelImages[14],
    colors: ["#A09992", "#222322", "#D8C5B3"],
    pros: ["コンパクトに折りたためる", "長期間使える", "収納がしやすい"],
    cons: ["両対面不可", "横移動機能なし", "上位モデルほどの快適性はない"],
    ratings: ["○", "◎", "○", "×", "○", "◎"],
  },
  {
    id: "aireskip-lite",
    brand: "Joie",
    name: "aireskip lite",
    feature: "軽さ・持ち運び重視",
    price: "24,200円",
    weight: "4.25kg",
    use: "階段や公共交通機関が多い人",
    image: modelImages[15],
    colors: ["#B7AD9F", "#2F2C2B", "#DECCB6"],
    pros: ["4.25kgと軽量で持ち運びしやすい", "価格が安い", "扱いやすい"],
    cons: [
      "両対面不可",
      "上位モデルほど快適装備は充実しない",
      "荒れた路面では不利",
    ],
    ratings: ["△", "○", "○", "×", "◎", "○"],
  },
  {
    id: "melio",
    brand: "CYBEX",
    name: "メリオ カーボン（2026）",
    year: "2026",
    feature: "総合バランス・軽量・両対面",
    price: "74,690円（税込）",
    weight: "5.9kg",
    use: "日常使いで軽さと快適性を両立したい人",
    image: modelImages[16],
    colors: ["#A9A093", "#222728", "#7C756D"],
    pros: ["5.9kgと比較的軽い", "両対面対応", "片手開閉が便利"],
    cons: [
      "対面切替にはシートの付け替えが必要",
      "ローズゴールドフレームは選べない",
      "収納のしにくさがある",
    ],
    ratings: ["◎", "◎", "◎", "○", "◎", "◎"],
  },
  {
    id: "mios",
    brand: "CYBEX",
    name: "ミオス（MIOS）",
    feature: "高級感・都会的なデザイン",
    price: "-",
    weight: "約10kg前後",
    use: "高級感とデザインを重視する人",
    image: modelImages[17],
    colors: ["#A7A095", "#1F2225", "#D4C6B7"],
    pros: ["高級感がある", "通気性の高いメッシュシート", "両対面対応"],
    cons: ["約10kgと重い", "価格が高い", "階段での持ち運びに不向き"],
    ratings: ["◎", "○", "◎", "○", "△", "◎"],
  },
  {
    id: "butterfly-2",
    brand: "Bugaboo",
    name: "バガブー Butterfly 2",
    feature: "コンパクト・軽さ・旅行向け",
    price: "83,600円",
    weight: "7.3kg",
    use: "旅行や電車移動が多い人",
    image: modelImages[18],
    colors: ["#8F8B7E", "#232420", "#D4C7B7"],
    pros: ["7.3kgで軽く非常にコンパクト", "フルフラット対応", "旅行にも向く"],
    cons: ["両対面不可", "タイヤが小さく、国産超軽量モデルより重い"],
    ratings: ["○", "◎", "○", "×", "◎", "◎"],
  },
  {
    id: "dragonfly-plus",
    brand: "Bugaboo",
    name: "Dragonfly Plus",
    feature: "都市型・両対面・操作性重視",
    price: "138,600円",
    weight: "約10kg",
    use: "街中での操作性と両対面を重視する人",
    image: modelImages[19],
    colors: ["#9C978F", "#232325", "#E3D6C8"],
    pros: ["両対面対応", "街中での操作性が高い", "高い走行性"],
    cons: ["約10kgクラスで重め", "価格が高い", "収納スペースをとる"],
    ratings: ["◎", "◎", "◎", "○", "△", "◎"],
  },
  {
    id: "yoyo5-ab",
    brand: "Stokke",
    name: "YOYO5 AB型",
    year: "2026",
    feature: "2026年新型・総合バランス・新生児対応",
    price: "84,700円（税込）",
    weight: "約7.0kg",
    use: "新生児から長く使いたい人",
    image: modelImages[20],
    colors: ["#7B6D5C", "#263B3D", "#C2A6A1"],
    pros: [
      "新生児から4歳頃まで使える",
      "片手ワンアクションで折りたためる",
      "長く使いやすい",
    ],
    cons: ["両対面不可", "成長時にシート交換が必要", "価格が高め"],
    ratings: ["◎", "◎", "◎", "×", "○", "◎"],
  },
  {
    id: "yoyo3-0",
    brand: "Stokke",
    name: "YOYO3 0+ ニューボーンパック",
    feature: "旧世代・新生児対応・コンパクト",
    price: "-",
    weight: "約6kg台",
    use: "コンパクトさを重視する人",
    image: modelImages[21],
    colors: ["#9B8B7A", "#2B2E2D", "#D8CABF"],
    pros: ["新生児から使える", "コンパクトで持ち運びやすい", "簡単に扱える"],
    cons: ["両対面不可", "成長後は6+パックが必要", "長期利用はやや不便"],
    ratings: ["○", "◎", "○", "×", "◎", "◎"],
  },
  {
    id: "ixxa-next",
    brand: "Nuna",
    name: "IXXA next",
    feature: "軽量・両対面・総合バランス",
    price: "-",
    weight: "約6kg台",
    use: "日常使いに向く両対面モデル",
    image: modelImages[23],
    colors: ["#7D766F", "#252928", "#C4B5A9"],
    pros: ["比較的軽量", "両対面対応", "4輪サスペンション搭載"],
    cons: [
      "対面切替時にシートの付け替えが必要",
      "大型モデルより悪路走行は不利",
    ],
    ratings: ["◎", "◎", "◎", "◎", "○", "◎"],
  },
  {
    id: "triv-next",
    brand: "Nuna",
    name: "TRIV next",
    feature: "快適装備・走行性・両対面",
    price: "-",
    weight: "約8kg台",
    use: "走行性と両対面を重視する人",
    image: modelImages[24],
    colors: ["#A79D90", "#212324", "#DDD0C5"],
    pros: [
      "4輪サスペンションで振動を軽減",
      "オールシーズンシート",
      "両対面対応",
    ],
    cons: ["約8.7kgと重め", "階段での持ち運びは負担", "価格が高い"],
    ratings: ["◎", "◎", "◎", "◎", "△", "◎"],
  },
  {
    id: "mixx-next",
    brand: "Nuna",
    name: "MIXX next",
    feature: "赤ちゃんの快適性・走行性重視",
    price: "-",
    weight: "約11kg台",
    use: "乗り心地と安定感を重視する人",
    image: modelImages[25],
    colors: ["#9A968F", "#1D2020", "#D5CABF"],
    pros: [
      "大きなタイヤで安定感がある",
      "フラットに近いリクライニング",
      "赤ちゃんの快適性が高い",
    ],
    cons: ["約11kg台と重い", "収納場所が必要", "移動の負担が大きい"],
    ratings: ["◎", "◎", "◎", "◎", "△", "◎"],
  },
  {
    id: "trvl-lx",
    brand: "Nuna",
    name: "TRVL lx",
    feature: "コンパクト収納・持ち運び",
    price: "-",
    weight: "約7kg台",
    use: "旅行や車移動が多い人",
    image: modelImages[26],
    colors: ["#A69E93", "#252726", "#D7C9BC"],
    pros: ["自動折りたたみ機能が便利", "コンパクト収納", "新生児から使える"],
    cons: [
      "両対面不可",
      "大型モデルほどの走行安定性は期待しにくい",
      "機構の複雑さがある",
    ],
    ratings: ["○", "◎", "○", "×", "◎", "◎"],
  },
  {
    id: "swiv",
    brand: "Nuna",
    name: "SWIV",
    feature: "360度回転・操作性・高機能",
    price: "-",
    weight: "約9kg台",
    use: "狭い場所での取り回しを重視する人",
    image: modelImages[27],
    colors: ["#8F8A84", "#1F2020", "#D7C6B5"],
    pros: ["4輪360度回転で横移動がしやすい", "高機能", "使い勝手が良い"],
    cons: ["約9kg台と重い", "機構が複雑", "価格が高い"],
    ratings: ["◎", "◎", "◎", "◎", "△", "◎"],
  },
];

const purposeMatrix = [
  {
    purpose: "駅・階段が多い",
    strongest: "Combi / Aprica",
    reason: "軽さと小回りの良さで、毎日の負担がかなり変わります。",
  },
  {
    purpose: "段差・悪路が多い",
    strongest: "AIRBUGGY / Bugaboo",
    reason: "タイヤとサスペンションの安定感が、長距離の快適さに直結します。",
  },
  {
    purpose: "新生児から長く使う",
    strongest: "Stokke / Nuna",
    reason: "長期利用を前提にした設計や、育児期の使い分けがしやすいです。",
  },
  {
    purpose: "価格を抑えたい",
    strongest: "Joie / Combi",
    reason: "生活に必要十分な機能を揃えつつ、予算負担を抑えやすいです。",
  },
  {
    purpose: "上質さ・デザインを重視",
    strongest: "CYBEX / Nuna / Bugaboo",
    reason: "見た目と乗り心地の両立が評価で上がりやすいです。",
  },
  {
    purpose: "赤ちゃんの眠りを大事にしたい",
    strongest: "Aprica / CYBEX",
    reason:
      "振動吸収と座面の快適さが、抱っこ外出中のストレスを下げやすいです。",
  },
];

const criteria = [
  "赤ちゃんの快適性",
  "総合バランス",
  "快適装備・操作性",
  "両対面",
  "軽さ・持ち運び",
  "デザイン",
];

const familyComparisonPoints = [
  {
    title: "外出のしやすさ",
    text: "駅や車の乗り降り、階段の回数を基準に選ぶと、日々の負担がかなり変わります。",
  },
  {
    title: "家族の使い分け",
    text: "片方が持ち運びを担当するのか、どちらも使うのかで、重さと収納性は重要な比較軸になります。",
  },
  {
    title: "赤ちゃんの快適さ",
    text: "座り心地や日差し対策、振動の少なさは、毎日の外出の満足度に直結します。",
  },
  {
    title: "長く使うか",
    text: "新生児期から4歳前後まで使う前提か、今の月齢に合わせて選ぶかで、両対面やシート形状が大きく違います。",
  },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="M4 10h11M11 5l5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path
        d="m4 10 4 4 8-9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [selectedBrand, setSelectedBrand] = useState("Aprica");
  const [compareIds, setCompareIds] = useState(["lacuna", "melio", "coco"]);
  const [menuOpen, setMenuOpen] = useState(false);

  const brand = brands.find((item) => item.name === selectedBrand) ?? brands[0];
  const brandModels = useMemo(() => {
    const exact = models.filter((model) => model.brand === selectedBrand);
    return exact.length >= 2
      ? exact
      : [
          ...exact,
          ...models
            .filter((model) => model.brand !== selectedBrand)
            .slice(0, 2),
        ];
  }, [selectedBrand]);
  const comparedModels = compareIds
    .map((id) => models.find((model) => model.id === id))
    .filter(Boolean) as Model[];

  const navigate = (next: Page) => {
    setPage(next);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openBrand = (name: string) => {
    setSelectedBrand(name);
    navigate("brand");
  };

  const toggleCompare = (id: string) => {
    setCompareIds((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 4) return [...current.slice(1), id];
      return [...current, id];
    });
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <button
          className="brand-mark"
          onClick={() => navigate("home")}
          aria-label="Baby Compass ホーム"
        >
          <span className="brand-symbol">bc</span>
          <span>Baby Compass</span>
        </button>
        <nav
          className={menuOpen ? "site-nav is-open" : "site-nav"}
          aria-label="メインナビゲーション"
        >
          <button
            className={page === "home" ? "is-active" : ""}
            onClick={() => navigate("home")}
          >
            ホーム
          </button>
          <button
            className={page === "brand" ? "is-active" : ""}
            onClick={() => navigate("brand")}
          >
            ブランドから探す
          </button>
          <button
            className={page === "compare" ? "is-active" : ""}
            onClick={() => navigate("compare")}
          >
            比較する <span className="nav-count">{compareIds.length}</span>
          </button>
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-label="メニューを開く"
        >
          <span />
          <span />
        </button>
      </header>

      <main>
        {page === "home" && (
          <HomePage onBrand={openBrand} onCompare={() => navigate("compare")} />
        )}
        {page === "brand" && (
          <BrandPage
            brand={brand}
            models={brandModels}
            selectedIds={compareIds}
            onBrand={setSelectedBrand}
            onToggle={toggleCompare}
            onCompare={() => navigate("compare")}
          />
        )}
        {page === "compare" && (
          <ComparePage
            models={comparedModels}
            onRemove={toggleCompare}
            onAdd={() => navigate("brand")}
          />
        )}
      </main>

      <footer className="site-footer">
        <div>
          <button
            className="brand-mark footer-logo"
            onClick={() => navigate("home")}
          >
            <span className="brand-symbol">bc</span>
            <span>Baby Compass</span>
          </button>
          <p>暮らしに合う一台を、わかりやすく。</p>
        </div>
        <div className="footer-links">
          <button onClick={() => navigate("home")}>ホーム</button>
          <button onClick={() => navigate("brand")}>ブランド一覧</button>
          <button onClick={() => navigate("compare")}>比較表</button>
        </div>
        <p className="copyright">© 2026 Baby Compass</p>
      </footer>
    </div>
  );
}

function HomePage({
  onBrand,
  onCompare,
}: {
  onBrand: (name: string) => void;
  onCompare: () => void;
}) {
  return (
    <>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">FIND YOUR BRAND</p>
            <h2>ブランドごとに見る</h2>
          </div>
          <p>
            それぞれの個性から、家族で一番使いやすいブランドを見つけましょう。
          </p>
        </div>
        <div className="brand-grid">
          {brands.map((brand, index) => (
            <button
              className="brand-card"
              key={brand.name}
              onClick={() => onBrand(brand.name)}
            >
              <span className={`brand-monogram tone-${(index % 4) + 1}`}>
                {brand.code}
              </span>
              <span className="brand-card-main">
                <small>{brand.country}</small>
                <strong>{brand.name}</strong>
                <span>{brand.tagline}</span>
              </span>
              <span className="card-arrow">
                <ArrowIcon />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="comparison-preview">
        <div>
          <p className="eyebrow">QUICK COMPARISON</p>
          <h2>ざっくり比較</h2>
          <p>
            家族で共有する比較メモとして、見落としやすい違いも横に並べて確認できます。
          </p>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>ブランド</th>
                <th>価格帯</th>
                <th>重さ</th>
                <th>向く暮らし</th>
                <th>ざっくり結論</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {quickComparisonRows.map((row) => (
                <tr key={row.brand}>
                  <td>
                    <strong>{row.brand}</strong>
                    <small>
                      {
                        brands.find((brand) => brand.name === row.brand)
                          ?.country
                      }
                    </small>
                  </td>
                  <td>{row.price}</td>
                  <td>{row.weight}</td>
                  <td>{row.fit}</td>
                  <td>{row.note}</td>
                  <td>
                    <button
                      onClick={() => onBrand(row.brand)}
                      aria-label={`${row.brand}を見る`}
                    >
                      <ArrowIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function BrandPage({
  brand,
  models,
  selectedIds,
  onBrand,
  onToggle,
  onCompare,
}: {
  brand: Brand;
  models: Model[];
  selectedIds: string[];
  onBrand: (name: string) => void;
  onToggle: (id: string) => void;
  onCompare: () => void;
}) {
  return (
    <>
      <section className="brand-hero">
        <div>
          <p className="breadcrumb">ホーム　/　ブランド　/　{brand.name}</p>
          <p className="eyebrow">{brand.country.toUpperCase()} BRAND</p>
          <h1>{brand.name}</h1>
          <p>
            {brand.tagline}。{brand.forWhom}する方におすすめのブランドです。
          </p>
        </div>
        <span className="giant-monogram">{brand.code}</span>
      </section>

      <div className="brand-tabs" aria-label="ブランドを切り替える">
        {brands.map((item) => (
          <button
            key={item.name}
            className={item.name === brand.name ? "is-active" : ""}
            onClick={() => onBrand(item.name)}
          >
            {item.name}
          </button>
        ))}
      </div>

      <section className="section model-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LINE UP</p>
            <h2>代表モデル</h2>
          </div>
        </div>
        <div className="model-grid">
          {models.map((model, index) => (
            <article className="model-card" key={`${model.id}-${index}`}>
              <div className="model-image">
                <img src={model.image} alt={`${model.name}の参考イメージ`} />
              </div>
              <div className="model-content">
                <p className="model-brand">{model.brand}</p>
                <h3>{model.name}</h3>
                <p>{model.feature}</p>
                <dl className="model-specs">
                  <div>
                    <dt>価格</dt>
                    <dd>{model.price}</dd>
                  </div>
                  <div>
                    <dt>重量</dt>
                    <dd>{model.weight}</dd>
                  </div>
                </dl>
                <p className="best-for">
                  <span>おすすめ</span>
                  {model.use}
                </p>
                <button
                  className={
                    selectedIds.includes(model.id)
                      ? "compare-toggle is-selected"
                      : "compare-toggle"
                  }
                  onClick={() => onToggle(model.id)}
                >
                  <span>
                    {selectedIds.includes(model.id) ? <CheckIcon /> : "+"}
                  </span>
                  {selectedIds.includes(model.id)
                    ? "比較リストに追加済み"
                    : "比較リストに追加"}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="model-utility-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MODEL CHECK</p>
            <h2>メリット・デメリット比較表</h2>
          </div>
          <p>
            「良い所」と「気になるところ」を並べて、選ぶ基準に迷いが出にくくします。
          </p>
        </div>
        <div className="table-wrap model-detail-table-wrap">
          <table className="detail-table">
            <thead>
              <tr>
                <th>モデル</th>
                <th>メリット</th>
                <th>デメリット</th>
                <th>向く目的</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id}>
                  <td>
                    <strong>{model.name}</strong>
                    <small>{model.brand}</small>
                  </td>
                  <td>{model.pros.join(" / ")}</td>
                  <td>{model.cons.join(" / ")}</td>
                  <td>{model.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="purpose-section">
        <div className="section-heading compact-heading">
          <div>
            <p className="eyebrow">PURPOSE RATING</p>
            <h2>用途別評価</h2>
          </div>
          <p>家族の使い方ごとに、「どこが強いか」を見比べやすくしています。</p>
        </div>
        <div className="table-wrap purpose-table-wrap">
          <table className="purpose-table">
            <thead>
              <tr>
                <th>モデル</th>
                {criteria.map((criterion) => (
                  <th key={criterion}>{criterion}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id}>
                  <td>
                    <strong>{model.name}</strong>
                    <small>{model.feature}</small>
                  </td>
                  {criteria.map((criterion, index) => (
                    <td key={`${model.id}-${criterion}`}>
                      <span className={`rating rating-${model.ratings[index]}`}>
                        {model.ratings[index]}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="brand-points">
        <div>
          <p className="eyebrow">WHY {brand.name.toUpperCase()}</p>
          <h2>{brand.name}の特徴</h2>
        </div>
        <div className="point-list">
          <div>
            <span>01</span>
            <p>
              <strong>毎日の使いやすさ</strong>
              操作性と快適性のバランスを大切にした設計。
            </p>
          </div>
          <div>
            <span>02</span>
            <p>
              <strong>赤ちゃん目線の工夫</strong>
              移動中の振動や日差しに配慮した快適装備。
            </p>
          </div>
          <div>
            <span>03</span>
            <p>
              <strong>選べるラインアップ</strong>
              軽量モデルから上位モデルまで暮らしに合わせて選択。
            </p>
          </div>
        </div>
      </section>

      <div className="floating-compare">
        <div>
          <span>{selectedIds.length}</span>
          <p>
            <strong>モデルを選択中</strong>最大4台まで比較できます
          </p>
        </div>
        <button className="primary-button" onClick={onCompare}>
          比較表を見る <ArrowIcon />
        </button>
      </div>
    </>
  );
}

function ComparePage({
  models,
  onRemove,
  onAdd,
}: {
  models: Model[];
  onRemove: (id: string) => void;
  onAdd: () => void;
}) {
  return (
    <>
      <section className="compare-hero">
        <p className="eyebrow">PURPOSE COMPARISON</p>
        <h1>
          選んだモデルを、
          <br />
          目的別に比べる
        </h1>
        <p>スペックだけでは見えにくい違いを、6つの視点から整理しました。</p>
      </section>

      <section className="compare-content">
        <div className="selected-models">
          {models.map((model) => (
            <article key={model.id}>
              <div>
                <img src={model.image} alt="" />
              </div>
              <p>{model.brand}</p>
              <h3>{model.name}</h3>
              <span>
                {model.weight} / {model.price}
              </span>
              <button
                onClick={() => onRemove(model.id)}
                aria-label={`${model.name}を比較から外す`}
              >
                ×
              </button>
            </article>
          ))}
          {models.length < 4 && (
            <button className="add-model" onClick={onAdd}>
              <span>＋</span>
              モデルを追加
            </button>
          )}
        </div>

        {models.length ? (
          <>
            <div className="rating-legend">
              <span>
                <b className="rank-best">◎</b>とても良い
              </span>
              <span>
                <b>○</b>良い
              </span>
              <span>
                <b>△</b>やや不向き
              </span>
              <span>
                <b>×</b>非対応
              </span>
            </div>
            <div className="rating-table-wrap">
              <table className="rating-table">
                <thead>
                  <tr>
                    <th>比較ポイント</th>
                    {models.map((model) => (
                      <th key={model.id}>{model.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion, index) => (
                    <tr key={criterion}>
                      <th>
                        {String(index + 1).padStart(2, "0")}
                        <strong>{criterion}</strong>
                      </th>
                      {models.map((model) => (
                        <td key={model.id}>
                          <span
                            className={`rating rating-${model.ratings[index]}`}
                          >
                            {model.ratings[index]}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="purpose-section">
              <div className="section-heading compact-heading">
                <div>
                  <p className="eyebrow">PURPOSE MATRIX</p>
                  <h2>目的別評価表</h2>
                </div>
              </div>
              <div className="table-wrap purpose-table-wrap">
                <table className="purpose-table">
                  <thead>
                    <tr>
                      <th>目的</th>
                      <th>強いモデル</th>
                      <th>理由</th>
                    </tr>
                  </thead>
                  <tbody>
                    {purposeMatrix.map((item) => (
                      <tr key={item.purpose}>
                        <td>{item.purpose}</td>
                        <td>{item.strongest}</td>
                        <td>{item.reason}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="verdict-grid">
              {models.map((model) => (
                <article key={model.id}>
                  <p>{model.brand}</p>
                  <h3>{model.name}</h3>
                  <div className="merit">
                    <strong>GOOD</strong>
                    {model.pros.map((item) => (
                      <span key={item}>
                        <CheckIcon />
                        {item}
                      </span>
                    ))}
                  </div>
                  <div className="demerit">
                    <strong>CHECK</strong>
                    {model.cons.map((item) => (
                      <span key={item}>— {item}</span>
                    ))}
                  </div>
                  <p className="recommendation">
                    家族メモ
                    <br />
                    <b>{model.use}</b>
                  </p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h2>比較するモデルを選びましょう</h2>
            <p>ブランドページから最大4台まで追加できます。</p>
            <button className="primary-button" onClick={onAdd}>
              モデルを探す <ArrowIcon />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
