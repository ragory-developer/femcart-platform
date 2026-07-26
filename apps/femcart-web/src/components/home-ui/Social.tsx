"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const socials = [
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400&auto=format&fit=crop',
];

export default function Social() {
  return (
    <section className="mb-4 md:mb-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6 text-center mb-10">
        <h2 className="text-[26px] md:text-[36px] mb-2">Join the Community</h2>
        <a href="https://instagram.com/femcart.bd" target="_blank" rel="noopener noreferrer" className="text-pink-500 font-medium hover:underline">@femcart.bd</a>
      </div>
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={8}
        slidesPerView={2.2}
        freeMode={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3.5, spaceBetween: 12 },
          1024: { slidesPerView: 5.5, spaceBetween: 16 },
        }}
        className="px-4 md:px-0"
      >
        {socials.map((src, i) => (
          <SwiperSlide key={i}>
            <a href="https://instagram.com/femcart.bd" target="_blank" rel="noopener noreferrer" className="group relative block aspect-square rounded-[16px] overflow-hidden">
              <img src={src} alt="Instagram community post" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="text-white font-medium flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  1.2k
                </span>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

