import { NextRequest, NextResponse } from "next/server";
import type { ImageToImageResponse } from '@/types/api';
import type { GeneratedImage } from '@/types';
import { STYLE_MODIFIERS } from '@/constants';
import { withErrorHandler, validateInput, createApiError, createAuthError } from '@/lib/error-handler';

async function imageToImageHandler(request: NextRequest) {
  const formData = await request.formData();

  const image = formData.get("image") as File;
  const prompt = formData.get("prompt") as string;
  const strength = parseFloat(formData.get("strength") as string);
  const size = formData.get("size") as string;
  const count = parseInt(formData.get("count") as string);
  const style = formData.get("style") as string;

  // 使用统一的验证函数
  validateInput([
    {
      condition: !image || !prompt?.trim(),
      message: "请提供图片和描述文字",
      details: "以图生图需要上传参考图片和输入描述文字"
    },
    {
      condition: image && !image.type.startsWith("image/"),
      message: "请上传有效的图片文件",
      details: `支持的格式: JPEG, PNG, WebP等，当前类型: ${image?.type || '未知'}`
    },
    {
      condition: image && image.size > 10 * 1024 * 1024,
      message: "图片文件过大",
      details: `当前大小: ${Math.round((image?.size || 0) / 1024 / 1024 * 100) / 100}MB，最大允许: 10MB`
    },
    {
      condition: count < 1 || count > 4,
      message: "生成数量必须在1-4之间",
      details: `当前值: ${count}`
    },
    {
      condition: isNaN(strength) || strength < 0 || strength > 1,
      message: "变化强度必须在0-1之间",
      details: `当前值: ${strength}`
    }
  ]);

    // 构建完整的提示词
    const styleModifier = STYLE_MODIFIERS[style] || "";
    const fullPrompt = `${prompt}, ${styleModifier}`;

  // 检查必要的环境变量
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw createAuthError('API密钥未配置', '请检查环境变量OPENAI_API_KEY');
  }

  let images: GeneratedImage[] = [];

  // 由于OpenAI的DALL-E不直接支持image-to-image，这里我们模拟实现
  // 在实际项目中，你可能需要使用其他支持image-to-image的API
  const apiBaseUrl = process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1";

  // 模拟调用支持image-to-image的API
  const response = await fetch(`${apiBaseUrl}/images/generations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: `Based on the uploaded image, create a new image with these modifications: ${fullPrompt}. Strength of modification: ${Math.round(
        strength * 100
      )}%`,
      n: count,
      size: size,
      quality: "standard",
      response_format: "url",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const statusCode = response.status;
    
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
    id: `img2img_${Date.now()}_${index}`,
    url: item.url || item.b64_json,
    prompt: prompt,
    timestamp: new Date().toISOString(),
    size: size,
    style: style,
    source: "image-to-image" as const,
    strength: strength,
  })) || [];

  if (!images.length) {
    // 如果是开发环境，返回模拟数据
    if (process.env.NODE_ENV === "development") {
      images = Array.from({ length: count }, (_, index) => ({
        id: `demo_img2img_${Date.now()}_${index}`,
        url: `https://picsum.photos/${size.replace("x", "/")}?random=${
          Date.now() + index
        }`,
        prompt: prompt,
        timestamp: new Date().toISOString(),
        size: size,
        style: style,
        source: "image-to-image" as const,
        strength: strength,
      }));
    } else {
      throw createApiError('API未返回有效图片', 502, '请稍后重试');
    }
  }

  const apiResponse: ImageToImageResponse = {
    success: true,
    images: images
  };
  
  return NextResponse.json(apiResponse);
}

export const POST = withErrorHandler(imageToImageHandler);
