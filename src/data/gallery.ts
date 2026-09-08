import type { GalleryFolder } from '../types/content';

export const galleryFolders: GalleryFolder[] = [
  {
    id: 'activities-hub',
    slug: 'department-activities-hub',
    title: 'Department Activities Hub',
    description: 'Workshops, seminars, and department-led events through the academic year.',
    coverImage: '/assets/images/topic_industrial.jpg',
    photos: [
      '/assets/images/topic_industrial.jpg',
      '/assets/images/baseball_news.jpg',
      '/assets/images/sb_college_campus_mirrored.jpg',
    ],
  },
  {
    id: 'snapshots',
    slug: 'snapshots-of-moments',
    title: 'Snapshots of Moments',
    description: 'Candid moments from campus life, sports, and student gatherings.',
    coverImage: '/assets/images/topic_stadium.jpg',
    photos: [
      '/assets/images/topic_stadium.jpg',
      '/assets/images/baseball_news.jpg',
      '/assets/images/sb_college_campus_mirrored.jpg',
    ],
  },
  {
    id: 'computer-lab',
    slug: 'computer-lab',
    title: 'Computer Lab',
    description: 'A look inside our labs where students build, debug, and learn.',
    coverImage: '/assets/images/cs lab 1.jpg',
    photos: ['/assets/images/cs lab 1.jpg', '/assets/images/cs lab 2.jpg', '/assets/images/cs lab 3.jpg'],
  },
];

export const galleryPageCopy = {
  heroEyebrow: 'GALLERY',
  heroTitle: 'Capturing Life\nAt The Department',
  heroSub:
    'Every workshop, every late night in the lab, every match on the field — a running record of what it looks like to study computer science here.',
  heroCta: 'Browse Folders',
  heroMainImage: '/assets/images/topic_industrial.jpg',
  heroSubImageA: '/assets/images/cs lab 2.jpg',
  heroSubImageB: '/assets/images/baseball_news.jpg',

  storyEyebrow: 'WHY WE DOCUMENT',
  storyTitle: 'A Visual Record Of Every Milestone',
  storyText:
    'From the first day a batch walks into the Centenary Lab to the last presentation before graduation, we keep a camera close. These folders are the department\'s shared memory — built up one event, one lab session, one match at a time.',
  storyImage: '/assets/images/sb_college_campus_mirrored.jpg',

  exploreEyebrow: 'WHAT\'S INSIDE',
  exploreTitle: 'Three Folders, One Archive',
  exploreText:
    'Activities and workshops, candid campus moments, and a look inside the labs — pick a folder below and step through the photos.',
  exploreImage: '/assets/images/topic_stadium.jpg',
  exploreCta: 'See The Folders',

  cultureEyebrow: 'BUILDING MEMORIES',
  cultureTitle: 'A Culture Worth Photographing',
  cultureText:
    'None of this happens without the people who show up — students running events, faculty mentoring projects, teams competing for the department. The gallery grows every semester because they do.',
  cultureImageA: '/assets/images/cs lab 3.jpg',
  cultureImageB: '/assets/images/topic_industrial.jpg',

  ctaTitle: 'Have Photos To Share?',
  ctaSub: 'Send Them Our Way',
};
