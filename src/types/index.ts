// 全局类型定义

// 生成的图片数据结构
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
  size: string;
  style: string;
  isFavorite?: boolean;
  source?: "text-to-image" | "image-to-image";
  strength?: number;
  originalImageUrl?: string;
}

// 图片生成参数
export interface GenerationParams {
  prompt: string;
  size: string;
  count: number;
  style: string;
}

// 以图生图参数
export interface ImageToImageParams {
  prompt: string;
  imageFile: File | null;
  imageUrl?: string;
  strength: number; // 0.0-1.0，控制对原图的改变程度
  size: string;
  count: number;
  style: string;
}

// 生成状态
export interface GenerationState {
  isGenerating: boolean;
  error: string | null;
  success: boolean;
  progress: number;
  retryCount: number;
}

// 图片上传状态
export interface ImageUploadState {
  isUploading: boolean;
  uploadError: string | null;
  previewUrl: string | null;
}

// 尺寸选项
export interface SizeOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// 风格选项
export interface StyleOption {
  value: string;
  label: string;
  description: string;
}

// 存储统计信息
export interface StorageStats {
  totalImages: number;
  favoriteImages: number;
  storageUsed: number;
}