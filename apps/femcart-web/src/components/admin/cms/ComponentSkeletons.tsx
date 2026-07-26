import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface Props {
  type: string;
  className?: string;
}

export function ComponentSkeleton({ type, className = "" }: Props) {
  switch (type) {
    case 'HeroBanner':
      return (
        <div className={`w-full flex gap-3 p-3 bg-gray-50 dark:bg-gray-900 pointer-events-none rounded-b-lg border-x border-b border-gray-200 dark:border-gray-800 ${className}`}>
          {/* Sidebar Area (22%) */}
          <div className="w-[22%] hidden sm:flex flex-col gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
             <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
             {[...Array(8)].map((_, i) => <div key={i} className="h-2 w-3/4 bg-gray-100 dark:bg-gray-700 rounded"></div>)}
          </div>
          {/* Main Slider Area */}
          <div className="flex-1 aspect-[21/9] bg-gray-200 dark:bg-gray-700 rounded-xl relative overflow-hidden flex items-center shadow-inner border border-gray-300 dark:border-gray-600">
            <div className="absolute left-8 w-1/2 space-y-2">
              <div className="h-2 w-24 bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="h-5 w-full bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="h-6 w-24 bg-gray-500 dark:bg-gray-400 rounded-md mt-4"></div>
            </div>
            <div className="absolute right-8 bottom-4 flex gap-1">
              <div className="w-4 h-1 bg-gray-400 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      );
    case 'TrustBar':
      return (
        <div className={`w-full h-12 bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 flex justify-between items-center px-4 pointer-events-none shadow-sm ${className}`}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center border border-gray-200 dark:border-gray-700"><ImageIcon size={10} /></div>
              <div className="h-1.5 w-16 bg-gray-200 dark:bg-gray-700 rounded hidden sm:block"></div>
            </div>
          ))}
        </div>
      );
    case 'PromoBadgeGrid':
      return (
        <div className={`w-full p-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-gray-50 dark:bg-gray-900 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-3 flex items-start gap-3 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 shrink-0 border border-gray-200 dark:border-gray-600"></div>
              <div className="flex flex-col gap-1 w-full mt-1">
                <div className="h-2 w-3/4 bg-gray-400 dark:bg-gray-500 rounded"></div>
                <div className="h-1.5 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      );
    case 'OfferMarquee':
      return (
        <div className={`w-full h-8 bg-gray-100 dark:bg-gray-800 flex items-center overflow-hidden pointer-events-none border-y border-gray-200 dark:border-gray-700 shadow-inner ${className}`}>
          <div className="flex gap-8 px-4 opacity-50">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-1.5 w-24 bg-gray-300 dark:bg-gray-400 rounded flex-shrink-0"></div>
            ))}
          </div>
        </div>
      );
    case 'ProductShowcase':
    case 'NewArrivalsSection':
      return (
        <div className={`w-full p-4 bg-white dark:bg-gray-900 space-y-4 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          <div className="flex flex-col gap-1 border-b border-gray-100 dark:border-gray-800 pb-2">
            <div className="h-2 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="flex justify-between items-center">
              <div className="h-4 w-40 bg-gray-400 dark:bg-gray-500 rounded"></div>
              <div className="h-2 w-12 bg-gray-300 dark:bg-gray-700 rounded hidden sm:block"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg p-2 flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded mb-2 border border-gray-200 dark:border-gray-600"></div>
                <div className="h-1.5 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="h-1.5 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="mt-auto h-2 w-1/3 bg-gray-400 dark:bg-gray-500 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'ProductTagShowcase':
      return (
        <div className={`w-full p-4 bg-white dark:bg-gray-900 space-y-4 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          <div className="flex flex-col items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-800">
            <div className="h-4 w-40 bg-gray-400 dark:bg-gray-500 rounded"></div>
            <div className="flex gap-2">
               {[1, 2, 3, 4].map(i => <div key={i} className={`h-4 w-16 rounded-full border border-gray-200 dark:border-gray-700 ${i === 1 ? 'bg-gray-400 dark:bg-gray-500' : 'bg-gray-50 dark:bg-gray-800'}`}></div>)}
            </div>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg p-2 flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded mb-2 border border-gray-200 dark:border-gray-600"></div>
                <div className="h-1.5 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="h-1.5 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="mt-auto h-2 w-1/3 bg-gray-400 dark:bg-gray-500 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'TwoImageGridBanner':
      return (
        <div className={`w-full p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white dark:bg-gray-900 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          <div className="aspect-[2/1] bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col justify-center gap-2 border border-gray-200 dark:border-gray-700 shadow-sm">
             <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
             <div className="h-5 w-2/3 bg-gray-400 dark:bg-gray-500 rounded"></div>
          </div>
          <div className="aspect-[2/1] bg-gray-50 dark:bg-gray-800 rounded-xl p-4 flex flex-col justify-center gap-2 border border-gray-200 dark:border-gray-700 shadow-sm">
             <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
             <div className="h-5 w-2/3 bg-gray-400 dark:bg-gray-500 rounded"></div>
          </div>
        </div>
      );
    case 'HotDealsSection':
      return (
        <div className={`w-full p-4 bg-white dark:bg-gray-900 flex gap-4 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          <div className="w-1/4 bg-gray-50 dark:bg-gray-800 rounded-xl hidden sm:flex flex-col p-3 border border-gray-200 dark:border-gray-700 shadow-sm">
             <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
             <div className="mt-auto h-24 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg p-2 flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm">
                 <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded mb-2 border border-gray-200 dark:border-gray-600"></div>
                 <div className="h-1.5 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                 <div className="h-1.5 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                 <div className="mt-auto h-2 w-1/3 bg-gray-400 dark:bg-gray-500 rounded"></div>
              </div>
            ))}
          </div>
          <div className="w-1/4 bg-gray-50 dark:bg-gray-800 rounded-xl hidden sm:flex flex-col p-3 border border-gray-200 dark:border-gray-700 shadow-sm">
             <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
             <div className="mt-auto h-24 w-full bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      );
    case 'BestBuyBanner':
      return (
        <div className={`w-full p-4 bg-gray-50 dark:bg-gray-900 flex gap-4 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          {/* Left Area (Products + Header) */}
          <div className="flex-[4] flex flex-col gap-4">
             {/* Header */}
             <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
               <div className="flex items-center gap-3">
                 <div className="h-5 w-32 bg-gray-400 dark:bg-gray-500 rounded"></div>
                 <div className="flex gap-1">
                   <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded"></div>
                   <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded"></div>
                   <div className="w-6 h-6 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded"></div>
                 </div>
               </div>
               <div className="flex gap-1 hidden sm:flex">
                 {[1,2,3,4].map(i => <div key={i} className={`h-6 w-16 rounded border ${i === 1 ? 'bg-gray-400 border-gray-500' : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'}`}></div>)}
               </div>
             </div>
             {/* Product Grid */}
             <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg p-2 flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm">
                   <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded mb-2 border border-gray-200 dark:border-gray-600"></div>
                   <div className="h-1.5 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                   <div className="h-1.5 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                   <div className="mt-auto h-2 w-1/3 bg-gray-400 dark:bg-gray-500 rounded"></div>
                 </div>
               ))}
             </div>
          </div>
          {/* Right Banner Area */}
          <div className="flex-1 bg-gray-200 dark:bg-gray-800 rounded-xl hidden sm:flex flex-col items-center justify-center border border-gray-300 dark:border-gray-700 shadow-sm">
             <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full mb-2"></div>
             <div className="h-2 w-16 bg-gray-400 dark:bg-gray-500 rounded"></div>
          </div>
        </div>
      );
    case 'WideOverflowBannerSection':
      return (
        <div className={`w-full p-4 pointer-events-none bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800 flex flex-col gap-4 ${className}`}>
          <div className="w-full aspect-[5/1] bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center px-8 justify-between overflow-hidden relative shadow-sm border border-gray-300 dark:border-gray-700">
            <div className="space-y-2 relative z-10">
               <div className="h-2 w-16 bg-gray-400 rounded"></div>
               <div className="h-5 w-48 bg-gray-500 rounded"></div>
               <div className="h-2 w-32 bg-gray-400 rounded"></div>
            </div>
            <div className="w-32 h-32 bg-white/20 dark:bg-gray-600/50 rounded-full absolute right-12 scale-150"></div>
          </div>
          {/* Product Cards Row */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="aspect-[3/4] bg-white dark:bg-gray-800 rounded-lg p-2 flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="w-full aspect-square bg-gray-100 dark:bg-gray-700 rounded mb-2 border border-gray-200 dark:border-gray-600"></div>
                <div className="h-1.5 w-full bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                <div className="h-1.5 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="mt-auto h-2 w-1/3 bg-gray-400 dark:bg-gray-500 rounded mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'BentoBannerGrid':
      return (
        <div className={`w-full p-4 grid grid-cols-4 grid-rows-2 gap-3 h-48 bg-gray-50 dark:bg-gray-900 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          <div className="col-span-2 row-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center"><ImageIcon size={24} className="text-gray-300"/></div>
          <div className="col-span-1 row-span-1 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center"><ImageIcon size={16} className="text-gray-300"/></div>
          <div className="col-span-1 row-span-1 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center"><ImageIcon size={16} className="text-gray-300"/></div>
          <div className="col-span-2 row-span-1 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-center"><ImageIcon size={20} className="text-gray-300"/></div>
        </div>
      );
    case 'ThreeProductBanner':
      return (
        <div className={`w-full p-4 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-gray-900 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          {[1, 2, 3].map(i => (
             <div key={i} className="aspect-[4/5] bg-gray-50 dark:bg-gray-800 rounded-xl flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full mb-4"></div>
                <div className="h-2 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-1.5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
             </div>
          ))}
        </div>
      );
    case 'BrandShowcase':
      return (
        <div className={`w-full p-4 bg-white dark:bg-gray-900 space-y-3 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          <div className="h-4 w-32 bg-gray-400 dark:bg-gray-500 rounded mx-auto mb-2"></div>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
             {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="aspect-[3/2] bg-gray-50 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-sm"><ImageIcon size={12} className="text-gray-300" /></div>)}
          </div>
        </div>
      );
    case 'TestimonialSection':
      return (
        <div className={`w-full p-6 bg-gray-50 dark:bg-gray-900 space-y-6 pointer-events-none border-y border-gray-200 dark:border-gray-800 ${className}`}>
          <div className="flex flex-col items-center gap-1">
             <div className="h-2 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
             <div className="h-5 w-48 bg-gray-400 dark:bg-gray-500 rounded"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
             {[1,2,3].map(i => (
               <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 flex flex-col border border-gray-200 dark:border-gray-700 shadow-sm">
                 <div className="flex gap-1 mb-3">{[1,2,3,4,5].map(s => <div key={s} className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600"></div>)}</div>
                 <div className="space-y-1.5 mb-4">
                   <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                   <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                   <div className="h-1.5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                 </div>
                 <div className="flex items-center gap-2 mt-auto">
                    <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="space-y-1">
                      <div className="h-1.5 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
                      <div className="h-1 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      );
    default:
      return (
        <div className={`w-full h-20 flex flex-col items-center justify-center bg-white dark:bg-gray-800 space-y-2 pointer-events-none rounded-b-lg border-x border-b border-gray-200 dark:border-gray-700 ${className}`}>
           <ImageIcon size={20} className="text-gray-300" />
           <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider">{type}</span>
        </div>
      );
  }
}
