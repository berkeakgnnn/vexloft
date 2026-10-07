# Nerede Kaldık

> Bu dosya her session sonunda **üstüne yazılır**. Tarihçe için `JOURNAL.md`.

**8 Ekim 2026 · dal `feat/sizzle-street` (main @ `19b7fc8` üstünde, push edilmedi) · canlı: https://www.vexloft.com**

## Çalışan neler

- **Ana sayfa** (`app/page.tsx` + `components/home/`) — Berke'nin 5 Ekim'de
  taşıdığı yeni tasarım: dönen proje vitrini (hero), kaydırmalı proje sahnesi,
  hizmetler, istatistik, CTA. Projeler `components/home/projects.ts`'ten gelir;
  her proje masaüstü + mobil site görüntüsüyle (`public/showcase/`) eşit ağırlıkta.
- **Projelerimiz** (`/web-projelerimiz`) — üç çerçeve sistemi: tarayıcı,
  telefon üçlüsü (Zamlandı, Sizzle Street), çerçevesiz fotoğraf (Velora).
- **Vexloft Data** (`/data`), `/hizmetler`, `/hakkimizda`, `/iletisim`,
  `/qr-projelerimiz`. Deploy: Coolify, standalone `Dockerfile`.

## Bu dalda (feat/sizzle-street) — merge bekliyor

- Sizzle Street ana sayfa vitrinine eklendi (`projects.ts`, ASTRA'dan sonra;
  görseller `public/showcase/sizzle-{desktop,mobile}.jpg`, landing'den çekildi).
- `/web-projelerimiz`'e Sizzle Street kartı: telefon üçlüsü (şef seçimi, ana
  ekran, düello — canlı web sürümünden 390×844), "Geliştiriliyor" + link
  https://sizzle.vexloft.com.
- `web-project-card.tsx`: split/reversed kartta `grid-cols-1` — telefon üçlüsü
  mobilde metin sütununu taşırıyordu (ilk kez bu düzende telefon kullanıldı).

## Yarım kalanlar

- [ ] **sizzle.vexloft.com henüz yayında değil** (landing `sizzle-street`
      reposunda `services/landing`; DNS + Coolify deploy bekliyor). Yayına
      çıkmadan bu dal merge edilirse kart ve vitrin ölü linke gider.
- [ ] Hero'daki "6 ürün şu an canlıda" sabit metin; vitrinde artık 7 proje var.
      Sizzle mağazaya çıkınca sayıyı güncelle.
- [ ] Zamlandı yayına çıkınca kartın `href`'i App Store linkiyle değişmeli.
- [ ] Test altyapısı yok.

## Bir sonraki somut adım

1. sizzle.vexloft.com yayına çıktıktan sonra `git fetch` → bu dalı main'e merge.

## Aktif tuzaklar

- **Repo ortak:** `github.com/berkeakgnnn/vexloft`. Berke de main'e push
  ediyor. Merge öncesi **mutlaka `git fetch` + çakışma kontrolü**.
- Gerçek iletişim: vexloftstudio@gmail.com, Antalya. Uydurma bilgi koyma.
- **Kullanıcı söylemeden commit atma** (CLAUDE.md kuralı).
- `next/image` dosya değişse de eski görseli önbellekten servis ediyor;
  `.next` temizlenmeden yeni görsel görünmüyor.
- Vitrin görselleri: tarayıcı çerçevesi için uzun (~1440×1100), ana sayfa
  vitrini için 1440×900 + 600×1298 (mobil), telefon üçlüsü için dikey ekran.
- Sunucu paylaşımlı ve kalabalık; başka bir proje build alırken siteler
  yavaşlayabiliyor.
