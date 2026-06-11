'use client';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-sage font-body">
          Câu hỏi {current}/{total}
        </span>
        <span className="text-sm font-medium text-sage font-body">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="h-2 bg-white/50 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-sage to-deep-green rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
