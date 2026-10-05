// Mock data for the redesign preview at /mock. Every project gets the same
// asset pair (desktop + mobile shot of its live site) so none dominates.
export interface MockProject {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  domain: string;
  desktop: string;
  mobile: string;
  accent: string;
  glow: string;
}

export const mockProjects: MockProject[] = [
  {
    id: "queenspalace",
    name: "Queens Palace",
    category: "Mobil oyun + site",
    description:
      "Saf mantık kraliçe bulmacası. 1.000 bölüm, 10 saray odası, herkes için aynı Günlük Bulmaca.",
    url: "https://queenspalace.vexloft.com",
    domain: "queenspalace.vexloft.com",
    desktop: "/mock/queenspalace-desktop.jpg",
    mobile: "/mock/queenspalace-mobile.jpg",
    accent: "#f4c66a",
    glow: "rgba(168, 85, 247, 0.45)",
  },
  {
    id: "animyst",
    name: "AniMyst",
    category: "Mobil oyun + site",
    description:
      "Bulanık görselden anime karakterini bil, paket aç, 600 kart topla. Günlük meydan okuma ve aylık sıralama.",
    url: "https://animyst.vexloft.com",
    domain: "animyst.vexloft.com",
    desktop: "/mock/animyst-desktop.jpg",
    mobile: "/mock/animyst-mobile.jpg",
    accent: "#e879f9",
    glow: "rgba(217, 70, 239, 0.42)",
  },
  {
    id: "astra",
    name: "ASTRA",
    category: "Mobil oyun + site",
    description:
      "Yıldız atlası gibi çizilmiş 2–5 dakikalık sinerji roguelike. 5×5 gökyüzü, takımyıldızlar, günlük ortak gökyüzü.",
    url: "https://astra.vexloft.com",
    domain: "astra.vexloft.com",
    desktop: "/mock/astra-desktop.jpg",
    mobile: "/mock/astra-mobile.jpg",
    accent: "#e9d5a1",
    glow: "rgba(234, 179, 8, 0.28)",
  },
  {
    id: "pacopilot",
    name: "PA Copilot",
    category: "Mobil uygulama + site",
    description:
      "Pilotlar için anons yardımcısı. Uçuşu bir kez girin; anons İngilizce, Türkçe ve Almanca hazır. Tamamen çevrimdışı.",
    url: "https://pacopilot.vexloft.com",
    domain: "pacopilot.vexloft.com",
    desktop: "/mock/pacopilot-desktop.jpg",
    mobile: "/mock/pacopilot-mobile.jpg",
    accent: "#67d4f5",
    glow: "rgba(56, 189, 248, 0.38)",
  },
  {
    id: "velora",
    name: "Velora Chocolate",
    category: "E-ticaret",
    description:
      "Premium çikolata markası için 3D önizlemeli kutu tasarlama, kurumsal hediye ve çok dilli katalog.",
    url: "https://velorachocos.com",
    domain: "velorachocos.com",
    desktop: "/mock/velora-desktop.jpg",
    mobile: "/mock/velora-mobile.jpg",
    accent: "#d6a86a",
    glow: "rgba(180, 83, 9, 0.38)",
  },
  {
    id: "alkor",
    name: "Alkor Cephe Sistemleri",
    category: "Kurumsal web + CMS",
    description:
      "Çok dilli kurumsal site ve içerik paneli. Projeler, hizmetler ve medya tek yerden yönetiliyor.",
    url: "https://alkorcephesistemleri.com/tr",
    domain: "alkorcephesistemleri.com",
    desktop: "/mock/alkor-desktop.jpg",
    mobile: "/mock/alkor-mobile.jpg",
    accent: "#d4b46a",
    glow: "rgba(59, 130, 246, 0.35)",
  },
];
