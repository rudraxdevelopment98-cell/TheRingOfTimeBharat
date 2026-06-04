interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  color?: string;
}

export function ProgressBar({ value, max = 100, showLabel = false, color = "var(--accent-primary)" }: ProgressBarProps) {
  const safeMax = max <= 0 ? 1 : max;
  const pct = Math.min(100, Math.max(0, (value / safeMax) * 100));

  return (
    <div className="w-full">
      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--bg-elevated)" }}
        role="progressbar"
        aria-valuenow={Math.round(pct)}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <div
          className="mt-1.5 text-xs"
          style={{ color: "var(--text-faint)", fontFamily: "var(--font-fira-code)" }}
        >
          {Math.round(pct)}%
        </div>
      )}
    </div>
  );
}
