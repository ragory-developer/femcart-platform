"use client";

import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, X, Menu, ChevronDown, Phone, Mail } from 'lucide-react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import 'lenis/dist/lenis.css';
import { useGlobalSearchStore } from '@/store/globalSearchStore';
import { useCartStore } from '@/store/cartStore';
import GlobalSearch from '@/components/search/GlobalSearch';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const openSearch = useGlobalSearchStore(state => state.openSearch);
  const openCart = useCartStore(state => state.openCart);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      lenis.destroy();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB]">
      {/* Top Bar */}
      <div className="bg-[#E32857] text-white h-9 flex items-center justify-center text-[13px] font-medium tracking-wide">
        Buy 3-Pack, Save 300 TK!
      </div>

      {/* Navigation */}
      <nav className={`sticky top-0 bg-white/95 backdrop-blur-md border-b border-pink-100 z-[90] transition-all duration-300 flex items-center ${scrolled ? 'h-16 shadow-sm' : 'h-[72px]'}`}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 w-full flex justify-between items-center">
          
          {/* Logo (Left) */}
          <div className="flex items-center justify-start flex-shrink-0">
            <button 
              className="lg:hidden p-2 mr-2 text-text-pink-500 hover:text-pink-500 transition-colors"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
            <a href="/" className="relative flex flex-col items-center justify-center font-bold text-[26px] text-[#E32857]" style={{ letterSpacing: '-0.5px' }}>
              <svg className="absolute -top-[14px]" width="30" height="18" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 15L3 7L10 10L16 2L22 10L29 7L27 15H5Z" fill="#E32857"/>
                <circle cx="3" cy="5" r="2" fill="#E32857"/>
                <circle cx="10" cy="8" r="2" fill="#E32857"/>
                <circle cx="16" cy="0" r="2" fill="#E32857"/>
                <circle cx="22" cy="8" r="2" fill="#E32857"/>
                <circle cx="29" cy="5" r="2" fill="#E32857"/>
              </svg>
              <span className="leading-none mt-1">Femcart</span>
            </a>
          </div>

          {/* Navigation Links (Center) */}
          <ul className="hidden lg:flex flex-1 justify-center gap-8 xl:gap-10 list-none items-center text-gray-800 text-[14px] font-medium whitespace-nowrap px-4">
            <li>
              <Link href="/" className={`relative transition-colors pb-[2px] ${pathname === '/' ? 'text-[#E32857]' : 'hover:text-[#E32857]'}`}>
                Home
                {pathname === '/' && <span className="absolute -bottom-[2px] left-0 w-full h-[1.5px] bg-[#E32857]"></span>}
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={`relative transition-colors pb-[2px] ${pathname === '/catalog' ? 'text-[#E32857]' : 'hover:text-[#E32857]'}`}>
                Catalog
                {pathname === '/catalog' && <span className="absolute -bottom-[2px] left-0 w-full h-[1.5px] bg-[#E32857]"></span>}
              </Link>
            </li>
            <li><Link href="/categories/shapewear" className="hover:text-[#E32857] transition-colors py-2 block">Shapewear</Link></li>
            
            {/* Bras Dropdown */}
            <li className="relative group flex items-center gap-1 cursor-pointer transition-colors py-4">
              <span className="hover:text-[#E32857] transition-colors">Bras</span> <ChevronDown size={14} strokeWidth={2.5} />
              <div className="absolute top-full left-0 hidden group-hover:block z-50 -mt-2 pt-2">
                <ul className="bg-white border border-gray-100 shadow-xl py-3 min-w-[220px] flex flex-col font-normal text-[14.5px] text-gray-800">
                  <li><Link href="/categories/push-up-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Push Up Bra</Link></li>
                  <li><Link href="/categories/nursing-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Nursing Bra</Link></li>
                  <li><Link href="/categories/strapless-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Strapless Bra</Link></li>
                  <li><Link href="/categories/sports-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Sports Bra</Link></li>
                  <li><Link href="/categories/wireless-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Wireless Bra</Link></li>
                  <li><Link href="/categories/seamless-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Seamless Bra</Link></li>
                </ul>
              </div>
            </li>

            {/* Panty Dropdown */}
            <li className="relative group flex items-center gap-1 cursor-pointer transition-colors py-4">
              <span className="hover:text-[#E32857] transition-colors">Panty</span> <ChevronDown size={14} strokeWidth={2.5} />
              <div className="absolute top-full left-0 hidden group-hover:block z-50 -mt-2 pt-2">
                <ul className="bg-white border border-gray-100 shadow-xl py-3 min-w-[220px] flex flex-col font-normal text-[14.5px] text-gray-800">
                  <li><Link href="/categories/seamless-panty" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Seamless Panty</Link></li>
                  <li><Link href="/categories/cotton-panty" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Cotton Panty</Link></li>
                  <li><Link href="/categories/shaping-panty" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Shaping Panty</Link></li>
                  <li><Link href="/categories/period-panty" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Period Panty</Link></li>
                </ul>
              </div>
            </li>

            <li><Link href="/categories/bodysuit" className="hover:text-[#E32857] transition-colors py-2 block">Bodysuit</Link></li>

            {/* Teenage Bras Dropdown */}
            <li className="relative group flex items-center gap-1 cursor-pointer transition-colors py-4">
              <span className="hover:text-[#E32857] transition-colors">Teenage Bras</span> <ChevronDown size={14} strokeWidth={2.5} />
              <div className="absolute top-full left-0 hidden group-hover:block z-50 -mt-2 pt-2">
                <ul className="bg-white border border-gray-100 shadow-xl py-3 min-w-[220px] flex flex-col font-normal text-[14.5px] text-gray-800">
                  <li><Link href="/categories/training-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Training Bra</Link></li>
                  <li><Link href="/categories/cotton-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Cotton Bra</Link></li>
                  <li><Link href="/categories/non-padded-bra" className="block px-6 py-2.5 hover:bg-rose-50 hover:text-[#E32857] transition-colors">Non-Padded Bra</Link></li>
                </ul>
              </div>
            </li>
          </ul>

          {/* Icons (Right) */}
          <div className="flex gap-5 items-center justify-end flex-shrink-0 ml-auto">
            <button onClick={openSearch} className="text-[#333333] hover:text-[#E32857] transition-colors">
              <Search size={21} strokeWidth={1.25} />
            </button>
            <Link href="/profile" className="text-[#333333] hover:text-[#E32857] transition-colors">
              <User size={21} strokeWidth={1.25} />
            </Link>
            <button onClick={openCart} className="relative text-[#333333] hover:text-[#E32857] transition-colors">
              <ShoppingBag size={21} strokeWidth={1.25} />
            </button>
          </div>
          
        </div>
      </nav>

      <GlobalSearch />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-[95] lg:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-[300px] bg-white z-[100] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-orange-200">
                <div className="font-serif text-[20px] tracking-wider font-semibold text-pink-500">Femecart</div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-text-amber-700 hover:text-pink-500 transition-colors"
                >
                  <X size={20} strokeWidth={2} />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-6 overflow-y-auto">
                <Link href="/categories/bras" className="text-[18px] font-medium text-text-pink-500 hover:text-pink-500 transition-colors">Bras</Link>
                <Link href="/categories/panties" className="text-[18px] font-medium text-text-pink-500 hover:text-pink-500 transition-colors">Panty</Link>
                <Link href="/categories/everyday" className="text-[18px] font-medium text-text-pink-500 hover:text-pink-500 transition-colors">Everyday</Link>
                <Link href="/categories/lounge" className="text-[18px] font-medium text-text-pink-500 hover:text-pink-500 transition-colors">Lounge</Link>
                <Link href="/catalog" className="text-[18px] font-medium text-pink-500 transition-colors">New In</Link>
                <Link href="/catalog?sale=true" className="text-[18px] font-medium text-red-500 hover:text-red-600 transition-colors">Sale</Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white pt-10 md:pt-16 pb-8 border-t border-orange-200 mt-8 md:mt-20">
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 grid grid-cols-2 md:flex md:flex-row gap-y-10 gap-x-4 md:gap-12 justify-between">
          <div className="col-span-2 md:col-auto md:w-1/3">
            <a href="/" className="font-serif font-semibold text-pink-500 text-[32px] inline-block mb-4">Femecart</a>
            <p className="text-text-amber-700 text-[14px] mb-4">Providing comfortable bras and panties to women across Bangladesh.</p>
            <p className="text-text-pink-500 text-[14px] font-medium flex items-center gap-2">
              <Phone size={16} className="text-pink-500" strokeWidth={2} /> +880 1812 345678
            </p>
            <p className="text-text-pink-500 text-[14px] font-medium flex items-center gap-2 mt-2">
              <Mail size={16} className="text-pink-500" strokeWidth={2} /> support@femecart.com
            </p>
          </div>
          <div className="col-span-1 md:col-auto md:w-1/4">
            <h4 className="font-serif text-[16px] md:text-[18px] mb-3 md:mb-4">Customer Care</h4>
            <ul className="flex flex-col gap-2 md:gap-3 text-text-amber-700 text-[13px] md:text-[14px]">
              <li><Link href="/about" className="hover:text-pink-500">About Us</Link></li>
              <li><Link href="/track-order" className="hover:text-pink-500">Track Order</Link></li>
              <li><Link href="/faq" className="hover:text-pink-500">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-pink-500">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#111111] mb-6 text-[15px]">Policies</h4>
            <ul className="space-y-4 text-[#666666] text-[14px]">
              <li><Link href="/return-policy" className="hover:text-pink-500">Shipping & Returns</Link></li>
              <li><Link href="/terms" className="hover:text-pink-500">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-pink-500">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 md:px-6 border-t border-orange-200 mt-10 md:mt-12 pt-6 flex flex-col items-center justify-center text-text-amber-700 text-[13px] gap-2">
          <div className="flex gap-4 items-center">
            <span className="font-semibold text-text-pink-500">We Accept:</span> bKash • Nagad • COD • Cards
          </div>
          <p>&copy; {new Date().getFullYear()} Femecart. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
