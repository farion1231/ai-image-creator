import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { sizeOptions, styleOptions } from "./constants";
import type { GenerationParams } from "./types";

interface ImageSettingsProps {
  params: GenerationParams;
  onParamsChange: (updates: Partial<GenerationParams>) => void;
}

export function ImageSettings({ params, onParamsChange }: ImageSettingsProps) {
  return (
    <div className="space-y-6">
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
                  onClick={() => onParamsChange({ size: option.value })}
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
                onClick={() => onParamsChange({ style: option.value })}
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
            onParamsChange({ count: parseInt(e.target.value) || 1 })
          }
          className="w-24"
        />
        <div className="text-xs text-muted-foreground">
          一次最多生成 4 张图片
        </div>
      </div>
    </div>
  );
}
