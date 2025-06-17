"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { sizeOptions, styleOptions } from "./constants";
import type { GenerationParams, ImageToImageParams } from "./types";
import { Palette, Maximize2, Hash, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

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
  // 弹窗状态管理
  const [stylePopoverOpen, setStylePopoverOpen] = useState(false);
  const [sizePopoverOpen, setSizePopoverOpen] = useState(false);
  const [countPopoverOpen, setCountPopoverOpen] = useState(false);

  // 类型守护函数
  const isImageToImageParams = (
    p: GenerationParams | ImageToImageParams
  ): p is ImageToImageParams => {
    return mode === "image-to-image" && "strength" in p;
  };

  const currentStyle = styleOptions.find((s) => s.value === params.style);
  const currentSize = sizeOptions.find((s) => s.value === params.size);

  // 风格选择弹窗内容
  const StylePopoverContent = () => (
    <div className="w-80 max-w-[320px]">
      <div className="mb-3 font-medium text-slate-700">选择艺术风格</div>
      <div className="space-y-2 max-h-60 overflow-y-auto overflow-x-hidden">
        {styleOptions.map((style) => (
          <Button
            key={style.value}
            variant="ghost"
            onClick={() => {
              onParamsChange({ style: style.value });
              setStylePopoverOpen(false);
            }}
            className={`w-full justify-start p-3 h-auto text-left ${
              params.style === style.value
                ? "bg-sky-50 border border-sky-200 text-sky-700"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center w-full min-w-0">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {style.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 break-words">
                  {style.description}
                </div>
              </div>
              {params.style === style.value && (
                <Check className="w-4 h-4 text-sky-600 ml-2 flex-shrink-0" />
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  // 尺寸选择弹窗内容
  const SizePopoverContent = () => (
    <div className="w-72 max-w-[288px]">
      <div className="mb-3 font-medium text-slate-700">选择图片尺寸</div>
      <div className="space-y-2 max-h-60 overflow-y-auto overflow-x-hidden">
        {sizeOptions.map((size) => {
          const Icon = size.icon;
          return (
            <Button
              key={size.value}
              variant="ghost"
              onClick={() => {
                onParamsChange({ size: size.value });
                setSizePopoverOpen(false);
              }}
              className={`w-full justify-start p-3 h-auto text-left ${
                params.size === size.value
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center w-full min-w-0">
                <Icon className="w-4 h-4 mr-3 text-slate-500 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">
                    {size.label}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 break-words">
                    {size.value}
                  </div>
                </div>
                {params.size === size.value && (
                  <Check className="w-4 h-4 text-emerald-600 ml-2 flex-shrink-0" />
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );

  // 数量选择弹窗内容
  const CountPopoverContent = () => (
    <div className="w-48 max-w-[192px]">
      <div className="mb-3 font-medium text-slate-700">生成数量</div>
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((count) => (
          <Button
            key={count}
            variant="ghost"
            onClick={() => {
              onParamsChange({ count });
              setCountPopoverOpen(false);
            }}
            className={`p-3 h-auto ${
              params.count === count
                ? "bg-amber-50 border border-amber-200 text-amber-700"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="text-center">
              <div className="text-lg font-bold">{count}</div>
              <div className="text-xs text-slate-500">张</div>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-3 text-xs text-slate-500 break-words">
        一次最多生成 4 张图片
      </div>
    </div>
  );

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

      <Label className="text-sm font-medium text-slate-700">图片设置</Label>

      {/* 设置按钮组 */}
      <div className="flex flex-wrap gap-3">
        {/* 艺术风格按钮 */}
        <Popover
          content={<StylePopoverContent />}
          placement="bottom"
          open={stylePopoverOpen}
          onOpenChange={setStylePopoverOpen}
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 border-sky-200 hover:border-sky-300 hover:bg-sky-50"
          >
            <Palette className="w-4 h-4 text-sky-500" />
            <span className="text-sm">
              {currentStyle ? currentStyle.label : "选择风格"}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </Button>
        </Popover>

        {/* 图片尺寸按钮 */}
        <Popover
          content={<SizePopoverContent />}
          placement="bottom"
          open={sizePopoverOpen}
          onOpenChange={setSizePopoverOpen}
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50"
          >
            <Maximize2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm">
              {currentSize ? currentSize.label : "选择尺寸"}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </Button>
        </Popover>

        {/* 生成数量按钮 */}
        <Popover
          content={<CountPopoverContent />}
          placement="bottom"
          open={countPopoverOpen}
          onOpenChange={setCountPopoverOpen}
        >
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 border-amber-200 hover:border-amber-300 hover:bg-amber-50"
          >
            <Hash className="w-4 h-4 text-amber-500" />
            <span className="text-sm">{params.count} 张图片</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </Button>
        </Popover>
      </div>
    </div>
  );
}
