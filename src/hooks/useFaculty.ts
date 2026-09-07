import { faculty } from '../data/faculty';
import type { FacultyMember } from '../types/content';

export function useFaculty(): FacultyMember[] {
  return faculty;
}
