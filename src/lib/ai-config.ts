// AI SDK 配置文件
import { createOpenAI } from '@ai-sdk/openai';

// 创建OpenAI提供商实例
export function createOpenAIProvider() {
  return createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_API_BASE_URL,
  });
}

// 模型配置
export const AI_MODELS = {
  // 用于提示词优化的便宜模型
  textOptimization: 'gpt-4o-mini',
  // 用于图片分析的强大模型
  imageAnalysis: 'gpt-4o',
  // 用于错误分析
  errorAnalysis: 'gpt-4o-mini',
} as const;

// API配置
export const AI_CONFIG = {
  maxTokens: {
    promptOptimization: 200,
    negativePrompt: 100,
    imageAnalysis: 100,
    errorAnalysis: 150,
    promptSuggestion: 300,
  },
  retryAttempts: 3,
  timeout: 30000, // 30秒
} as const;

// 验证环境变量
export function validateAIConfig(): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!process.env.OPENAI_API_KEY) {
    errors.push('OPENAI_API_KEY 环境变量未设置');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
} 