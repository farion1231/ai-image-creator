"use client";

import { useRef, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, RefreshCw, ChevronDown } from "lucide-react";
import { useImageGallery } from "./image-gallery/useImageGallery";
import { SearchBox } from "./image-gallery/SearchBox";
import { EmptyState } from "./image-gallery/EmptyState";
import { VirtualizedImageList } from "./image-gallery/VirtualizedImageList";

export function ImageGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(400);
  
  const {
    images,
    allImages,
    isLoading,
    searchTerm,
    loadImages,
    loadMore,
    handleSearchChange,
    handleToggleFavorite,
    handleDeleteImage,
    handleDownloadImage,
    hasMore,
    canLoadMore,
  } = useImageGallery();

  // 自动调整容器高度
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const viewportHeight = window.innerHeight;
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const availableHeight = viewportHeight - containerTop - 150; // 留出底部空间
        setContainerHeight(Math.max(400, Math.min(600, availableHeight)));
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

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
        <SearchBox searchTerm={searchTerm} onSearchChange={handleSearchChange} />

        {/* 图片列表容器 */}
        <div ref={containerRef} className="relative">
          {images.length === 0 ? (
            <EmptyState isLoading={isLoading} hasSearchTerm={!!searchTerm} />
          ) : (
            <>
              <VirtualizedImageList
                images={images}
                onToggleFavorite={handleToggleFavorite}
                onDownload={handleDownloadImage}
                onDelete={handleDeleteImage}
                height={containerHeight}
              />
              
              {/* 加载更多按钮 */}
              {hasMore && (
                <div className="flex justify-center pt-4">
                  <Button
                    onClick={loadMore}
                    disabled={!canLoadMore}
                    variant="outline"
                    size="sm"
                    className="text-slate-600 hover:text-slate-800 hover:bg-sky-50/50"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <ChevronDown className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? '加载中...' : '加载更多'}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>

        {/* 底部统计 */}
        {allImages.length > 0 && (
          <div className="pt-3 border-t border-sky-200/50 text-center text-sm text-slate-500">
            共 {allImages.length} 张作品
            {allImages.filter((img) => img.isFavorite).length > 0 && (
              <span className="ml-2">
                · {allImages.filter((img) => img.isFavorite).length} 张收藏
              </span>
            )}
            {images.length < allImages.length && (
              <span className="ml-2">
                · 已显示 {images.length} 张
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
