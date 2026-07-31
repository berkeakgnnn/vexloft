// Live Excel embeds.
//
// The "Live Excel" tab renders the real .xlsx interactively in the browser using
// Microsoft's public Office Online viewer — no Microsoft/OneDrive account required.
// It works because our workbooks are served from a public HTTPS URL that Microsoft
// can reach (public/demo/excel/*.xlsx on data.vexloft.com).
//
// To use a full Excel-for-the-web embed instead (editable slicers, your own OneDrive),
// replace the value for a slug with the src="..." URL from OneDrive → Share → Embed.

const PUBLIC_XLSX_BASE = "https://data.vexloft.com/demo/excel";

function officeViewer(slug: string): string {
  const src = `${PUBLIC_XLSX_BASE}/${slug}-dashboard.xlsx`;
  return `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`;
}

export const excelEmbeds: Record<string, string | null> = {
  sales: officeViewer("sales"),
  inventory: officeViewer("inventory"),
  procurement: officeViewer("procurement"),
  executive: officeViewer("executive"),
};

export function excelDownloadPath(slug: string): string {
  return `/demo/excel/${slug}-dashboard.xlsx`;
}
