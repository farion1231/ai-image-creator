"use client";

import { Button } from "@/components/ui/button";

interface CountPopoverContentProps {
  currentCount: number;
  onCountChange: (count: number) => void;
  onClose: () => void;
}

export function CountPopoverContent({
  currentCount,
  onCountChange,
  onClose,
}: CountPopoverContentProps) {
  return (
    <div className="w-48 max-w-[192px]">
      <div className="mb-3 font-medium text-slate-700">生成数量</div>
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((count) => (
          <Button
            key={count}
            variant="ghost"
            onClick={() => {
              onCountChange(count);
              onClose();
            }}
            className={`p-3 h-auto ${
              currentCount === count
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
}
