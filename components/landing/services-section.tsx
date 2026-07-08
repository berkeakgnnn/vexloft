"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const smoothEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
    description: "Restoran, kafe, bar için dijital menü platformu",
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
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="py-28 lg:py-40 scroll-mt-20"
      style={{ backgroundColor: "#060a14" }}
      id="hizmetler"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.7, ease: smoothEase }
          }
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            style={{
              fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            Neler yapıyoruz?
          </h2>
        </motion.div>

        {/* Service rows */}
        <div>
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.6, delay: i * 0.06, ease: smoothEase }
              }
            >
              <Link
                href="/hizmetler"
                className="group grid grid-cols-12 items-center gap-4 py-8 md:py-10"
              >
                {/* Number */}
                <div className="col-span-2 md:col-span-1">
                  <span
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold gradient-text opacity-20 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                      fontFamily:
                        "var(--font-plus-jakarta), system-ui, sans-serif",
                    }}
                  >
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <div className="col-span-10 md:col-span-5">
                  <h3
                    className="text-xl md:text-2xl lg:text-3xl font-bold text-white transition-transform duration-500 group-hover:translate-x-2"
                    style={{
                      fontFamily:
                        "var(--font-plus-jakarta), system-ui, sans-serif",
                    }}
                  >
                    {service.title}
                  </h3>
                </div>

                {/* Description + arrow */}
                <div className="col-span-12 md:col-span-6 flex items-center justify-between md:justify-end gap-4">
                  <p className="text-lg text-gray-400 md:text-right">
                    {service.description}
                  </p>
                  <ArrowUpRight
                    size={22}
                    className="flex-shrink-0 text-indigo-300 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"
                    aria-hidden="true"
                  />
                </div>
              </Link>

              {/* Gradient separator */}
              <div className="gradient-line" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
