import type { NewsArticle, GazetteTopic } from '../types/content';

export const gazetteNavLinks = [
  { label: 'All', hasDropdown: false },
  { label: 'Association', hasDropdown: false },
  { label: 'Docxcrew', hasDropdown: false },
  { label: 'Activities', hasDropdown: false },
  { label: 'Achievements', hasDropdown: false },
];

export const featuredArticle: NewsArticle = {
  id: 'featured-1',
  category: 'ACTIVITIES',
  title: 'Department Celebrates Onam with Pookalam, Sadya, and a Riot of Colour',
  date: 'August 21, 2026',
  comments: 26,
  author: '3rd Year BCA Students',
  readTime: '3 min read',
  excerpt:
    'The Department of Computer Science marked Onam with a floral pookalam competition, traditional attire, and a grand Onasadya, organized end-to-end by the third-year BCA batch.',
  image: '/assets/images/news/featured-onam.jpg',
  body: `The Department of Computer Science welcomed the spirit of Kerala's harvest festival with an Onam celebration organized by the third-year BCA students on August 21. The day began with students and faculty arriving in traditional Kerala attire — mundu and settu-mundu — setting the tone for a celebration that turned the department into a sea of colour.

Students competed in a pookalam-making contest, laying out intricate floral patterns using marigold, chrysanthemum, and banana leaf trimmings, followed by group games, a tug-of-war, and short cultural performances put together in the days leading up to the event. The celebration wrapped up with an Onasadya served on banana leaves, complete with the customary parippu, sambar, avial, and payasam.

Onam is ultimately a story about homecoming — the legend of King Mahabali returning once a year to see his people thriving in equality and abundance — and it says something good about a place when a department full of programmers and problem-solvers still sets aside a whole day to lay flowers on the ground, cook together, and eat off banana leaves as one batch. Credit for pulling it together goes entirely to the third-year BCA students, who organized everything from the pookalam contest to the sadya.`,
  tags: ['Onam', 'Campus Life', 'Culture', 'Student Life'],
};

export const topicCards: GazetteTopic[] = [
  {
    title: 'Association Day',
    image: '/assets/images/campus/cs-lab-3.jpg',
    alt: 'Association Day',
  },
  {
    title: 'Orientation Classes for 1st Year UG Students',
    image: '/assets/images/news/topic-orientation.jpg',
    alt: 'Orientation Classes for 1st Year UG Students',
  },
];

export const allNewsArticles: NewsArticle[] = [];
