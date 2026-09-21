import type { AboutContent } from '../types/content';

export const aboutContent: AboutContent = {
  title: 'Bachelor of Computer Application',
  intro:
    'The Department of Computer Science at St. Berchmans College is at the forefront of innovation and academic excellence. The Department started functioning in 1992.',
  teaserIntro:
    'The Department of Computer Science at St. Berchmans College is at the forefront of innovation and academic excellence. The Department started functioning in 1992. Our highly regarded faculty, celebrated for their knowledge and commitment, is dedicated to supporting your journey toward success. We offer meticulously designed programs that not only grant you a prestigious qualification but also equip you with a comprehensive skill set and a competitive edge in the dynamic technology industry.',
  story: {
    title: 'M.Sc Computer Science',
    paragraphs: [
      'Our highly regarded faculty, celebrated for their knowledge and commitment, is dedicated to supporting your journey toward success.',
      'We offer meticulously designed programs that not only grant you a prestigious qualification but also equip you with a comprehensive skill set and a competitive edge in the dynamic technology industry.',
    ],
    image: '/assets/images/sb_college_campus_mirrored.jpg',
  },
  highlights: [
    { id: 'placement', text: 'Placement With Top Companies', icon: 'fa-solid fa-briefcase' },
    { id: 'internship', text: 'Industry Internship', icon: 'fa-solid fa-industry' },
    {
      id: 'certification',
      text: 'Advanced Certification Programs & Add-On Courses',
      icon: 'fa-solid fa-certificate',
    },
    { id: 'training', text: 'Training & Placement with Industry', icon: 'fa-solid fa-chalkboard-user' },
    { id: 'interaction', text: 'Industry Institution Interaction', icon: 'fa-solid fa-handshake' },
  ],
  courses: [
    {
      heading: 'UG Programme',
      badge: 'UG',
      items: ['BCA (Bachelor of Computer Application)', 'B.Sc Artificial Intelligence & Data Science'],
    },
    {
      heading: 'PG Programme',
      badge: 'PG',
      items: ['MCA (Master of Computer Application)', 'M.Sc Computer Science'],
    },
  ],
};
