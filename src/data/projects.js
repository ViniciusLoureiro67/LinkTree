export const projects = [
  {
    id: 'nexus',
    title: 'Nexus - Sistema de Gestão',
    subtitle: 'Sistema corporativo completo',
    description:
      'Sistema de gestão empresarial com Kanban, sistema de tickets, notificações em tempo real, dashboard analítico e muito mais. Desenvolvido para otimizar processos internos de empresas.',
    shortDescription:
      'Sistema de gestão empresarial com Kanban, tickets e notificações.',
    image: '/screenshots/nexus-dashboard.jpg',
    url: '/portfolio/nexus',
    externalUrl: null,
    technologies: [
      'Laravel 12',
      'React 19',
      'TypeScript',
      'Inertia.js',
      'PostgreSQL',
      'Tailwind CSS',
      'shadcn/ui',
    ],
    features: [
      'Kanban com drag & drop',
      'Sistema de tickets',
      'Notificações em tempo real',
      'Dashboard analítico',
      'Gestão de usuários e permissões',
      'Relatórios exportáveis',
    ],
    highlights: [
      { label: 'Componentes', value: '150+' },
      { label: 'Commits', value: '565' },
      { label: 'Telas', value: '30+' },
    ],
    demos: ['kanban', 'notifications', 'dashboard'],
    screenshots: [
      { src: '/screenshots/nexus-kanban.jpg', alt: 'Kanban Board' },
      { src: '/screenshots/nexus-dashboard.jpg', alt: 'Dashboard' },
      { src: '/screenshots/nexus-tickets.jpg', alt: 'Sistema de Tickets' },
    ],
    featured: true,
    status: 'production',
    year: '2024',
  },
  {
    id: 'idhes',
    title: 'IDHES - Gestão Hospitalar',
    subtitle: 'Sistema de gestão hospitalar',
    description:
      'Sistema completo para gestão hospitalar incluindo prontuário eletrônico, agendamento de consultas, controle de leitos, farmácia e faturamento. Interface intuitiva para profissionais de saúde.',
    shortDescription:
      'Sistema de gestão hospitalar com prontuário eletrônico e agendamentos.',
    image: null,
    url: '/portfolio/idhes',
    externalUrl: null,
    technologies: [
      'Laravel 11',
      'React 18',
      'TypeScript',
      'Inertia.js',
      'MySQL',
      'Tailwind CSS',
      'Ant Design',
    ],
    features: [
      'Prontuário eletrônico',
      'Agendamento de consultas',
      'Controle de leitos',
      'Gestão de farmácia',
      'Faturamento integrado',
      'Relatórios médicos',
    ],
    highlights: [
      { label: 'Módulos', value: '12' },
      { label: 'Usuários ativos', value: '200+' },
      { label: 'Commits', value: '450+' },
    ],
    demos: ['form', 'table'],
    screenshots: [
      { src: '/screenshots/idhes-prontuario.jpg', alt: 'Prontuário Eletrônico' },
      { src: '/screenshots/idhes-agenda.jpg', alt: 'Agendamento' },
    ],
    featured: true,
    status: 'production',
    year: '2024',
  },
  {
    id: 'gestao-escolar',
    title: 'Sistema de Gestão Escolar',
    subtitle: 'Plataforma educacional completa',
    description:
      'Sistema para gestão de instituições de ensino com controle de matrículas, notas, frequência, comunicação com responsáveis e portal do aluno. Simplifica a administração escolar.',
    shortDescription:
      'Plataforma de gestão escolar com matrículas, notas e portal do aluno.',
    image: null,
    url: '/portfolio/gestao-escolar',
    externalUrl: null,
    technologies: [
      'Laravel 10',
      'React 18',
      'JavaScript',
      'Inertia.js',
      'PostgreSQL',
      'Bootstrap 5',
    ],
    features: [
      'Matrícula online',
      'Lançamento de notas',
      'Controle de frequência',
      'Portal do aluno',
      'Comunicados para pais',
      'Boletim digital',
    ],
    highlights: [
      { label: 'Escolas', value: '5' },
      { label: 'Alunos', value: '2000+' },
      { label: 'Módulos', value: '8' },
    ],
    demos: ['table', 'form'],
    screenshots: [
      { src: '/screenshots/escolar-notas.jpg', alt: 'Lançamento de Notas' },
      { src: '/screenshots/escolar-portal.jpg', alt: 'Portal do Aluno' },
    ],
    featured: false,
    status: 'production',
    year: '2023',
  },
  {
    id: 'thep-edu',
    title: 'THEP Edu',
    subtitle: 'Plataforma de cursos online',
    description:
      'Plataforma de educação online com sistema de cursos, trilhas de aprendizado, avaliações, certificados e área do aluno. Design moderno e responsivo para uma experiência de aprendizado imersiva.',
    shortDescription:
      'Plataforma de cursos online com trilhas de aprendizado e certificados.',
    image: null,
    url: '/portfolio/thep-edu',
    externalUrl: 'https://edu.thep.com.br',
    technologies: [
      'Laravel 11',
      'React 18',
      'TypeScript',
      'Inertia.js',
      'PostgreSQL',
      'Tailwind CSS',
      'Vimeo API',
    ],
    features: [
      'Player de vídeo customizado',
      'Trilhas de aprendizado',
      'Sistema de avaliações',
      'Certificados automáticos',
      'Progresso em tempo real',
      'Área do aluno',
    ],
    highlights: [
      { label: 'Cursos', value: '20+' },
      { label: 'Alunos', value: '500+' },
      { label: 'Vídeos', value: '200+' },
    ],
    demos: ['dashboard'],
    screenshots: [
      { src: '/screenshots/thep-curso.jpg', alt: 'Página do Curso' },
      { src: '/screenshots/thep-player.jpg', alt: 'Player de Vídeo' },
    ],
    featured: true,
    status: 'production',
    year: '2024',
  },
];

export const projectFilters = [
  { id: 'all', label: 'Todos' },
  { id: 'featured', label: 'Destaques' },
  { id: 'production', label: 'Em Produção' },
];

export function getProjectById(id) {
  return projects.find((project) => project.id === id);
}

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}

export function getProjectsByStatus(status) {
  return projects.filter((project) => project.status === status);
}
