export interface GenerationParams {
  prompt: string;
  size: string;
  count: number;
  style: string;
}

// 新增：以图生图参数类型
export interface ImageToImageParams {
  prompt: string;
  imageFile: File | null;
  imageUrl?: string;
  strength: number; // 0.0-1.0，控制对原图的改变程度
  size: string;
  count: number;
  style: string;
}

export interface GenerationState {
  isGenerating: boolean;
  error: string | null;
  success: boolean;
  progress: number;
  retryCount: number;
}

// 新增：图片上传状态
export interface ImageUploadState {
  isUploading: boolean;
  uploadError: string | null;
  previewUrl: string | null;
}

export interface SizeOption {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface StyleOption {
  value: string;
  label: string;
  description: string;
}
