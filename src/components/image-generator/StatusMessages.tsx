import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, RefreshCw } from "lucide-react";
import type { GenerationState } from "./types";

interface StatusMessagesProps {
  state: GenerationState;
  onRetry: () => void;
  onClearError: () => void;
}

export function StatusMessages({
  state,
  onRetry,
  onClearError,
}: StatusMessagesProps) {
  return (
    <>
      {/* 错误提示 */}
      {state.error && (
        <div className="bg-red-50/80 border border-red-200/60 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-red-700 mb-2">
            <AlertTriangle className="w-4 h-4" />
            <span className="font-medium">生成失败</span>
          </div>
          <p className="text-red-600 text-sm mb-3">{state.error}</p>
          <div className="flex gap-2">
            {state.retryCount < 3 && (
              <Button
                onClick={onRetry}
                variant="outline"
                size="sm"
                className="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                重试 ({3 - state.retryCount} 次)
              </Button>
            )}
            <Button
              onClick={onClearError}
              variant="ghost"
              size="sm"
              className="text-red-600 hover:bg-red-50"
            >
              关闭
            </Button>
          </div>
        </div>
      )}

      {/* 成功提示 */}
      {state.success && (
        <div className="bg-gradient-to-r from-emerald-50/90 to-green-50/90 border border-emerald-200/60 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">生成成功！</span>
            <span className="text-sm text-emerald-600">
              图片已保存到历史记录
            </span>
          </div>
        </div>
      )}
    </>
  );
}
