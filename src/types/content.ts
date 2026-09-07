export interface NavItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

export interface HeroSlide {
  image: string;
  alt: string;
  titleLines: string[];
  tabLabel: string;
}

export type FacultyArchetype = 'a' | 'b' | 'c' | 'd';

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  email: string;
  photo: string;
  accentColor: string;
  archetype: FacultyArchetype;
}

export interface TeaserPerson {
  id: string;
  name: string;
  photo: string;
  quote: string;
  accentColor: string;
  layout: 'arch' | 'landscape';
}

export interface Recruiter {
  name: string;
  logo: string;
}

export interface FooterLinkItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterColumn {
  heading: string;
  links: FooterLinkItem[];
}

export interface SiteInfo {
  departmentName: string;
  collegeName: string;
  phone: string;
  phoneHref: string;
  email: string;
  address: string[];
  mapEmbedUrl: string;
  mapLinkUrl: string;
}

export interface FooterContactInfo {
  address: string[];
  addressSubText: string;
  phone: string;
  emails: string[];
}

export interface FooterBrandingBlock {
  title: string;
  subText: string;
  badge: string;
  tagline: string;
}

export interface SocialLink {
  label: string;
  icon: string;
  href: string;
}

export interface InfrastructureLab {
  id: string;
  name: string;
  description?: string;
  images: [string, string, string];
}
