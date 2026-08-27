# Nerede Kaldık

> Bu dosya her session sonunda **üstüne yazılır**. Tarihçe için `JOURNAL.md`.

**27 Ağustos 2026 · `feature/vexloft-data-demos` @ `ead98c9` + commit'lenmemiş değişiklikler**

## Çalışan neler

- **Landing** (`app/page.tsx`) — hero, hizmetler, QR menü showcase, neden biz,
  iletişim CTA. Framer Motion animasyonlu, koyu indigo/violet gradient dili.
- **Alt sayfalar:** `/hizmetler`, `/hakkimizda`, `/iletisim` (form + backend),
  `/qr-projelerimiz` (+ `[slug]`), `/web-projelerimiz`, `/data` (+ `[slug]`).
- **Vexloft Data** — interaktif dashboard portfolyosu: finans, pazarlama, İK,
  e-ticaret panelleri; Live Excel sekmesi ve proje başına PDF one-pager.
- Deploy: Coolify için standalone `Dockerfile` mevcut. Canlı: vexloft.com.

## Bu session'da yapılanlar (henüz commit'lenmedi)

- `/web-projelerimiz` artık **"Projelerimiz"**: başlık, eyebrow, açıklama ve
  footer linki güncellendi (URL aynı kaldı).
- **BarberBook** eklendi (öne çıkan kart) — görsel canlı siteden alındı:
  `public/projects/barberbook.jpg`.
- **Zamlandı** eklendi — üç tanıtım ekranından kompoze kart görseli:
  `public/projects/zamlandi.png`. Henüz yayında olmadığı için `href: "#"`,
  rozet "iOS Uygulama · Geliştiriliyor".
- **Velora** açıklaması gerçek projeye göre düzeltildi (otel sipariş sistemi,
  .NET Core backend, admin panel).
- Kart okunabilirlik degradesi güçlendirildi (açık renkli ekran görüntülerinde
  numara ve rozet kayboluyordu).

## Yarım kalanlar

- [x] ~~Vitrin yeniden tasarımı~~ — Claude Design'dan gelen "Projeler Vitrini"
      tasarımı uygulandı: üç çerçeve tipi (tarayıcı / telefon üçlüsü /
      çerçevesiz fotoğraf), metin artık görselin üstünde değil kendi sütununda.
- [ ] Değişiklikler commit'lenmedi; branch `feature/vexloft-data-demos`
      (main'e merge edilmemiş).
- [ ] Zamlandı yayına çıkınca `href` gerçek App Store linkiyle değişmeli.
- [ ] `/iletisim` formundaki `+90 500 000 00 00` ve `ahmet@sirket.com`
      **placeholder** — gerçek bilgiyle değiştirilmeli ya da kaldırılmalı.
- [ ] Test altyapısı yok.

## Bir sonraki somut adım

1. Değişiklikleri commit'le (kullanıcı onayıyla) ve deploy et.
2. `/iletisim` sayfasındaki placeholder iletişim bilgilerini temizle.
3. Ana sayfadaki proje showcase bölümü hâlâ eski kart desenini kullanıyor —
   yeni çerçeve sistemine geçirilmeli (tutarlılık için).

## Aktif tuzaklar

- Gerçek iletişim: **vexloftstudio@gmail.com**, Antalya. Başka numara/eposta
  uydurma — formdaki değerler placeholder.
- Bu repo Next.js'in bilinen sürümünden farklı olabilir; `AGENTS.md` kod
  yazmadan önce `node_modules/next/dist/docs/` okunmasını söylüyor.
- Kullanıcı söylemeden commit atma (CLAUDE.md kuralı).
