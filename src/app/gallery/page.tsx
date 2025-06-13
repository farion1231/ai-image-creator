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
            <div className="p-2 bg-primary/10 rounded-xl">
              <Images className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              创作历史
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            查看您的所有AI创作作品
          </p>
        </header>

        {/* 历史记录内容 */}
        <div className="w-full">
          <ImageGallery />
        </div>
      </div>
    </div>
  );
}
