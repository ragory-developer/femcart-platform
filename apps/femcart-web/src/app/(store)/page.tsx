import React from 'react';
import Hero from '@/components/home-ui/Hero';
import TrustStrip from '@/components/home-ui/TrustStrip';
import Categories from '@/components/home-ui/Categories';
import FeaturedProducts from '@/components/home-ui/FeaturedProducts';
import SizeBanner from '@/components/home-ui/SizeBanner';
import BestSellers from '@/components/home-ui/BestSellers';
import NewArrivals from '@/components/home-ui/NewArrivals';
import LimitedOffers from '@/components/home-ui/LimitedOffers';
import Reviews from '@/components/home-ui/Reviews';
import WhyShop from '@/components/home-ui/WhyShop';
import Editorial from '@/components/home-ui/Editorial';
import PreOrder from '@/components/home-ui/PreOrder';
import Social from '@/components/home-ui/Social';
import Newsletter from '@/components/home-ui/Newsletter';
import SeoBlock from '@/components/home-ui/SeoBlock';
import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { API_URL } from "@/lib/config";

async function fetchCategories() {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/categories?limit=12`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

async function fetchProducts(query: string) {
  try {
    const res = await fetchWithTimeout(`${API_URL}/api/products?${query}&card_only=true`, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const [categories, featuredProducts, newArrivals, bestSellers] = await Promise.all([
    fetchCategories(),
    fetchProducts('featured=true&limit=10'),
    fetchProducts('limit=10'), // New arrivals (default sort is createdAt: desc)
    fetchProducts('hasPromotion=true&limit=10') // Best sellers (promoted items)
  ]);
  return (
    <>
      <Hero />
      <TrustStrip />
      <Categories categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <SizeBanner />
      <BestSellers products={bestSellers} />
      <NewArrivals products={newArrivals} />
      <LimitedOffers />
      <Reviews />
      <WhyShop />
      <Editorial />
      <PreOrder />
      <Social />
      <Newsletter />
      <SeoBlock />
    </>
  );
}
