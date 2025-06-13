"use client";

import { Button } from "@/components/ui/button";
import { Heart, Download, Trash2, History } from "lucide-react";
import { type GeneratedImage } from "@/lib/storage";
import { formatTimeAgo } from "@/lib/utils/time";

interface ImageCardProps {
  image: GeneratedImage;
  onToggleFavorite: (id: string) => void;
  onDownload: (image: GeneratedImage) => void;
  onDelete: (id: string) => void;
}

export function ImageCard({
  image,
  onToggleFavorite,
  onDownload,
  onDelete,
}: ImageCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // 图片加载失败时显示占位符
    e.currentTarget.style.display = "none";
    e.currentTarget.nextElementSibling?.removeAttribute("hidden");
  };

  return (
    <div className="group relative bg-white/95 border border-sky-100/60 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-sky-100/40 transition-all duration-300 backdrop-blur-sm">
      {/* 图片预览 */}
      <div className="aspect-square bg-sky-50/50 relative overflow-hidden">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center text-slate-500"
          hidden
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-sky-200/40 rounded-xl mx-auto mb-2 flex items-center justify-center">
              <History className="w-6 h-6 text-sky-600" />
            </div>
            <div className="text-xs">图片加载失败</div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white border-sky-100"
            onClick={() => onToggleFavorite(image.id)}
          >
            <Heart
              className={`w-4 h-4 ${
                image.isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-slate-600"
              }`}
            />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white border-sky-100"
            onClick={() => onDownload(image)}
          >
            <Download className="w-4 h-4 text-slate-600" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0 bg-white/90 hover:bg-white border-sky-100"
            onClick={() => onDelete(image.id)}
          >
            <Trash2 className="w-4 h-4 text-slate-600" />
          </Button>
        </div>
      </div>

      {/* 图片信息 */}
      <div className="p-3 space-y-2">
        <div className="text-sm text-slate-600 line-clamp-2">
          {image.prompt}
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{image.size}</span>
          <span>{formatTimeAgo(image.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
