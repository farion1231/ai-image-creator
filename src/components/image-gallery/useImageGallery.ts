"use client";

import { useState, useEffect } from "react";
import { 
  getStoredImages, 
  deleteStoredImage, 
  toggleImageFavorite, 
  downloadImage,
  type GeneratedImage 
} from "@/lib/storage";

export function useImageGallery() {
  const [images, setImages] = useState<GeneratedImage[]>([]);
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

  return {
    images,
    isLoading,
    loadImages,
    handleToggleFavorite,
    handleDeleteImage,
    handleDownloadImage,
  };
} 