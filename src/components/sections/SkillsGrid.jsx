import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { skillCategories, featuredSkills } from '../../data/skills';
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

const colorMap = {
  primary: {
    bg: 'from-[#C084FC]/20 to-[#C084FC]/5',
    border: 'border-[#C084FC]/20',
    icon: 'text-[#C084FC]',
    bar: 'bg-[#C084FC]',
  },
  secondary: {
    bg: 'from-[#A855F7]/20 to-[#A855F7]/5',
    border: 'border-[#A855F7]/20',
    icon: 'text-[#A855F7]',
    bar: 'bg-[#A855F7]',
  },
  accent: {
    bg: 'from-[#E879F9]/20 to-[#E879F9]/5',
    border: 'border-[#E879F9]/20',
    icon: 'text-[#E879F9]',
    bar: 'bg-[#E879F9]',
  },
  success: {
    bg: 'from-[#7C3AED]/20 to-[#7C3AED]/5',
    border: 'border-[#7C3AED]/20',
    icon: 'text-[#8B5CF6]',
    bar: 'bg-[#7C3AED]',
  },
  warning: {
    bg: 'from-[#818CF8]/20 to-[#818CF8]/5',
    border: 'border-[#818CF8]/20',
    icon: 'text-[#818CF8]',
    bar: 'bg-[#818CF8]',
  },
};

function SkillBar({ name, level, color, featured, delay }) {
  const colors = colorMap[color];

  return (
    <motion.div
      className="space-y-2"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: delay * 0.05, duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            'text-sm',
            featured ? 'text-white font-medium' : 'text-white/70'
          )}
        >
          {name}
          {featured && (
            <span className="ml-2 text-xs text-[#E879F9]" aria-label="Destaque">★</span>
          )}
        </span>
        <span className="text-xs text-white/60">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={cn('h-full rounded-full', colors.bar)}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay * 0.05 + 0.2, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

function SkillCategory({ category, index }) {
  const colors = colorMap[category.color];
  const Icon = category.icon;

  return (
    <motion.div variants={itemVariants}>
      <GlassCard
        padding="lg"
        className={cn(
          'h-full bg-gradient-to-br',
          colors.bg,
          colors.border
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-lg',
              'bg-white/5 backdrop-blur-sm',
              colors.icon
            )}
          >
            <Icon className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-white">{category.title}</h3>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <SkillBar
              key={skill.name}
              name={skill.name}
              level={skill.level}
              color={category.color}
              featured={skill.featured}
              delay={index * category.skills.length + skillIndex}
            />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}

export function SkillsGrid() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Habilidades</h2>
            <p className="section-subtitle">
              Tecnologias que uso para construir aplicações modernas
            </p>
          </motion.div>

          {/* Featured Skills Tags */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {featuredSkills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-[#C084FC]/20 to-[#A855F7]/20 border border-white/10 text-white/90"
              >
                {skill}
              </span>
            ))}
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategory key={category.id} category={category} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
