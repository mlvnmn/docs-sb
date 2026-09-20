import type { OverviewContent, OverviewStat } from '../types/content';

export const overviewContent: OverviewContent = {
  kicker: 'Presenting Computer Science',
  headingLead: 'Department',
  headingTrail: 'of the Future',
  taglineLead: '',
  taglineEmphasis: '',
};

export const overviewStats: OverviewStat[] = [
  { id: 'students', value: '400', label: 'Students', digitStart: [0, null, null] },
  { id: 'faculty', value: '18', label: 'Faculty', digitStart: [0, 6] },
  { id: 'ai-labs', value: '3', label: 'AI Labs' },
  { id: 'communities', value: '6', label: 'Communities' },
];
