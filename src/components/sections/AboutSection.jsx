import { motion } from 'framer-motion';
import { MapPin, Calendar, Briefcase, GraduationCap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

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

const infoItems = [
  { icon: MapPin, label: 'Rio de Janeiro, Brasil' },
  { icon: Calendar, label: 'Transição de carreira em 2022' },
  { icon: Briefcase, label: '3+ anos como Dev' },
  { icon: GraduationCap, label: 'Engenharia Elétrica' },
];

export function AboutSection() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Sobre Mim</h2>
            <p className="section-subtitle">
              Minha jornada até me tornar desenvolvedor front-end
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Photo */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 flex justify-center"
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6F1C80]/30 to-[#32446C]/30 rounded-full blur-2xl" />

                {/* Photo container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                  <img
                    src="/eudeternorosto.jpg"
                    alt="Vinicius Loureiro - Engenheiro Front-end"
                    width={320}
                    height={320}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Badge */}
                <motion.div
                  className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6F1C80] to-[#32446C] text-white text-sm font-medium shadow-lg"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: 'spring' }}
                >
                  Front-end Engineer
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="lg:col-span-3 space-y-6">
              <GlassCard padding="lg" hover={false}>
                <div className="space-y-4">
                  <p className="text-lg text-white/80 leading-relaxed">
                    Olá! Sou <strong className="text-white">Vinicius Loureiro</strong>,
                    um engenheiro front-end apaixonado por criar interfaces bonitas e funcionais.
                  </p>

                  <p className="text-white/70 leading-relaxed">
                    Minha jornada na programação começou em <strong className="text-white/90">2022</strong>,
                    quando decidi fazer uma transição de carreira. Vindo da área de{' '}
                    <strong className="text-white/90">Engenharia Elétrica</strong>, trouxe comigo
                    uma base sólida em lógica e resolução de problemas que aplico diariamente
                    no desenvolvimento de software.
                  </p>

                  <p className="text-white/70 leading-relaxed">
                    Hoje, trabalho com <strong className="text-[#C084FC]">React</strong>,{' '}
                    <strong className="text-[#A855F7]">TypeScript</strong> e{' '}
                    <strong className="text-[#E879F9]">Laravel</strong>, desenvolvendo sistemas
                    empresariais que impactam milhares de usuários. Minha especialidade é
                    transformar designs complexos em código limpo e performático.
                  </p>
                </div>
              </GlassCard>

              {/* Info items */}
              <div className="grid grid-cols-2 gap-3">
                {infoItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    variants={itemVariants}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <item.icon className="w-5 h-5 text-[#8B3A9C] flex-shrink-0" aria-hidden="true" />
                    <span className="text-sm text-white/70">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
