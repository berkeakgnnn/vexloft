const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export interface MenuTheme {
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  cardBgColor: string;
  textColor: string;
  mutedTextColor: string;
  borderColor: string;
  fontHeading: string;
  fontBody: string;
  layoutType: string;
  heroImage: string | null;
  logo: string | null;
}

export interface MenuInfo {
  tagline: string | null;
  established: string | null;
  locationTr: string;
  locationEn: string;
  hoursTr: string;
  hoursEn: string;
  phone: string | null;
}

export interface MenuItem {
  nameTr: string;
  nameEn: string;
  descriptionTr: string;
  descriptionEn: string;
  price: string | number;
  image: string | null;
  sortOrder: number;
  badges: Record<string, string> | null;
}

export interface MenuCategory {
  id: string;
  nameTr: string;
  nameEn: string;
  slug: string;
  banner: string | null;
  layout: string; // DEFAULT, CHALKBOARD, GRID
  sortOrder: number;
  items: MenuItem[];
}

export interface PublicMenu {
  id: string;
  name: string;
  slug: string;
  template: string;
  theme: MenuTheme;
  info: MenuInfo;
  categories: MenuCategory[];
}

export async function getPublicMenu(slug: string): Promise<PublicMenu | null> {
  try {
    const res = await fetch(`${API_URL}/public/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function getActiveBusinesses(): Promise<PublicMenu[]> {
  // Fetch known businesses — in production this would be a list endpoint
  const slugs = ["the-cozy-bean", "maison-elegante", "the-black-sheep"];
  const results = await Promise.all(slugs.map(getPublicMenu));
  return results.filter((r): r is PublicMenu => r !== null);
}
