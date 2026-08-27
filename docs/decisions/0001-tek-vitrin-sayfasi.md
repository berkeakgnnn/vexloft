# 0001 — Tüm projeler tek vitrin sayfasında

**Tarih:** 2026-08-27 · **Durum:** Uygulandı

## Bağlam

`/web-projelerimiz` yalnızca web projelerini listeliyordu. Portfolyoya bir iOS
uygulaması (Zamlandı) ve bir SaaS platformu (BarberBook) eklenecekti; ikisi de
"web projesi" başlığına girmiyordu. Seçenek: her tür için ayrı sayfa açmak ya da
tek bir vitrinde toplamak.

## Karar

Tek sayfa: `/web-projelerimiz` URL'i korunarak başlık **"Projelerimiz"** yapıldı.
Tür ayrımı sayfa değil **rozet** ile veriliyor (SaaS Platform, iOS Uygulama,
E-Ticaret, CMS). Footer linki de "Projelerimiz" olarak güncellendi.

## Sonuçları

- Ziyaretçi tüm işleri tek akışta görüyor; menü uzamıyor.
- URL değişmediği için mevcut linkler ve SEO kırılmadı.
- Sayfa büyüdükçe filtreleme/kategori ihtiyacı doğacak — şimdilik 4 proje var,
  gerek yok.
- "web-projelerimiz" URL'i artık içeriği tam karşılamıyor; ileride yönlendirmeli
  bir `/projeler` düşünülebilir.

## Reddedilen alternatifler

- **Ayrı "Mobil Projelerimiz" sayfası:** tek projeyle boş görünürdü, menüyü
  uzatırdı.
- **Başlığı değiştirmeden eklemek:** "Web Projelerimiz" başlığı altında iOS
  uygulaması yanlış duruyordu.
