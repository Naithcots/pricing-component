export type Plan = {
  id: number;
  pageViews: number;
  pageViewsText: string;
  pricePerMonth: number;
};

export type Billing = "monthly" | "yearly";
