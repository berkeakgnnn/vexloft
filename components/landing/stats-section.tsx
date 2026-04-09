"use client";

const stats = [
  { value: "50+", label: "PROJE" },
  { value: "30+", label: "MUSTERI" },
  { value: "3+", label: "YIL DENEYIM" },
  { value: "7/24", label: "DESTEK" },
];

export function StatsSection(): React.ReactElement {
  return (
    <section className="py-32 lg:py-40" style={{ backgroundColor: "#060a14" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-line mb-20" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-3"
                style={{
                  fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif",
                }}
              >
                {stat.value}
              </div>
              <div className="text-sm text-gray-500 font-medium uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="gradient-line mt-20" />
      </div>
    </section>
  );
}
