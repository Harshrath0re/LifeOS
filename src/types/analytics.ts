export interface MetricSummary {
  readonly label: string;
  readonly value: number | string;
  readonly changePercentage?: number;
  readonly period: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface ChartDataPoint {
  readonly label: string;
  readonly value: number;
  readonly date?: string;
}
