import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const routes: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/hizmetler", priority: 0.9, changeFrequency: "monthly" },
  { path: "/web-projelerimiz", priority: 0.8, changeFrequency: "monthly" },
  { path: "/qr-projelerimiz", priority: 0.8, changeFrequency: "monthly" },
  { path: "/data", priority: 0.8, changeFrequency: "monthly" },
  { path: "/hakkimizda", priority: 0.7, changeFrequency: "monthly" },
  { path: "/iletisim", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
