import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

export const metadata: Metadata = {
  title: "Hizmetler | Vexloft",
  description:
    "Mobil uygulama, web platformu, e-ticaret, QR menü, CRM ve API altyapı hizmetleri. Tasarımdan yayına uçtan uca geliştirme.",
};

interface ServiceChips {
  title: string;
  description: string;
  chips: string[];
}

const eticaret: ServiceChips = {
  title: "E-Ticaret Çözümleri",
  description:
    "Online mağaza kurulumundan ödeme ve kargo entegrasyonlarına, satışa hazır platformlar.",
  chips: ["Ödeme Entegrasyonu", "Stok Yönetimi", "Kargo Entegrasyonu"],
};

const qrMenu: ServiceChips = {
  title: "QR Menü Sistemleri",
  description:
    "Restoran, kafe ve barlar için özelleştirilebilir temalı, kolay yönetilen dijital menüler.",
  chips: ["Tema Özelleştirme", "TR / EN", "Yönetim Paneli"],
};

const crm: ServiceChips = {
  title: "CRM & Yönetim Panelleri",
  description:
    "Müşteri yönetimi, içerik yönetimi ve işinize özel dashboard çözümleri.",
  chips: ["Rol Bazlı Yetki", "Raporlama", "Özel Dashboard"],
};

const api: ServiceChips = {
  title: "API & Altyapı",
  description:
    "Ürünün görünmeyen tarafı: güvenli backend servisleri, veritabanı tasarımı ve bulut altyapısı.",
  chips: ["REST API", "Veritabanı Tasarımı", "Bulut Altyapı", "Entegrasyonlar"],
};

function ChipList({ chips }: { chips: string[] }): React.ReactElement {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          key={chip}
          className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/60 border border-white/10"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

function TextCell({ service }: { service: ServiceChips }): React.ReactElement {
  return (
    <div className="card-surface rounded-3xl p-8 h-full flex flex-col justify-between gap-8 transition-colors duration-300">
      <div>
        <h2
          className="text-xl md:text-2xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
        >
          {service.title}
        </h2>
        <p className="text-base text-gray-400 leading-relaxed">
          {service.description}
        </p>
      </div>
      <ChipList chips={service.chips} />
    </div>
  );
}

export default function HizmetlerPage(): React.ReactElement {
  return (
    <div className="noise-bg">
      <Navbar />
      <main
        className="min-h-screen pt-32 pb-24"
        style={{ backgroundColor: "#060a14" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <AnimateOnScroll className="mb-16 lg:mb-20">
            <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text mb-4">
              HİZMETLER
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5"
              style={{
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Fikirden yayına,
              <br />
              uçtan uca geliştirme.
            </h1>
            <p className="text-lg text-gray-400 max-w-xl">
              Tasarım, geliştirme ve yayın süreçlerinin tamamını üstleniyoruz.
              Ürününüz yayına çıktıktan sonra da yanınızdayız.
            </p>
          </AnimateOnScroll>

          {/* Bento grid: 6 services, 6 cells */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
            {/* Mobil: large cell with AniMyst art */}
            <AnimateOnScroll className="lg:col-span-4">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 min-h-[320px] lg:min-h-[420px] h-full">
                <Image
                  src="/projects/animyst-locks.jpg"
                  alt="AniMyst mobil oyunundan kilitli kristaller sahnesi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover object-[50%_30%] transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2
                    className="text-2xl md:text-3xl font-extrabold text-white mb-2"
                    style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
                  >
                    Mobil Uygulama Geliştirme
                  </h2>
                  <p className="text-base text-gray-300 max-w-md">
                    iOS ve Android için React Native uygulamalar. App Store
                    yayını, bildirimler, abonelik ve analitik dahil.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Web: image cell with Alkor photo */}
            <AnimateOnScroll delay={100} className="lg:col-span-2">
              <div className="group relative overflow-hidden rounded-3xl border border-white/10 min-h-[320px] lg:min-h-[420px] h-full">
                <Image
                  src="/projects/alkor-villa.jpg"
                  alt="Alkor Cephe Sistemleri projesi modern villa cephesi"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a14] via-[#060a14]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2
                    className="text-2xl font-extrabold text-white mb-2"
                    style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
                  >
                    Web Tasarım & Geliştirme
                  </h2>
                  <p className="text-base text-gray-300">
                    Kurumsal site, landing page, admin panel ve dashboard.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Text cells */}
            <AnimateOnScroll delay={100} className="lg:col-span-2">
              <TextCell service={eticaret} />
            </AnimateOnScroll>
            <AnimateOnScroll delay={200} className="lg:col-span-2">
              <TextCell service={qrMenu} />
            </AnimateOnScroll>
            <AnimateOnScroll delay={300} className="lg:col-span-2">
              <TextCell service={crm} />
            </AnimateOnScroll>

            {/* API: full-width horizontal cell */}
            <AnimateOnScroll className="lg:col-span-6">
              <div className="card-surface rounded-3xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-300">
                <div className="max-w-xl">
                  <h2
                    className="text-xl md:text-2xl font-bold text-white mb-3"
                    style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
                  >
                    {api.title}
                  </h2>
                  <p className="text-base text-gray-400 leading-relaxed">
                    {api.description}
                  </p>
                </div>
                <ChipList chips={api.chips} />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Bottom CTA */}
          <AnimateOnScroll className="mt-24 text-center">
            <p className="text-sm text-gray-400 mb-4">
              İhtiyacınız listede yok mu? Konuşalım.
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-semibold text-white/80 hover:text-white transition-colors border-b border-white/30 hover:border-white"
            >
              Bize Ulaşın
            </Link>
          </AnimateOnScroll>
        </div>
      </main>
      <Footer />
    </div>
  );
}
