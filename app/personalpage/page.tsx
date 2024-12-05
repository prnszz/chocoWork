'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons'; // 使用正确的图标库

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
                    <div className="relative w-11 h-12">
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

  const getCryptoName = (crypto: string) => {
    switch(crypto) {
      case 'bitcoin':
        return 'ビットコイン';
      case 'ethereum':
        return 'イーサリアム';
      case 'mercoin':
        return 'メルコイン';
      default:
        return '';
    }
  };

  const handleExchange = () => {
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={selectedCrypto ? `${getCryptoName(selectedCrypto)}に交換する` : 'coinを交換する！'}
        showBackButton={!!selectedCrypto}
        onBack={() => setSelectedCrypto('')}
      />

      <main className="max-w-screen-md mx-auto px-4 pt-28 pb-24">
        {!selectedCrypto ? (
          <>
            <div className="mb-6">
              <div className="bg-gradient-to-br from-orange-400 to-orange-300 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="relative w-20 h-20">
                    <Image
                      src="/logoo.png"
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
                <div className="relative w-6 h-6">
                    <Image
                        src="/Ethereum-icon-purple.png"
                        alt="Ethereum Icon"
                        layout="fill"
                        objectFit="contain"
                    />
                    </div>
                  <span className="text-gray-700">イーサリアムに交換する</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>

              <button 
                onClick={() => setSelectedCrypto('mercoin')}
                className="w-full bg-white rounded-xl p-4 flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-6 h-6">
                    <Image
                      src="/mercoin_logo_bk.png"
                      alt="Mercoin Icon"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <span className="text-gray-700">メルコインに交換する</span>
                </div>
                <span className="text-gray-400">→</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-orange-400">©</span>
              <span className="text-orange-400">1234 coin</span>
            </div>

            <div className="mb-6">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="120"
                className="w-full p-4 border border-gray-200 rounded-xl text-lg text-black"
              />
            </div>

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
                {getCryptoName(selectedCrypto)}に変更しました。さらに、<br />
                chocoWORKで<br />
                ちょこっとワークしよう!
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

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center justify-around">
          <Link href="/homepage">
            <button className="text-gray-400 p-2">
            <FontAwesomeIcon icon={faClipboardQuestion} className="h-6 w-6" />
            </button>
          </Link>
          <Link href="/exchange">
            <button className="text-orange-500 p-2">
            <FontAwesomeIcon icon={faMoneyBillTransfer} className="h-6 w-6" />
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default PersonalPage;