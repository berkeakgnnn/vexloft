// Live Excel embeds.
//
// To make the "Canlı Excel" tab show a real, interactive workbook:
//   1. Upload the matching file from public/demo/excel/ to OneDrive (or Microsoft 365).
//   2. Open it in Excel for the web -> File -> Share -> Embed -> Generate.
//   3. Copy ONLY the src="..." URL from the <iframe> it gives you.
//   4. Paste that URL below, replacing null.
//
// While a value is null, the tab gracefully falls back to a preview + download button.

export const excelEmbeds: Record<string, string | null> = {
  sales: null,
  inventory: null,
  procurement: null,
  executive: null,
};

export function excelDownloadPath(slug: string): string {
  return `/demo/excel/${slug}-dashboard.xlsx`;
}
