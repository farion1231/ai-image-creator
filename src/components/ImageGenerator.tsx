"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Wand2,
  Loader2,
  Palette,
  Monitor,
  Smartphone,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { saveGeneratedImages, type GeneratedImage } from "@/lib/storage";

interface GenerationParams {
  prompt: string;
  size: string;
  count: number;
  style: string;
}

interface GenerationState {
  isGenerating: boolean;
  error: string | null;
  success: boolean;
  progress: number;
  retryCount: number;
}

export function ImageGenerator() {
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

  const sizeOptions = [
    { value: "512x512", label: "512×512", icon: Smartphone },
    { value: "768x768", label: "768×768", icon: Monitor },
    { value: "1024x1024", label: "1024×1024", icon: Monitor },
  ];

  const styleOptions = [
    { value: "realistic", label: "写实风格", description: "照片级真实感" },
    { value: "anime", label: "动漫风格", description: "日式动漫插画" },
    { value: "artistic", label: "艺术风格", description: "油画水彩效果" },
  ];

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

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          创作图片
        </CardTitle>
        <CardDescription>
          描述你想要的图片，AI 将为你生成精美的作品
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 提示词输入 */}
        <div className="space-y-2">
          <Label htmlFor="prompt" className="text-sm font-medium">
            描述你的创意 *
          </Label>
          <Textarea
            id="prompt"
            placeholder="例如：一只可爱的小猫坐在彩虹桥上，背景是星空，梦幻风格..."
            value={params.prompt}
            onChange={(e) =>
              setParams((prev) => ({ ...prev, prompt: e.target.value }))
            }
            className="min-h-[100px] resize-none"
            maxLength={500}
          />
          <div className="text-xs text-muted-foreground text-right">
            {params.prompt.length}/500
          </div>
        </div>

        <Separator />

        {/* 参数设置 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 图片尺寸 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">图片尺寸</Label>
            <div className="grid grid-cols-1 gap-2">
              {sizeOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setParams((prev) => ({ ...prev, size: option.value }))
                    }
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:bg-accent/50 ${
                      params.size === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border"
                    }`}
                  >
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 风格选择 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">艺术风格</Label>
            <div className="grid grid-cols-1 gap-2">
              {styleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    setParams((prev) => ({ ...prev, style: option.value }))
                  }
                  className={`flex flex-col items-start gap-1 p-3 rounded-lg border-2 transition-all hover:bg-accent/50 ${
                    params.style === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border"
                  }`}
                >
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 生成数量 */}
        <div className="space-y-2">
          <Label htmlFor="count" className="text-sm font-medium">
            生成数量
          </Label>
          <Input
            id="count"
            type="number"
            min={1}
            max={4}
            value={params.count}
            onChange={(e) =>
              setParams((prev) => ({
                ...prev,
                count: parseInt(e.target.value) || 1,
              }))
            }
            className="w-24"
          />
          <div className="text-xs text-muted-foreground">
            一次最多生成 4 张图片
          </div>
        </div>

        <Separator />

        {/* 错误提示 */}
        {state.error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span className="font-medium">生成失败</span>
            </div>
            <p className="text-red-600 text-sm mb-3">{state.error}</p>
            <div className="flex gap-2">
              {state.retryCount < 3 && (
                <Button
                  onClick={handleRetry}
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  重试 ({3 - state.retryCount} 次)
                </Button>
              )}
              <Button
                onClick={clearError}
                variant="ghost"
                size="sm"
                className="text-red-600"
              >
                关闭
              </Button>
            </div>
          </div>
        )}

        {/* 成功提示 */}
        {state.success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span className="font-medium">生成成功！</span>
              <span className="text-sm text-green-600">
                图片已保存到历史记录
              </span>
            </div>
          </div>
        )}

        {/* 进度条 */}
        {state.isGenerating && state.progress > 0 && (
          <div className="space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${state.progress}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              生成进度 {state.progress}%
            </p>
          </div>
        )}

        {/* 生成按钮 */}
        <Button
          onClick={() => handleGenerate()}
          disabled={!params.prompt.trim() || state.isGenerating}
          className="w-full h-12 text-base font-medium"
          size="lg"
        >
          {state.isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              正在生成中...
            </>
          ) : (
            <>
              <Wand2 className="w-5 h-5 mr-2" />
              开始创作
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
