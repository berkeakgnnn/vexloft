import Link from "next/link";
import { Logo } from "@/components/logo";

const pageLinks = [
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/iletisim", label: "İletişim" },
];

const projectLinks = [
  { href: "/qr-projelerimiz", label: "QR Menü Projeleri" },
  { href: "/web-projelerimiz", label: "Web Projeleri" },
  { href: "https://animyst.vexloft.com", label: "AniMyst", external: true },
];

export function Footer(): React.ReactElement {
  return (
    <footer style={{ backgroundColor: "#060a14" }} className="text-white">
      <div className="gradient-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" aria-label="Vexloft Ana Sayfa" className="inline-block">
              <Logo variant="light" />
            </Link>
            <p className="text-sm text-gray-400 mt-4 max-w-xs leading-relaxed">
              Antalya merkezli yazılım stüdyosu. Mobil uygulama, web platformu
              ve dijital altyapı çözümleri.
            </p>
          </div>

          {/* Pages */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold tracking-[3px] uppercase text-gray-400 mb-5">
              Sayfalar
            </p>
            <ul className="space-y-0">
              {pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex items-center min-h-[44px] text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Projects */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold tracking-[3px] uppercase text-gray-400 mb-5">
              Projeler
            </p>
            <ul className="space-y-0">
              {projectLinks.map((link) =>
                link.external ? (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center min-h-[44px] text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center min-h-[44px] text-sm text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p className="text-xs font-semibold tracking-[3px] uppercase text-gray-400 mb-5">
              İletişim
            </p>
            <ul className="space-y-0">
              <li>
                <a
                  href="mailto:vexloftstudio@gmail.com"
                  className="inline-flex items-center min-h-[44px] text-sm text-gray-400 hover:text-white transition-colors duration-200"
                >
                  vexloftstudio@gmail.com
                </a>
              </li>
              <li className="inline-flex items-center min-h-[44px] text-sm text-gray-400">
                Antalya, Türkiye
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gradient-line mt-14" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Vexloft. Tüm hakları saklıdır.
          </p>
          <p className="text-xs text-gray-400">vexloft.com</p>
        </div>
      </div>
    </footer>
  );
}
