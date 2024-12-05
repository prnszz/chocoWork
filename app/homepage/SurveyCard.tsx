'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SurveyCardProps {
  id: number;
  title: string;
  date: string;
  coins: number;
  duration: number;
  image: string;
}

const SurveyCard = ({ title, date, coins, duration, image }: SurveyCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden relative transition-all duration-200 hover:shadow-md">
      {/* Image Container */}
      <div className="relative h-40 w-full">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
        />
        <button 
          onClick={toggleFavorite}
          className={`absolute top-3 right-3 z-10 transition-colors ${
            isFavorite ? 'text-red-500' : 'text-white hover:text-red-400'
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            fill={isFavorite ? 'currentColor' : 'none'}
            strokeWidth={isFavorite ? '0' : '2'}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
        
        {/* Small red cube icon */}
        <div className="absolute bottom-3 right-3 bg-red-500 w-6 h-6 rounded-sm"></div>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-medium text-gray-800 text-base">{title}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">期限:</span>
            <span className="text-sm text-gray-700">{date}</span>
          </div>
          <span className="text-orange-500 text-sm font-medium">NEW!</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 bg-orange-50 px-3 py-1 rounded-full">約{duration}分</span>
          <div className="flex items-center gap-1">
            <span className="text-orange-500">🪙</span>
            <span className="text-base font-medium text-gray-700">{coins}coin</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyCard;