// app/homepage/page.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface SurveyCard {
  id: number;
  title: string;
  date: string;
  coins: number;
  duration: number;
}

const SurveyCard = ({ title, date, coins, duration }: SurveyCard) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 relative">
      <div className="absolute top-2 right-2">
        <button className="text-gray-400 hover:text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start space-x-2">
          <div className="w-8 h-8">
            <div className="w-full h-full bg-orange-200 rounded flex items-center justify-center">
              ✏️
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-sm">{title}</h3>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>期限:{date}</span>
          <span className="bg-orange-100 text-orange-500 px-2 py-1 rounded">NEW!</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">約{duration}分</span>
          <div className="flex items-center space-x-1">
            <span className="text-orange-500">🪙</span>
            <span className="text-sm font-medium">{coins}coin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const surveys: SurveyCard[] = Array(8).fill({
    id: 1,
    title: 'SNSについてのアンケート',
    date: '2024.12.5',
    coins: 16,
    duration: 2,
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-10">
        <div className="max-w-screen-md mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-red-500">ch</span>
            <span className="text-orange-500">o</span>
            <span className="text-blue-500">co</span>
            <span className="text-gray-800">WORK</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-screen-md mx-auto px-4 pt-20 pb-20">
        <div className="grid grid-cols-2 gap-4">
          {surveys.map((survey, index) => (
            <SurveyCard key={index} {...survey} />
          ))}
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center justify-around">
          <button className="text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <button className="text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default HomePage;