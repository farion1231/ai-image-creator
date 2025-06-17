import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Wand2 } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  onOptimizePrompt: () => void;
  isGenerating: boolean;
  placeholder?: string;
}

export function PromptInput({
  prompt,
  onPromptChange,
  onOptimizePrompt,
  isGenerating,
  placeholder = "例如：一只可爱的小猫坐在彩虹桥上，背景是星空，梦幻风格...",
}: PromptInputProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="prompt" className="text-sm font-medium">
          描述你的创意 *
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onOptimizePrompt}
          disabled={!prompt.trim() || isGenerating}
          className="text-xs"
        >
          <Wand2 className="w-3 h-3 mr-1" />
          AI优化
        </Button>
      </div>
      <Textarea
        id="prompt"
        placeholder={placeholder}
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        className="min-h-[100px] resize-none"
        maxLength={500}
      />
      <div className="text-xs text-muted-foreground text-right">
        {prompt.length}/500
      </div>
    </div>
  );
}
