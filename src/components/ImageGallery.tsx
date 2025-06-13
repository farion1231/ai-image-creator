"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, RefreshCw } from "lucide-react";
import { useImageGallery } from "./image-gallery/useImageGallery";
import { SearchBox } from "./image-gallery/SearchBox";
import { EmptyState } from "./image-gallery/EmptyState";
import { ImageCard } from "./image-gallery/ImageCard";

export function ImageGallery() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    images,
    isLoading,
    loadImages,
    handleToggleFavorite,
    handleDeleteImage,
    handleDownloadImage,
  } = useImageGallery();

  const filteredImages = images.filter((img) =>
    img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="gradient-card card-shadow border-blue-100/50 backdrop-blur-md h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-slate-700">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl shadow-lg">
              <History className="w-5 h-5 text-white" />
            </div>
            创作历史
          </div>
          <Button
            onClick={loadImages}
            variant="ghost"
            size="sm"
            disabled={isLoading}
            className="text-slate-600 hover:text-slate-800 hover:bg-sky-50/50"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </CardTitle>
        <CardDescription className="text-slate-600">
          查看和管理你的 AI 图片作品
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 搜索框 */}
        <SearchBox searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {/* 图片列表 */}
        <div className="space-y-3">
          {filteredImages.length === 0 ? (
            <EmptyState isLoading={isLoading} hasSearchTerm={!!searchTerm} />
          ) : (
            filteredImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                onToggleFavorite={handleToggleFavorite}
                onDownload={handleDownloadImage}
                onDelete={handleDeleteImage}
              />
            ))
          )}
        </div>

        {/* 底部统计 */}
        {images.length > 0 && (
          <div className="pt-3 border-t border-sky-200/50 text-center text-sm text-slate-500">
            共 {images.length} 张作品
            {images.filter((img) => img.isFavorite).length > 0 && (
              <span className="ml-2">
                · {images.filter((img) => img.isFavorite).length} 张收藏
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
