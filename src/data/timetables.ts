import type { TimetableSchedule } from '../types/content';

// Placeholder schedule reused across all sections for now — swap in each
// section's real timetable once it's provided.
const placeholderSchedule: TimetableSchedule = {
  periodLabels: ['Period 1', 'Period 2', 'Period 3', 'Period 4', 'Period 5', 'Period 6'],
  rows: [
    {
      day: '1st',
      periods: [
        { subject: 'SE', instructor: 'ABB' },
        { subject: 'C-Lab', instructor: 'Sharon', isLab: true },
        { subject: 'C-Lab', instructor: 'Sharon', isLab: true },
        { subject: 'C', instructor: 'Sharon' },
        { subject: 'Digital', instructor: 'RJ' },
        { subject: 'Soft Skill', instructor: '' },
      ],
    },
    {
      day: '2nd',
      periods: [
        { subject: 'SE', instructor: 'ABB' },
        { subject: 'DBMS', instructor: 'RJ' },
        { subject: 'DBMS', instructor: 'SK' },
        { subject: 'C', instructor: 'AM' },
        { subject: 'Digital', instructor: 'RJ' },
        { subject: 'Maths', instructor: 'PV' },
      ],
    },
    {
      day: '3rd',
      periods: [
        { subject: 'DBMS', instructor: 'RJ' },
        { subject: 'Maths', instructor: 'PV' },
        { subject: 'C', instructor: 'AM' },
        { subject: 'DBMS Lab', instructor: 'SK', isLab: true },
        { subject: 'SE', instructor: 'ABB' },
        { subject: 'DBMS Lab', instructor: 'RJ', isLab: true },
      ],
    },
    {
      day: '4th',
      periods: [
        { subject: 'C', instructor: 'Sharon' },
        { subject: 'C Lab', instructor: 'AM', isLab: true },
        { subject: 'C Lab', instructor: 'AM', isLab: true },
        { subject: 'Maths', instructor: 'SVB' },
        { subject: 'Digital', instructor: 'RJ' },
        { subject: 'Soft Skill', instructor: '' },
      ],
    },
    {
      day: '5th',
      periods: [
        { subject: 'Digital', instructor: 'RJ' },
        { subject: 'DBMS', instructor: 'SK' },
        { subject: 'Maths', instructor: 'SVB' },
        { subject: 'SE', instructor: 'ABB' },
        { subject: 'DBMS Lab', instructor: 'SK', isLab: true },
        { subject: 'DBMS Lab', instructor: 'SK', isLab: true },
      ],
    },
  ],
};

export const timetables: Record<string, TimetableSchedule> = {
  'BCA 1st Yr A': placeholderSchedule,
  'BCA 1st Yr B': placeholderSchedule,
  'BCA 2nd Yr A': placeholderSchedule,
  'BCA 2nd Yr B': placeholderSchedule,
  'BCA 3rd Yr A': placeholderSchedule,
  'BCA 3rd Yr B': placeholderSchedule,
};
