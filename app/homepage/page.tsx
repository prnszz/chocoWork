// homepage/page.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'; // 使用正确的图标库
import Link from 'next/link';

interface SurveyCard {
  id: number;
  title: string;
  date: string;
  coins: number;
  duration: number;
}

const SurveyCard = ({ id, title, date, coins, duration }: SurveyCard) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/survey/${id}`);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // 防止触发卡片的点击事件
    // 处理收藏逻辑
    console.log('Favorite clicked for survey:', id);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative transition-all duration-200 hover:shadow-md cursor-pointer"
    >
      <button 
        onClick={handleFavorite}
        className="absolute top-3 right-3 text-gray-300 hover:text-red-400 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>
      
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">✏️</span>
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-800 text-sm leading-5 line-clamp-2">{title}</h3>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">期限:</span>
            <span className="text-xs font-medium text-gray-700">{date}</span>
          </div>
          <span className="bg-gradient-to-r from-orange-50 to-orange-100 text-orange-500 px-2 py-1 rounded-full text-xs font-medium">NEW!</span>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">約{duration}分</span>
          <div className="flex items-center gap-1.5">
            <span className="text-orange-500">🪙</span>
            <span className="text-sm font-semibold text-gray-700">{coins}<span className="text-xs font-normal text-gray-500 ml-0.5">coin</span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

const surveyTitles = [
  "SNSについてのアンケート",
  "オンラインショッピングの利用実態調査",
  "食生活に関する意識調査",
  "働き方の満足度調査",
  "デジタルサービスの使用頻度調査",
  "ライフスタイルに関する調査",
  "通勤・通学に関するアンケート",
  "趣味や娯楽に関する調査",
  "環境問題への意識調査",
  "健康管理に関するアンケート"
];

const HomePage = () => {
  const router = useRouter();
  
  const surveys: SurveyCard[] = Array(12).fill(null).map((_, index) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + Math.floor(Math.random() * 14));
    
    return {
      id: index + 1,
      title: surveyTitles[Math.floor(Math.random() * surveyTitles.length)],
      date: `${futureDate.getFullYear()}.${String(futureDate.getMonth() + 1).padStart(2, '0')}.${String(futureDate.getDate()).padStart(2, '0')}`,
      coins: Math.floor(Math.random() * 45) + 5,
      duration: Math.floor(Math.random() * 15) + 1,
    };
  });

  const handleSearch = () => {
    console.log('Search clicked');
    // 实现搜索功能
  };

  const handleFavorites = () => {
    console.log('Favorites clicked');
    // 实现收藏夹功能
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center justify-between">
          <div className="relative h-20 w-32">
            <Image
              src="/logo.png"
              alt="chocoWORK Logo"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleFavorites}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button 
              onClick={handleSearch}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-md mx-auto px-4 pt-24 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {surveys.map((survey) => (
            <SurveyCard key={survey.id} {...survey} />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center justify-around">
          <button className="text-orange-500 p-2">
          <FontAwesomeIcon icon={faClipboardQuestion} className="h-6 w-6" />
          </button>
          <Link href="/personalpage">
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
        <FontAwesomeIcon icon={faMoneyBillTransfer} className="h-6 w-6" />
        </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;