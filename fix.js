const fs = require('fs');
const filepath = 'apps/femcart-web/src/app/layout.tsx';
const content = fs.readFileSync(filepath, 'utf8');
const lines = content.split('\n');
const startIdx = lines.findIndex(l => l.includes('let headerCode = ""'));

const newHeader = import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
import { API_URL } from "@/lib/config";
import parse, { attributesToProps, Element, Text } from "html-react-parser";
import type { Metadata } from "next";
import { Outfit, Manrope } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap',
  preload: true
});
const manrope = Manrope({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-manrope",
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  title: "Femcart — Premium Women's Intimate Apparel & Lifestyle E-commerce Platform",
  description: "Femcart is a premium online shopping platform dedicated to women's intimate apparel, shapewear, activewear, and essential lifestyle products.",
  icons: {
    icon: '/icon.png',
  }
};

import NavigationProvider from "@/components/providers/NavigationProvider";
import SettingsProvider from "@/components/providers/SettingsProvider";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import Tracking from "@/components/Tracking";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";

import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
;

fs.writeFileSync(filepath, newHeader + lines.slice(startIdx).join('\n'));
