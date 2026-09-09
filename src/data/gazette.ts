import type { NewsArticle, GazetteTopic } from '../types/content';

export const gazetteNavLinks = [
  { label: 'All', hasDropdown: false },
  { label: 'Market', hasDropdown: false },
  { label: 'Tech & AI', hasDropdown: false },
  { label: 'Research', hasDropdown: false },
  { label: 'Campus News', hasDropdown: false },
  { label: 'Opinion', hasDropdown: false },
  { label: 'Achievements', hasDropdown: false },
];

export const featuredArticle: NewsArticle = {
  id: 'featured-1',
  category: 'MARKET',
  title: "They're the Hottest Team in Baseball — and Cost Less Than $20 Million",
  date: 'January 8, 2025',
  comments: 26,
  author: 'Editorial Desk',
  readTime: '4 min read',
  excerpt:
    'In the rapidly expanding concrete jungles of the modern world, urban green spaces—parks, gardens, and tree-lined streets—are becoming more vital than ever. These areas...',
  image: '/assets/images/baseball_news.jpg',
  body: `Labore nonumes te vix, vis in errem tantas tempor. Solet quidam salutatus at quo. Tantas comprehensam te sea, usu sanctus similique et. Viderer admodum mea et, probo tantas alienum ne vim.

Urban green spaces serve as critical sanctuaries for biodiversity while offering respite to city dwellers amidst bustling urban environments. Recent statistical analyses reveal that cities investing in intelligent sports technology and smart analytics achieve 40% higher operational efficiency.

The interplay between budget constraints and peak performance continues to redefine how collegiate and professional teams structure their computational analytics pipelines. As data-driven strategies replace legacy models, low-cost high-efficiency algorithms lead the charge.`,
  featured: true,
  tags: ['Sports', 'Analytics', 'Market', 'Technology'],
};

export const topicCards: GazetteTopic[] = [
  {
    title: 'Dicant erroribus eos ut, est nisl summo',
    image: '/assets/images/topic_industrial.jpg',
    alt: 'Industrial Innovation',
    category: 'TECH & AI',
    date: 'January 5, 2025',
  },
  {
    title: 'Sententiae epicuri concludaturque ius no id mucius',
    image: '/assets/images/topic_stadium.jpg',
    alt: 'Stadium Tech',
    category: 'RESEARCH',
    date: 'January 2, 2025',
  },
];

