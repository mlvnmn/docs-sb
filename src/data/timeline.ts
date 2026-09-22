import type { TimelineIntro, TimelineMilestone } from '../types/content';

export const timelineIntro: TimelineIntro = {
  titleTop: 'TIMELINE',
  titleBottom: 'ARCHIVE',
};

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 'foundation',
    year: '1992',
    accent: 'blue',
    tag: 'FOUNDATION',
    title: 'Department Established',
    description:
      'The Department of Computer Science was established in 1992 with a vision to foster innovation, modern computation, and academic excellence.',
    image: '/assets/images/campus/cs-lab-1.jpg',
    footerLabel: 'YEAR 01',
    footerCode: '#EST-92',
  },
  {
    id: 'convocation',
    year: '1996',
    accent: 'pink',
    tag: 'CONVOCATION',
    title: 'First Batch Graduates',
    description:
      'The department proudly celebrated its pioneer batch of graduates, launching an enduring legacy of skilled industry leaders and scholars.',
    image: '/assets/images/gallery/snapshots/alumini-2.jpg',
    footerLabel: 'ALUMNI #01',
    footerCode: '#BATCH-96',
    active: true,
  },
  {
    id: 'postgraduate',
    year: '2001',
    accent: 'yellow',
    tag: 'POSTGRADUATE',
    title: 'M.Sc. Program Launched',
    description:
      'Introduced advanced M.Sc. in Computer Science to expand higher research opportunities, advanced algorithms, and academic depth.',
    image: '/assets/images/campus/cs-lab-2.jpg',
    footerLabel: 'ACADEMICS',
    footerCode: '#PG-LAUNCH',
  },
  {
    id: 'rnd-wing',
    year: '2008',
    accent: 'navy',
    tag: 'R&D WING',
    title: 'Research & Innovation Wing',
    description:
      'Inauguration of a dedicated wing to drive collaborative research, embedded systems, and robotics initiatives.',
    image: '/assets/images/gallery/complab/binl1625.jpg',
    footerLabel: 'INNOVATION',
    footerCode: '#RND-08',
  },
  {
    id: 'mca',
    year: '2013',
    accent: 'blue',
    tag: 'NEW PROGRAMME',
    title: 'MCA Programme Introduced',
    description:
      'The Master of Computer Application programme was launched, growing faculty strength and adding dedicated project labs.',
    image: '/assets/images/gallery/complab/compu-lab1.jpg',
    footerLabel: 'PROGRAMME',
    footerCode: '#MCA-13',
  },
  {
    id: 'ai-ds',
    year: '2024',
    accent: 'pink',
    tag: 'AI & DATA SCIENCE',
    title: 'B.Sc AI & Data Science Era',
    description:
      'Launched B.Sc Artificial Intelligence & Data Science, expanding industry partnerships and placing alumni across leading tech companies.',
    image: '/assets/images/gallery/activities/aignite-fest-sb-page-0001.jpg',
    footerLabel: 'TODAY',
    footerCode: '#AI-DS-24',
  },
];
