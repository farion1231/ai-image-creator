"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Palette } from "lucide-react";

import { PromptInput } from "./image-generator/PromptInput";
import { ImageSettings } from "./image-generator/ImageSettings";
import { StatusMessages } from "./image-generator/StatusMessages";
import { ProgressBar } from "./image-generator/ProgressBar";
import { GenerateButton } from "./image-generator/GenerateButton";
import { useImageGeneration } from "./image-generator/useImageGeneration";

export function ImageGenerator() {
  const {
    params,
    state,
    updateParams,
    handleGenerate,
    handleRetry,
    clearError,
    handleOptimizePrompt,
  } = useImageGeneration();

  return (
    <Card className="gradient-card card-shadow border-blue-100/50 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-700">
          <div className="p-2 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl shadow-lg">
            <Palette className="w-5 h-5 text-white" />
          </div>
          创作图片
        </CardTitle>
        <CardDescription className="text-slate-600">
          描述你想要的图片，AI 将为你生成精美的作品
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* 提示词输入 */}
        <PromptInput
          prompt={params.prompt}
          onPromptChange={(prompt) => updateParams({ prompt })}
          onOptimizePrompt={handleOptimizePrompt}
          isGenerating={state.isGenerating}
        />

        <Separator className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 h-px" />

        {/* 图片设置 */}
        <ImageSettings params={params} onParamsChange={updateParams} />

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
          disabled={!params.prompt.trim() || state.isGenerating}
        />
      </CardContent>
    </Card>
  );
}
