// // homepage/page.tsx

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardQuestion, faMoneyBillTransfer } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface Survey {
  id: number;
  title: string;
  company: string;
  deadline: string;
  coins: number;
  content: string;
  duration: number;
}

const SurveyCard = ({ id, title, deadline, coins, duration }: Survey) => {
 const router = useRouter();
 const [isFavorited, setIsFavorited] = useState(false);

 const handleClick = () => {
   router.push(`/survey/${id}`);
 };

 const handleFavorite = async (e: React.MouseEvent) => {
   e.stopPropagation();
   try {
     const res = await fetch(`/api/surveys/${id}/favorite`, {
       method: isFavorited ? 'DELETE' : 'POST',
     });
     if (res.ok) {
       setIsFavorited(!isFavorited);
     }
   } catch (error) {
     console.error('Error toggling favorite:', error);
   }
 };

 const formattedDeadline = new Date(deadline).toLocaleDateString();


 return (
   <div 
     onClick={handleClick}
     className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 relative transition-all duration-200 hover:shadow-md cursor-pointer"
   >
     <button 
       onClick={handleFavorite}
       className={`absolute top-3 right-3 transition-colors ${isFavorited ? 'text-red-400' : 'text-gray-300'}`}  
     >
       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
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
           <span className="text-xs font-medium text-gray-700">{formattedDeadline}</span>
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

const HomePage = () => {
 const router = useRouter();
 const [surveys, setSurveys] = useState<Survey[]>([]);
 const [page, setPage] = useState(1);
 const [loading, setLoading] = useState(false);

 useEffect(() => {
   fetchSurveys();
 }, [page]);

 const fetchSurveys = async () => {
   try {
     setLoading(true);
     const res = await fetch(`/api/surveys?page=${page}&limit=12`);
     const data = await res.json();
     setSurveys(prev => page === 1 ? data : [...prev, ...data]);
   } catch (error) {
     console.error('Error fetching surveys:', error);
   } finally {
     setLoading(false);
   }
 };

 const handleSearch = () => {
   router.push('/search');
 };

 const handleFavorites = () => {
   router.push('/favorites');
 };

 return (
   <div className="min-h-screen bg-gray-50">
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

     <main className="max-w-screen-md mx-auto px-4 pt-24 pb-24">
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
         {surveys.map((survey) => (
           <SurveyCard key={survey.id} {...survey} />
         ))}
       </div>
       {loading && <div className="text-center mt-4">Loading...</div>}
     </main>

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