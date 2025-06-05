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
import { Wand2, Loader2, Palette, Monitor, Smartphone } from "lucide-react";

interface GenerationParams {
  prompt: string;
  size: string;
  count: number;
  style: string;
}

export function ImageGenerator() {
  const [params, setParams] = useState<GenerationParams>({
    prompt: "",
    size: "1024x1024",
    count: 1,
    style: "realistic",
  });

  const [isGenerating, setIsGenerating] = useState(false);

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

  const handleGenerate = async () => {
    if (!params.prompt.trim()) return;

    setIsGenerating(true);
    try {
      // TODO: 实际的 API 调用将在下个阶段实现
      console.log("生成参数:", params);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // 模拟 API 调用
    } catch (error) {
      console.error("生成失败:", error);
    } finally {
      setIsGenerating(false);
    }
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

        {/* 生成按钮 */}
        <Button
          onClick={handleGenerate}
          disabled={!params.prompt.trim() || isGenerating}
          className="w-full h-12 text-base font-medium"
          size="lg"
        >
          {isGenerating ? (
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
