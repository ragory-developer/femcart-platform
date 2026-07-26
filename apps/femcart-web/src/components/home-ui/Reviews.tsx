"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Reviews() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-6 mb-4 md:mb-16">
      {/* Customer Love Banner */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full relative rounded-[24px] overflow-hidden mb-12 min-h-[160px] md:min-h-[200px] flex items-center justify-center text-center px-6 py-8"
      >
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1440&auto=format&fit=crop" alt="Happy Customers" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-pink-600/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 bg-black/20"></div> {/* Extra contrast layer */}
        <div className="relative z-10 w-full max-w-2xl">
          <h2 className="font-serif text-[28px] md:text-[48px] text-white mb-2 md:mb-4 leading-tight shadow-sm">Over 10,000 Happy Women</h2>
          <p className="text-white/95 text-[14px] md:text-[16px] leading-snug md:leading-normal max-w-xl mx-auto font-medium shadow-sm">Join our community and experience the comfort everyone is talking about.</p>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6 md:mb-10"
      >
        <h3 className="text-[26px] md:text-[32px] font-serif mb-2">Real Conversations</h3>
        <p className="text-[15px] text-text-amber-700">What our customers are saying across the country.</p>
      </motion.div>
      
      <div className="flex flex-col md:flex-row justify-center gap-8 items-center md:items-stretch">
        
        {/* Chat Interface 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -50, rotate: -6 }}
          whileInView={{ opacity: 1, x: 0, rotate: -2 }}
          whileHover={{ rotate: 0, zIndex: 10 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="w-full max-w-[320px] bg-white rounded-[24px] shadow-2xl border border-orange-200 overflow-hidden flex flex-col relative"
        >
          <div className="bg-pink-500 text-white p-4 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">N</div>
            <div>
              <div className="text-[14px] font-medium">Nadia I.</div>
              <div className="text-[11px] opacity-80">Active now</div>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4 bg-[#F2E4DC]/30 flex-grow">
            <div className="flex gap-2">
              <div className="bg-white border border-orange-200/50 text-[14px] p-3 rounded-[16px] rounded-tl-sm max-w-[85%] shadow-sm">
                Apu, the bra I ordered is so comfortable! Thank you so much for suggesting the size.
              </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
              <div className="bg-pink-500 text-white text-[14px] p-3 rounded-[16px] rounded-tr-sm max-w-[85%] shadow-sm">
                You're very welcome Nadia! We're glad it fits you perfectly ❤️
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-white border border-orange-200/50 text-[14px] p-3 rounded-[16px] rounded-tl-sm max-w-[85%] shadow-sm">
                I will definitely order again next week. The quality is amazing for this price.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Interface 2 */}
        <motion.div 
          initial={{ opacity: 0, x: 50, rotate: 6 }}
          whileInView={{ opacity: 1, x: 0, rotate: 3 }}
          whileHover={{ rotate: 0, zIndex: 10 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
          className="w-full max-w-[320px] bg-[#1C1C1E] text-white rounded-[24px] shadow-2xl border border-[#333] overflow-hidden flex flex-col relative md:translate-y-6"
        >
          <div className="bg-[#2C2C2E] p-4 flex items-center gap-3 border-b border-[#333]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white">T</div>
            <div>
              <div className="text-[14px] font-medium">Tasnim R.</div>
              <div className="text-[11px] opacity-60">Active 2h ago</div>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-4 bg-[#000] flex-grow">
            <div className="flex gap-2">
              <div className="bg-[#2C2C2E] text-[14px] p-3 rounded-[16px] rounded-tl-sm max-w-[85%]">
                Just received my parcel! The packaging was very discreet, loved that.
              </div>
            </div>
            <div className="flex gap-2 flex-row-reverse">
              <div className="bg-[#0B84FF] text-white text-[14px] p-3 rounded-[16px] rounded-tr-sm max-w-[85%]">
                We always ensure your privacy! How is the product quality?
              </div>
            </div>
            <div className="flex gap-2">
              <div className="bg-[#2C2C2E] text-[14px] p-3 rounded-[16px] rounded-tl-sm max-w-[85%]">
                The fabric feels so premium. Softest sports bra I've ever used 😍
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

