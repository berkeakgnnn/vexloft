# Web Projelerimiz Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `/web-projelerimiz` sayfası oluştur, Alkor CMS'i featured card olarak göster, landing showcase'deki "Web Platformları" kartına link ekle.

**Architecture:** İki yeni dosya (kart bileşeni + sayfa) + bir dosya güncellemesi. Sayfa Server Component, kart Client Component (CSS hover efektleri için group sınıfları yeterli — Framer Motion yok). Veriler hardcoded statik obje.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, TypeScript

---

## Dosya Haritası

| Dosya | İşlem | Açıklama |
|-------|--------|----------|
| `components/web-projelerimiz/web-project-card.tsx` | Yeni oluştur | Alkor CMS kartı bileşeni |
| `app/web-projelerimiz/page.tsx` | Yeni oluştur | Web projeleri showcase sayfası |
| `components/landing/showcase-section.tsx` | Güncelle | "Web Platformları" kartına link ekle |

---

### Task 1: Kart Bileşeni

**Files:**
- Create: `components/web-projelerimiz/web-project-card.tsx`

- [ ] **Adım 1: Dosyayı oluştur**

`components/web-projelerimiz/web-project-card.tsx` dosyasını oluştur:

```tsx
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

        {/* Radial glow centre */}
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

  // Regular (non-featured) card — aspect-[4/3], smaller text
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
```

- [ ] **Adım 2: TypeScript kontrolü**

```bash
cd /Users/berkeakgun/Desktop/Kişisel/vexloft && npx tsc --noEmit
```

Hata olmamalı.

---

### Task 2: Sayfa

**Files:**
- Create: `app/web-projelerimiz/page.tsx`

- [ ] **Adım 1: Dosyayı oluştur**

`app/web-projelerimiz/page.tsx` dosyasını oluştur:

```tsx
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { WebProjectCard, type WebProject } from "@/components/web-projelerimiz/web-project-card";

const webProjects: WebProject[] = [
  {
    id: "alkor-cms",
    name: "Alkor CMS",
    description:
      "Çok dilli içerik yönetim sistemi — sayfalar, hizmetler, projeler ve medya yönetimi tek panelden.",
    badge: "CMS",
    tags: ["Next.js", "Multi-language", "Admin Panel", "REST API"],
    href: "#",
  },
];

export const metadata = {
  title: "Web Projelerimiz | Vexloft",
  description:
    "Vexloft tarafından hayata geçirilen web platformları ve ürünler.",
};

export default function WebProjelerimizPage(): React.ReactElement {
  return (
    <div className="noise-bg">
      <Navbar />

      <main
        className="min-h-screen pt-32 pb-24"
        style={{ backgroundColor: "#060a14" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section header */}
          <div className="mb-16">
            <span className="inline-block text-xs font-semibold tracking-[6px] uppercase gradient-text mb-4">
              WEB PROJELERİ
            </span>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-plus-jakarta), system-ui, sans-serif" }}
            >
              Web Projelerimiz
            </h1>
            <p className="mt-4 text-lg text-gray-400 max-w-xl">
              Vexloft tarafından hayata geçirilen web platformları ve ürünler.
            </p>
          </div>

          <div className="gradient-line mb-16" />

          {/* Project cards */}
          <div className="space-y-8">
            {webProjects.map((project, index) => (
              <WebProjectCard
                key={project.id}
                project={project}
                index={index}
                featured={index === 0}
              />
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-24 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Kendi projeniz için bir şeyler yapalım mı?
            </p>
            <Link
              href="/iletisim"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-0.5"
            >
              Bize Ulaşın
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

- [ ] **Adım 2: TypeScript kontrolü**

```bash
cd /Users/berkeakgun/Desktop/Kişisel/vexloft && npx tsc --noEmit
```

Hata olmamalı.

- [ ] **Adım 3: Dev sunucusunu başlat ve sayfayı kontrol et**

```bash
cd /Users/berkeakgun/Desktop/Kişisel/vexloft && npm run dev
```

Tarayıcıda `http://localhost:3000/web-projelerimiz` aç. Kontrol et:
- Header doğru görünüyor (label + başlık + açıklama)
- Alkor CMS kartı full-width, gradient arka plan
- Badge sağ üstte, numeral sol üstte
- Hover'da overlay koyulaşıyor + "İNCELE →" beliriyor
- Alt CTA "Bize Ulaşın" linki var

- [ ] **Adım 4: Commit**

```bash
cd /Users/berkeakgun/Desktop/Kişisel/vexloft
git add components/web-projelerimiz/web-project-card.tsx app/web-projelerimiz/page.tsx
git commit -m "feat: add web-projelerimiz page with Alkor CMS featured card"
```

---

### Task 3: Landing Showcase Güncellemesi

**Files:**
- Modify: `components/landing/showcase-section.tsx`

- [ ] **Adım 1: `showcaseItems[0]`'a link ekle**

`components/landing/showcase-section.tsx` dosyasında `showcaseItems` array'inin ilk objesini bul:

```ts
{
  src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
  alt: "Takim calisma ortami",
  title: "Web Platformlari",
  subtitle: "Kurumsal siteler, admin paneller ve dashboard cozumleri",
},
```

`link` alanını ekle:

```ts
{
  src: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
  alt: "Takim calisma ortami",
  title: "Web Platformlari",
  subtitle: "Kurumsal siteler, admin paneller ve dashboard cozumleri",
  link: "/web-projelerimiz",
},
```

- [ ] **Adım 2: Full-width kartın Link bileşenini etkinleştir**

Aynı dosyada `ShowcaseSection` fonksiyonundaki full-width (ilk) kart hardcoded `<div>` olarak render ediliyor. Bunu `ShowcaseCard` bileşeni gibi link destekli hale getir.

Mevcut kod (`ShowcaseSection` içinde):

```tsx
{/* First item — full width */}
<div className="group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9]">
  <Image ... />
  <div className="absolute inset-0 ..." />
  <div className="absolute bottom-0 left-0 p-8 md:p-12">
    <h3 ...>{showcaseItems[0].title}</h3>
    <p ...>{showcaseItems[0].subtitle}</p>
  </div>
</div>
```

Bunu şu şekilde güncelle — `showcaseItems[0].link` varsa `<Link>`, yoksa `<div>` render et:

```tsx
{/* First item — full width */}
{(() => {
  const item = showcaseItems[0];
  const inner = (
    <>
      <Image
        src={item.src}
        alt={item.alt}
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
          {item.title}
        </h3>
        <p className="text-lg text-gray-300">{item.subtitle}</p>
      </div>
    </>
  );

  if (item.link) {
    return (
      <Link
        href={item.link}
        className="group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9] block"
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl aspect-[16/9] md:aspect-[21/9]">
      {inner}
    </div>
  );
})()}
```

- [ ] **Adım 3: TypeScript kontrolü**

```bash
cd /Users/berkeakgun/Desktop/Kişisel/vexloft && npx tsc --noEmit
```

- [ ] **Adım 4: Landing sayfasını kontrol et**

`http://localhost:3000` aç. "Web Platformları" kartına tıkla → `/web-projelerimiz` sayfasına gitmeli.

- [ ] **Adım 5: Commit**

```bash
cd /Users/berkeakgun/Desktop/Kişisel/vexloft
git add components/landing/showcase-section.tsx
git commit -m "feat: link Web Platformlari showcase card to /web-projelerimiz"
```
