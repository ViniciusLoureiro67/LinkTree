import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stats = [
  { value: '2500+', label: 'commits' },
  { value: '350+', label: 'componentes' },
  { value: '5', label: 'sistemas' },
];

export function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6"
    >
      <motion.div
        className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants}>
          <motion.img
            src="/logo-symbol.svg"
            alt="VL Logo"
            className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          />
        </motion.div>

        {/* Badge */}
        <motion.div variants={itemVariants} className="mt-8">
          <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-white/80 bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Disponível para projetos
          </span>
        </motion.div>

        {/* Title */}
        <motion.div variants={itemVariants} className="mt-8">
          <h1 className="text-[2.75rem] sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-white">Olá, eu sou</span>
            <br />
            <span className="bg-gradient-to-r from-[#C084FC] via-[#A855F7] to-[#7C3AED] bg-clip-text text-transparent">
              Vinicius Loureiro
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg sm:text-xl md:text-2xl text-white/60 max-w-xl leading-relaxed"
        >
          <span className="text-white/90 font-medium">Engenheiro Front-end</span>{' '}
          especializado em{' '}
          <span className="text-[#C084FC]">React</span> &{' '}
          <span className="text-[#A855F7]">TypeScript</span>
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex items-center justify-center gap-10 sm:gap-14"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl sm:text-4xl font-bold text-white">
                {stat.value}
              </span>
              <span className="mt-1 text-sm text-white/50">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-14 flex flex-col sm:flex-row items-center gap-6"
        >
          {/* Primary Button */}
          <motion.button
            onClick={scrollToProjects}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 min-w-[220px] px-10 py-5 text-lg font-semibold tracking-wide text-white rounded-2xl bg-gradient-to-r from-[#6F1C80] to-[#32446C] shadow-xl shadow-[#6F1C80]/30 hover:shadow-2xl hover:shadow-[#6F1C80]/40 transition-all duration-300"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Ver Projetos</span>
            <ArrowDown className="w-6 h-6" />
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            onClick={() => window.open('/cv-vinicius-loureiro.pdf', '_blank')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-4 min-w-[220px] px-10 py-5 text-lg font-semibold tracking-wide text-white rounded-2xl bg-white/[0.08] border-2 border-white/20 hover:bg-white/[0.12] hover:border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <Download className="w-6 h-6" />
            <span>Download CV</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.button
          onClick={scrollToProjects}
          className="flex flex-col items-center gap-2 text-white/30 hover:text-white/50 transition-colors"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </section>
  );
}
