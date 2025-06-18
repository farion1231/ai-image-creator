"use client";

import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface StrengthSliderProps {
  strength: number;
  onStrengthChange: (strength: number) => void;
}

export function StrengthSlider({
  strength,
  onStrengthChange,
}: StrengthSliderProps) {
  const getStrengthDescription = (value: number) => {
    if (value <= 0.3) return "轻微调整，保持原图主要特征";
    if (value <= 0.7) return "中度变化，在原图基础上创新";
    return "大幅改变，仅保留基本构图";
  };

  return (
    <>
      <div className="space-y-3">
        <Label className="text-sm font-medium text-slate-700">
          变化强度：{Math.round(strength * 100)}%
        </Label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={strength}
            onChange={(e) => onStrengthChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="text-xs text-slate-500 flex justify-between">
            <span>保持原样</span>
            <span>完全改变</span>
          </div>
          <div className="text-sm text-slate-600">
            {getStrengthDescription(strength)}
          </div>
        </div>
      </div>
      <Separator className="bg-gradient-to-r from-sky-200 via-blue-200 to-cyan-200 h-px" />
    </>
  );
}
