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
    <Card className="card-shadow h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-primary" />
            创作历史
          </div>
          <Button
            onClick={loadImages}
            variant="ghost"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
        </CardTitle>
        <CardDescription>查看和管理你的 AI 图片作品</CardDescription>
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
          <div className="pt-3 border-t text-center text-sm text-muted-foreground">
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
