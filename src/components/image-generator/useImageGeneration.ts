import { useState, useCallback, useRef } from "react";
import { saveGeneratedImages } from "@/lib/storage";
import { useDebounce } from "@/lib/hooks";
import type { GenerationParams, GenerationState } from "./types";

export function useImageGeneration() {
  const [params, setParams] = useState<GenerationParams>({
    prompt: "",
    size: "1024x1024",
    count: 1,
    style: "realistic",
  });

  const [state, setState] = useState<GenerationState>({
    isGenerating: false,
    error: null,
    success: false,
    progress: 0,
    retryCount: 0,
  });

  // 使用ref来存储定时器ID，避免内存泄漏
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const updateParams = useCallback((updates: Partial<GenerationParams>) => {
    setParams((prev) => ({ ...prev, ...updates }));
  }, []);

  // 清理所有定时器的工具函数
  const cleanupTimers = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (successTimeoutRef.current) {
      clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = null;
    }
  }, []);

  const handleGenerate = useCallback(async (isRetry = false) => {
    if (!params.prompt.trim()) return;

    // 清理之前的定时器
    cleanupTimers();

    // 重置状态
    setState((prev) => ({
      ...prev,
      isGenerating: true,
      error: null,
      success: false,
      progress: 0,
      retryCount: isRetry ? prev.retryCount + 1 : 0,
    }));

    try {
      // 模拟进度更新
      progressIntervalRef.current = setInterval(() => {
        setState((prev) => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90),
        }));
      }, 500);

      // 调用生成API
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}`);
      }

      const result = await response.json();

      if (!result.success || !result.images?.length) {
        throw new Error("生成失败：未返回有效图片");
      }

      // 保存到本地存储
      saveGeneratedImages(result.images);

      setState((prev) => ({
        ...prev,
        isGenerating: false,
        success: true,
        progress: 100,
        error: null,
      }));

      // 3秒后自动清除成功状态
      successTimeoutRef.current = setTimeout(() => {
        setState((prev) => ({ ...prev, success: false, progress: 0 }));
      }, 3000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "生成失败，请重试";

      setState((prev) => ({
        ...prev,
        isGenerating: false,
        error: errorMessage,
        progress: 0,
      }));

      console.error("生成图片失败:", error);
    }
  }, [params, cleanupTimers]);

  const handleRetry = useCallback(() => {
    if (state.retryCount < 3) {
      handleGenerate(true);
    } else {
      setState((prev) => ({
        ...prev,
        error: "重试次数过多，请稍后再试",
      }));
    }
  }, [state.retryCount, handleGenerate]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // 实际的优化函数
  const doOptimizePrompt = useCallback(async () => {
    if (!params.prompt.trim()) return;

    try {
      setState((prev) => ({ ...prev, isGenerating: true }));

      const response = await fetch("/api/optimize-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: params.prompt,
          style: params.style,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "优化失败");
      }

      const result = await response.json();

      if (result.success && result.optimizedPrompt) {
        setParams((prev) => ({ ...prev, prompt: result.optimizedPrompt }));
      }
    } catch (error) {
      console.error("优化提示词失败:", error);
      setState((prev) => ({
        ...prev,
        error: error instanceof Error ? error.message : "优化失败",
      }));
    } finally {
      setState((prev) => ({ ...prev, isGenerating: false }));
    }
  }, [params.prompt, params.style]);

  // 防抖的优化函数，避免用户快速点击产生多个请求
  const handleOptimizePrompt = useDebounce(doOptimizePrompt, 500);

  return {
    params,
    state,
    updateParams,
    handleGenerate,
    handleRetry,
    clearError,
    handleOptimizePrompt,
    cleanupTimers, // 暴露清理函数供组件卸载时使用
  };
} 