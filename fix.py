import os

filepath = r"d:\Rasel Mahmud Shanto\femmart-platform\apps\femcart-web\src\app\layout.tsx"
with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

start_idx = 0
for i, line in enumerate(lines):
    if 'let headerCode = "";' in line:
        start_idx = i
        break

new_header = """import { fetchWithTimeout } from "@/lib/fetchWithTimeout";
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
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(new_header + "".join(lines[start_idx:]))