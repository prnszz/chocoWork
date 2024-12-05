// components/LoginFlow/index.tsx
'use client';

import React, { useState } from 'react';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';

const LoginFlow = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [accepted, setAccepted] = useState({
    terms: false,
    privacy: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleWorldIDLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("worldid", {
        callbackUrl: "https://choco-work.vercel.app/homepage",
        redirect: false,
      });
      
      if (result?.error) {
        console.error("Login failed:", result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
        <div className="w-full max-w-md space-y-8 text-center">
          <div className="flex justify-center">
            <div className="w-12 h-12 flex">
              <div className="w-8 h-8 bg-pink-500 rounded-full" />
              <div className="w-8 h-8 bg-lime-500 rounded-full -ml-2" />
              <div className="w-8 h-8 bg-orange-400 rounded-full -ml-2" />
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xl">ようこそ {session.user?.name?.slice(0, 10)}!</p>
            <button
              onClick={() => signOut()}
              className="bg-gray-800 text-white rounded-full py-3 px-6 hover:bg-gray-700 transition-colors"
            >
              ログアウト
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <div className="relative w-32 h-16">
            <div className="flex gap-1">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">★</span>
              </div>
              <div className="w-12 h-12 bg-lime-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">★</span>
              </div>
              <div className="w-12 h-12 bg-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">★</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-3xl font-bold">
          <span className="text-red-500">ch</span>
          <span className="text-orange-500">o</span>
          <span className="text-blue-500">co</span>
          <span className="text-gray-800">WORK</span>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <div className="w-16 h-16">
              <div className="w-full h-full bg-orange-100 rounded-full relative" />
            </div>
            <div className="w-16 h-16">
              <div className="w-full h-full bg-orange-400 rounded-full relative" />
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-12 flex">
              <div className="w-8 h-8 bg-pink-500 rounded-full" />
              <div className="w-8 h-8 bg-lime-500 rounded-full -ml-2" />
              <div className="w-8 h-8 bg-orange-400 rounded-full -ml-2" />
            </div>
            <span className="text-xl italic">welcome!</span>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={accepted.terms}
                onChange={() => setAccepted(prev => ({...prev, terms: !prev.terms}))}
                className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-600">利用規約に同意します</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={accepted.privacy}
                onChange={() => setAccepted(prev => ({...prev, privacy: !prev.privacy}))}
                className="w-5 h-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              />
              <span className="text-sm text-gray-600">以下の内容を確認します</span>
            </label>

            <div className="text-xs text-orange-500 space-x-2">
              <a href="#" className="underline">利用規約</a>
              <span style={{ color: 'black' }}>|</span>
              <a href="#" className="underline">プライバシーポリシー</a>
            </div>
          </div>

          <button
            onClick={handleWorldIDLogin}
            disabled={!accepted.terms || !accepted.privacy || isLoading}
            className={`w-full mt-6 py-3 px-4 rounded-lg text-white ${
              accepted.terms && accepted.privacy && !isLoading
                ? 'bg-orange-500 hover:bg-orange-600'
                : 'bg-gray-300 cursor-not-allowed'
            } transition-colors flex items-center justify-center gap-2`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto" />
            ) : (
              <>
                <span className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-gray-800">S</span>
                </span>
                内容に同意して World ID でログイン
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginFlow;