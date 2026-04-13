import Link from "next/link";

export interface WebProject {
  id: string;
  name: string;
  description: string;
  badge: string;
  tags: string[];
  href: string;
}

interface WebProjectCardProps {
  project: WebProject;
  index: number;
  featured?: boolean;
}

export function WebProjectCard({
  project,
  index,
  featured = false,
}: WebProjectCardProps): React.ReactElement {
  const numberLabel = String(index + 1).padStart(2, "0");

  if (featured) {
    return (
      <Link
        href={project.href}
        className="group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9] block"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-violet-950 to-indigo-900" />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(99,102,241,0.15),transparent_60%)]" />

        {/* Hover darkening overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />

        {/* Number label — top left */}
        <div className="absolute top-6 left-8 text-[10px] font-semibold tracking-[3px] text-white/25">
          {numberLabel}
        </div>

        {/* Badge — top right */}
        <div
          className="absolute top-6 right-8 inline-flex items-center text-[10px] font-semibold tracking-[3px] uppercase px-2.5 py-1 rounded-full"
          style={{
            backgroundColor: "rgba(99,102,241,0.18)",
            color: "#a5b4fc",
            border: "1px solid rgba(99,102,241,0.35)",
            backdropFilter: "blur(8px)",
          }}
        >
          {project.badge}
        </div>

        {/* Content — bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h2
              className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-2"
              style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
            >
              {project.name}
            </h2>
            <p className="text-base md:text-lg text-gray-300 max-w-lg">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-3 flex-shrink-0">
            {/* Tech tags */}
            <div className="flex flex-wrap md:justify-end gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] tracking-[2px] uppercase px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* İncele arrow — visible on hover */}
            <div className="text-[10px] font-semibold tracking-[2px] text-white/0 group-hover:text-white/90 group-hover:tracking-[3px] transition-all duration-300">
              İNCELE &rarr;
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Regular (non-featured) card
  return (
    <Link
      href={project.href}
      className="group relative overflow-hidden rounded-2xl aspect-[4/3] block"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-violet-950 to-indigo-900" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />

      <div className="absolute top-4 left-4 text-[10px] font-semibold tracking-[3px] text-white/25">
        {numberLabel}
      </div>

      <div
        className="absolute top-4 right-4 inline-flex items-center text-[10px] font-semibold tracking-[3px] uppercase px-2.5 py-1 rounded-full"
        style={{
          backgroundColor: "rgba(99,102,241,0.18)",
          color: "#a5b4fc",
          border: "1px solid rgba(99,102,241,0.35)",
          backdropFilter: "blur(8px)",
        }}
      >
        {project.badge}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 flex items-end justify-between">
        <div>
          <h2
            className="text-xl font-extrabold text-white leading-tight mb-1"
            style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
          >
            {project.name}
          </h2>
          <p className="text-xs text-white/60">{project.description}</p>
        </div>
        <div className="text-[10px] font-semibold tracking-[2px] text-white/0 group-hover:text-white/90 group-hover:tracking-[3px] transition-all duration-300 flex-shrink-0 ml-4">
          İNCELE &rarr;
        </div>
      </div>
    </Link>
  );
}
