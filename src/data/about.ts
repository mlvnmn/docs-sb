import type { AboutContent } from '../types/content';

export const aboutContent: AboutContent = {
  title: 'About Our Department',
  since: '1992',
  intro:
    'The Department of Computer Science at St. Berchmans College is at the forefront of innovation and academic excellence. The Department started functioning in 1992. Our highly regarded faculty, celebrated for their knowledge and commitment, is dedicated to supporting your journey toward success. We offer meticulously designed programs that not only grant you a prestigious qualification but also equip you with a comprehensive skill set and a competitive edge in the dynamic technology industry.',
  highlights: [
    { id: 'placement', text: 'Placement With Top Companies' },
    { id: 'internship', text: 'Industry Internship' },
    { id: 'certification', text: 'Advanced Certification Programs & Add-On Courses' },
    { id: 'training', text: 'Training & Placement with Industry' },
    { id: 'interaction', text: 'Industry Institution Interaction' },
  ],
  courses: [
    { heading: 'UG Programme', items: ['BCA (Bachelor of Computer Application)'] },
    { heading: 'PG Programme', items: ['MCA (Master of Computer Application)', 'M.Sc Computer Science'] },
  ],
};
