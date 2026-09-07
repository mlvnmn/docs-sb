import type { NavItem } from '../types/content';

export const navLinks: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Faculty', href: '/faculty' },
  {
    label: 'Campus Life',
    href: '/#life',
    dropdown: [
      { label: 'Advanced Labs', href: '/#life', icon: 'fa-solid fa-desktop' },
      { label: 'Tech Events & Hackathons', href: '/#gazette', icon: 'fa-solid fa-calendar-days' },
      { label: 'Coding Clubs', href: '/#life', icon: 'fa-solid fa-users' },
      { label: 'Student Achievements', href: '/#life', icon: 'fa-solid fa-trophy' },
    ],
  },
  {
    label: 'About',
    href: '/#about',
    dropdown: [
      { label: 'Department Overview', href: '/#about', icon: 'fa-solid fa-circle-info' },
      { label: 'Vision & Mission', href: '/#about', icon: 'fa-solid fa-bullseye' },
      { label: 'NAAC & Accreditations', href: '/#about', icon: 'fa-solid fa-award' },
      { label: 'Placements & Career', href: '/#about', icon: 'fa-solid fa-briefcase' },
    ],
  },
];
