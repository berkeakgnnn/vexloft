# Claude Design Brief — Vexloft Proje Vitrini

**Tarih:** 2026-08-27 · Hedef: `/web-projelerimiz` (başlık "Projelerimiz")

Bu dosyayı Claude Design'a olduğu gibi verebilirsin. Amaç: mevcut kart desenini
değiştirip projeleri **vitrin** gibi gösteren bir sayfa tasarlamak.

---

## Ürün ve marka

Vexloft — Antalya merkezli yazılım stüdyosu. Mobil uygulama, web platformu ve QR
menü çözümleri. Ton: modern premium, rafine ama enerjik; Türkçe; "biz" dili,
kurumsal jargon yok.

- **Renk:** koyu lacivert zemin `#060a14` / `#0a0f1e`; indigo→violet gradient
  `#4338ca → #7c3aed`; accent cyan `#06b6d4`; metin beyaz, soluk metin `#64748b`.
- **Tipografi:** başlık Plus Jakarta Sans (bold/extrabold), gövde Inter.
- **Hareket:** Framer Motion — scroll ile beliren bölümler, kademeli kartlar.

## Çözülecek asıl problem

Mevcut kart, görseli **arka plana** koyup üzerine başlık ve açıklama yazıyor.
Bu, Velora'nın çikolata fotoğrafında güzel çalışıyor; ama BarberBook gibi
**metin dolu bir ekran görüntüsünde** yazı üstüne yazı biniyor ve kart
okunmuyor. Portfolyodaki işlerin çoğu artık ekran görüntülü yazılım projesi.

> Tasarımın çözmesi gereken: fotoğraf da, arayüz ekran görüntüsü de aynı
> vitrinde eşit güzellikte durmalı.

## Gösterilecek 4 proje (gerçek içerik)

| Proje | Rozet | Özet | Görsel tipi |
|---|---|---|---|
| **BarberBook** | SaaS Platform | Berber/kuaför/dövme stüdyoları için çok kiracılı randevu platformu; her işletme kendi temasıyla hazır sayfa alır | Geniş web ekran görüntüsü (açık krem tonlu) |
| **Zamlandı** | iOS Uygulama · Geliştiriliyor | Aboneliklerine zam geldiğinde ilk haber veren uygulama | 3 telefon ekranı (koyu/kağıt tonlu) |
| **Velora Chocolate** | E-Ticaret | 3D kutu konfigüratörü + otel sipariş sistemi | Ürün fotoğrafı (koyu, sıcak) |
| **Alkor CMS** | CMS | Çok dilli içerik yönetim sistemi | Web ekran görüntüsü |

## İstenen

1. **Vitrin düzeni.** Dört projeyi tek akışta gösteren bir düzen. Kart deseni
   ekran görüntüsünü metnin *arkasına* değil *yanına/içine* koysun — tarayıcı
   veya telefon çerçevesi içinde. Öne çıkan bir proje + diğerleri ritmi olabilir,
   ama tekdüze bir grid'e düşmesin.
2. **Görsel tipi farkını taşıyan bir çerçeve sistemi:** geniş web görseli için
   tarayıcı çerçevesi, mobil için telefon çerçevesi, fotoğraf için çerçevesiz
   tam kanama. Üçü aynı sayfada tutarlı görünsün.
3. **Rozet + teknoloji etiketleri** okunur ve ikincil kalsın; başlık öne çıksın.
4. **Hover/scroll hareketi:** kartın kendi karakterinde küçük bir hareket
   (ör. çerçeve içindeki ekranın hafif kayması). Abartılı parallax istemiyoruz.
5. **Mobil düzen** ayrıca çizilsin — kartlar telefonda nasıl yığılıyor.
6. Boş durum: "yakında" olan proje (Zamlandı henüz yayında değil) linksiz ama
   sönük görünmeyecek şekilde nasıl gösterilir.

## Kaçınılacaklar

- Görselin üstüne yazı basıp okunabilirliği degradeye bırakmak (mevcut sorun).
- Her kartın birebir aynı olduğu tekdüze grid.
- Sahte metrik/müşteri logosu — portfolyoda yalnızca gerçek işler var.
- Vexloft'un mevcut indigo/violet dilinden kopmak; bu sayfa siteyle aynı
  dünyada kalmalı.

## Teslim beklentisi

Masaüstü ve mobil için: vitrin sayfasının tamamı, kart deseninin üç görsel
tipiyle varyantları, hover durumu. Tipografi ölçeği ve boşluk ritmi belirtilsin.
