// prisma/seed.ts
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
       isActive: true
     },
     {
       title: "在宅勤務に関する意識調査",
       deadline: new Date('2024-12-25'), 
       coins: 40,
       duration: 12,
       isActive: true
     },
     {
       title: "スマートフォンの使用習慣調査",
       deadline: new Date('2024-12-15'),
       coins: 25,
       duration: 5,
       isActive: true
     },
     {
       title: "フィットネスアプリの利用実態",
       deadline: new Date('2024-12-28'),
       coins: 45,
       duration: 15,
       isActive: true
     },
     {
       title: "動画配信サービスの満足度調査",
       deadline: new Date('2024-12-22'),
       coins: 30,
       duration: 10,
       isActive: true
     },
     {
       title: "SNSの利用頻度と目的調査",
       deadline: new Date('2024-12-18'),
       coins: 20,
       duration: 7,
       isActive: true
     },
     {
       title: "食品デリバリーサービスの利用動向",
       deadline: new Date('2024-12-30'),
       coins: 50,
       duration: 18,
       isActive: true
     },
     {
       title: "電子書籍の読書習慣調査",
       deadline: new Date('2024-12-19'),
       coins: 28,
       duration: 9,
       isActive: true
     },
     {
       title: "モバイルゲームの利用実態",
       deadline: new Date('2024-12-27'),
       coins: 38,
       duration: 14,
       isActive: true
     },
     {
       title: "オンライン学習サービスの活用状況",
       deadline: new Date('2024-12-24'),
       coins: 42,
       duration: 16,
       isActive: true
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