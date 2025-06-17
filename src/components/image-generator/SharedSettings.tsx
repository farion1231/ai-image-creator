"use client";

import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { sizeOptions, styleOptions } from "./constants";
import type { GenerationParams, ImageToImageParams } from "./types";
import { useState } from "react";
import { Palette, Maximize2, Hash, ChevronDown, ChevronUp } from "lucide-react";

interface SharedSettingsProps {
  params: GenerationParams | ImageToImageParams;
  onParamsChange: (
    updates: Partial<GenerationParams | ImageToImageParams>
  ) => void;
  mode: "text-to-image" | "image-to-image";
}

export function SharedSettings({
  params,
  onParamsChange,
  mode,
}: SharedSettingsProps) {
  const [activeTab, setActiveTab] = useState<"style" | "size" | "count">(
    "style"
  );
  const [isExpanded, setIsExpanded] = useState(false);

  // 类型守护函数
  const isImageToImageParams = (
    p: GenerationParams | ImageToImageParams
  ): p is ImageToImageParams => {
    return mode === "image-to-image" && "strength" in p;
  };

  const tabs = [
    { id: "style", label: "风格", icon: Palette, count: styleOptions.length },
    { id: "size", label: "尺寸", icon: Maximize2, count: sizeOptions.length },
    { id: "count", label: "数量", icon: Hash, count: 4 },
  ] as const;

  const currentStyle = styleOptions.find((s) => s.value === params.style);
  const currentSize = sizeOptions.find((s) => s.value === params.size);

  return (
    <div className="space-y-4">
      {/* 以图生图特有：变化强度 */}
      {mode === "image-to-image" && isImageToImageParams(params) && (
        <>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">
              变化强度：{Math.round(params.strength * 100)}%
            </Label>
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={params.strength}
                onChange={(e) =>
                  onParamsChange({ strength: parseFloat(e.target.value) })
                }
                className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-xs text-slate-500 flex justify-between">
                <span>保持原样</span>
                <span>完全改变</span>
              </div>
              <div className="text-sm text-slate-600">
                {params.strength <= 0.3
                  ? "轻微调整，保持原图主要特征"
                  : params.strength <= 0.7
                  ? "中度变化，在原图基础上创新"
                  : "大幅改变，仅保留基本构图"}
              </div>
            </div>
          </div>
          <Separator className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 h-px" />
        </>
      )}

      {/* 紧凑设置区域 */}
      <Card className="border-sky-100/60 shadow-sm">
        <CardContent className="p-4">
          {/* 当前选择概览 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-sky-500" />
                <span className="text-slate-600">风格:</span>
                <span className="font-medium text-slate-800">
                  {currentStyle?.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize2 className="w-4 h-4 text-emerald-500" />
                <span className="text-slate-600">尺寸:</span>
                <span className="font-medium text-slate-800">
                  {currentSize?.label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Hash className="w-4 h-4 text-amber-500" />
                <span className="text-slate-600">数量:</span>
                <span className="font-medium text-slate-800">
                  {params.count} 张
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sky-600 hover:text-sky-700 hover:bg-sky-50"
            >
              {isExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              {isExpanded ? "收起" : "展开"}
            </Button>
          </div>

          {/* 展开的详细设置 */}
          {isExpanded && (
            <div className="space-y-4">
              {/* 选项卡导航 */}
              <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex-1 justify-center ${
                        activeTab === tab.id
                          ? "bg-white text-sky-700 shadow-sm"
                          : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {tab.label}
                      <span className="text-xs opacity-60">({tab.count})</span>
                    </button>
                  );
                })}
              </div>

              {/* 选项卡内容 */}
              <div className="min-h-[200px]">
                {/* 风格选项 */}
                {activeTab === "style" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 gap-2">
                      {styleOptions.map((style) => (
                        <Button
                          key={style.value}
                          variant={
                            params.style === style.value ? "default" : "outline"
                          }
                          onClick={() => onParamsChange({ style: style.value })}
                          className={`p-4 h-auto text-left transition-all duration-200 ${
                            params.style === style.value
                              ? "bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-lg"
                              : "border-sky-200 hover:border-sky-300 hover:bg-sky-50"
                          }`}
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{style.label}</div>
                            <div className="text-xs opacity-80">
                              {style.description}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 尺寸选项 */}
                {activeTab === "size" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sizeOptions.map((size) => {
                        const Icon = size.icon;
                        return (
                          <Button
                            key={size.value}
                            variant={
                              params.size === size.value ? "default" : "outline"
                            }
                            onClick={() => onParamsChange({ size: size.value })}
                            className={`p-3 h-auto text-left transition-all duration-200 ${
                              params.size === size.value
                                ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg"
                                : "border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              <div className="space-y-1">
                                <div className="font-medium text-sm">
                                  {size.label}
                                </div>
                                <div className="text-xs opacity-75">
                                  {size.value}
                                </div>
                              </div>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 数量选项 */}
                {activeTab === "count" && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      {[1, 2, 3, 4].map((count) => (
                        <Button
                          key={count}
                          variant={
                            params.count === count ? "default" : "outline"
                          }
                          onClick={() => onParamsChange({ count })}
                          className={`p-4 h-auto transition-all duration-200 ${
                            params.count === count
                              ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                              : "border-amber-200 hover:border-amber-300 hover:bg-amber-50"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold mb-1">
                              {count}
                            </div>
                            <div className="text-xs opacity-80">张图片</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
