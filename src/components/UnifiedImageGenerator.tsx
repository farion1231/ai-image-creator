"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Palette, ImageIcon } from "lucide-react";

import { PromptInput } from "./image-generator/PromptInput";
import { ImageUpload } from "./image-generator/ImageUpload";
import { SharedSettings } from "./image-generator/SharedSettings";
import { StatusMessages } from "./image-generator/StatusMessages";
import { ProgressBar } from "./image-generator/ProgressBar";
import { GenerateButton } from "./image-generator/GenerateButton";
import { useImageGeneration } from "./image-generator/useImageGeneration";
import { useImageToImageGeneration } from "./image-generator/useImageToImageGeneration";

type GenerationMode = "text-to-image" | "image-to-image";

export function UnifiedImageGenerator() {
  const [mode, setMode] = useState<GenerationMode>("text-to-image");

  // 文本生图 Hook
  const textToImageHook = useImageGeneration();

  // 以图生图 Hook
  const imageToImageHook = useImageToImageGeneration();

  // 根据模式选择对应的 Hook
  const currentHook =
    mode === "text-to-image" ? textToImageHook : imageToImageHook;
  const {
    params,
    state,
    updateParams,
    handleGenerate,
    handleRetry,
    clearError,
    handleOptimizePrompt,
  } = currentHook;

  // 以图生图专有功能
  const { uploadState, handleFileSelect, handleRemoveImage } =
    mode === "image-to-image"
      ? imageToImageHook
      : {
          uploadState: null,
          handleFileSelect: () => {},
          handleRemoveImage: () => {},
        };

  // 计算是否可以生成
  const canGenerate =
    mode === "text-to-image"
      ? params.prompt.trim() && !state.isGenerating
      : params.prompt.trim() &&
        "imageFile" in params &&
        params.imageFile &&
        !state.isGenerating;

  // 获取按钮文本
  const getButtonText = () => {
    if (mode === "text-to-image") {
      return "开始生成图片";
    } else {
      if (!("imageFile" in params && params.imageFile))
        return "请先上传参考图片";
      if (!params.prompt.trim()) return "请输入描述文字";
      return "开始生成图片";
    }
  };

  return (
    <Card className="gradient-card card-shadow border-blue-100/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-700">
          <div className="p-2 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl shadow-lg">
            {mode === "text-to-image" ? (
              <Palette className="w-5 h-5 text-white" />
            ) : (
              <ImageIcon className="w-5 h-5 text-white" />
            )}
          </div>
          AI 图片生成器
        </CardTitle>
        <CardDescription className="text-slate-600">
          {mode === "text-to-image"
            ? "描述你想要的图片，AI 将为你生成精美的作品"
            : "上传一张参考图片，结合描述文字，AI 将在其基础上创作新的图片"}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 模式切换 */}
        <div className="flex gap-2 p-1 bg-slate-100 rounded-lg">
          <Button
            variant={mode === "text-to-image" ? "default" : "ghost"}
            onClick={() => setMode("text-to-image")}
            className={`flex-1 ${
              mode === "text-to-image"
                ? "bg-sky-500 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Palette className="w-4 h-4 mr-2" />
            文本生图
          </Button>
          <Button
            variant={mode === "image-to-image" ? "default" : "ghost"}
            onClick={() => setMode("image-to-image")}
            className={`flex-1 ${
              mode === "image-to-image"
                ? "bg-sky-500 text-white shadow-sm"
                : "text-slate-600 hover:bg-slate-200"
            }`}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            以图生图
          </Button>
        </div>

        {/* 以图生图模式：图片上传 */}
        {mode === "image-to-image" && uploadState && (
          <>
            <ImageUpload
              uploadState={uploadState}
              onFileSelect={handleFileSelect}
              onRemoveImage={handleRemoveImage}
              disabled={state.isGenerating}
            />
            <Separator className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 h-px" />
          </>
        )}

        {/* 提示词输入 */}
        <PromptInput
          prompt={params.prompt}
          onPromptChange={(prompt) => updateParams({ prompt })}
          onOptimizePrompt={handleOptimizePrompt}
          isGenerating={state.isGenerating}
          placeholder={
            mode === "text-to-image"
              ? "描述你想要生成的图片..."
              : "描述你希望对这张图片做什么改变..."
          }
        />

        <Separator className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 h-px" />

        {/* 共享设置 */}
        <SharedSettings
          params={params}
          onParamsChange={updateParams}
          mode={mode}
        />

        <Separator className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 h-px" />

        {/* 状态消息 */}
        <StatusMessages
          state={state}
          onRetry={handleRetry}
          onClearError={clearError}
        />

        {/* 进度条 */}
        <ProgressBar
          progress={state.progress}
          isVisible={state.isGenerating && state.progress > 0}
        />

        {/* 生成按钮 */}
        <GenerateButton
          onGenerate={() => handleGenerate()}
          isGenerating={state.isGenerating}
          disabled={!canGenerate}
          buttonText={getButtonText()}
        />
      </CardContent>
    </Card>
  );
}
