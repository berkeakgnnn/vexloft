"use client";

import { AnimateOnScroll } from "@/components/shared/animate-on-scroll";

interface Service {
  number: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    number: "01",
    title: "Mobil Uygulama Geliştirme",
    description: "iOS, Android, cross-platform React Native uygulamalar",
  },
  {
    number: "02",
    title: "Web Tasarım & Geliştirme",
    description: "Kurumsal site, landing page, admin panel, dashboard",
  },
  {
    number: "03",
    title: "E-Ticaret Çözümleri",
    description: "Online mağaza, ödeme entegrasyonu, stok yönetimi",
  },
  {
    number: "04",
    title: "QR Menü Sistemleri",
    description: "Restoran, kafe, bar için dijital menu platformu",
  },
  {
    number: "05",
    title: "CRM & Yönetim Panelleri",
    description: "Müşteri yönetimi, CMS, özel dashboard çözümleri",
  },
  {
    number: "06",
    title: "API & Altyapı",
    description: "Backend geliştirme, veritabanı tasarımı, bulut altyapı",
  },
];

export function ServicesSection(): React.ReactElement {
  return (
    <section
      className="py-32 lg:py-40"
      style={{ backgroundColor: "#060a14" }}
      id="hizmetler"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <AnimateOnScroll className="mb-20">
          <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text">
            HIZMETLERIMIZ
          </span>
        </AnimateOnScroll>

        {/* Service rows */}
        <div className="space-y-0">
          {services.map((service, i) => (
            <AnimateOnScroll key={service.number} delay={i * 100}>
              <div className="group grid grid-cols-12 items-center gap-4 py-8 md:py-10 cursor-default">
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold gradient-text opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{
                      fontFamily:
                        "var(--font-plus-jakarta), system-ui, sans-serif",
                    }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 md:col-span-5 lg:col-span-5">
                  <h3
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white"
                    style={{
                      fontFamily:
                        "var(--font-plus-jakarta), system-ui, sans-serif",
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-6 lg:col-span-6 md:text-right">
                  <p className="text-lg text-gray-400 pl-2 md:pl-0">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Gradient separator */}
              <div className="gradient-line" />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
