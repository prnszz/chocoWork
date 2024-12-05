'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Header Component
const Header = ({ 
  title,
  showBackButton,
  onBack 
}: { 
  title: string,
  showBackButton?: boolean,
  onBack?: () => void 
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
      {/* Status Bar */}
      <div className="max-w-screen-md mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <span className="text-sm">9:41</span>
          <div className="flex items-center gap-1">
            <div className="h-4">
              {/* Signal icons */}
            </div>
          </div>
        </div>
      </div>

      {/* Title Bar - 调整高度使其与 homepage 一致 */}
      <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center">
        {showBackButton && (
          <button 
            onClick={onBack}
            className="text-gray-600 mr-2"
          >
            ←
          </button>
        )}
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="/sample-tasks/document.png"
              alt="Coin Icon"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <span className="text-lg text-black">{title}</span>
        </div>
      </div>
    </header>
  );
};

const PersonalPage = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleExchange = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={selectedCrypto ? 'イーサリアムに交換する' : 'coinを交換する！'}
        showBackButton={!!selectedCrypto}
        onBack={() => setSelectedCrypto('')}
      />

      <main className="max-w-screen-md mx-auto px-4 pt-28 pb-24">
        {!selectedCrypto ? (
          <>
            {/* Coin Card */}
            <div className="mb-6">
              <div className="bg-gradient-to-br from-orange-400 to-orange-300 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="relative w-8 h-8">
                    <Image
                      src="/sample-tasks/document.png"
                      alt="Small Coin"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white">©</span>
                  <span className="text-white text-2xl font-semibold">1234 coin</span>
                </div>
                <div className="text-white/80 text-sm">
                  World ID : 12345678101234
                </div>
              </div>
            </div>

            {/* Exchange Options */}
            <div className="space-y-3">
              <button 
                onClick={() => setSelectedCrypto('bitcoin')}
                className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-orange-400 text-2xl">₿</span>
                  <span className="text-gray-700">ビットコインに交換する</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button 
                onClick={() => setSelectedCrypto('ethereum')}
                className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-2xl">Ξ</span>
                  <span className="text-gray-700">イーサリアムに交換する</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button 
                onClick={() => setSelectedCrypto('mercoin')}
                className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="text-red-500 text-2xl">M</span>
                  <span className="text-gray-700">メルコインに交換する</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Current Coin Balance */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-orange-400">©</span>
              <span className="text-orange-400">1234 coin</span>
            </div>

            {/* Exchange Input */}
            <div className="mb-6">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="120"
                className="w-full p-4 border border-gray-200 rounded-xl text-lg"
              />
            </div>

            {/* Exchange Button */}
            <button
              onClick={handleExchange}
              className={`w-full py-4 rounded-xl text-white ${
                inputValue ? 'bg-orange-400' : 'bg-gray-300'
              }`}
            >
              交換する
            </button>
          </>
        )}
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="text-center">
              <div className="mb-4">
                <Image
                  src="/api/placeholder/200/200"
                  alt="Congratulations"
                  width={200}
                  height={200}
                  className="mx-auto"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">交換しました</h3>
              <p className="text-gray-600 mb-6">
                イーサリアムに交換しました。今すぐ、<br />
                chainで確認しましょう！
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setSelectedCrypto('');
                }}
                className="w-full bg-orange-400 text-white py-3 rounded-xl"
              >
                戻る
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center justify-around">
          <Link href="/homepage">
            <button className="text-gray-400 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
              </svg>
            </button>
          </Link>
          <Link href="/exchange">
            <button className="text-orange-500 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default PersonalPage;