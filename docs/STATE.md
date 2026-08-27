# Nerede Kaldık

> Bu dosya her session sonunda **üstüne yazılır**. Tarihçe için `JOURNAL.md`.

**27 Ağustos 2026 · `main` @ `c6d0f50` · canlı: https://www.vexloft.com**

## Çalışan neler

- **Landing** (`app/page.tsx`) — hero, hizmetler, QR menü showcase, neden biz,
  iletişim CTA. Framer Motion animasyonlu, koyu indigo/violet gradient dili.
  Berke'nin 4 Ağustos eklemeleri de burada (hero'da mobil projeler, featured
  work'te Katina).
- **Projelerimiz** (`/web-projelerimiz`) — **yeni vitrin yayında**. Üç çerçeve
  sistemi: tarayıcı (BarberBook, Alkor), telefon üçlüsü (Zamlandı), çerçevesiz
  fotoğraf (Velora). Metin artık görselin üstünde değil, kendi sütununda.
- **Vexloft Data** (`/data`) — finans, pazarlama, İK, e-ticaret dashboard'ları,
  Live Excel sekmesi, proje başına PDF one-pager. 1 Ağustos'tan beri dalda
  bekliyordu; bu session'da main'e merge edilip yayına çıktı.
- Diğer sayfalar: `/hizmetler`, `/hakkimizda`, `/iletisim`, `/qr-projelerimiz`.
- Deploy: Coolify için standalone `Dockerfile` mevcut. Canlı: vexloft.com.

## Yarım kalanlar

- [ ] **Ana sayfadaki proje kartları hâlâ eski desende** — vitrindeki çerçeve
      sistemine geçirilmeli; şu an sitede iki farklı kart dili var.
- [ ] `/iletisim` formundaki `+90 500 000 00 00` ve `ahmet@sirket.com`
      **placeholder** — temizlenmeli. Gerçek: vexloftstudio@gmail.com, Antalya.
- [ ] Zamlandı yayına çıkınca kartın `href`'i App Store linkiyle değişmeli
      (şu an linksiz, "TestFlight yakında" yazıyor).
- [ ] Test altyapısı yok.

## Bir sonraki somut adım

1. `components/landing/featured-work-section.tsx` → ana sayfa kartlarını
   `components/web-projelerimiz/web-project-card.tsx`'teki çerçeve sistemine
   geçir (tek kart dili).
2. `/iletisim` placeholder iletişim bilgilerini temizle.

## Aktif tuzaklar

- **Repo ortak:** `github.com/berkeakgnnn/vexloft`. Berke de main'e push
  ediyor (hero, featured work, Katina görselleri). Merge öncesi **mutlaka
  `git fetch` + çakışma kontrolü** — bu session'da origin/main bilinenden
  ilerideydi, körlemesine merge edilseydi işi ezilebilirdi.
- Gerçek iletişim: vexloftstudio@gmail.com, Antalya. Uydurma bilgi koyma.
- **Kullanıcı söylemeden commit atma** (CLAUDE.md kuralı).
- `next/image` dosya değişse de eski görseli önbellekten servis ediyor;
  `.next` temizlenmeden yeni görsel görünmüyor.
- Vitrin çerçevesine konacak ekran görüntüleri **uzun** olmalı (~1440×1100);
  kısa görselde çerçevenin altı boş kalıyor ve hover kayacak yer bulamıyor.
- Sunucu paylaşımlı ve kalabalık; başka bir proje build alırken siteler
  yavaşlayabiliyor (BarberBook'ta yaşandı).
