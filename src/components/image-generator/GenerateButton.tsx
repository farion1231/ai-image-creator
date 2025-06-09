import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  disabled: boolean;
}

export function GenerateButton({
  onGenerate,
  isGenerating,
  disabled,
}: GenerateButtonProps) {
  return (
    <Button
      onClick={onGenerate}
      disabled={disabled}
      className="w-full h-12 text-base font-medium"
      size="lg"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          正在生成中...
        </>
      ) : (
        <>
          <Wand2 className="w-5 h-5 mr-2" />
          开始创作
        </>
      )}
    </Button>
  );
}
