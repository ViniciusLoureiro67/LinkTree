import {
  Code2,
  Palette,
  Database,
  Server,
  GitBranch,
  Boxes,
  Layers,
  Terminal,
} from 'lucide-react';

export const skillCategories = [
  {
    id: 'frontend',
    title: 'Front-end',
    icon: Code2,
    color: 'primary',
    skills: [
      { name: 'React 19', level: 95, featured: true },
      { name: 'TypeScript', level: 90, featured: true },
      { name: 'Next.js', level: 80 },
      { name: 'Vue.js', level: 70 },
      { name: 'JavaScript ES6+', level: 95 },
      { name: 'HTML5/CSS3', level: 95 },
    ],
  },
  {
    id: 'styling',
    title: 'Estilização',
    icon: Palette,
    color: 'secondary',
    skills: [
      { name: 'Tailwind CSS', level: 95, featured: true },
      { name: 'shadcn/ui', level: 90, featured: true },
      { name: 'Ant Design', level: 85 },
      { name: 'Styled Components', level: 80 },
      { name: 'CSS Modules', level: 85 },
      { name: 'SASS/SCSS', level: 85 },
    ],
  },
  {
    id: 'backend',
    title: 'Back-end',
    icon: Server,
    color: 'accent',
    skills: [
      { name: 'Laravel 12', level: 85, featured: true },
      { name: 'Inertia.js', level: 90, featured: true },
      { name: 'PHP 8.3', level: 80 },
      { name: 'Node.js', level: 70 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    id: 'database',
    title: 'Banco de Dados',
    icon: Database,
    color: 'success',
    skills: [
      { name: 'PostgreSQL', level: 85, featured: true },
      { name: 'MySQL', level: 80 },
      { name: 'Redis', level: 70 },
      { name: 'Eloquent ORM', level: 90 },
    ],
  },
  {
    id: 'tools',
    title: 'Ferramentas',
    icon: GitBranch,
    color: 'warning',
    skills: [
      { name: 'Git/GitHub', level: 95, featured: true },
      { name: 'VS Code', level: 95 },
      { name: 'Figma', level: 75 },
      { name: 'Postman', level: 85 },
      { name: 'Docker', level: 70 },
    ],
  },
  {
    id: 'libraries',
    title: 'Bibliotecas',
    icon: Boxes,
    color: 'primary',
    skills: [
      { name: 'Framer Motion', level: 85, featured: true },
      { name: 'React Query', level: 80 },
      { name: 'Zustand', level: 80 },
      { name: 'React Hook Form', level: 85 },
      { name: 'Zod', level: 80 },
    ],
  },
];

export const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Laravel', color: '#FF2D20' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Inertia.js', color: '#9553E9' },
];

export const featuredSkills = [
  'React 19',
  'TypeScript',
  'Tailwind CSS',
  'shadcn/ui',
  'Laravel 12',
  'Inertia.js',
  'PostgreSQL',
  'Framer Motion',
];
