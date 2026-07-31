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
      <div className="inline-flex flex-wrap gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={
                active
                  ? "rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-indigo-900/30"
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
        className="min-h-[44px] cursor-pointer rounded-xl border border-white/10 bg-[#0d1424] px-3 py-2 text-sm font-medium text-white/85 outline-none transition-colors hover:border-white/25 focus:border-indigo-400"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0d1424]">
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}
