interface ChartCardProps {
  title: string;
  subtitle?: string;
  className?: string;
  children: React.ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  className = "",
  children,
}: ChartCardProps): React.ReactElement {
  return (
    <div
      className={`flex flex-col rounded-2xl border border-white/8 bg-white/[0.03] p-5 ${className}`}
    >
      <div className="mb-4">
        <h3 className="font-display text-sm font-bold text-white">{title}</h3>
        {subtitle && <p className="mt-0.5 text-xs text-white/40">{subtitle}</p>}
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
