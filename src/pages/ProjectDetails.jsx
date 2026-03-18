import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  Star,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Play,
  Code,
  Image as ImageIcon,
  LayoutDashboard,
  Bell,
  Ticket,
  BarChart3,
  Users,
  Wallet,
  FileText,
  Calendar,
  Package,
  Settings,
  ClipboardList,
  Stethoscope,
  Pill,
  Receipt,
  Building2,
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { GlassButton } from '../components/ui/GlassButton';
import { KanbanDemo } from '../components/demos/KanbanDemo';
import { NotificationsDemo } from '../components/demos/NotificationsDemo';
import { DashboardDemo } from '../components/demos/DashboardDemo';
import { FormDemo } from '../components/demos/FormDemo';
import { TableDemo } from '../components/demos/TableDemo';
import { ScreenshotGallery } from '../components/ScreenshotGallery';
import { getProjectById } from '../data/projects';
import { cn } from '../lib/utils';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

// Mapeamento de ícones para features
const featureIcons = {
  kanban: LayoutDashboard,
  notifications: Bell,
  tickets: Ticket,
  dashboard: BarChart3,
  users: Users,
  financial: Wallet,
  medical: Stethoscope,
  calendar: Calendar,
  inventory: Package,
  settings: Settings,
  forms: ClipboardList,
  medications: Pill,
  billing: Receipt,
  company: Building2,
  default: FileText,
};

// Dados detalhados dos projetos (features, screenshots, etc.)
const projectDetails = {
  nexus: {
    features: [
      {
        id: 1,
        title: 'Sistema Kanban',
        iconKey: 'kanban',
        description: 'Kanban completo com drag and drop, múltiplas visualizações, filtros avançados, labels, prioridades e histórico.',
        details: [
          'Drag and drop entre colunas',
          'Múltiplas visualizações (board, list)',
          'Filtros por usuário, prioridade, projeto',
          'Sistema de labels coloridas',
          'Prioridades (baixa, média, alta)',
          'Histórico de movimentações',
          'Atribuição múltipla de usuários',
        ],
      },
      {
        id: 2,
        title: 'Sistema de Notificações',
        iconKey: 'notifications',
        description: 'Notificações em tempo real com diferentes tipos e ações contextuais.',
        details: [
          'Notificações em tempo real',
          'Múltiplos tipos de notificação',
          'Marcar como lida/não lida',
          'Dropdown de notificações',
          'Página dedicada de notificações',
          'Badges de contagem',
        ],
      },
      {
        id: 3,
        title: 'Sistema de Tickets',
        iconKey: 'tickets',
        description: 'Gestão completa de tickets com categorias, status, prioridades e anexos.',
        details: [
          'Criação e gestão de tickets',
          'Categorias personalizáveis',
          'Status customizáveis',
          'Sistema de prioridades',
          'Anexos de arquivos',
          'Comentários e menções',
        ],
      },
      {
        id: 4,
        title: 'Dashboard Interativo',
        iconKey: 'dashboard',
        description: 'Dashboard completo com widgets, gráficos e visão geral do sistema.',
        details: [
          'Widgets personalizáveis',
          'Gráficos e métricas',
          'Ações rápidas',
          'Visão geral de projetos',
          'Estatísticas em tempo real',
        ],
      },
      {
        id: 5,
        title: 'Gestão de Usuários',
        iconKey: 'users',
        description: 'CRUD completo com permissões, roles e controle de acesso.',
        details: [
          'CRUD completo de usuários',
          'Sistema de permissões (Spatie)',
          'Roles e permissões',
          'Controle de acesso',
          'Upload de foto de perfil',
        ],
      },
      {
        id: 6,
        title: 'Sistema Financeiro',
        iconKey: 'financial',
        description: 'Módulo financeiro para gestão de contas a pagar.',
        details: [
          'Gestão de contas a pagar',
          'Status de pagamento',
          'Sistema de parcelas',
          'Relatórios financeiros',
        ],
      },
    ],
    screenshots: [
      { src: '/screenshots/nexus-kanban-1.jpg', alt: 'Kanban Board' },
      { src: '/screenshots/nexus-dashboard.jpg', alt: 'Dashboard' },
      { src: '/screenshots/nexus-colaboradores.jpg', alt: 'Gestão de Colaboradores' },
      { src: '/screenshots/nexus-chamados-1.jpg', alt: 'Sistema de Chamados' },
    ],
  },
  idhes: {
    features: [
      {
        id: 1,
        title: 'Prontuário Eletrônico',
        iconKey: 'medical',
        description: 'Sistema completo de prontuário eletrônico do paciente.',
        details: [
          'Histórico médico completo',
          'Prescrições e exames',
          'Evolução do paciente',
          'Anexos de documentos',
        ],
      },
      {
        id: 2,
        title: 'Agendamento',
        iconKey: 'calendar',
        description: 'Sistema de agendamento de consultas e procedimentos.',
        details: [
          'Agenda por médico',
          'Confirmação automática',
          'Lembretes por SMS/Email',
          'Gestão de horários',
        ],
      },
    ],
    screenshots: [],
  },
  'gestao-escolar': {
    features: [
      {
        id: 1,
        title: 'Matrícula Online',
        iconKey: 'forms',
        description: 'Sistema completo de matrícula online.',
        details: [
          'Formulário de matrícula',
          'Upload de documentos',
          'Aprovação automática',
          'Geração de contrato',
        ],
      },
    ],
    screenshots: [],
  },
  'thep-edu': {
    features: [
      {
        id: 1,
        title: 'Player de Vídeo',
        iconKey: 'default',
        description: 'Player customizado com controles avançados.',
        details: [
          'Integração Vimeo',
          'Controle de progresso',
          'Qualidade adaptativa',
          'Legendas',
        ],
      },
    ],
    screenshots: [],
  },
};

