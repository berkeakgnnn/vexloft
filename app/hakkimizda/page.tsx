import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

export const metadata: Metadata = {
  title: "Hakkımızda | Vexloft",
  description:
    "Antalya merkezli yazılım stüdyosu Vexloft. Mobil uygulama, web platformu ve dijital altyapı çözümlerini uçtan uca üstleniyoruz.",
};

interface Value {
  number: string;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    number: "01",
    title: "Sahiplenme",
    description:
      "Projeyi teslim edip kaybolmuyoruz. Yayına aldığımız her ürünün arkasında duruyor, büyümesine eşlik ediyoruz.",
  },
  {
    number: "02",
    title: "Netlik",
    description:
      "Süreç boyunca ne yaptığımızı, neden yaptığımızı ve ne zaman biteceğini açıkça anlatıyoruz. Sürpriz yok.",
  },
  {
    number: "03",
    title: "Ürün Odağı",
    description:
      "Kod yazmak araç, çalışan ürün amaç. Her kararı kullanıcıya ve işinize katacağı değere göre veriyoruz.",
  },
];

export default function HakkimizdaPage(): React.ReactElement {
  return (
    <div className="noise-bg">
      <Navbar />
      <main
        className="min-h-screen pt-32 pb-24"
        style={{ backgroundColor: "#060a14" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <AnimateOnScroll className="mb-20 lg:mb-28">
            <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text mb-4">
              HAKKIMIZDA
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight max-w-3xl"
              style={{
                fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                letterSpacing: "-0.02em",
              }}
            >
              Küçük ekip,
              <br />
              <span className="gradient-text">büyük sahiplenme.</span>
            </h1>
          </AnimateOnScroll>

          {/* Story: text + real project photo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-24 lg:mb-32">
            <AnimateOnScroll className="lg:col-span-6">
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p>
                  Vexloft, Antalya merkezli bir yazılım stüdyosu. Mobil
                  uygulamalar, web platformları ve QR menü sistemleri
                  geliştiriyoruz.
                </p>
                <p>
                  Kurumsal web sitelerinden App Store&apos;da yayınlanan mobil
                  oyunlara kadar farklı ölçeklerde ürünler tasarladık,
                  geliştirdik ve yayına aldık. Her projede tasarımdan altyapıya
                  sürecin tamamını üstleniyoruz.
                </p>
                <p>
                  Bizim için iyi yazılım, teslim edildiği gün değil; aylar
                  sonra hâlâ sorunsuz çalıştığında başarılıdır.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={150} className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 aspect-[16/11]">
                <Image
                  src="/projects/alkor-villa.jpg"
                  alt="Vexloft'un geliştirdiği CMS ile yönetilen Alkor Cephe Sistemleri projesi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060a14]/60 to-transparent" />
              </div>
            </AnimateOnScroll>
          </div>

          {/* Values */}
          <div className="mb-24 lg:mb-32">
            <AnimateOnScroll className="mb-12">
              <h2
                className="text-3xl md:text-4xl font-extrabold text-white"
                style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
              >
                Nasıl çalışıyoruz?
              </h2>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {values.map((value, i) => (
                <AnimateOnScroll key={value.number} delay={i * 120}>
                  <div className="card-surface rounded-3xl p-8 h-full transition-colors duration-300">
                    <span
                      className="block text-5xl font-extrabold gradient-text opacity-30 mb-6"
                      style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
                    >
                      {value.number}
                    </span>
                    <h3
                      className="text-xl font-bold text-white mb-3"
                      style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
                    >
                      {value.title}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <AnimateOnScroll className="text-center">
            <p className="text-sm text-gray-400 mb-4">
              Birlikte çalışmak ister misiniz?
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
