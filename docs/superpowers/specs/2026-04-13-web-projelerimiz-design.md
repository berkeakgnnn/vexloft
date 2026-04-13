# Web Projelerimiz Sayfası — Tasarım Speci

**Tarih:** 2026-04-13  
**Proje:** Vexloft Landing (vexloft.com)  
**Kapsam:** `/web-projelerimiz` yeni sayfası + landing showcase güncellenmesi

---

## Genel Bakış

Vexloft'un geliştirdiği web platformlarını ve ürünleri sergileyen yeni bir portfolio sayfası. İlk ürün: **Alkor CMS**. Sayfa, ileride yeni web projeleri eklenebilecek şekilde grid tabanlı tasarlanıyor.

---

## Sayfa Yapısı

**Route:** `/web-projelerimiz`  
**Shell:** Navbar + main + Footer (QR projeler sayfasıyla aynı pattern)  
**Background:** `#060a14` (koyu)  
**Render:** Server Component (statik, API çağrısı yok)

### Header Bölümü

- Label: `WEB PROJELERİ` — küçük, tracking-[6px], gradient-text CSS sınıfı
- Başlık: `Web Projelerimiz` — Plus Jakarta Sans extrabold, `text-4xl sm:text-5xl md:text-6xl`
- Alt açıklama: "Vexloft tarafından hayata geçirilen web platformları ve ürünler." — `text-lg text-gray-400 max-w-xl`
- Gradient divider line (`gradient-line` CSS sınıfı) altında

### Kart Grid'i

Tek sütun (featured kart) + ileride `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` yapısına geçilebilir.

#### Alkor CMS Kartı (Featured — Full Width)

- Aspect ratio: `aspect-[21/9]` (QR projeler ilk kart gibi)
- Arka plan: İndigo → Violet gradient (`from-indigo-950 via-violet-950 to-indigo-900`) + subtle dot/grid pattern overlay
- Sol üst: `CMS` badge — küçük, `text-[10px] tracking-[3px]`, indigo/violet tonunda (`bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-sm`)
- Sol alt:
  - Başlık: `Alkor CMS` — `text-2xl md:text-4xl lg:text-5xl font-extrabold text-white` (Plus Jakarta Sans)
  - Açıklama: "Çok dilli içerik yönetim sistemi — sayfalar, hizmetler, projeler ve medya." — `text-lg text-gray-300`
- Sağ alt: Tech tag'ler — `Next.js`, `Multi-language`, `Admin Panel`, `REST API`
  - Her tag: `text-[10px] tracking-[2px] uppercase px-2.5 py-1 rounded-full bg-white/5 text-white/50 border border-white/10`
- Hover efekti: `scale-[1.02]` transition + overlay koyulaşma + `İNCELE →` metni beliriyor (sağ alt köşe)
- Link: şimdilik `href="#"` (Alkor'un kendi URL'si belirlenince güncellenecek)

### Alt CTA

- Metin: "Kendi projeniz için bir şeyler yapalım mı?"
- Link: `Bize Ulaşın` → `/iletisim`
- Stil: QR projeler sayfasıyla aynı minimal link stili

---

## Landing Showcase Güncellemesi

`components/landing/showcase-section.tsx` dosyasındaki `showcaseItems` array'indeki **"Web Platformları"** objesine `link: "/web-projelerimiz"` ekleniyor. Bu sayede showcase kartı tıklanabilir hale geliyor (QR Menü kartı gibi).

---

## Değiştirilecek / Oluşturulacak Dosyalar

| Dosya | İşlem |
|-------|--------|
| `app/web-projelerimiz/page.tsx` | Yeni oluşturulacak |
| `components/landing/showcase-section.tsx` | `showcaseItems[0]`'a `link` ekleniyor |

---

## Tasarım Kısıtları

- Vexloft marka sistemi: indigo/violet gradient, `#060a14` bg, Plus Jakarta Sans
- Framer Motion animasyonları: scroll-triggered fade-in + slide-up (InView)
- Responsive: mobile-first, 320px'den başla
- Server Component: `"use client"` yok, animasyonlar dynamic import ile
- Statik: API çağrısı yok, hardcoded proje verisi
