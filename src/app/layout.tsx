import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AI 图片生成器",
  description: "使用 AI 技术快速生成高质量图片的创作工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-sky-50/80 via-blue-50/60 to-cyan-50/80 min-h-screen`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
