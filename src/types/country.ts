export type {
  Country,
  CountryCostLevel,
  CountryDifficulty,
  CountryGoal,
  CountryIntelligence,
  CostItem,
} from "@/data/countries";

export type CountryMetricSource = {
  name: string;
  url: string;
  retrievedAt: string;
};

export type CountryMetric = {
  value: number;
  unit: string;
  currency?: string;
  geography: {
    level: "country" | "city";
    name: string;
  };
  source: CountryMetricSource;
  period: string;
  confidence: "low" | "medium" | "high";
  methodologyVersion: string;
};
