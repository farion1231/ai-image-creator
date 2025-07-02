import { NextResponse } from 'next/server';

/**
 * 标准化的API错误响应接口
 */
export interface ApiErrorResponse {
  error: string;
  details?: string;
  code?: string;
  timestamp?: string;
}

/**
 * 错误类型枚举
 */
export enum ErrorType {
  VALIDATION = 'VALIDATION_ERROR',
  AUTH = 'AUTH_ERROR',
  API = 'API_ERROR',
  INTERNAL = 'INTERNAL_ERROR',
  NETWORK = 'NETWORK_ERROR',
  FILE = 'FILE_ERROR',
}

/**
 * 自定义应用错误类
 */
export class AppError extends Error {
  public readonly type: ErrorType;
  public readonly statusCode: number;
  public readonly details?: string;

  constructor(
    message: string,
    type: ErrorType = ErrorType.INTERNAL,
    statusCode: number = 500,
    details?: string
  ) {
    super(message);
    this.name = 'AppError';
    this.type = type;
    this.statusCode = statusCode;
    this.details = details;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * 预定义的错误创建函数
 */
export const createValidationError = (message: string, details?: string) =>
  new AppError(message, ErrorType.VALIDATION, 400, details);

export const createAuthError = (message: string = '认证失败', details?: string) =>
  new AppError(message, ErrorType.AUTH, 401, details);

export const createApiError = (message: string, statusCode: number = 502, details?: string) =>
  new AppError(message, ErrorType.API, statusCode, details);

export const createFileError = (message: string, details?: string) =>
  new AppError(message, ErrorType.FILE, 400, details);

/**
 * 统一的错误处理器
 */
export function handleApiError(error: unknown): NextResponse<ApiErrorResponse> {
  console.error('API Error:', error);

  // 处理自定义应用错误
  if (error instanceof AppError) {
    return NextResponse.json(
      {
        error: error.message,
        details: error.details,
        code: error.type,
        timestamp: new Date().toISOString(),
      },
      { status: error.statusCode }
    );
  }

  // 处理 fetch 错误
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return NextResponse.json(
      {
        error: '网络连接失败',
        details: '请检查网络连接或稍后重试',
        code: ErrorType.NETWORK,
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }

  // 处理其他已知错误类型
  if (error instanceof Error) {
    // OpenAI API 错误
    if (error.message.includes('API key') || error.message.includes('unauthorized')) {
      return NextResponse.json(
        {
          error: 'API密钥无效',
          details: '请检查API密钥配置',
          code: ErrorType.AUTH,
          timestamp: new Date().toISOString(),
        },
        { status: 401 }
      );
    }

    // 请求限制错误
    if (error.message.includes('rate limit') || error.message.includes('quota')) {
      return NextResponse.json(
        {
          error: '请求过于频繁',
          details: '请稍后再试',
          code: ErrorType.API,
          timestamp: new Date().toISOString(),
        },
        { status: 429 }
      );
    }

    // 其他一般错误
    return NextResponse.json(
      {
        error: '服务器内部错误',
        details: error.message,
        code: ErrorType.INTERNAL,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }

  // 处理未知错误
  return NextResponse.json(
    {
      error: '服务器内部错误',
      details: '发生了未知错误',
      code: ErrorType.INTERNAL,
      timestamp: new Date().toISOString(),
    },
    { status: 500 }
  );
}

/**
 * 输入验证助手函数
 */
export function validateInput(conditions: Array<{ condition: boolean; message: string; details?: string }>) {
  for (const { condition, message, details } of conditions) {
    if (condition) {
      throw createValidationError(message, details);
    }
  }
}

/**
 * API 包装器，统一处理错误
 */
export function withErrorHandler<T extends (...args: never[]) => Promise<NextResponse>>(
  handler: T
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  }) as T;
}