'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Survey {
  id: string;
  coins: number;
  // add other survey fields as needed
}

const SurveyFormPage = () => {
  const router = useRouter();
  const [surveyData, setSurveyData] = useState<Survey | null>(null);
  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    instagram: '',
    comments: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const fetchSurveyData = async () => {
    try {
      // Assuming you're getting the survey ID from the URL
      const surveyId = window.location.pathname.split('/')[2];
      const res = await fetch(`/api/surveys/${surveyId}`);
      const data = await res.json();
      setSurveyData(data);
    } catch (error) {
      console.error('Error fetching survey:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="max-w-screen-md mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={() => router.back()} 
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
        {!isSubmitted ? (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 space-y-6">
              {/* Form fields remain the same */}
              <div className="space-y-2">
                <label className="block text-sm text-gray-700">年代</label>
                <select 
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">年代を選択してください</option>
                  <option value="20代">20代</option>
                  <option value="30代">30代</option>
                  <option value="40代">40代</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">性別</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">性別を選択してください</option>
                  <option value="男性">男性</option>
                  <option value="女性">女性</option>
                  <option value="その他">その他</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">SNSについて教えてください</label>
                <input
                  type="text"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleInputChange}
                  placeholder="インスタ"
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm text-gray-700">その他コメント</label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-orange-500 text-white rounded-lg py-3 font-medium hover:bg-orange-600 transition-colors"
            >
              送信
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl p-8 text-center space-y-0">
            <div className="relative w-32 h-32 mx-auto" style={{ marginBottom: '-8px' }}>
              <Image
                src="/Congratulations.png"
                alt="New Image"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="relative w-32 h-32 mx-auto">
              <Image
                src="/talk_people.png"
                alt="Completion"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-medium text-gray-800" style={{ marginTop: '16px' }}>ありがとうございました！</h2>
              <p className="text-sm text-gray-500">{surveyData?.coins}コインを獲得しました</p>
            </div>
            <button
              onClick={() => router.push('/homepage')}
              className="w-full bg-orange-500 text-white rounded-lg py-3 font-medium hover:bg-orange-600 transition-colors"
            >
              ホームに戻る
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default SurveyFormPage;