# Günlük

> Sadece eklenir, en yeni en üstte. Hiçbir şey silinmez.
> Kural haline gelen şeyler `CLAUDE.md`'ye, "neden böyle yaptık" `docs/decisions/`'a.

---

## 2026-08-27 (2) — Vitrin yeniden tasarımı uygulandı

**Yapıldı**
- Claude Design "Projeler Vitrini" tasarımı `components/web-projelerimiz/` ve
  `app/web-projelerimiz/page.tsx`'e uygulandı.
- Üç çerçeve tipi: `browser` (tarayıcı çubuğu + geniş ekran görüntüsü),
  `phones` (üç telefon, ortadaki yükseltilmiş), `photo` (çerçevesiz tam kanama).
- Ritim: öne çıkan → ikili sıra → ters öne çıkan. Hover'da kart −4px kalkıyor,
  çerçeve içindeki ekran 70px yukarı kayıyor (sayfa kayıyormuş hissi).
- "Geliştiriliyor" durumu: sönük değil, cyan kenar + nabız atan nokta.
  `prefers-reduced-motion` altında nabız duruyor.
- Alkor ekran görüntüsü canlı siteden 1440×1100 yeniden çekildi.

**Öğrenilenler**
- Tasarım dosyasındaki teknoloji etiketleri gerçek değildi (BarberBook'a Stripe,
  Velora'ya Shopify, Alkor'a Laravel/Vue yazılmıştı). Tasarım görsel dili için
  kaynak, **içerik için değil** — etiketler projelerin gerçek stack'iyle
  dolduruldu. Portfolyoda yanlış teknoloji yazmak müşteriye karşı yanlış beyan.
- Çerçeveli düzende görsel **yatayda kırpılmamalı**; `object-cover` sayfa
  düzenini ikiye biçiyordu. Görsel tam genişlikte, taşma dikeyde olmalı —
  hover'ın açtığı şey de bu.
- Çerçeve için ekran görüntüleri **uzun** olmalı (1440×1100). Kısa görselde
  (1100×619) çerçevenin altında boş alan kalıyor ve hover kayacak yer bulamıyor.
- `next/image` dosya değişse de aynı URL'i önbellekten servis ediyor; `.next`
  temizlenmeden yeni görsel görünmüyor.

---

## 2026-08-27 — Projeler vitrini: BarberBook, Zamlandı, Velora güncellemesi

**Yapıldı**
- `/web-projelerimiz` → başlık "Projelerimiz" (URL korundu, footer linki de).
- BarberBook eklendi, görseli canlı siteden 21/9 oranında çekildi.
- Zamlandı eklendi; üç tanıtım ekranı siyah bant + kağıt zemin üzerinde
  telefon çerçeveleriyle 1600×900 karta kompoze edildi.
- Velora açıklaması gerçek repoya (`chocolate-catalog-full`) bakılarak
  düzeltildi: otel sipariş sistemi + .NET Core + admin panel.
- Kart karartma degradesi hem üstte hem altta güçlendirildi.

**Öğrenilenler**
- Kart deseni **fotoğraf için** tasarlanmış. Velora'nın çikolata fotoğrafında
  harika çalışıyor; BarberBook gibi metin dolu bir ekran görüntüsünde başlık ve
  açıklama, görselin kendi yazılarının üstüne biniyor. Ekran görüntüsü ile
  fotoğraf aynı kart deseninde eşit davranmıyor. → vitrin yeniden tasarımının
  asıl gerekçesi bu.
- Açık renkli görsellerde üstteki numara (`text-white/25`) ve rozet tamamen
  kayboluyordu; degradenin yalnızca alttan karartması yetmiyor.
- Zamlandı'nın ham ekran görüntülerinin çoğu alt yarısı boş (onboarding, paywall).
  Tanıtım ekranları (`tanitim-ekran*.png`) tam ekran ve vitrin için çok daha güçlü.

**Vazgeçilenler**
- Zamlandı için ayrı "Mobil Projelerimiz" sayfası: tek projeyle sayfa boş
  duracaktı ve menüyü uzatıyordu. Tek vitrin sayfası tercih edildi.
- Görselleri kartın arkasına koyup üzerine yazı yazma düzenini şimdilik
  korudum — düzgün çözüm yeniden tasarım, yamayla değil.

---

## Daha önce (git geçmişinden özet — detayı commit'lerde)

- **2026-08-01** — Vexloft Data: interaktif dashboard portfolyosu (finans,
  pazarlama, İK, e-ticaret), Live Excel sekmesi, proje başına PDF one-pager,
  Coolify için standalone Dockerfile.
- **2026-07-26** — Velora Chocolate vitrine eklendi.
- **2026-07-08** — Site yeniden tasarlandı: animasyonlu landing, gerçek proje
  showcase'leri; ASTRA ve PA Copilot eklendi; iletişim e-postası güncellendi.
- **2026-04-13** — `/web-projelerimiz` sayfası ve iletişim formu eklendi.

*TODO: doğrula — bu satırlar commit mesajlarından türetildi, o session'ların
kararları ve takıldığı noktalar kayıtlı değil.*
