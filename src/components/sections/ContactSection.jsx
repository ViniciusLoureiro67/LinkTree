import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  MessageCircle,
  Download,
  ExternalLink,
} from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import { GlassButton } from '../ui/GlassButton';
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

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/ViniciusLoureiro67',
    color: 'hover:bg-gray-500/20 hover:border-gray-500/40',
    description: 'Veja meu código',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/vsloureiro',
    color: 'hover:bg-blue-500/20 hover:border-blue-500/40',
    description: 'Conecte-se comigo',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/im.viniciusloureiro',
    color: 'hover:bg-pink-500/20 hover:border-pink-500/40',
    description: 'Me siga no insta',
  },
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    url: 'https://wa.me/5521999999999',
    color: 'hover:bg-emerald-500/20 hover:border-emerald-500/40',
    description: 'Fale comigo',
  },
];

function SocialLink({ link, index }) {
  const Icon = link.icon;

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={itemVariants}
      className={cn(
        'group flex flex-col items-center gap-3 p-6 rounded-2xl',
        'bg-white/5 border border-white/10',
        'transition-all duration-300',
        link.color
      )}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors">
        <Icon className="w-7 h-7 text-white/80 group-hover:text-white transition-colors" />
      </div>
      <div className="text-center">
        <h3 className="font-medium text-white">{link.name}</h3>
        <p className="text-sm text-white/60">{link.description}</p>
      </div>
      <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
    </motion.a>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="section pb-32">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Contato</h2>
            <p className="section-subtitle">
              Vamos conversar sobre seu próximo projeto
            </p>
          </motion.div>

          {/* Main Contact Card */}
          <motion.div variants={itemVariants} className="max-w-3xl mx-auto mb-12">
            <GlassCard padding="xl" gradient="primary" className="text-center">
              <div className="space-y-6">
                <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[#6F1C80] to-[#32446C] shadow-lg shadow-[#6F1C80]/25">
                  <Mail className="w-10 h-10 text-white" />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Interessado em trabalhar junto?
                  </h3>
                  <p className="text-white/70 max-w-md mx-auto">
                    Estou disponível para projetos freelance, colaborações ou
                    oportunidades de emprego. Entre em contato!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a href="mailto:viniciusloureiro@email.com">
                    <GlassButton
                      variant="primary"
                      size="lg"
                      icon={<Mail className="w-5 h-5" />}
                    >
                      Enviar Email
                    </GlassButton>
                  </a>

                  <a
                    href="/cv-vinicius-loureiro.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GlassButton
                      variant="glass"
                      size="lg"
                      icon={<Download className="w-5 h-5" />}
                    >
                      Download CV
                    </GlassButton>
                  </a>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {socialLinks.map((link, index) => (
              <SocialLink key={link.name} link={link} index={index} />
            ))}
          </div>

          {/* Footer text */}
          <motion.p
            variants={itemVariants}
            className="text-center text-white/60 text-sm mt-12 flex items-center justify-center gap-2"
          >
            <span>Feito com</span>
            <svg
              className="w-4 h-4 text-red-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span>usando React, Tailwind CSS & Framer Motion</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
