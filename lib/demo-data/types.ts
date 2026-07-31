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

/* ---------- Financial ---------- */
export interface BudgetActual {
  name: string;
  budget: number;
  actual: number;
}

export interface FinancialData {
  id: "financial";
  slug: "financial";
  company: string;
  title: string;
  currency: string;
  period: string;
  months: string[];
  kpis: Kpi[];
  series: {
    revenueByMonth: number[];
    ebitdaByMonth: number[];
    cashInByMonth: number[];
    cashOutByMonth: number[];
    cashNetByMonth: number[];
    expenseBreakdown: NamedValue[];
    budgetVsActual: BudgetActual[];
  };
}

/* ---------- Marketing ---------- */
export interface ChannelPerf {
  name: string;
  spend: number;
  revenue: number;
  roas: number;
  leads: number;
  cac: number;
}

export interface MarketingData {
  id: "marketing";
  slug: "marketing";
  company: string;
  title: string;
  currency: string;
  period: string;
  months: string[];
  channels: string[];
  kpis: Kpi[];
  series: {
    channelPerformance: ChannelPerf[];
    funnel: NamedValue[];
    leadsByMonth: number[];
    roasByChannel: NamedValue[];
    spendByChannel: NamedValue[];
  };
}

/* ---------- HR ---------- */
export interface DeptPeople {
  name: string;
  headcount: number;
  attrition: number;
}

export interface HrData {
  id: "hr";
  slug: "hr";
  company: string;
  title: string;
  currency: string;
  period: string;
  months: string[];
  departments: string[];
  kpis: Kpi[];
  series: {
    headcountByDept: NamedValue[];
    attritionByMonth: number[];
    hiringFunnel: NamedValue[];
    tenureDistribution: NamedValue[];
  };
  table: DeptPeople[];
}

/* ---------- E-commerce ---------- */
export interface SourcePerf {
  name: string;
  revenue: number;
  sessions: number;
  conversion: number;
}

export interface EcommerceData {
  id: "ecommerce";
  slug: "ecommerce";
  company: string;
  title: string;
  currency: string;
  period: string;
  months: string[];
  sources: string[];
  kpis: Kpi[];
  series: {
    revenueByMonth: number[];
    ordersByMonth: number[];
    revenueBySource: NamedValue[];
    topProducts: NamedValue[];
    sourcePerformance: SourcePerf[];
  };
}

export type DashboardData =
  | SalesData
  | InventoryData
  | ProcurementData
  | ExecutiveData
  | FinancialData
  | MarketingData
  | HrData
  | EcommerceData;
