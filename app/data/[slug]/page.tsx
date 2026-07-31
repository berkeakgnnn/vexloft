import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDashboard, dashboardSlugs } from "@/lib/demo-data";
import { getExcelEmbed, excelDownloadPath } from "@/lib/demo-data/embeds";
import { DashboardExperience } from "@/components/data/dashboard-experience";

export function generateStaticParams(): Array<{ slug: string }> {
  return dashboardSlugs.map((slug) => ({ slug }));
}

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<React.ReactElement> {
  const { slug } = await params;
  const data = getDashboard(slug);
  if (!data) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/data"
        className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        All dashboards
      </Link>
      <DashboardExperience
        data={data}
        embedUrl={getExcelEmbed(slug)}
        downloadPath={excelDownloadPath(slug)}
      />
    </div>
  );
}
