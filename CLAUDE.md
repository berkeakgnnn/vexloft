# Vexloft — Kurumsal Web Sitesi

## Proje Hakkında

Vexloft, Antalya merkezli bir yazılım ve dijital çözümler şirketidir. Mobil uygulama geliştirme, web tasarım & geliştirme ve QR menü sistemleri konularında hizmet vermektedir.

**Site:** vexloft.com
**Proje tipi:** Kurumsal tanıtım sitesi (landing page + alt sayfalar)

## Marka Kimliği

### Renkler
- **Primary gradient:** Indigo (#4338ca) → Violet (#7c3aed)
- **Dark background:** Koyu lacivert (#0a0f1e)
- **Light background:** Beyaz (#ffffff) / Açık gri (#f8fafc)
- **Accent:** Cyan/teal (#06b6d4) — CTA'larda, hover'larda
- **Text dark bg:** Beyaz (#ffffff)
- **Text light bg:** Koyu (#0f172a)
- **Muted text:** #64748b

### Fontlar
- **Başlık (display):** Plus Jakarta Sans — bold/extrabold, Google Fonts
- **Body:** Inter — regular/medium, Google Fonts
- Panel (vexloftpanel) DM Sans kullanıyor — site farklı, katmanlı marka

### Logo
- V ikonu: siyah çizgi + indigo aksan (#6366f1)
- "Vexloft" text: Plus Jakarta Sans bold
- Varyantlar: logo.svg (tam), logo-icon.svg (sadece V), favicon.svg (koyu bg)

### Ton & Ses
- Modern premium — rafine ama enerjik
- Türkçe — yerel müşterilere odaklı
- Profesyonel ama samimi — "biz" dili, kurumsal jargon yok
- Kısa, net cümleler — uzun paragraflar yok

## Tech Stack

- **Framework:** Next.js 15 App Router
- **Styling:** Tailwind CSS v4
- **Animasyon:** Framer Motion
- **Font:** Plus Jakarta Sans + Inter (next/font/google)
- **Icons:** Lucide React
- **Deploy:** Vercel (vexloft.com)

## Sayfa Yapısı

```
app/
├── page.tsx                    # Ana landing page (tek uzun sayfa)
├── hizmetler/page.tsx          # Detaylı hizmet sayfası
├── qr-projelerimiz/page.tsx    # QR menü showcase
├── hakkimizda/page.tsx         # Hakkımızda
├── iletisim/page.tsx           # İletişim formu
├── layout.tsx                  # Root layout, fontlar, metadata
└── globals.css                 # Tailwind + custom animasyonlar
```

## Landing Page Section'ları

1. **Hero** — Full ekran, koyu gradient, büyük başlık, CTA, animated shapes
2. **Hizmetler** — 3 kart: Mobil Uygulama / Web / QR Menü
3. **QR Menü Showcase** — Koyu bg, 3 telefon mockup (kafe/restoran/pub)
4. **Neden Biz** — 4 feature, counter animasyon, istatistikler
5. **İletişim CTA** — Gradient bg, form, WhatsApp butonu
6. **Footer** — Logo, linkler, sosyal medya

## Tasarım Prensipleri

### Frontend Design Skill Kuralları
- Generic AI estetiğinden kaçın — cookie-cutter layout yok
- Bold estetik yön: "Modern Premium" — rafine + enerjik
- Tipografi: distinctive font (Plus Jakarta Sans), generic değil
- Renk: dominant gradient + sharp accent, eşit dağılım yok
- Animasyon: scroll-triggered reveal, staggered kartlar, parallax mockup'lar
- Spatial: asymmetry, generous negative space, grid-breaking hero

### Vercel React Best Practices
- Dynamic import: heavy component'lar (Framer Motion animasyonları, telefon mockup'lar)
- Async parallel: bağımsız data fetch'ler Promise.all ile
- Bundle optimization: barrel import'lar yok, direkt dosya import
- Server components: mümkün olan yerde RSC, client sadece interaktif kısımlarda

### Responsive
- Mobile first: 320px'den başla
- Breakpoints: sm (640), md (768), lg (1024), xl (1280)
- Hero: mobilde tek sütun, desktop'ta split veya full-width
- Kartlar: mobilde dikey, tablet'te 2 sütun, desktop'ta 3 sütun
- Navbar: mobilde hamburger, desktop'ta horizontal

### Animasyonlar (Framer Motion)
- Hero: text fade-in + scale, floating gradient blobs
- Section'lar: scroll-triggered fade-in + slide-up (InView)
- Kartlar: staggered animation (sırayla beliriyor)
- Telefon mockup'lar: parallax scroll efekti
- CTA: subtle pulse/glow
- Navbar: scroll'da transparent → blur + bg

### Erişilebilirlik
- Minimum text: 16px body, 14px smallest
- Kontrast: WCAG AA minimum
- Touch target: 44px minimum
- Alt text: tüm görsellerde
- Semantic HTML: header, main, section, footer

## Vexloft Hizmetleri

### 1. Mobil Uygulama Geliştirme
- iOS & Android (React Native / Expo)
- UI/UX tasarım
- App Store & Play Store yayınlama
- Bakım ve güncelleme

### 2. Web Tasarım & Geliştirme
- Kurumsal web siteleri
- E-ticaret
- Landing page
- Admin panelleri
- SEO optimizasyon

### 3. QR Menü Sistemleri
- Kafe, restoran, pub, bar menüleri
- Kolay yönetim paneli
- Özelleştirilebilir temalar
- Çoklu dil desteği (TR/EN)
- QR kod oluşturma

## Diğer Vexloft Projeleri

- **vexloftpanel** — QR menü yönetim paneli (backend API)
- **vexloftpanel-frontend** — Admin panel frontend
- **qr-menu** — QR menü showroom (statik demo)

## Commit Kuralları
- Otomatik commit atma — kullanıcı söyleyene kadar biriktir
- Commit mesajı: conventional commits (feat:, fix:, chore:, refactor:)
- Tek seferde birden fazla değişikliği topla
