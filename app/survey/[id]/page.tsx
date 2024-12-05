// survey/[id]/page.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface DetailProps {
  params: {
    id: string;
  };
}

const SurveyDetailPage = ({ params }: DetailProps) => {
  const router = useRouter();
  
  // 这些数据实际应该从API获取
  const surveyData = {
    id: params.id,
    title: "SNSについてのアンケート",
    company: "株式会社 Takino",
    deadline: "2024.12.5",
    coins: 16,
    content: `あなたがよく使用するSNSについて、お聞きさせていただきます！内容としては、よく使用するSNSとそれを使用する使用する理由についてお聞きいたします。時間は大体2分ほどで完了いたします。

アンケートの回答お待ちしております。`
  };

  const handleStart = () => {
    router.push(`/survey/${params.id}/form`);
  };

  const handleBack = () => {
    router.back();
  };

  const handleFavorite = () => {
    // 处理收藏逻辑
    console.log('Favorite clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={handleBack}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-md mx-auto px-4 pt-24 pb-24">
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Survey Image */}
          <div className="relative h-48 bg-gray-100">
            <Image
              src="/survey-image.jpg"
              alt="Survey"
              fill
              style={{ objectFit: 'cover' }}
            />
            <button 
              onClick={handleFavorite}
              className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          <div className="p-4 space-y-6">
            {/* Title and Company */}
            <div className="space-y-2">
              <h1 className="text-xl font-medium text-gray-900">{surveyData.title}</h1>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-red-500 rounded-full" />
                <span className="text-sm text-gray-600">{surveyData.company}</span>
              </div>
            </div>

            {/* Coins and Duration */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-orange-500">🪙</span>
                <span className="text-xl font-semibold text-gray-900">{surveyData.coins}<span className="text-sm font-normal text-gray-500 ml-0.5">coin</span></span>
              </div>
              <div className="bg-orange-50 text-orange-500 px-3 py-1 rounded-full text-sm">
                約2分
              </div>
            </div>

            {/* Deadline */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">期限:</span>
              <span className="text-sm font-medium text-gray-700">{surveyData.deadline}</span>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h2 className="font-medium text-gray-900">内容</h2>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">{surveyData.content}</p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4">
          <div className="max-w-screen-md mx-auto">
            <button
              onClick={handleStart}
              className="w-full bg-orange-500 text-white rounded-lg py-4 font-medium hover:bg-orange-600 transition-colors"
            >
              アンケートに進む
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SurveyDetailPage;
