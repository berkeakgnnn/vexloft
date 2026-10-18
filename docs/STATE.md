# Nerede Kaldık

> Bu dosya her session sonunda **üstüne yazılır**. Tarihçe için `JOURNAL.md`.

**15 Ekim 2026 · `main` · canlı: https://www.vexloft.com (Vercel, proje `heronnn9s-projects/vexloft`)**

## Çalışan neler

- **Ana sayfa** (`app/page.tsx` + `components/home/`) — dönen proje vitrini
  (hero), kaydırmalı proje sahnesi, hizmetler, istatistik, CTA. Projeler
  `components/home/projects.ts`'ten; her biri masaüstü + mobil site görüntüsüyle
  (`public/showcase/`) eşit ağırlıkta.
- **Projelerimiz** (`/web-projelerimiz`) — tarayıcı / telefon üçlüsü / fotoğraf
  çerçeveleri.
- **Vexloft Data** (`/data`), `/hizmetler`, `/hakkimizda`, `/iletisim`,
  `/qr-projelerimiz`.
- **SEO:** `metadataBase` + canonical `https://www.vexloft.com`, `sitemap.xml`,
  `robots.txt`, OG görseli, Organization/WebSite JSON-LD. Apex → www
  yönlendirmesi Vercel'de **308** (kalıcı).
- **Fontlar** `@fontsource-variable/*` ile siteye gömülü; build Google Fonts'a
  bağlı değil, Türkçe karakterler (latin-ext) dahil.
- **Google Analytics 4** — mülk `vexloft.com`, ölçüm kimliği `G-7PYF1QJDEC`
  (Vercel env `NEXT_PUBLIC_GA_ID`, yalnız Production). Çerez onayı (KVKK)
  verilmeden GA yüklenmez. Olaylar: `generate_lead`, `contact_email_click`,
  `contact_phone_click`. Veri saklama 14 ay.
- **Umami** (2026-10-18) — kendi sunucumuz, tüm Vexloft siteleri tek panelde:
  `https://analiz.vexloft.com` (kullanıcı `vexloft`). Çerezsiz, IP saklamaz, onay
  beklemez; GA'nın yanında bandı reddedenleri de sayar. Bileşen
  `components/analytics/umami.tsx`. Bağlı: vexloft, Loc, ASTRA, Sizzle, PA Copilot,
  Zamlandı, 5Clues.
- **İletişim formu** → `app/api/contact/route.ts` → Resend (team "vexloftstudio",
  alan adı `vexloft.com` doğrulandı, bölge eu-west-1) → vexloftstudio@gmail.com.
  Gönderen `form@vexloft.com`, "Yanıtla" formu dolduran kişiye gider. Vercel env:
  `RESEND_API_KEY` (anahtar adı `vexloft-site`, yalnız gönderim), `CONTACT_FROM_EMAIL`.
  DNS (Natro): `resend._domainkey` TXT, `send` + `rsend` CNAME, `_dmarc` TXT.
- **Google Search Console** — alan adı mülkü `vexloft.com` (vexloft@gmail.com),
  Natro'daki `ut2o4r7ilnyn` CNAME ile doğrulandı (**silme**, doğrulama düşer).
  `https://www.vexloft.com/sitemap.xml` gönderildi. Natro kök (`@`) için ikinci
  TXT kaydı eklemeye izin vermediği için CNAME yöntemi kullanıldı.

## Yarım kalanlar

- [ ] **Umami — AniMyst ve Queens Palace (Berke):** iki sitenin `<head>`'ine aşağıdaki
      satırı ekle (repoları Fatih'in makinesinde yok; siteler panelde zaten kayıtlı).
      Çerezsiz olduğu için çerez bandı gerekmez; gizlilik sayfası varsa tek cümle ekle:
      _"Bu web sitesinde ziyaret sayısı, açılan sayfa, gelinen site, ülke ve cihaz
      türünü kendi sunucumuzdaki Umami ile sayarız. Çerez kullanılmaz, IP adresin
      saklanmaz."_ - AniMyst: `<script defer src="https://analiz.vexloft.com/script.js" data-website-id="4769df00-5f1b-4ca1-9e42-ec9eba0293c8"></script>` - Queens Palace: `<script defer src="https://analiz.vexloft.com/script.js" data-website-id="3aab4940-6c80-4be8-81e4-e8ca7270be9d"></script>`

- [ ] `/qr-projelerimiz`: panel backend'i (sslip.io) 404 dönüyor. Menü gelmediği
      sürece sayfa `noindex` ve sitemap'te yok — backend dönünce otomatik açılır.
- [ ] `.env.local` git'te takip ediliyor (içinde yalnız public API URL'i var).
      `.gitignore` artık `.env*` içeriyor ama dosya hâlâ takipte.
- [ ] GA'da `generate_lead` ve `contact_email_click` ilk veri gelince
      Yönetici → Etkinlikler'de yıldızla "Önemli etkinlik" yapılmalı (GA4 yeni
      arayüzü, hiç görülmemiş bir etkinliği önceden işaretletmiyor).
- [ ] Zamlandı yayına çıkınca kartın `href`'i App Store linkiyle değişmeli.
- [ ] Test altyapısı yok.

## Bir sonraki somut adım

1. 1-2 hafta sonra Search Console → Sayfa sayısı / Performans raporlarına bak;
   indekslenmeyen sayfa varsa nedenine göre düzelt.

## Aktif tuzaklar

- **Repo ortak:** `github.com/berkeakgnnn/vexloft`. Başkası da main'e push
  ediyor. Push/merge öncesi **mutlaka `git fetch` + çakışma kontrolü**.
- **Deploy Vercel'de** (Coolify değil). Build bir kez Google Fonts'a
  ulaşamadığı için düştü → fontlar artık yerel.
- `vercel link` / `vercel env pull` `.env.local`'a `VERCEL_OIDC_TOKEN` yazar —
  **commit'leme**.
- Gerçek iletişim: vexloftstudio@gmail.com, Antalya. Uydurma bilgi koyma.
- **Kullanıcı söylemeden commit atma** (CLAUDE.md kuralı).
- `next/image` eski görseli önbellekten servis edebilir; görsel değişince dosya
  adını değiştir.
- Vitrin görselleri: tarayıcı çerçevesi ~1440×1100, ana sayfa vitrini
  1440×900 + 600×1298 (mobil), telefon üçlüsü dikey ekran.
