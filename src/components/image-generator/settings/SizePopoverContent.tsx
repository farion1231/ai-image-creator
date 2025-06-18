"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { sizeOptions } from "../constants";

interface SizePopoverContentProps {
  currentSize: string;
  onSizeChange: (size: string) => void;
  onClose: () => void;
}

export function SizePopoverContent({
  currentSize,
  onSizeChange,
  onClose,
}: SizePopoverContentProps) {
  return (
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
                onSizeChange(size.value);
                onClose();
              }}
              className={`w-full justify-start p-3 h-auto text-left ${
                currentSize === size.value
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
                {currentSize === size.value && (
                  <Check className="w-4 h-4 text-emerald-600 ml-2 flex-shrink-0" />
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
