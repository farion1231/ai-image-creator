import type { GeneratedImage, StorageStats } from '@/types';
import { STORAGE_KEYS, API_CONFIG } from '@/constants';

const STORAGE_KEY = STORAGE_KEYS.IMAGES;
const FAVORITES_KEY = STORAGE_KEYS.FAVORITES;

// 获取所有生成的图片
export function getStoredImages(): GeneratedImage[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const favorites = localStorage.getItem(FAVORITES_KEY);
    
    const images: GeneratedImage[] = stored ? JSON.parse(stored) : [];
    const favoriteIds: string[] = favorites ? JSON.parse(favorites) : [];
    
    // 添加收藏状态
    return images.map(image => ({
      ...image,
      isFavorite: favoriteIds.includes(image.id)
    }));
  } catch (error) {
    console.error('读取本地存储失败:', error);
    return [];
  }
}

// 保存新生成的图片
export function saveGeneratedImages(newImages: GeneratedImage[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existingImages = getStoredImages();
    const allImages = [...newImages, ...existingImages];
    
    // 限制最多保存图片数量
    const limitedImages = allImages.slice(0, API_CONFIG.MAX_STORED_IMAGES);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedImages));
  } catch (error) {
    console.error('保存到本地存储失败:', error);
  }
}

// 删除指定图片
export function deleteStoredImage(imageId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const images = getStoredImages();
    const filteredImages = images.filter(img => img.id !== imageId);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredImages));
    
    // 同时从收藏中移除
    const favorites = getFavoriteIds();
    const updatedFavorites = favorites.filter(id => id !== imageId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('删除图片失败:', error);
  }
}

// 获取收藏的图片ID列表
export function getFavoriteIds(): string[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('读取收藏列表失败:', error);
    return [];
  }
}

// 切换图片收藏状态
export function toggleImageFavorite(imageId: string): void {
  if (typeof window === 'undefined') return;
  
  try {
    const favorites = getFavoriteIds();
    const isFavorite = favorites.includes(imageId);
    
    let newFavorites: string[];
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== imageId);
    } else {
      newFavorites = [...favorites, imageId];
    }
    
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
  } catch (error) {
    console.error('切换收藏状态失败:', error);
  }
}

// 下载图片
export async function downloadImage(image: GeneratedImage): Promise<void> {
  try {
    const response = await fetch(image.url);
    const blob = await response.blob();
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // 生成文件名
    const timestamp = new Date(image.timestamp).toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `ai-image-${timestamp}.png`;
    link.download = filename;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('下载图片失败:', error);
    throw new Error('下载失败，请稍后重试');
  }
}

// 清空所有数据
export function clearAllData(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(FAVORITES_KEY);
  } catch (error) {
    console.error('清空数据失败:', error);
  }
}

// 获取存储统计信息
export function getStorageStats(): StorageStats {
  const images = getStoredImages();
  const favorites = images.filter(img => img.isFavorite);
  
  return {
    totalImages: images.length,
    favoriteImages: favorites.length,
    storageUsed: typeof window !== 'undefined' ? 
      JSON.stringify({ images, favorites: getFavoriteIds() }).length : 0
  };
} 