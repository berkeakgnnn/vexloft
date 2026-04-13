import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WebProjectCard, type WebProject } from "@/components/web-projelerimiz/web-project-card";

export const metadata: Metadata = {
  title: "Web Projelerimiz | Vexloft",
  description:
    "Vexloft tarafından hayata geçirilen web platformları ve ürünler.",
};

const webProjects: WebProject[] = [
  {
    id: "alkor-cms",
    name: "Alkor CMS",
    description:
      "Çok dilli içerik yönetim sistemi — sayfalar, hizmetler, projeler ve medya yönetimi tek panelden.",
    badge: "CMS",
    tags: ["Next.js", "Multi-language", "Admin Panel", "REST API"],
    href: "#",
  },
];

export default function WebProjelerimizPage(): React.ReactElement {
  return (
    <div className="noise-bg">
      <Navbar />

      <main
        className="min-h-screen pt-32 pb-24"
        style={{ backgroundColor: "#060a14" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16">
            <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text mb-4">
              WEB PROJELERİ
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
            >
              Web Projelerimiz
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-xl">
              Vexloft tarafından hayata geçirilen web platformları ve ürünler.
            </p>
          </div>

          <div className="gradient-line mb-16" />

          {/* Project cards */}
          <div className="space-y-8">
            {webProjects.map((project, index) => (
              <WebProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={index === 0}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Kendi projeniz için bir şeyler yapalım mı?
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-0.5"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
