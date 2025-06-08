"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  History,
  Download,
  Trash2,
  Heart,
  Search,
  RefreshCw,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  getStoredImages,
  deleteStoredImage,
  toggleImageFavorite,
  downloadImage,
  type GeneratedImage,
} from "@/lib/storage";

export function ImageGallery() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 加载本地存储的图片
  const loadImages = () => {
    setIsLoading(true);
    try {
      const storedImages = getStoredImages();
      setImages(storedImages);
    } catch (error) {
      console.error("加载图片失败:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadImages();

    // 监听localStorage变化，自动刷新图片列表
    const handleStorageChange = () => {
      loadImages();
    };

    window.addEventListener("storage", handleStorageChange);

    // 定期刷新，以便显示新生成的图片
    const interval = setInterval(loadImages, 2000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const filteredImages = images.filter((img) =>
    img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleFavorite = (id: string) => {
    try {
      toggleImageFavorite(id);
      loadImages(); // 重新加载以更新UI
    } catch (error) {
      console.error("切换收藏失败:", error);
    }
  };

  const handleDeleteImage = (id: string) => {
    try {
      deleteStoredImage(id);
      loadImages(); // 重新加载以更新UI
    } catch (error) {
      console.error("删除图片失败:", error);
    }
  };

  const handleDownloadImage = async (image: GeneratedImage) => {
    try {
      await downloadImage(image);
    } catch (error) {
      console.error("下载图片失败:", error);
      // 可以添加错误提示UI
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    try {
      const now = new Date();
      const timestampDate = new Date(timestamp);
      const diffMs = now.getTime() - timestampDate.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (diffDays > 0) {
        return `${diffDays}天前`;
      } else if (diffHours > 0) {
        return `${diffHours}小时前`;
      } else {
        return "刚刚";
      }
    } catch (error) {
      return "未知时间";
    }
  };

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
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="搜索你的作品..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* 图片列表 */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
              加载中...
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchTerm ? "没有找到相关作品" : "还没有生成过图片"}
            </div>
          ) : (
            filteredImages.map((image) => (
              <div
                key={image.id}
                className="group relative bg-card border rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                {/* 图片预览 */}
                <div className="aspect-square bg-muted relative overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.prompt}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // 图片加载失败时显示占位符
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling?.removeAttribute(
                        "hidden"
                      );
                    }}
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
                      onClick={() => handleToggleFavorite(image.id)}
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
                      onClick={() => handleDownloadImage(image)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                      onClick={() => handleDeleteImage(image.id)}
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
