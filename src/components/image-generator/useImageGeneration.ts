import { useState } from "react";
import { saveGeneratedImages } from "@/lib/storage";
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

  const updateParams = (updates: Partial<GenerationParams>) => {
    setParams((prev) => ({ ...prev, ...updates }));
  };

  const handleGenerate = async (isRetry = false) => {
    if (!params.prompt.trim()) return;

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
      const progressInterval = setInterval(() => {
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

      clearInterval(progressInterval);

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
      setTimeout(() => {
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
  };

  const handleRetry = () => {
    if (state.retryCount < 3) {
      handleGenerate(true);
    } else {
      setState((prev) => ({
        ...prev,
        error: "重试次数过多，请稍后再试",
      }));
    }
  };

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  const handleOptimizePrompt = async () => {
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
  };

  return {
    params,
    state,
    updateParams,
    handleGenerate,
    handleRetry,
    clearError,
    handleOptimizePrompt,
  };
} 