import Link from "next/link";

const socialLinks = [
  { href: "#", label: "Twitter" },
  { href: "#", label: "LinkedIn" },
  { href: "#", label: "Instagram" },
];

export function Footer(): React.ReactElement {
  return (
    <footer style={{ backgroundColor: "#060a14" }} className="text-white">
      <div className="gradient-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Left: brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight"
              style={{
                fontFamily:
                  "var(--font-plus-jakarta), system-ui, sans-serif",
              }}
            >
              VEXLOFT
            </Link>
            <p className="text-sm text-gray-500 mt-2">Antalya, Turkiye</p>
          </div>

          {/* Right: social links as text */}
          <div className="flex items-center gap-8">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gradient-line mt-12" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Vexloft. Tum haklari saklidir.
          </p>
          <p className="text-xs text-gray-600">vexloft.com</p>
        </div>
      </div>
    </footer>
  );
}
