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
  position?: 'upper' | 'lower';
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

export interface Recruiter {
  name: string;
  logo: string;
  /** Short display name for tickers / tight tiles (falls back to `name`). */
  short?: string;
  /** Industry label shown on the partners wall, e.g. "IT services". */
  sector?: string;
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
  url?: string;
}

export interface SocialLink {
  label: string;
  icon: string;
  href: string;
}

export interface AboutHighlight {
  id: string;
  text: string;
  icon: string;
}

export interface AboutCourseGroup {
  heading: string;
  badge: string;
  items: string[];
}

export interface AboutStoryContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  image: string;
}

export interface AboutContent {
  title: string;
  intro: string;
  teaserIntro: string;
  since: string;
  story: AboutStoryContent;
  highlights: AboutHighlight[];
  courses: AboutCourseGroup[];
}

export interface GalleryFolder {
  id: string;
  slug: string;
  title: string;
  description: string;
  coverImage: string;
  photos: string[];
}

export interface NewsArticle {
  id: string;
  category: string;
  title: string;
  date: string;
  comments: number;
  excerpt: string;
  image: string;
  body: string;
  author?: string;
  readTime?: string;
  featured?: boolean;
  tags?: string[];
}

export interface GazetteTopic {
  title: string;
  image: string;
  alt: string;
  category?: string;
  date?: string;
}

export interface OverviewStat {
  id: string;
  value: string;
  label: string;
}

export interface OverviewContent {
  kicker: string;
  headingLead: string;
  headingTrail: string;
  taglineLead: string;
  taglineEmphasis: string;
}

export interface ProgramCard {
  id: string;
  badge: string;
  title: string;
  poster: string;
  href: string;
}

