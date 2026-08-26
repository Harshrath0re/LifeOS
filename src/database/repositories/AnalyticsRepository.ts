import { MetricSummary } from '../../types/analytics';

export class AnalyticsRepository {
  public async getSummary(_period: string): Promise<readonly MetricSummary[]> {
    return [];
  }
}
