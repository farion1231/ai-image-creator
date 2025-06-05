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
import { History, Download, Trash2, Heart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: Date;
  size: string;
  style: string;
  isFavorite: boolean;
}

export function ImageGallery() {
  // 模拟数据，后续会从 API 获取
  const [images, setImages] = useState<GeneratedImage[]>([
    {
      id: "1",
      url: "/placeholder-image-1.jpg",
      prompt: "一只可爱的小猫坐在彩虹桥上，背景是星空，梦幻风格",
      timestamp: new Date(Date.now() - 3600000), // 1小时前
      size: "1024x1024",
      style: "artistic",
      isFavorite: false,
    },
    {
      id: "2",
      url: "/placeholder-image-2.jpg",
      prompt: "未来城市的夜景，霓虹灯闪烁，赛博朋克风格",
      timestamp: new Date(Date.now() - 7200000), // 2小时前
      size: "768x768",
      style: "realistic",
      isFavorite: true,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredImages = images.filter((img) =>
    img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFavorite = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isFavorite: !img.isFavorite } : img
      )
    );
  };

  const deleteImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const downloadImage = (image: GeneratedImage) => {
    // TODO: 实际的下载功能将在后续实现
    console.log("下载图片:", image.id);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays}天前`;
    } else if (diffHours > 0) {
      return `${diffHours}小时前`;
    } else {
      return "刚刚";
    }
  };

  return (
    <Card className="card-shadow h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          创作历史
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
          {filteredImages.length === 0 ? (
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
                <div className="aspect-square bg-muted relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-muted-foreground/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                        <History className="w-6 h-6" />
                      </div>
                      <div className="text-xs">图片预览</div>
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                      onClick={() => toggleFavorite(image.id)}
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
                      onClick={() => downloadImage(image)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 p-0"
                      onClick={() => deleteImage(image.id)}
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
