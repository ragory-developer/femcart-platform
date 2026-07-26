"use client";
import React from 'react';

export default function Newsletter() {
  return (
    <section className="bg-rose-50 py-6 md:py-16 mb-4 md:mb-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 max-w-2xl text-center">
        <h2 className="font-serif text-[32px] md:text-[40px] mb-2 md:mb-4">Get 10% Off Your First Order</h2>
        <p className="text-[13px] md:text-[15px] leading-snug md:leading-normal text-text-amber-700 mb-6 md:mb-8">Join the community for early access to sales, new arrivals, and exclusive offers.</p>
        
        <form className="flex flex-col md:flex-row gap-4 justify-center" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="h-12 px-6 rounded-full border border-orange-200 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 bg-white flex-grow max-w-[400px] text-[15px]"
            required
          />
          <button type="submit" className="inline-flex items-center justify-center h-12 px-6 rounded-full font-sans font-semibold text-[15px] tracking-[0.3px] transition-all duration-150 cursor-pointer bg-pink-500 text-white hover:bg-pink-600 active:scale-[0.98] whitespace-nowrap">Subscribe</button>
        </form>
        <p className="text-[12px] text-text-amber-700 mt-4">By subscribing, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </section>
  );
}

