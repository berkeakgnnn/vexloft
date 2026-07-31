// Typed contract for the Vexloft Data demo dashboards.
// Shapes mirror the JSON emitted by scripts/demo-data/generate.py (single source of truth).

export interface Kpi {
  label: string;
  value: string;
  accent: string;
  delta: string;
  deltaUp: boolean;
  sub: string;
}

export interface NamedValue {
  name: string;
  value: number;
}

export interface DashboardMeta {
  slug: string;
  company: string;
  title: string;
  period: string;
}

/* ---------- Sales ---------- */
export interface SalesRow {
  month: string;
  monthIndex: number;
  category: string;
  region: string;
  revenue: number;
  cost: number;
  profit: number;
  units: number;
}

export interface SalesData {
  id: "sales";
  slug: "sales";
  company: string;
  title: string;
  currency: string;
  period: string;
  months: string[];
  categories: string[];
  regions: string[];
  kpis: Kpi[];
  series: {
    revenueByMonth: number[];
    profitByMonth: number[];
    targetByMonth: number[];
    revenueByCategory: NamedValue[];
    revenueByRegion: NamedValue[];
    topProducts: Array<NamedValue & { category: string }>;
  };
  rows: SalesRow[];
}

/* ---------- Inventory ---------- */
export interface InventoryRow {
  sku: string;
  part: string;
  category: string;
  warehouse: string;
  onHand: number;
  reorderPoint: number;
  unitCost: number;
  value: number;
  monthlyUsage: number;
  leadTimeDays: number;
  status: string;
}

export interface InventoryData {
  id: "inventory";
  slug: "inventory";
  company: string;
  title: string;
  currency: string;
  period: string;
  categories: string[];
  warehouses: string[];
  statusOrder: string[];
  kpis: Kpi[];
  series: {
    valueByCategory: NamedValue[];
    statusDistribution: NamedValue[];
    topValueSkus: NamedValue[];
  };
  rows: InventoryRow[];
}

/* ---------- Procurement ---------- */
export interface PurchaseOrder {
  po: string;
  supplier: string;
  category: string;
  buyer: string;
  value: number;
  status: string;
  leadTimeDays: number;
  onTime: string;
  savings: number;
  monthIndex: number;
}

export interface SupplierScore {
  supplier: string;
  spend: number;
  otd: number;
  leadTime: number;
  quality: number;
  priceIndex: number;
  overall: number;
  rating: string;
}

export interface ProcurementData {
  id: "procurement";
  slug: "procurement";
  company: string;
  title: string;
  currency: string;
  period: string;
  categories: string[];
  suppliers: string[];
  statuses: string[];
  kpis: Kpi[];
  series: {
    spendByCategory: NamedValue[];
    spendBySupplier: NamedValue[];
    statusDistribution: NamedValue[];
    spendByMonth: number[];
    months: string[];
  };
  scorecard: SupplierScore[];
  rows: PurchaseOrder[];
}

/* ---------- Executive ---------- */
export interface DepartmentPerf {
  name: string;
  revenue: number;
  growth: number;
  margin: number;
}

export interface ExecutiveData {
  id: "executive";
  slug: "executive";
  company: string;
  title: string;
  currency: string;
  period: string;
  months: string[];
  departments: string[];
  regions: string[];
  kpis: Kpi[];
  series: {
    revenueByMonth: number[];
    ebitdaByMonth: number[];
    departmentPerformance: DepartmentPerf[];
    revenueByRegion: NamedValue[];
  };
}

export type DashboardData =
  | SalesData
  | InventoryData
  | ProcurementData
  | ExecutiveData;
