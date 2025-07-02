"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { 
  getStoredImages, 
  deleteStoredImage, 
  toggleImageFavorite, 
  downloadImage
} from "@/lib/storage";
import type { GeneratedImage } from "@/types";

// 分页配置
const ITEMS_PER_PAGE = 20;

export function useImageGallery() {
  const [allImages, setAllImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // 过滤和分页后的图片
  const filteredImages = useMemo(() => {
    return allImages.filter((img) =>
      img.prompt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allImages, searchTerm]);

  const totalPages = Math.ceil(filteredImages.length / ITEMS_PER_PAGE);
  
  const paginatedImages = useMemo(() => {
    const endIndex = currentPage * ITEMS_PER_PAGE;
    return filteredImages.slice(0, endIndex); // 无限加载模式
  }, [filteredImages, currentPage]);

  // 加载本地存储的图片
  const loadImages = useCallback(() => {
    setIsLoading(true);
    try {
      const storedImages = getStoredImages();
      setAllImages(storedImages);
    } catch (error) {
      console.error("加载图片失败:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
  }, [loadImages]);

  const handleToggleFavorite = useCallback((id: string) => {
    try {
      toggleImageFavorite(id);
      loadImages(); // 重新加载以更新UI
    } catch (error) {
      console.error("切换收藏失败:", error);
    }
  }, [loadImages]);

  const handleDeleteImage = useCallback((id: string) => {
    try {
      deleteStoredImage(id);
      loadImages(); // 重新加载以更新UI
    } catch (error) {
      console.error("删除图片失败:", error);
    }
  }, [loadImages]);

  const handleDownloadImage = useCallback(async (image: GeneratedImage) => {
    try {
      await downloadImage(image);
    } catch (error) {
      console.error("下载图片失败:", error);
      // 可以添加错误提示UI
    }
  }, []);

  // 加载更多图片的函数
  const loadMore = useCallback(() => {
    if (currentPage < totalPages && !isLoading) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages, isLoading]);

  // 搜索时重置分页
  const handleSearchChange = useCallback((term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  }, []);

  return {
    // 原有数据
    allImages,
    // 分页数据
    images: paginatedImages,
    filteredImages,
    // 状态
    isLoading,
    searchTerm,
    currentPage,
    totalPages,
    // 方法
    loadImages,
    loadMore,
    handleSearchChange,
    handleToggleFavorite,
    handleDeleteImage,
    handleDownloadImage,
    // 计算属性
    hasMore: currentPage < totalPages,
    canLoadMore: currentPage < totalPages && !isLoading,
  };
} 