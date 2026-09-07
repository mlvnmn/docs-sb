import type { InfrastructureLab } from '../types/content';

const labPhotos: [string, string, string] = [
  '/assets/images/cs lab 1.jpg',
  '/assets/images/cs lab 2.jpg',
  '/assets/images/cs lab 3.jpg',
];

export const infrastructureLabs: InfrastructureLab[] = [
  {
    id: 'centenary-lab',
    name: 'Centenary lab',
    description:
      'The Centenary Memorial Computer Lab is a state-of-the-art facility designed to provide students, researchers, and faculty members with the latest in computing technology and resources.',
    images: labPhotos,
  },
  {
    id: 'sib-lab',
    name: 'SIB lab',
    description:
      'A Computer Lab with the latest technology-based computer systems which include good computing facilities. The computers are installed with Linux/Windows operating systems and application software for conducting the official laboratory courses.',
    images: labPhotos,
  },
];

export const infrastructureOthers: InfrastructureLab[] = [
  {
    id: 'classes',
    name: 'Classes',
    description:
      'Smart, well-ventilated classrooms equipped with projectors and digital display systems, designed to support interactive lectures, seminars, and collaborative learning sessions.',
    images: labPhotos,
  },
  {
    id: 'premises',
    name: 'Premises',
    description:
      'A modern academic block housing classrooms, staff rooms, and a seminar hall, complemented by open common spaces that support a vibrant campus life for students and faculty alike.',
    images: labPhotos,
  },
];
