// API 相关类型定义

import { GeneratedImage, ImageToImageParams } from './index';

// 文本生图 API 请求
export interface GenerateRequest {
  prompt: string;
  size: string;
  count: number;
  style: string;
}

// 文本生图 API 响应
export interface GenerateResponse {
  success: boolean;
  images?: GeneratedImage[];
  error?: string;
}

// 以图生图 API 请求
export interface ImageToImageRequest extends Omit<ImageToImageParams, 'imageFile'> {
  imageData: string; // base64 encoded image
}

// 以图生图 API 响应
export interface ImageToImageResponse {
  success: boolean;
  images?: GeneratedImage[];
  error?: string;
}

// 提示词优化 API 请求
export interface OptimizePromptRequest {
  prompt: string;
  style: string;
}

// 提示词优化 API 响应
export interface OptimizePromptResponse {
  success: boolean;
  optimizedPrompt?: string;
  negativePrompt?: string;
  error?: string;
}

// API 错误响应
export interface ApiError {
  success: false;
  error: string;
  code?: string;
}