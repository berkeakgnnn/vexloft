import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getActiveBusinesses } from "@/lib/api";

const routes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/hizmetler", priority: 0.9, changeFrequency: "monthly" },
  { path: "/web-projelerimiz", priority: 0.8, changeFrequency: "monthly" },
  { path: "/data", priority: 0.8, changeFrequency: "monthly" },
  { path: "/hakkimizda", priority: 0.7, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.7, changeFrequency: "monthly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  // The QR showcase is listed only while the menu API actually returns menus
  // (it is noindex otherwise), so the sitemap never points at an empty page.
  const businesses = await getActiveBusinesses();
  const all =
    businesses.length > 0
      ? [
          ...routes,
          {
            path: "/qr-projelerimiz",
            priority: 0.8,
            changeFrequency: "monthly" as const,
          },
        ]
      : routes;
  return all.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
