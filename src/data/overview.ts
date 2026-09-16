import type { OverviewContent, OverviewStat } from '../types/content';

export const overviewContent: OverviewContent = {
  kicker: 'Overview',
  headingLead: 'Of',
  headingTrail: 'Department',
  taglineLead: '',
  taglineEmphasis: '',
};

export const overviewStats: OverviewStat[] = [
  { id: 'students', value: '600', label: 'Students' },
  { id: 'faculty', value: '20', label: 'Faculty' },
  { id: 'ai-labs', value: '3', label: 'AI Labs' },
  { id: 'communities', value: '6', label: 'Communities' },
];
