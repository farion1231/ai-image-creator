import { NextRequest, NextResponse } from 'next/server';
import { optimizePrompt } from '@/lib/ai-providers';
import type { OptimizePromptRequest, OptimizePromptResponse } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const body: OptimizePromptRequest = await request.json();
    const { prompt, style } = body;

    // 验证输入
    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: '提示词不能为空' },
        { status: 400 }
      );
    }

    if (!style) {
      return NextResponse.json(
        { error: '风格参数不能为空' },
        { status: 400 }
      );
    }

    // 使用AI SDK优化提示词
    const optimizedPrompt = await optimizePrompt(prompt, style);

    const response: OptimizePromptResponse = {
      success: true,
      optimizedPrompt: optimizedPrompt
    };
    
    return NextResponse.json(response);

  } catch (error) {
    console.error('优化提示词时出错:', error);
    
    return NextResponse.json(
      { 
        error: '提示词优化失败',
        details: error instanceof Error ? error.message : '未知错误'
      },
      { status: 500 }
    );
  }
} 