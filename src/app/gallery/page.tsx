"use client";

import { ImageGallery } from "@/components/ImageGallery";
import { Images } from "lucide-react";

export default function GalleryPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题区域 */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-sky-400 to-blue-500 rounded-2xl shadow-lg soft-glow">
              <Images className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              创作历史
            </h1>
          </div>
          <p className="text-lg text-slate-600">查看您的所有AI创作作品</p>
        </header>

        {/* 历史记录内容 */}
        <div className="w-full">
          <ImageGallery />
        </div>
      </div>
    </div>
  );
}
