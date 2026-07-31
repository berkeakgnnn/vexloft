// Live Excel embeds.
//
// The "Live Excel" tab renders the real .xlsx interactively in the browser using
// Microsoft's public Office Online viewer — no Microsoft/OneDrive account required.
// It works for every dashboard because each workbook is served from a public HTTPS URL
// that Microsoft can reach (public/demo/excel/*.xlsx on data.vexloft.com).

const PUBLIC_XLSX_BASE = "https://data.vexloft.com/demo/excel";

// Optional per-slug override: paste a OneDrive → Share → Embed src URL here to use a
// full Excel-for-the-web embed (editable slicers) instead of the read-only viewer.
const OVERRIDES: Record<string, string> = {};

export function getExcelEmbed(slug: string): string {
  if (OVERRIDES[slug]) return OVERRIDES[slug];
  const src = `${PUBLIC_XLSX_BASE}/${slug}-dashboard.xlsx`;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`;
}

export function excelDownloadPath(slug: string): string {
  return `/demo/excel/${slug}-dashboard.xlsx`;
}
