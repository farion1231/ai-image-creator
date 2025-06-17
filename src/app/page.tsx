"use client";

import { ImageGenerator } from "@/components/ImageGenerator";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
              AI 图片创作器
            </h1>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            使用先进的AI技术，将你的创意转化为精美的图片作品
          </p>
        </div>

        {/* 图片生成器 */}
        <div className="max-w-4xl mx-auto">
          <ImageGenerator />
        </div>
      </div>
    </div>
  );
}
