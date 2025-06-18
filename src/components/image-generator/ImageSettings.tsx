"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { sizeOptions, styleOptions } from "./constants";
import type { GenerationParams, ImageToImageParams } from "./types";
import { Palette, Maximize2, Hash, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  StylePopoverContent,
  SizePopoverContent,
  CountPopoverContent,
  StrengthSlider,
} from "./settings";

interface ImageSettingsProps {
  params: GenerationParams | ImageToImageParams;
  onParamsChange: (
    updates: Partial<GenerationParams | ImageToImageParams>
  ) => void;
  mode: "text-to-image" | "image-to-image";
}

export function ImageSettings({
  params,
  onParamsChange,
  mode,
}: ImageSettingsProps) {
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

  return (
    <div className="space-y-4">
      {/* 以图生图特有：变化强度 */}
      {mode === "image-to-image" && isImageToImageParams(params) && (
        <StrengthSlider
          strength={params.strength}
          onStrengthChange={(strength) => onParamsChange({ strength })}
        />
      )}

      <Label className="text-sm font-medium text-slate-700">图片设置</Label>

      {/* 设置按钮组 */}
      <div className="flex flex-wrap gap-3">
        {/* 艺术风格按钮 */}
        <Popover
          content={
            <StylePopoverContent
              currentStyle={params.style}
              onStyleChange={(style) => onParamsChange({ style })}
              onClose={() => setStylePopoverOpen(false)}
            />
          }
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
          content={
            <SizePopoverContent
              currentSize={params.size}
              onSizeChange={(size) => onParamsChange({ size })}
              onClose={() => setSizePopoverOpen(false)}
            />
          }
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
          content={
            <CountPopoverContent
              currentCount={params.count}
              onCountChange={(count) => onParamsChange({ count })}
              onClose={() => setCountPopoverOpen(false)}
            />
          }
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
