"use client";

import Image from "next/image";
import Link from "next/link";

interface ShowcaseItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  link?: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    alt: "Takim calisma ortami",
    title: "Web Platformlari",
    subtitle: "Kurumsal siteler, admin paneller ve dashboard cozumleri",
  },
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    alt: "Analitik dashboard",
    title: "QR Menu Sistemleri",
    subtitle: "Restoran ve kafeler icin dijital menu deneyimi",
    link: "/qr-projelerimiz",
  },
  {
    src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80",
    alt: "Mobil uygulama",
    title: "Mobil Uygulamalar",
    subtitle: "iOS ve Android icin cross-platform cozumleri",
  },
];

function ShowcaseCard({ item }: { item: ShowcaseItem }) {
  const content = (
    <>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-colors duration-500 group-hover:from-black/85" />
      <div className="absolute bottom-0 left-0 p-6 md:p-8">
        <h3
          className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-1"
          style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
        >
          {item.title}
        </h3>
        <p className="text-base text-gray-300">{item.subtitle}</p>
      </div>
    </>
  );

  if (item.link) {
    return (
      <Link
        href={item.link}
        className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
      {content}
    </div>
  );
}

export function ShowcaseSection(): React.ReactElement {
  return (
    <section
      className="py-32 lg:py-40"
      style={{ backgroundColor: "#0a0f1e" }}
      id="projelerimiz"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text">
            PROJELERIMIZ
          </span>
        </div>

        <div className="space-y-8">
          {/* First item — full width */}
          <div className="group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9]">
            <Image
              src={showcaseItems[0].src}
              alt={showcaseItems[0].alt}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-colors duration-500 group-hover:from-black/85" />
            <div className="absolute bottom-0 left-0 p-8 md:p-12">
              <h3
                className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
              >
                {showcaseItems[0].title}
              </h3>
              <p className="text-lg text-gray-300">{showcaseItems[0].subtitle}</p>
            </div>
          </div>

          {/* Two-column row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {showcaseItems.slice(1).map((item) => (
              <ShowcaseCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
