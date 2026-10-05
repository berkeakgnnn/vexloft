import Image from "next/image";
import type { ShowcaseProject } from "./projects";

// Browser window with the desktop shot, phone overlapping bottom-right with the
// mobile shot. Same geometry for every project.
export function DevicePair({
  project,
  priority = false,
}: {
  project: ShowcaseProject;
  priority?: boolean;
}): React.ReactElement {
  return (
    <div className="relative w-full aspect-[16/11]">
      <div className="absolute left-0 top-0 w-[86%] rounded-2xl overflow-hidden border border-white/12 bg-[#0b1220] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.85)]">
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#101a2b] border-b border-white/[0.06]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 truncate rounded-md bg-black/30 px-3 py-1 text-[11px] text-white/55">
            {project.domain}
          </span>
        </div>
        <div className="relative aspect-[16/10]">
          <Image
            src={project.desktop}
            alt={`${project.name} web sitesi`}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 86vw, 800px"
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-[27%] rounded-[2rem] bg-black p-[5px] border border-white/15 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-[600/1298] rounded-[1.7rem] overflow-hidden">
          <Image
            src={project.mobile}
            alt={`${project.name} mobil görünüm`}
            fill
            priority={priority}
            sizes="(max-width: 1024px) 27vw, 260px"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
