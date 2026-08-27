"use client";

interface Option {
  label: string;
  value: string;
}

interface SegmentedProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function Segmented({
  options,
  value,
  onChange,
  label,
}: SegmentedProps): React.ReactElement {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <span className="text-[11px] font-medium uppercase tracking-wide text-white/40">
          {label}
        </span>
      )}
      <div className="vx-glass inline-flex flex-wrap gap-1 rounded-xl p-1">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={
                active
                  ? "vx-pill-active rounded-lg px-3 py-1.5 text-xs font-semibold"
                  : "rounded-lg px-3 py-1.5 text-xs font-medium text-white/55 transition-colors hover:text-white"
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface SelectFilterProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export function SelectFilter({
  label,
  options,
  value,
  onChange,
}: SelectFilterProps): React.ReactElement {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium uppercase tracking-wide text-white/40">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="vx-glass min-h-[44px] cursor-pointer rounded-xl px-3 py-2 text-sm font-medium text-white/85 outline-none transition-colors hover:border-white/25 focus:border-[var(--vx-accent)]"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0e1422]">
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
