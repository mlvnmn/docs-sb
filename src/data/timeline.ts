export interface TimelineStat {
  label: string;
  value: string;
  accent?: boolean;
}

export type TimelineCompanion =
  | {
      kind: 'chart';
      label: string;
      status: string;
      bars: number[];
      caption: string;
    }
  | {
      kind: 'terminal';
      badge: string;
      title: string;
      subtitle: string;
      statusLabel: string;
      statusValue: string;
      lines: { text: string; color?: string }[];
    }
  | {
      kind: 'map';
      icon: string;
      heading: string;
      subheading: string;
      footerLabel: string;
      footerValue: string;
    }
  | {
      kind: 'workflow';
      heading: string;
      items: { label: string; status: string; statusColor: string }[];
      footnote: string;
    }
  | {
      kind: 'neural';
      heading: string;
      eventTitle: string;
      eventBody: string;
      impactLabel: string;
      impactValue: string;
    }
  | {
      kind: 'spec';
      icon: string;
      heading: string;
      subheading: string;
      body: string;
      footLabel: string;
      footValue: string;
    };

export interface TimelineNote {
  type: 'line' | 'quote';
  icon?: string;
  text: string;
}

export interface TimelineMilestone {
  id: string;
  era: string;
  year: string;
  icon: string;
  accent: string;
  tint: string;
  title: string;
  description: string;
  stats: TimelineStat[];
  note: TimelineNote;
  companion: TimelineCompanion;
  finale?: boolean;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 'founding',
    era: 'ERA 01',
    year: '1987',
    icon: 'rocket_launch',
    accent: '#3D63CC',
    tint: '#b4c4ff',
    title: 'The Genesis of the Department',
    description:
      'The Department of Computer Science opened its doors at St Berchmans College with a handful of dedicated faculty, a single computer lab, and a first batch determined to learn a brand-new discipline.',
    stats: [
      { label: 'First Batch', value: '30 Students' },
      { label: 'Founding Faculty', value: '4' },
      { label: 'Lab Systems', value: '10', accent: true },
    ],
    note: { type: 'line', icon: 'verified', text: 'Approved and affiliated under Mahatma Gandhi University, Kottayam.' },
    companion: {
      kind: 'chart',
      label: 'Node Telemetry: Founding Lab',
      status: 'SYS:INITIALIZED',
      bars: [35, 55, 45, 70, 85, 100],
      caption: 'The department’s first lab bench — ten systems shared across every practical batch.',
    },
  },
  {
    id: 'ug-recognition',
    era: 'ERA 02',
    year: '1995',
    icon: 'school',
    accent: '#FF4F87',
    tint: '#ffb1c1',
    title: 'UGC Recognition & Curriculum Overhaul',
    description:
      'Formal UGC recognition arrived alongside a modernized curriculum, bringing programming, data structures, and systems courses in line with contemporary industry needs.',
    stats: [
      { label: 'New Electives', value: '6' },
      { label: 'Lab Hours / Week', value: '12', accent: true },
      { label: 'Pass Percentage', value: '92%' },
    ],
    note: { type: 'quote', icon: 'format_quote', text: '"The revised syllabus was the first in the region to teach structured programming from year one."' },
    companion: {
      kind: 'terminal',
      badge: 'v2.0',
      title: 'Revised UG Syllabus',
      subtitle: 'Adopted March 1995',
      statusLabel: 'DEPLOYMENT',
      statusValue: 'STABLE',
      lines: [
        { text: '$ syllabus load --stream computer-science', color: '#b4c4ff' },
        { text: '✓ Core papers realigned with UGC model curriculum', color: '#45B86B' },
        { text: '★ Practical lab hours doubled across all semesters', color: '#FFD800' },
      ],
    },
  },
  {
    id: 'pg-and-labs',
    era: 'ERA 03',
    year: '2005',
    icon: 'dns',
    accent: '#FFA313',
    tint: '#ffd9a6',
    title: 'PG Programme & New Computing Labs',
    description:
      'Launched a postgraduate programme in Computer Science and inaugurated two new computing labs with networked workstations, giving students hands-on exposure to real infrastructure.',
    stats: [
      { label: 'New Labs', value: '2' },
      { label: 'Workstations', value: '80+', accent: true },
      { label: 'PG Seats', value: '20' },
    ],
    note: { type: 'line', icon: 'security', text: 'Structured, networked lab infrastructure replaced standalone lab machines.' },
    companion: {
      kind: 'map',
      icon: 'dns',
      heading: 'Networked Computing Wing',
      subheading: 'Main Block • Second Floor',
      footerLabel: 'Active Lab Sessions',
      footerValue: '6 / week',
    },
  },
  {
    id: 'autonomous',
    era: 'ERA 04',
    year: '2014',
    icon: 'workspace_premium',
    accent: '#FFD800',
    tint: '#FFD800',
    title: 'College Attains Autonomous Status',
    description:
      'With St Berchmans College becoming autonomous, the department gained the freedom to design its own curriculum, introduce electives ahead of the curve, and pilot outcome-based education.',
    stats: [
      { label: 'Elective Baskets', value: '5' },
      { label: 'Industry Modules', value: '8', accent: true },
      { label: 'Credit System', value: 'CBCSS' },
    ],
    note: { type: 'line', icon: 'auto_graph', text: 'Curriculum revisions that once took years could now happen every academic cycle.' },
    companion: {
      kind: 'workflow',
      heading: 'Autonomous Curriculum Matrix',
      items: [
        { label: 'Core Papers', status: 'REVISED', statusColor: '#3D63CC' },
        { label: 'Open Electives', status: 'EXPANDED', statusColor: '#FFD800' },
        { label: 'Outcome-Based Boards', status: 'ACTIVE', statusColor: '#45B86B' },
      ],
      footnote: 'Every batch since has graduated under a syllabus revised within the same year.',
    },
  },
  {
    id: 'research-industry',
    era: 'ERA 05',
    year: '2018',
    icon: 'psychology',
    accent: '#45B86B',
    tint: '#a2ffb6',
    title: 'Research Cell & Industry Partnerships',
    description:
      'Established a dedicated research cell for faculty and student projects, while formal MoUs with IT companies opened up internships, guest lectures, and placement pipelines.',
    stats: [
      { label: 'MoUs Signed', value: '12+' },
      { label: 'Published Papers', value: '35+', accent: true },
      { label: 'Interns / Year', value: '60+' },
    ],
    note: { type: 'line', icon: 'neurology', text: 'Positioned the department as a working bridge between the classroom and the industry floor.' },
    companion: {
      kind: 'neural',
      heading: 'Placement & Research Desk',
      eventTitle: 'Internship Pipeline Alert',
      eventBody: '"12 second-year students matched to summer internships across 5 partner companies this cycle."',
      impactLabel: 'PAPERS PUBLISHED',
      impactValue: '35+',
    },
  },
  {
    id: 'digital-era',
    era: 'ERA 06',
    year: '2021',
    icon: 'laptop_chromebook',
    accent: '#7AD0FF',
    tint: '#cfe8ff',
    title: 'Smart Classrooms & Digital-First Learning',
    description:
      'Every classroom was upgraded with smart boards and video-conferencing, and the department built out hybrid-learning infrastructure to keep teaching resilient and accessible.',
    stats: [
      { label: 'Smart Classrooms', value: '6' },
      { label: 'Online Course Hours', value: '400+', accent: true },
      { label: 'Bandwidth Upgrade', value: '10x' },
    ],
    note: { type: 'line', icon: 'wifi_tethering', text: 'Kept every batch learning without interruption through a fully digital fallback.' },
    companion: {
      kind: 'terminal',
      badge: 'HYBRID',
      title: 'Digital Classroom Rollout',
      subtitle: 'Completed August 2021',
      statusLabel: 'UPTIME',
      statusValue: 'ONLINE',
      lines: [
        { text: '$ classroom deploy --mode hybrid --rooms 6', color: '#b4c4ff' },
        { text: '✓ Video-conferencing bridged across all sections', color: '#45B86B' },
        { text: '★ Zero instructional days lost to connectivity', color: '#FFD800' },
      ],
    },
  },
  {
    id: 'today',
    era: 'ERA 07',
    year: '2026+',
    icon: 'all_inclusive',
    accent: '#00E5FF',
    tint: '#67e8f9',
    title: 'Today & The Road Ahead',
    description:
      'Now home to BSc, BCA and MSc programmes, an active placement cell, and student-led tech communities, the department continues to invest in AI, data science, and cloud-focused learning tracks.',
    stats: [
      { label: 'Active Programmes', value: '3' },
      { label: 'Placement Rate', value: '90%+', accent: true },
      { label: 'Student Clubs', value: '4' },
    ],
    note: { type: 'line', icon: 'eco', text: 'Building the next chapter around emerging technologies and industry-ready graduates.' },
    companion: {
      kind: 'spec',
      icon: 'satellite_alt',
      heading: 'Next-Gen Curriculum Track',
      subheading: 'Active Board of Studies Working Group',
      body: 'New electives in AI/ML, data science, and cloud computing are being phased in across the UG and PG syllabi.',
      footLabel: 'Rollout Progress',
      footValue: 'Phase 1 of 3 Active',
    },
    finale: true,
  },
];
