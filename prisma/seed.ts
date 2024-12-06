import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
 await prisma.survey.createMany({
   data: [
     {
       title: "デジタル決済サービスの利用状況",
       deadline: new Date('2024-12-20'),
       coins: 35,
       duration: 8,
       isActive: true,
       description: "デジタル決済サービスの利用状況に関するアンケートです。キャッシュレス決済の利用頻度、好みの決済方法、利用における課題などについてお聞きします。"
     },
     {
       title: "在宅勤務に関する意識調査",
       deadline: new Date('2024-12-25'), 
       coins: 40,
       duration: 12,
       isActive: true,
       description: "在宅勤務の実態と課題に関する調査です。在宅勤務の頻度、環境整備、生産性、ワークライフバランスへの影響などについてお聞きします。"
     },
     {
       title: "スマートフォンの使用習慣調査",
       deadline: new Date('2024-12-15'),
       coins: 25,
       duration: 5,
       isActive: true,
       description: "スマートフォンの使用実態を把握するための調査です。1日の使用時間、主な用途、依存度、使用による影響などについてお聞きします。"
     },
     {
       title: "フィットネスアプリの利用実態",
       deadline: new Date('2024-12-28'),
       coins: 45,
       duration: 15,
       isActive: true,
       description: "フィットネスアプリの活用状況に関する調査です。利用頻度、効果実感、継続性、改善してほしい機能などについてお聞きします。"
     },
     {
       title: "動画配信サービスの満足度調査",
       deadline: new Date('2024-12-22'),
       coins: 30,
       duration: 10,
       isActive: true,
       description: "動画配信サービスの利用満足度を測る調査です。視聴頻度、コンテンツの質、料金設定、使い勝手などについての評価をお聞きします。"
     },
     {
       title: "SNSの利用頻度と目的調査",
       deadline: new Date('2024-12-18'),
       coins: 20,
       duration: 7,
       isActive: true,
       description: "SNSの利用実態を把握するための調査です。利用するプラットフォーム、使用時間、利用目的、情報発信の頻度などについてお聞きします。"
     },
     {
       title: "食品デリバリーサービスの利用動向",
       deadline: new Date('2024-12-30'),
       coins: 50,
       duration: 18,
       isActive: true,
       description: "フードデリバリーサービスの利用実態調査です。利用頻度、よく注文する料理、サービスの選択基準、満足度などについてお聞きします。"
     },
     {
       title: "電子書籍の読書習慣調査",
       deadline: new Date('2024-12-19'),
       coins: 28,
       duration: 9,
       isActive: true,
       description: "電子書籍の利用状況に関する調査です。読書量、利用デバイス、紙の書籍との使い分け、購入頻度などについてお聞きします。"
     },
     {
       title: "モバイルゲームの利用実態",
       deadline: new Date('2024-12-27'),
       coins: 38,
       duration: 14,
       isActive: true,
       description: "モバイルゲームの利用状況を調査します。プレイ時間、好きなジャンル、課金状況、ゲーム選びの基準などについてお聞きします。"
     },
     {
       title: "オンライン学習サービスの活用状況",
       deadline: new Date('2024-12-24'),
       coins: 42,
       duration: 16,
       isActive: true,
       description: "オンライン学習サービスの利用実態調査です。学習頻度、学習分野、効果実感、サービスの選択基準などについてお聞きします。"
     }
   ]
 })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });