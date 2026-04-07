# Vexloft Kurumsal Site — Landing Page Tasarım Spesifikasyonu

## Özet

Vexloft dijital ajans kurumsal web sitesi. Modern premium tasarım, Framer Motion animasyonlar, responsive. Next.js 15, Tailwind v4, Plus Jakarta Sans + Inter.

## Tech Stack

- Next.js 15 App Router
- Tailwind CSS v4
- Framer Motion (animasyonlar)
- Plus Jakarta Sans (başlık) + Inter (body) — next/font/google
- Lucide React (ikonlar)
- Deploy: Vercel → vexloft.com

## Renk Sistemi

| Renk | Hex | Kullanım |
|------|-----|----------|
| Indigo | #4338ca | Primary |
| Violet | #7c3aed | Gradient end |
| Cyan/Teal | #06b6d4 | Accent, CTA hover |
| Dark navy | #0a0f1e | Koyu section bg |
| Dark card | #141830 | Koyu section kartlar |
| White | #ffffff | Açık section bg |
| Light gray | #f8fafc | Alternatif açık bg |
| Text dark | #0f172a | Metin (açık bg üzerinde) |
| Text muted | #64748b | İkincil metin |
| Text light | #e2e8f0 | Metin (koyu bg üzerinde) |

## Fontlar

- **Display/Heading:** Plus Jakarta Sans — 700/800 weight
- **Body:** Inter — 400/500 weight
- **Mono (opsiyonel):** JetBrains Mono — code snippet'lar

## Sayfa Yapısı

```
app/
├── page.tsx                    # Landing page (section'lar)
├── hizmetler/page.tsx          # Hizmet detay
├── qr-projelerimiz/page.tsx    # QR menü showcase
├── hakkimizda/page.tsx         # Hakkımızda
├── iletisim/page.tsx           # İletişim
├── layout.tsx                  # Root layout
└── globals.css
```

## Component Yapısı

```
components/
├── layout/
│   ├── navbar.tsx              # Sticky transparent → blur navbar
│   ├── footer.tsx              # Koyu footer, linkler, sosyal
│   └── mobile-menu.tsx         # Hamburger menü (Framer Motion)
├── landing/
│   ├── hero-section.tsx        # Full ekran hero, gradient, animated shapes
│   ├── services-section.tsx    # 3 hizmet kartı
│   ├── qr-showcase-section.tsx # Telefon mockup'lar
│   ├── why-us-section.tsx      # Feature'lar + counter
│   ├── cta-section.tsx         # İletişim CTA
│   └── stats-counter.tsx       # Animated counter component
├── shared/
│   ├── section-wrapper.tsx     # Scroll-triggered fade-in wrapper
│   ├── gradient-button.tsx     # Animated gradient CTA butonu
│   ├── phone-mockup.tsx        # Telefon çerçevesi component
│   └── animated-text.tsx       # Text reveal animasyonu
└── logo.tsx                    # Vexloft logo (React component)
```

## Landing Page Section'ları — Detay

### 1. Navbar (sticky)
- Transparent bg → scroll'da beyaz/blur bg (backdrop-blur-lg)
- Sol: Vexloft logo (beyaz, koyu bg'de → koyu, açık bg'de)
- Orta: Linkler — Ana Sayfa, Hizmetler, QR Projelerimiz, Hakkımızda, İletişim
- Sağ: "Bize Ulaşın" gradient butonu
- Mobil: hamburger → full screen overlay menu (Framer Motion slide)
- Transition: smooth 300ms bg + shadow

### 2. Hero Section
- Height: 100vh (full ekran)
- Background: radial gradient (#0a0f1e base) + animated mesh gradient blobs (indigo/violet/teal)
- İçerik centered vertically:
  - Üst: "VEXLOFT" — small caps, letter-spacing, gradient text (indigo→violet)
  - Başlık: "Dijital Çözümlerinizi Tasarlıyoruz" — text-6xl md:text-7xl lg:text-8xl, Plus Jakarta Sans extrabold, beyaz
  - Alt başlık: "Mobil uygulama, web projesi ve QR menü sistemleri ile işletmenizi dijitale taşıyoruz." — text-xl, text-gray-400
  - CTA grubu: "Projelerimizi Keşfedin" (gradient buton) + "İletişime Geçin" (outline buton)
- Animasyon: text staggered fade-in (her satır 0.2s arayla), butonlar 0.6s sonra
- Altta: scroll-down chevron animasyonu (bounce)
- Floating gradient blobs: 3 adet, slow float animation, blur-3xl, opacity-30

### 3. Hizmetler Section
- Arka plan: beyaz (#ffffff)
- Üst: "Hizmetlerimiz" section başlık + "İşletmeniz için uçtan uca dijital çözümler" alt başlık
- 3 kart grid (lg:grid-cols-3):
  - **Mobil Uygulama:** Smartphone ikonu, "iOS & Android uygulamalar, React Native ile cross-platform geliştirme", "UI/UX tasarım, App Store yayınlama, bakım"
  - **Web Geliştirme:** Globe ikonu, "Kurumsal siteler, e-ticaret, landing page ve admin panelleri", "Next.js, React, SEO optimizasyon"
  - **QR Menü Sistemleri:** QrCode ikonu, "Kafe, restoran ve bar menüleri", "Kolay yönetim paneli, özelleştirilebilir temalar, çoklu dil"
- Her kart:
  - Üstte gradient ince çizgi (border-t-2, indigo→violet)
  - İkon: 48px, indigo-100 bg circle, indigo-600 ikon rengi
  - Başlık: text-xl font-bold
  - Açıklama: text-base text-muted
  - Hover: translateY(-4px), shadow-xl, border rengi canlanır
- Animasyon: scroll'da staggered fade-in (sol→sağ, 0.15s arayla)

### 4. QR Menü Showcase Section
- Arka plan: koyu (#0a0f1e)
- Üst: "QR Menü Çözümlerimiz" beyaz başlık + "Her işletme türü için özel tasarım" alt başlık
- 3 telefon mockup yan yana (desktop), horizontal scroll (mobil):
  - Kafe mockup: warm cream tema, fotoğraflı kartlar
  - Restoran mockup: dark tema, altın aksan, dotted-line liste
  - Pub mockup: ahşap tema, amber aksan, karma layout
- Her telefon altında: etiket ("Kafe", "Restoran", "Pub") + kısa açıklama
- Telefon çerçevesi: gerçekçi (notch, status bar, koyu border, side buttons)
- Alt: "Tüm QR Projelerimizi Keşfedin" gradient buton → /qr-projelerimiz
- Animasyon: parallax scroll (telefonlar hafif farklı hızda kayar), hover'da scale(1.05)

### 5. Neden Biz Section
- Arka plan: açık (#f8fafc)
- Üst: "Neden Vexloft?" başlık
- 4 feature 2x2 grid (md:grid-cols-2 lg:grid-cols-4):
  - Hızlı Teslimat — Zap ikonu — "Projelerinizi zamanında teslim ediyoruz"
  - 7/24 Destek — Headphones ikonu — "Her zaman yanınızdayız"
  - Özel Tasarım — Palette ikonu — "Şablondan değil, size özel tasarım"
  - Uygun Fiyat — BadgePercent ikonu — "Kaliteli hizmet, makul fiyat"
- Her feature: büyük ikon (indigo), başlık (font-bold), açıklama (muted)
- İstatistikler satırı (altta, ortalı):
  - "50+" — Tamamlanan Proje
  - "30+" — Mutlu Müşteri
  - "3+" — Yıllık Deneyim
  - "7/24" — Destek
- Counter animasyonu: sayılar 0'dan hedef değere animate (scroll-triggered)
- Animasyon: kartlar staggered, counter'lar InView tetiklemeli

### 6. İletişim CTA Section
- Arka plan: gradient (indigo → violet, diagonal)
- İçerik centered:
  - Başlık: "Projenizi Konuşalım" — text-4xl, beyaz, bold
  - Alt başlık: "Dijital dönüşümünüze bugün başlayın." — text-lg, beyaz/opacity-80
  - 3 buton satırı:
    - WhatsApp: yeşil buton, WhatsApp ikonu + numara
    - Email: outline beyaz buton + email adresi
    - Telefon: outline beyaz buton + telefon numarası
- Alt: basit form (isim, email, mesaj, gönder butonu) — beyaz kart üzerinde
- Animasyon: fade-in + scale

### 7. Footer
- Arka plan: koyu (#0a0f1e)
- 4 sütun (desktop), accordion (mobil):
  - Sütun 1: Vexloft logo + "Antalya merkezli dijital çözümler şirketi" + sosyal ikonlar
  - Sütun 2: Hızlı Linkler — Ana Sayfa, Hizmetler, QR Projelerimiz, Hakkımızda
  - Sütun 3: Hizmetler — Mobil Uygulama, Web Geliştirme, QR Menü
  - Sütun 4: İletişim — Adres, Telefon, Email
- Altta: copyright "© 2024 Vexloft. Tüm hakları saklıdır." + "Antalya, Türkiye"
- Ayırıcı: ince gradient çizgi (indigo → transparent)

## Animasyon Detayları (Framer Motion)

### Section Wrapper
Her section'ı saran component:
```tsx
// Scroll-triggered fade-in + slide-up
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.6, ease: "easeOut" }}
```

### Staggered Children
Kart grupları için:
```tsx
// Parent
variants={{ show: { transition: { staggerChildren: 0.15 } } }}
// Child
variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
```

### Hero Gradient Blobs
```tsx
// Floating animation — slow, infinite
animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
```

### Navbar Scroll Effect
```tsx
// useScroll + useMotionValueEvent
// scrollY > 50 → bg-white/80 backdrop-blur-lg shadow-sm
```

### Counter Animation
```tsx
// useInView trigger → animate from 0 to target
// useMotionValue + useSpring
```

## Responsive Breakpoints

| Element | Mobile (< 640) | Tablet (640-1024) | Desktop (> 1024) |
|---------|---------------|-------------------|-----------------|
| Hero title | text-4xl | text-5xl | text-7xl |
| Hero subtitle | text-lg | text-xl | text-xl |
| Hizmet kartları | 1 sütun | 2 sütun | 3 sütun |
| Telefon mockup'lar | horizontal scroll | 3 sütun küçük | 3 sütun büyük |
| Neden biz | 1 sütun | 2 sütun | 4 sütun |
| Footer | accordion | 2 sütun | 4 sütun |
| Navbar | hamburger | hamburger | horizontal |

## Performans

- next/font ile font preload
- next/image ile görsel optimizasyon
- Framer Motion: dynamic import, ssr:false heavy animasyonlar
- Intersection Observer ile lazy animation trigger
- Static generation (SSG) — tüm sayfalar static export
