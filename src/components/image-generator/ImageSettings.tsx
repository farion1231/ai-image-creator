"use client";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { sizeOptions, styleOptions } from "./constants";
import type { GenerationParams } from "./types";
import { Palette, Maximize2, Hash, Check, ChevronDown } from "lucide-react";

interface ImageSettingsProps {
  params: GenerationParams;
  onParamsChange: (updates: Partial<GenerationParams>) => void;
}

export function ImageSettings({ params, onParamsChange }: ImageSettingsProps) {
  const currentStyle = styleOptions.find((s) => s.value === params.style);
  const currentSize = sizeOptions.find((s) => s.value === params.size);

  // 风格选择弹窗内容
  const StylePopoverContent = () => (
    <div className="w-80">
      <div className="mb-3 font-medium text-slate-700">选择艺术风格</div>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {styleOptions.map((style) => (
          <Button
            key={style.value}
            variant="ghost"
            onClick={() => onParamsChange({ style: style.value })}
            className={`w-full justify-start p-3 h-auto text-left ${
              params.style === style.value
                ? "bg-sky-50 border border-sky-200 text-sky-700"
                : "hover:bg-slate-50"
            }`}
          >
            <div className="flex items-center w-full">
              <div className="flex-1">
                <div className="font-medium text-sm">{style.label}</div>
                <div className="text-xs text-slate-500 mt-1">
                  {style.description}
                </div>
              </div>
              {params.style === style.value && (
                <Check className="w-4 h-4 text-sky-600 ml-2" />
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );

  // 尺寸选择弹窗内容
  const SizePopoverContent = () => (
    <div className="w-72">
      <div className="mb-3 font-medium text-slate-700">选择图片尺寸</div>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {sizeOptions.map((size) => {
          const Icon = size.icon;
          return (
            <Button
              key={size.value}
              variant="ghost"
              onClick={() => onParamsChange({ size: size.value })}
              className={`w-full justify-start p-3 h-auto text-left ${
                params.size === size.value
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-700"
                  : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center w-full">
                <Icon className="w-4 h-4 mr-3 text-slate-500" />
                <div className="flex-1">
                  <div className="font-medium text-sm">{size.label}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {size.value}
                  </div>
                </div>
                {params.size === size.value && (
                  <Check className="w-4 h-4 text-emerald-600 ml-2" />
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
    <div className="w-48">
      <div className="mb-3 font-medium text-slate-700">生成数量</div>
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((count) => (
          <Button
            key={count}
            variant="ghost"
            onClick={() => onParamsChange({ count })}
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
      <div className="mt-3 text-xs text-slate-500">一次最多生成 4 张图片</div>
    </div>
  );

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-slate-700">图片设置</Label>

      {/* 设置按钮组 */}
      <div className="flex flex-wrap gap-3">
        {/* 艺术风格按钮 */}
        <Popover content={<StylePopoverContent />} placement="bottom">
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
        <Popover content={<SizePopoverContent />} placement="bottom">
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
        <Popover content={<CountPopoverContent />} placement="bottom">
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

      {/* 当前选择预览 */}
      <div className="bg-slate-50 rounded-lg p-3">
        <div className="text-xs text-slate-600 mb-2">当前设置</div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Palette className="w-3 h-3 text-sky-500" />
            <span className="text-slate-600">风格:</span>
            <span className="font-medium text-slate-800">
              {currentStyle?.label || "未选择"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Maximize2 className="w-3 h-3 text-emerald-500" />
            <span className="text-slate-600">尺寸:</span>
            <span className="font-medium text-slate-800">
              {currentSize?.label || "未选择"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="w-3 h-3 text-amber-500" />
            <span className="text-slate-600">数量:</span>
            <span className="font-medium text-slate-800">
              {params.count} 张
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
