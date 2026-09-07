import { siteInfo } from '../data/siteInfo';
import type { SiteInfo } from '../types/content';

export function useDepartment(): SiteInfo {
  return siteInfo;
}
