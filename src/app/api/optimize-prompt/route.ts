import { NextRequest, NextResponse } from 'next/server';
import { optimizePrompt } from '@/lib/ai-providers';
import type { OptimizePromptRequest, OptimizePromptResponse } from '@/types/api';
import { withErrorHandler, validateInput, createApiError } from '@/lib/error-handler';

async function optimizePromptHandler(request: NextRequest) {
  const body: OptimizePromptRequest = await request.json();
  const { prompt, style } = body;

  // 使用统一的验证函数
  validateInput([
    {
      condition: !prompt || prompt.trim().length === 0,
      message: '提示词不能为空',
      details: '请输入有效的提示词内容'
    },
    {
      condition: !style,
      message: '风格参数不能为空',
      details: '请选择一个有效的风格'
    },
    {
      condition: prompt.length > 1000,
      message: '提示词过长',
      details: '提示词不能超过1000个字符'
    }
  ]);

  try {
    // 使用AI SDK优化提示词
    const optimizedPrompt = await optimizePrompt(prompt, style);

    if (!optimizedPrompt || optimizedPrompt.trim() === prompt.trim()) {
      throw createApiError('优化失败', 502, 'AI服务返回的优化结果无效');
    }

    const apiResponse: OptimizePromptResponse = {
      success: true,
      optimizedPrompt: optimizedPrompt
    };
    
    return NextResponse.json(apiResponse);
  } catch (error) {
    // 如果是AI服务错误，重新抛出作为 API 错误
    if (error instanceof Error && error.message.includes('AI服务')) {
      throw createApiError('提示词优化服务不可用', 503, error.message);
    }
    throw error;
  }
}

export const POST = withErrorHandler(optimizePromptHandler); 