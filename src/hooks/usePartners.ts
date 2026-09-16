import { recruiters } from '../data/recruiters';
import type { Recruiter } from '../types/content';

export function usePartners(): Recruiter[] {
  return recruiters;
}
