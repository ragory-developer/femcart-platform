"use client";

import React from 'react';
import { ProductCard } from './shared/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

const preOrders = [
  { id: 13, brand: 'Femcart Lab', name: 'Zero-Gravity Support Bra', price: 'Tk 3,650 BDT', img1: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=600&auto=format&fit=crop', badge: 'Pre-order', rating: 0, reviews: 0 },
  { id: 14, brand: 'Femcart Lab', name: 'Invisible Shapewear Short', price: 'Tk 3,200 BDT', img1: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop', badge: 'Pre-order', rating: 0, reviews: 0 },
  { id: 15, brand: 'Femcart Lab', name: 'Thermal Knit Bralette', price: 'Tk 3,950 BDT', img1: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop', badge: 'Pre-order', rating: 0, reviews: 0 },
  { id: 16, brand: 'Femcart Lab', name: 'Posture Correcting Top', price: 'Tk 3,100 BDT', img1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop', badge: 'Pre-order', rating: 0, reviews: 0 },
  { id: 17, brand: 'Femcart Lab', name: 'Seamless Silk Thong', price: 'Tk 1,650 BDT', img1: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=600&auto=format&fit=crop', badge: 'Pre-order', rating: 0, reviews: 0 },
  { id: 18, brand: 'Femcart Lab', name: 'Maternity Support Bra', price: 'Tk 2,850 BDT', img1: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop', badge: 'Pre-order', rating: 0, reviews: 0 }
];

export default function PreOrder() {
  return (
    <section className="bg-rose-50 py-6 md:py-16 mb-4 md:mb-16">
      <div className="max-w-[1440px] mx-auto px-4 md:px-6">
        <div className="text-center mb-6 md:mb-10 max-w-2xl mx-auto">
          <h2 className="text-[26px] md:text-[36px] mb-2 md:mb-4">Pre-order Collection</h2>
          <p className="text-[13px] md:text-[16px] leading-snug md:leading-normal text-amber-700">Reserve our upcoming innovations before they sell out. Ships October 15th.</p>
        </div>
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={4}
          slidesPerView={2.2}
          freeMode={true}
          autoplay={{ delay: 4500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 12 },
            1024: { slidesPerView: 4, spaceBetween: 16 },
            1280: { slidesPerView: 5, spaceBetween: 16 },
          }}
          className="!pt-4 !px-1 !pb-4"
        >
          {preOrders.map(p => (
            <SwiperSlide key={p.id}>
              <ProductCard product={p} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