export const allNewsArticles: NewsArticle[] = [
  featuredArticle,
  {
    id: 'news-2',
    category: 'TECH & AI',
    title: 'Breakthrough in Quantum Computing Algorithms Demonstrated at SB CS Lab',
    date: 'February 14, 2025',
    comments: 18,
    author: 'Dr. Joseph K. V.',
    readTime: '6 min read',
    excerpt:
      'Researchers at the Department of Computer Science have published a ground-breaking paper on error mitigation in noisy intermediate-scale quantum hardware.',
    image: '/assets/images/cs lab 1.jpg',
    body: `Our quantum computing research group has unveiled a novel error mitigation strategy that improves qubit fidelity by over 32%. The experiment, conducted in collaboration with international university labs, leverages customized pulse shaping and adaptive error correction loops.

"This milestone brings us closer to practical quantum advantage for high-complexity optimization problems," stated the lead researcher. The full code repository and experimental findings are published open-access in IEEE Transactions on Quantum Engineering.`,
    tags: ['Quantum Computing', 'Research', 'AI', 'Algorithms'],
  },
  {
    id: 'news-3',
    category: 'CAMPUS NEWS',
    title: 'Annual Department Hackathon "HackSB 2025" Draws Over 300 Participants',
    date: 'February 1, 2025',
    comments: 42,
    author: 'Student Editorial Board',
    readTime: '3 min read',
    excerpt:
      '36 hours of non-stop coding, innovation, and intense competition concluded with team "Synthetix" taking home the grand trophy for their AI accessibility tool.',
    image: '/assets/images/cs lab 2.jpg',
    body: `HackSB 2025 brought together coders, designers, and domain experts from across the region for 36 intense hours of creation. Sponsored by leading tech industry partners, the hackathon saw 75 project submissions spanning healthcare tech, eco-analytics, and decentralized applications.

The top prize went to team "Synthetix" for building an offline multi-lingual voice conversion system designed to assist non-verbal students in real-time classroom interactions.`,
    tags: ['Hackathon', 'Campus Life', 'Innovation', 'Student Life'],
  },
  {
    id: 'news-4',
    category: 'RESEARCH',
    title: 'Deep Learning Models for Real-Time Satellite Imagery Analysis',
    date: 'January 22, 2025',
    comments: 11,
    author: 'Prof. Mary Thomas',
    readTime: '5 min read',
    excerpt:
      'A novel vision transformer architecture optimized for edge devices allows instant environmental monitoring and disaster response telemetry.',
    image: '/assets/images/cs lab 3.jpg',
    body: `Processing high-resolution satellite imagery directly on lightweight edge hardware has long been bottlenecked by parameter constraints. Department researchers have engineered a compressed hybrid Vision Transformer (ViT) that shrinks model size by 70% while maintaining 98.4% top-1 accuracy on land-use classification tasks.

The model is already being trialed for localized flood detection and agricultural health assessment across Kerala.`,
    tags: ['Deep Learning', 'Computer Vision', 'Satellite', 'AI'],
  },
  {
    id: 'news-5',
    category: 'MARKET',
    title: 'Global Tech Hiring Trends: Why Systems Engineering Skills Are Soaring in 2025',
    date: 'January 18, 2025',
    comments: 15,
    author: 'Placement Cell',
    readTime: '4 min read',
    excerpt:
      'Industry reports indicate a resurgence in demand for low-level systems programming, Rust expertise, and distributed database architecture.',
    image: '/assets/images/sb_college_campus_mirrored.jpg',
    body: `As cloud computing platforms expand and real-time streaming demands surge, global technology firms are prioritizing candidates with strong fundamentals in operating systems, computer architecture, and distributed consensus algorithms.

The Department Placement Cell reports a 25% increase in recruitment offers for core software engineering roles compared to previous quarters.`,
    tags: ['Hiring', 'Careers', 'Systems Engineering', 'Market'],
  },
  {
    id: 'news-6',
    category: 'OPINION',
    title: 'Ethical AI Governance in Higher Education: Navigating Generative Tools in the Classroom',
    date: 'January 12, 2025',
    comments: 29,
    author: 'Dr. Jacob Abraham',
    readTime: '7 min read',
    excerpt:
      'Rather than banning synthetic AI assistants, modern academia must redefine assessment paradigms to cultivate critical thinking and verification skills.',
    image: '/assets/images/topic_industrial.jpg',
    body: `Generative language and vision models are reshaping how code is authored, debugged, and documented. Restricting access to these tools in educational settings creates a disconnect between academia and real-world engineering environments.

By integrating AI tools into assignment design—emphasizing code review, architectural design trade-offs, and empirical verification—we empower students to become discerning technological leaders.`,
    tags: ['Ethics', 'AI Governance', 'Education', 'Opinion'],
  },
  {
    id: 'news-7',
    category: 'ACHIEVEMENTS',
    title: 'CS Department Secures Top Honors at National Tech Innovation Championship',
    date: 'December 28, 2024',
    comments: 34,
    author: 'Student Affairs Cell',
    readTime: '3 min read',
    excerpt:
      'Computer Science students won first prize for their autonomous robotics and AI telemetry solution at the National Tech Championship.',
    image: '/assets/images/topic_stadium.jpg',
    body: `With outstanding innovation and technical rigor, the Department of Computer Science student team secured the overall championship trophy at the National Tech Innovation Championship.

Special commendations were awarded to final-year BCA student Rahul Nair and team for setting a benchmark in real-time edge processing and autonomous system design.`,
    tags: ['Achievements', 'Awards', 'Innovation', 'Student Life'],
  },
];
