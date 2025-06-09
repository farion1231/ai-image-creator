import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';

interface GenerateRequest {
  prompt: string;
  size: string;
  count: number;
  style: string;
}

interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
  size: string;
  style: string;
}

// 风格修饰符映射
const styleModifiers: Record<string, string> = {
  realistic: '高画质, 写实风格, 专业摄影',
  anime: '动漫风格, 日式插画, 精美绘画',
  artistic: '艺术风格, 油画质感, 创意插画'
};

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();
    const { prompt, size, count, style } = body;

    // 验证输入
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: '提示词不能为空' },
        { status: 400 }
      );
    }

    if (count < 1 || count > 4) {
      return NextResponse.json(
        { error: '生成数量必须在1-4之间' },
        { status: 400 }
      );
    }

    // 构建完整的提示词
    const styleModifier = styleModifiers[style] || '';
    const fullPrompt = `${prompt}, ${styleModifier}`;

    // 检查必要的环境变量
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API密钥未配置' },
        { status: 500 }
      );
    }

    // 使用AI SDK调用OpenAI API
    let images: GeneratedImage[] = [];
    
    try {
      // 注意：AI SDK目前主要支持文本生成，对于图片生成我们还是需要直接调用OpenAI API
      // 但可以使用AI SDK的错误处理和重试机制
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
        console.error('API调用失败:', errorData);
        
        return NextResponse.json(
          { 
            error: '图片生成失败',
            details: errorData.error?.message || `HTTP ${response.status}`
          },
          { status: response.status }
        );
      }

      const result = await response.json();
      
      // 处理API响应，格式化为我们需要的数据结构
      images = result.data?.map((item: any, index: number) => ({
        id: `${Date.now()}_${index}`,
        url: item.url || item.b64_json,
        prompt: prompt,
        timestamp: new Date().toISOString(),
        size: size,
        style: style
      })) || [];

    } catch (apiError) {
      console.error('AI SDK调用失败:', apiError);
      throw apiError;
    }

    return NextResponse.json({
      success: true,
      images: images,
      count: images.length
    });

  } catch (error) {
    console.error('生成图片时出错:', error);
    
    return NextResponse.json(
      { 
        error: '服务器内部错误',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
} 