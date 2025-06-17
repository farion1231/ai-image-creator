"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ImageIcon } from "lucide-react";

import { PromptInput } from "./image-generator/PromptInput";
import { ImageUpload } from "./image-generator/ImageUpload";
import { ImageToImageSettings } from "./image-generator/ImageToImageSettings";
import { StatusMessages } from "./image-generator/StatusMessages";
import { ProgressBar } from "./image-generator/ProgressBar";
import { GenerateButton } from "./image-generator/GenerateButton";
import { useImageToImageGeneration } from "./image-generator/useImageToImageGeneration";

export function ImageToImageGenerator() {
  const {
    params,
    state,
    uploadState,
    updateParams,
    handleFileSelect,
    handleRemoveImage,
    handleGenerate,
    handleRetry,
    clearError,
    handleOptimizePrompt,
  } = useImageToImageGeneration();

  const canGenerate =
    params.prompt.trim() && params.imageFile && !state.isGenerating;

  return (
    <Card className="gradient-card card-shadow border-blue-100/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-700">
          <div className="p-2 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl shadow-lg">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          以图生图
        </CardTitle>
        <CardDescription className="text-slate-600">
          上传一张参考图片，结合描述文字，AI 将在其基础上创作新的图片
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 图片上传 */}
        <ImageUpload
          uploadState={uploadState}
          onFileSelect={handleFileSelect}
          onRemoveImage={handleRemoveImage}
          disabled={state.isGenerating}
        />

        <Separator className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 h-px" />

        {/* 提示词输入 */}
        <PromptInput
          prompt={params.prompt}
          onPromptChange={(prompt) => updateParams({ prompt })}
          onOptimizePrompt={handleOptimizePrompt}
          isGenerating={state.isGenerating}
          placeholder="描述你希望对这张图片做什么改变..."
        />

        <Separator className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 h-px" />

        {/* 图片设置 */}
        <ImageToImageSettings params={params} onParamsChange={updateParams} />

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
          buttonText={
            !params.imageFile
              ? "请先上传参考图片"
              : !params.prompt.trim()
              ? "请输入描述文字"
              : "开始生成图片"
          }
        />
      </CardContent>
    </Card>
  );
}
