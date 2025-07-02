import { NextRequest, NextResponse } from 'next/server';
import type { GenerateRequest, GenerateResponse } from '@/types/api';
import type { GeneratedImage } from '@/types';
import { STYLE_MODIFIERS } from '@/constants';
import { withErrorHandler, validateInput, createApiError, createAuthError } from '@/lib/error-handler';

async function generateHandler(request: NextRequest) {
  const body: GenerateRequest = await request.json();
  const { prompt, size, count, style } = body;

  // 使用统一的验证函数
  validateInput([
    {
      condition: !prompt || prompt.trim().length === 0,
      message: '提示词不能为空',
      details: '请输入有效的图片描述'
    },
    {
      condition: count < 1 || count > 4,
      message: '生成数量必须在1-4之间',
      details: `当前值: ${count}`
    },
    {
      condition: !size || !['256x256', '512x512', '1024x1024', '1792x1024', '1024x1792'].includes(size),
      message: '无效的图片尺寸',
      details: `支持的尺寸: 256x256, 512x512, 1024x1024, 1792x1024, 1024x1792`
    }
  ]);

    // 构建完整的提示词
    const styleModifier = STYLE_MODIFIERS[style] || '';
    const fullPrompt = `${prompt}, ${styleModifier}`;

  // 检查必要的环境变量
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw createAuthError('API密钥未配置', '请检查环境变量OPENAI_API_KEY');
  }

  // 使用AI SDK调用OpenAI API
  let images: GeneratedImage[] = [];
  
  const apiBaseUrl = process.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1';
  
  const response = await fetch(`${apiBaseUrl}/images/generations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: fullPrompt,
      n: count,
      size: size,
      quality: "standard",
      response_format: "url"
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const statusCode = response.status;
    
    // 根据状态码抛出适当的错误
    if (statusCode === 401) {
      throw createAuthError('API密钥无效', errorData.error?.message);
    } else if (statusCode === 429) {
      throw createApiError('请求过于频繁，请稍后重试', statusCode, errorData.error?.message);
    } else {
      throw createApiError('图片生成失败', statusCode, errorData.error?.message);
    }
  }

  const result = await response.json();
      
  // 处理API响应，格式化为我们需要的数据结构
  images = result.data?.map((item: { url?: string; b64_json?: string }, index: number) => ({
    id: `${Date.now()}_${index}`,
    url: item.url || item.b64_json || '',
    prompt: prompt,
    timestamp: new Date().toISOString(),
    size: size,
    style: style,
    source: 'text-to-image' as const
  })) || [];

  if (!images.length) {
    throw createApiError('API未返回有效图片', 502, '请稍后重试');
  }

  const response: GenerateResponse = {
    success: true,
    images: images
  };
  
  return NextResponse.json(response);
}

export const POST = withErrorHandler(generateHandler); 