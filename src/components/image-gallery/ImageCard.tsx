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
    <div className="group relative bg-card border rounded-lg overflow-hidden hover:shadow-md transition-all">
      {/* 图片预览 */}
      <div className="aspect-square bg-muted relative overflow-hidden">
        <img
          src={image.url}
          alt={image.prompt}
          className="w-full h-full object-cover"
          onError={handleImageError}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-muted-foreground"
          hidden
        >
          <div className="text-center">
            <div className="w-12 h-12 bg-muted-foreground/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
            <div className="text-xs">图片加载失败</div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0"
            onClick={() => onToggleFavorite(image.id)}
          >
            <Heart
              className={`w-4 h-4 ${
                image.isFavorite ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0"
            onClick={() => onDownload(image)}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="w-8 h-8 p-0"
            onClick={() => onDelete(image.id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* 图片信息 */}
      <div className="p-3 space-y-2">
        <div className="text-sm text-muted-foreground line-clamp-2">
          {image.prompt}
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{image.size}</span>
          <span>{formatTimeAgo(image.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
