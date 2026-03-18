import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Star, CheckCircle, Monitor } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
import { projects, projectFilters } from '../../data/projects';
import { cn } from '../../lib/utils';

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

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

function ProjectCard({ project }) {
  return (
    <motion.div
      variants={cardVariants}
      layout
      className="group"
    >
      <Link to={project.url}>
        <GlassCard
          padding="none"
          className="overflow-hidden h-full flex flex-col"
          gradient={project.featured ? 'primary' : 'none'}
        >
          {/* Image */}
          <div className="relative aspect-video overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6F1C80]/20 to-[#32446C]/20" />
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                width={640}
                height={360}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#6F1C80]/10 to-[#32446C]/10">
                <Monitor className="w-12 h-12 text-white/40" aria-hidden="true" />
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {project.featured && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/90 text-white text-xs font-medium">
                  <Star className="w-3 h-3" />
                  Destaque
                </span>
              )}
              {project.status === 'production' && (
                <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/90 text-white text-xs font-medium">
                  <CheckCircle className="w-3 h-3" />
                  Produção
                </span>
              )}
            </div>

            {/* Year */}
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80 text-xs">
                {project.year}
              </span>
            </div>

            {/* View button on hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-900 text-sm font-medium">
                Ver Projeto
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-5 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-white group-hover:text-[#8B3A9C] transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-white/60 mt-1">{project.subtitle}</p>
            </div>

            <p className="text-sm text-white/70 line-clamp-2">
              {project.shortDescription}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-white/70 border border-white/5"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-white/60">
                  +{project.technologies.length - 4}
                </span>
              )}
            </div>

            {/* Highlights */}
            {project.highlights && (
              <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                {project.highlights.slice(0, 3).map((highlight) => (
                  <div key={highlight.label} className="text-center">
                    <div className="text-sm font-semibold text-white">
                      {highlight.value}
                    </div>
                    <div className="text-xs text-white/60">{highlight.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'featured') return project.featured;
    if (activeFilter === 'production') return project.status === 'production';
    return true;
  });

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Projetos</h2>
            <p className="section-subtitle">
              Sistemas que desenvolvi e que estão em produção
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-2 mb-10"
          >
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
                aria-label={`Filtrar por ${filter.label}`}
                className={cn(
                  'px-4 py-2 text-sm rounded-full transition-all duration-200',
                  activeFilter === filter.id
                    ? 'bg-gradient-to-r from-[#6F1C80] to-[#32446C] text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
                )}
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* View All Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-10"
          >
            <Link to="/portfolio">
              <GlassButton
                variant="glass"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Ver Todos os Projetos
              </GlassButton>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
