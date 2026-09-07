import type {
  FooterColumn,
  FooterContactInfo,
  FooterBrandingBlock,
  SocialLink,
} from '../types/content';

export const footerDeptBranding: FooterBrandingBlock = {
  title: 'Department of Computer Science',
  subText: 'St Berchmans College',
  badge: 'Powering Generations',
  tagline: 'Committed to excellence in education, research, and innovation since 1987.',
};

export const footerCollegeBranding: FooterBrandingBlock = {
  title: 'St Berchmans College',
  subText: 'Autonomous • Changanassery',
  badge: 'NAAC A+ Grade (Cycle 5)',
  tagline: 'College with Potential for Excellence • Affiliated to MG University, Kottayam.',
};

export const socialLinks: SocialLink[] = [
  { label: 'Twitter / X', icon: 'fa-brands fa-x-twitter', href: '#' },
  { label: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: '#' },
  { label: 'YouTube', icon: 'fa-brands fa-youtube', href: '#' },
  { label: 'Instagram', icon: 'fa-brands fa-instagram', href: '#' },
  { label: 'Facebook', icon: 'fa-brands fa-facebook-f', href: '#' },
];

export const quickLinksColumn: FooterColumn = {
  heading: 'QUICK LINKS',
  links: [
    { label: 'Faculty Directory', href: '/#people' },
    { label: 'Events & Calendar', href: '/#gazette' },
    { label: 'Alumni Network', href: '/#people' },
    { label: 'About the Department', href: '/#about' },
    { label: 'Contact Us', href: '/#contact' },
    { label: 'Our Developers', href: '/#about' },
  ],
};

export const resourcesColumn: FooterColumn = {
  heading: 'RESOURCES',
  links: [
    { label: 'Student Portal', href: '#', external: true },
    { label: 'Library E-Resources', href: '#', external: true },
    { label: 'Examination Cell', href: '#', external: true },
    { label: 'Placement Cell', href: '#', external: true },
    { label: 'Anti-Ragging Cell', href: '#', external: true },
    { label: 'IQAC', href: '#', external: true },
    { label: 'NAAC Reports', href: '#', external: true },
  ],
};

export const footerContactInfo: FooterContactInfo = {
  address: [
    'Department of Computer Science,',
    'St Berchmans College (Autonomous),',
    'Changanassery, Kerala, India – 686 101',
  ],
  addressSubText: 'Affiliated to Mahatma Gandhi University',
  phone: '+91 481 2420025 / 2420026',
  emails: ['cs@sbcollege.ac.in', 'hodcs@sbcollege.ac.in'],
};

export const copyrightText =
  '© 2026 University of Technology — Dept. of CS & Engineering. All rights reserved.';

export const creditText = {
  athlogixUrl: 'https://athlogix.in',
};
