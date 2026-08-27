import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WebProjectCard, type WebProject } from "@/components/web-projelerimiz/web-project-card";

export const metadata: Metadata = {
  title: "Projelerimiz | Vexloft",
  description:
    "Vexloft tarafından hayata geçirilen web platformları, SaaS ürünleri ve mobil uygulamalar.",
};

// Etiketler projelerin gerçek stack'i — vitrinde yalnızca doğru bilgi durur.
const projects: WebProject[] = [
  {
    id: "barberbook",
    name: "BarberBook",
    description:
      "Berber, kuaför ve dövme stüdyoları için çok kiracılı randevu platformu. Her işletme kendi temasıyla hazır bir sayfaya, takvime ve müşteri geçmişine sahip oluyor; müşteri üye olmadan randevusunu alıyor.",
    badge: "SaaS Platform",
    status: "live",
    tags: ["Next.js 16", "PostgreSQL", "Multi-tenant", "Özel Domain", "SMS"],
    href: "https://arfabarbershop.online",
    visual: {
      kind: "browser",
      image: "/projects/barberbook.jpg",
      url: "arfabarbershop.online",
    },
  },
  {
    id: "zamlandi",
    name: "Zamlandı",
    description:
      "Aboneliklerine zam geldiğinde ilk haber veren uygulama. Fiyat değişimini biz takip ediyoruz; kullanıcı bildirimi alıyor ve zammın kendi aylık toplamına etkisini görüyor.",
    badge: "iOS Uygulama",
    status: "building",
    tags: ["React Native", "Expo", "Push Bildirim", "Otonom Zam Takibi"],
    ctaNote: "TestFlight yakında",
    visual: {
      kind: "phones",
      images: [
        "/projects/zamlandi/1.png",
        "/projects/zamlandi/2.png",
        "/projects/zamlandi/3.png",
      ],
    },
  },
  {
    id: "velora",
    name: "Velora Chocolate",
    description:
      "3D kutu konfigüratörü ile müşteri kendi çikolata kutusunu kuruyor; otellere özel sipariş akışı aynı panelden yönetiliyor.",
    badge: "E-Ticaret",
    status: "live",
    tags: ["Next.js", "Three.js", ".NET Core", "Admin Panel"],
    href: "https://velorachocos.com",
    visual: { kind: "photo", image: "/projects/velora.jpg" },
  },
  {
    id: "alkor-cms",
    name: "Alkor CMS",
    description:
      "Çok dilli içerik yönetim sistemi. Sayfalar, hizmetler, projeler ve medya kütüphanesi tek panelden yönetiliyor.",
    badge: "CMS",
    status: "live",
    tags: ["Next.js", "Multi-language", "Admin Panel", "REST API"],
    href: "https://alkorcephesistemleri.com/tr",
    visual: {
      kind: "browser",
      image: "/projects/alkor-cms.jpg",
      url: "alkorcephesistemleri.com",
    },
  },
];

export default function WebProjelerimizPage(): React.ReactElement {
  const [featured, zamlandi, velora, ...rest] = projects;

  return (
    <div className="noise-bg">
      <Navbar />

      <main className="min-h-screen" style={{ backgroundColor: "#060a14" }}>
        {/* Page header */}
        <div
          className="pt-32 pb-16 md:pt-40 md:pb-24"
          style={{
            background:
              "radial-gradient(1100px 420px at 12% -10%, rgba(67,56,202,.35), transparent 70%), radial-gradient(700px 300px at 92% 0%, rgba(124,58,237,.22), transparent 70%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 max-w-[780px]">
              <div className="flex items-center gap-2.5 font-mono text-[12.5px] tracking-[0.2em] uppercase text-cyan-400">
                <span className="block w-[22px] h-px bg-cyan-400" />
                Portfolyo
              </div>
              <h1
                className="m-0 font-extrabold text-[40px] md:text-[76px] leading-[1.02] tracking-[-0.035em] text-white"
                style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
              >
                Projelerimiz
              </h1>
              <p className="m-0 text-[15.5px] md:text-[19px] leading-[1.65] text-slate-400 max-w-[620px] text-pretty">
                Kendi ürünlerimiz ve birlikte çalıştığımız markalar için kurduğumuz
                platformlar. Hepsi yayında ya da yayına hazırlanıyor — vitrinde yalnızca
                gerçekten yaptığımız işler var.
              </p>
            </div>
          </div>
        </div>

        {/* Showcase: featured → pair → reversed featured */}
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-24 md:pb-32">
          <div className="flex flex-col gap-5 md:gap-10">
            <WebProjectCard project={featured} index={0} layout="split" />

            <div className="grid lg:grid-cols-2 gap-5 md:gap-10">
              <WebProjectCard project={zamlandi} index={1} />
              <WebProjectCard project={velora} index={2} />
            </div>

            {rest.map((project, i) => (
              <WebProjectCard key={project.id} project={project} index={3 + i} layout="reversed" />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 md:mt-24 text-center">
            <p className="text-sm text-slate-500 mb-4">
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
