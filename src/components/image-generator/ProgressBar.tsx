interface ProgressBarProps {
  progress: number;
  isVisible: boolean;
}

export function ProgressBar({ progress, isVisible }: ProgressBarProps) {
  if (!isVisible) return null;

  return (
    <div className="space-y-2">
      <div className="w-full bg-sky-100/50 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-sky-400 to-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-inner"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-slate-600 text-center font-medium">
        生成进度 {progress}%
      </p>
    </div>
  );
}
