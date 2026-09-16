import { programs } from '../data/programs';
import type { ProgramCard } from '../types/content';

export function usePrograms(): ProgramCard[] {
  return programs;
}
