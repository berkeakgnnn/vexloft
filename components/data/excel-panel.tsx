"use client";

import { Download, FileSpreadsheet, ExternalLink } from "lucide-react";

interface ExcelPanelProps {
  company: string;
  embedUrl: string | null;
  downloadPath: string;
}

export function ExcelPanel({
  company,
  embedUrl,
  downloadPath,
}: ExcelPanelProps): React.ReactElement {
  return (
    <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
          <div>
            <h3 className="font-display text-sm font-bold text-white">
              Live Excel workbook
            </h3>
            <p className="text-xs text-white/40">
              The real .xlsx behind this dashboard — interact with it directly.
            </p>
          </div>
        </div>
        <a
          href={downloadPath}
          download
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition-transform active:scale-95"
        >
          <Download className="h-4 w-4" />
          Download .xlsx
        </a>
      </div>

      {embedUrl ? (
        <div className="overflow-hidden rounded-xl border border-white/10 bg-white">
          <iframe
            src={embedUrl}
            title={`${company} — live Excel dashboard`}
            className="h-[70vh] min-h-[520px] w-full"
            frameBorder={0}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[0.02] px-6 py-14 text-center">
          <FileSpreadsheet className="mb-3 h-10 w-10 text-white/25" />
          <p className="max-w-md text-sm text-white/60">
            The interactive live-embed of this workbook is being set up. In the
            meantime, download the real Excel file — every chart, KPI and table
            you see above is fully built inside it.
          </p>
          <a
            href={downloadPath}
            download
            className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-white/30"
          >
            <ExternalLink className="h-4 w-4" />
            Open the .xlsx
          </a>
        </div>
      )}

      <p className="mt-4 text-center text-[11px] text-white/30">
        Sample project — figures are representative and use fictional data.
      </p>
    </div>
  );
}
