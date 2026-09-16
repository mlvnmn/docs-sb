import { overviewContent, overviewStats } from '../data/overview';
import type { OverviewContent, OverviewStat } from '../types/content';

export function useOverview(): { content: OverviewContent; stats: OverviewStat[] } {
  return { content: overviewContent, stats: overviewStats };
}
