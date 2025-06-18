"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { styleOptions } from "../constants";

interface StylePopoverContentProps {
  currentStyle: string;
  onStyleChange: (style: string) => void;
  onClose: () => void;
}

export function StylePopoverContent({
  currentStyle,
  onStyleChange,
  onClose,
}: StylePopoverContentProps) {
  return (
    <div className="w-80 max-w-[320px]">
      <div className="mb-3 font-medium text-slate-700">选择艺术风格</div>
      <div className="space-y-2 max-h-60 overflow-y-auto overflow-x-hidden">
        {styleOptions.map((style) => (
          <Button
            key={style.value}
            variant="ghost"
            onClick={() => {
              onStyleChange(style.value);
              onClose();
            }}
            className={`w-full justify-start p-3 h-auto text-left ${
              currentStyle === style.value
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
              {currentStyle === style.value && (
                <Check className="w-4 h-4 text-sky-600 ml-2 flex-shrink-0" />
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}
