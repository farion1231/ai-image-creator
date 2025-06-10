import { RefreshCw } from "lucide-react";

interface EmptyStateProps {
  isLoading: boolean;
  hasSearchTerm: boolean;
}

export function EmptyState({ isLoading, hasSearchTerm }: EmptyStateProps) {
  if (isLoading) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
        加载中...
      </div>
    );
  }

  return (
    <div className="text-center py-8 text-muted-foreground">
      {hasSearchTerm ? "没有找到相关作品" : "还没有生成过图片"}
    </div>
  );
}
