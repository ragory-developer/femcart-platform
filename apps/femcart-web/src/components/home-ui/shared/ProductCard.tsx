"use client";

import React, { useState } from 'react';
import { Heart, Check, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface ProductType {
  id: number | string;
  brand: string | { name: string; [key: string]: any };
  name: string;
  price: string;
  oldPrice?: string;
  img1: string;
  img2?: string;
  badge?: string;
  rating: number;
  reviews: number;
  sale?: boolean;
}

interface ProductCardProps {
  product: ProductType;
}

export function ProductCard({ product }: ProductCardProps) {
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAdding(true);
    setTimeout(() => {
      setAdding(false);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }, 800);
  };

  return (
    <Link 
      href={`/product/${product.id}`}
      className="group flex flex-col transition-all duration-300 hover:-translate-y-1 relative focus-within:ring-2 focus-within:ring-pink-500/50"
    >
      {product.badge && (
        <div className={`absolute top-3 left-3 px-2 py-1 rounded-[8px] text-[12px] font-semibold z-10 shadow-sm ${product.badge === 'New' ? 'bg-white text-pink-500' : 'bg-amber-700 text-white'}`}>
          {product.badge}
        </div>
      )}
      
      <button 
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setWishlist(!wishlist); }}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm border-none rounded-full w-8 h-8 flex items-center justify-center cursor-pointer shadow-sm transition-transform duration-300 hover:scale-110 active:scale-95"
        aria-label="Add to wishlist"
      >
        <Heart size={16} className={`${wishlist ? 'fill-pink-500 text-pink-500' : 'text-pink-500'}`} />
      </button>

      <div className="aspect-[4/5] relative overflow-hidden mb-4 bg-[#F8F8F8] rounded-md">
        <img 
          src={product.img1} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${product.img2 ? 'group-hover:opacity-0' : ''}`} 
        />
        {product.img2 && (
          <img 
            src={product.img2} 
            alt={`${product.name} detail`} 
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-2 md:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-150 flex justify-center">
          <button 
            onClick={handleQuickAdd} 
            disabled={adding || added}
            className="inline-flex items-center justify-center rounded-full font-sans font-semibold tracking-[0.3px] transition-all duration-150 cursor-pointer bg-white text-pink-500 border-[1.5px] border-pink-500 w-full max-w-[200px] h-9 md:h-10 text-[12px] md:text-[14px] px-2 md:px-4 disabled:opacity-80"
          >
            {adding ? <><Loader2 size={14} className="mr-2 animate-spin" /> Adding...</> : 
             added ? <><Check size={14} className="mr-2" /> Added</> : 
             'Quick Add'}
          </button>
        </div>
      </div>
      
      <div className="px-1 pb-2 flex flex-col flex-grow items-center text-center">
        <div className="text-gray-500 text-[10px] md:text-[11px] uppercase tracking-wider font-semibold mb-1">
          {typeof product.brand === 'string' ? product.brand : product.brand?.name || 'Femcart'}
        </div>
        <div className="font-medium text-[13px] md:text-[14px] text-gray-900 mb-2 line-clamp-2 leading-snug">{product.name}</div>
        <div className="flex items-center gap-2 mb-1 md:mb-2 justify-center">
          <span className="text-gray-900 font-semibold tabular-nums text-[13px] md:text-[14px]">{product.price}</span>
          {product.oldPrice && <span className="text-gray-400 line-through text-[12px] md:text-[13px]">{product.oldPrice}</span>}
        </div>
        <div className="text-amber-700 text-[11px] md:text-[13px] flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-amber-500' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span>({product.reviews})</span>
        </div>
      </div>
    </Link>
  );
}
