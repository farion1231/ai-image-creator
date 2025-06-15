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
          <select
            value={params.size}
            onChange={(e) => onParamsChange({ size: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">选择图片尺寸</option>
            {sizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* 风格选择 */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">艺术风格</Label>
          <select
            value={params.style}
            onChange={(e) => onParamsChange({ style: e.target.value })}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">选择艺术风格</option>
            {styleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label} - {option.description}
              </option>
            ))}
          </select>
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
