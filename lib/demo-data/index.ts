import type {
  DashboardData,
  DashboardMeta,
  SalesData,
  InventoryData,
  ProcurementData,
  ExecutiveData,
  FinancialData,
  MarketingData,
  HrData,
  EcommerceData,
} from "./types";
import salesJson from "./data/sales.json";
import inventoryJson from "./data/inventory.json";
import procurementJson from "./data/procurement.json";
import executiveJson from "./data/executive.json";
import financialJson from "./data/financial.json";
import marketingJson from "./data/marketing.json";
import hrJson from "./data/hr.json";
import ecommerceJson from "./data/ecommerce.json";
import indexJson from "./data/index.json";

export const sales = salesJson as unknown as SalesData;
export const inventory = inventoryJson as unknown as InventoryData;
export const procurement = procurementJson as unknown as ProcurementData;
export const executive = executiveJson as unknown as ExecutiveData;
export const financial = financialJson as unknown as FinancialData;
export const marketing = marketingJson as unknown as MarketingData;
export const hr = hrJson as unknown as HrData;
export const ecommerce = ecommerceJson as unknown as EcommerceData;

const bySlug: Record<string, DashboardData> = {
  sales,
  inventory,
  procurement,
  executive,
  financial,
  marketing,
  hr,
  ecommerce,
};

export const dashboardIndex = indexJson as unknown as DashboardMeta[];
export const dashboardSlugs: string[] = dashboardIndex.map((d) => d.slug);

export function getDashboard(slug: string): DashboardData | undefined {
  return bySlug[slug];
}