function FeatureCard({ feature, isExpanded, onToggle }) {
  const IconComponent = featureIcons[feature.iconKey] || featureIcons.default;

  return (
    <motion.div variants={itemVariants}>
      <GlassCard
        padding="md"
        hover={false}
        className={cn(
          'cursor-pointer transition-all duration-300',
          isExpanded && 'ring-1 ring-[#6F1C80]/30'
        )}
        onClick={onToggle}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6F1C80]/20 to-[#32446C]/20 flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-[#8B3A9C]" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-white/40" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/40" />
              )}
            </div>
            <p className="text-sm text-white/70">{feature.description}</p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
                    {feature.details.map((detail, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center gap-2 text-sm text-white/70"
                      >
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        {detail}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function DemoSection({ projectId }) {
  const [activeDemo, setActiveDemo] = useState('kanban');

  // Configuração de demos por projeto
  const demosConfig = {
    nexus: [
      { id: 'kanban', label: 'Kanban', iconKey: 'kanban' },
      { id: 'notifications', label: 'Notificações', iconKey: 'notifications' },
      { id: 'dashboard', label: 'Dashboard', iconKey: 'dashboard' },
      { id: 'table', label: 'Tabela', iconKey: 'forms' },
    ],
    idhes: [
      { id: 'form', label: 'Formulário', iconKey: 'forms' },
      { id: 'table', label: 'Tabela', iconKey: 'forms' },
    ],
    'gestao-escolar': [
      { id: 'table', label: 'Tabela', iconKey: 'forms' },
      { id: 'form', label: 'Formulário', iconKey: 'forms' },
    ],
    'thep-edu': [
      { id: 'dashboard', label: 'Dashboard', iconKey: 'dashboard' },
    ],
  };

  const demos = demosConfig[projectId] || [];

  // Não mostrar se não houver demos
  if (demos.length === 0) {
    return null;
  }

  return (
    <motion.section variants={itemVariants} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Play className="w-6 h-6 text-blue-400" />
            Demonstrações Interativas
          </h2>
          <p className="text-white/60 mt-1">
            Teste as funcionalidades principais diretamente aqui
          </p>
        </div>
      </div>

      {/* Demo Tabs */}
      <div className="flex flex-wrap gap-2">
        {demos.map((demo) => {
          const DemoIcon = featureIcons[demo.iconKey] || featureIcons.default;
          return (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              aria-pressed={activeDemo === demo.id}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200',
                activeDemo === demo.id
                  ? 'bg-gradient-to-r from-[#6F1C80] to-[#32446C] text-white'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              )}
            >
              <DemoIcon className="w-4 h-4" aria-hidden="true" />
              {demo.label}
            </button>
          );
        })}
      </div>

      {/* Demo Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDemo}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeDemo === 'kanban' && <KanbanDemo />}
          {activeDemo === 'notifications' && <NotificationsDemo />}
          {activeDemo === 'dashboard' && <DashboardDemo />}
          {activeDemo === 'form' && <FormDemo />}
          {activeDemo === 'table' && <TableDemo />}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}

export function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [expandedFeature, setExpandedFeature] = useState(null);

  const project = getProjectById(projectId);
  const details = projectDetails[projectId];

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassCard padding="xl" className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Projeto não encontrado</h2>
          <p className="text-white/60 mb-6">
            O projeto que você está procurando não existe ou foi removido.
          </p>
          <Link to="/portfolio">
            <GlassButton variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
              Voltar ao Portfólio
            </GlassButton>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="project-details-page min-h-screen pt-24 pb-16">
      <div className="container max-w-5xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-12"
        >
          {/* Back Button */}
          <motion.div variants={itemVariants}>
            <Link to="/portfolio">
              <GlassButton
                variant="ghost"
                size="sm"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Voltar ao Portfólio
              </GlassButton>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.section variants={itemVariants}>
            <GlassCard padding="xl" gradient="primary">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#6F1C80]/20 to-[#32446C]/20 flex items-center justify-center">
                      <Code className="w-16 h-16 text-white/40" aria-hidden="true" />
                    </div>
                  )}
                  {/* Overlay badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    {project.featured && (
                      <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-500/90 text-white text-sm font-medium">
                        <Star className="w-4 h-4" />
                        Destaque
                      </span>
                    )}
                    {project.status === 'production' && (
                      <span className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-500/90 text-white text-sm font-medium">
                        <CheckCircle className="w-4 h-4" />
                        Em Produção
                      </span>
                    )}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/50 mb-1">{project.year}</p>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                      {project.title}
                    </h1>
                    <p className="text-lg text-white/60 mt-2">{project.subtitle}</p>
                  </div>

                  <p className="text-white/70 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && (
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      {project.highlights.map((highlight) => (
                        <div key={highlight.label} className="text-center">
                          <div className="text-2xl font-bold text-white">
                            {highlight.value}
                          </div>
                          <div className="text-sm text-white/50">{highlight.label}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* External Link */}
                  {project.externalUrl && (
                    <div className="pt-4">
                      <a
                        href={project.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GlassButton
                          variant="primary"
                          icon={<ExternalLink className="w-4 h-4" />}
                          iconPosition="right"
                        >
                          Ver Site
                        </GlassButton>
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Technologies */}
          <motion.section variants={itemVariants} className="space-y-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Code className="w-6 h-6 text-purple-400" />
              Tecnologias Utilizadas
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 text-white/80 text-sm"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.section>

          {/* Interactive Demos */}
          <DemoSection projectId={projectId} />

          {/* Features */}
          {details?.features && details.features.length > 0 && (
            <motion.section variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-white">
                Funcionalidades Desenvolvidas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.features.map((feature) => (
                  <FeatureCard
                    key={feature.id}
                    feature={feature}
                    isExpanded={expandedFeature === feature.id}
                    onToggle={() =>
                      setExpandedFeature(
                        expandedFeature === feature.id ? null : feature.id
                      )
                    }
                  />
                ))}
              </div>
            </motion.section>
          )}

          {/* Screenshots */}
          {details?.screenshots && details.screenshots.length > 0 && (
            <motion.section variants={itemVariants} className="space-y-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <ImageIcon className="w-6 h-6 text-blue-400" />
                Screenshots
              </h2>
              <ScreenshotGallery screenshots={details.screenshots} />
            </motion.section>
          )}

          {/* Navigation */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center pt-8"
          >
            <Link to="/portfolio">
              <GlassButton
                variant="glass"
                size="lg"
                icon={<ArrowLeft className="w-5 h-5" />}
              >
                Ver Outros Projetos
              </GlassButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
