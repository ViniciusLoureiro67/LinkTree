import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Heart } from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/ViniciusLoureiro67',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://linkedin.com/in/vsloureiro',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com/im.viniciusloureiro',
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 mt-auto border-t border-white/5">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-white/60">
            <span>© {currentYear} Vinicius Loureiro.</span>
            <span className="hidden sm:inline">Todos os direitos reservados.</span>
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-sm text-white/60">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-400 fill-red-400" aria-hidden="true" />
            <span>usando</span>
            <span className="text-[#8B3A9C]">React</span>
            <span>&</span>
            <span className="text-[#6F1C80]">Tailwind</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Visitar ${link.name}`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
