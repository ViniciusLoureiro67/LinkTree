import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Home, Briefcase, User, Mail } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { path: '/', label: 'Início', icon: Home, isSection: false },
  { path: '/#about', label: 'Sobre', icon: User, isSection: true },
  { path: '/#projects', label: 'Projetos', icon: Briefcase, isSection: true },
  { path: '/#contact', label: 'Contato', icon: Mail, isSection: true },
];

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link) => {
    setIsOpen(false);

    if (link.isSection) {
      const sectionId = link.path.replace('/#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isActive = (link) => {
    if (link.isSection) return false;
    return location.pathname === link.path;
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0a0e27]/95 backdrop-blur-xl border-b border-white/10 shadow-xl py-2'
            : 'bg-transparent py-4'
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group"
              onClick={() => setIsOpen(false)}
              aria-label="Ir para página inicial"
            >
              <motion.img
                src="/logo-symbol.svg"
                alt="VL Logo"
                className={cn(
                  'transition-all duration-300',
                  scrolled ? 'h-10 w-10' : 'h-12 w-12'
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
              <span className={cn(
                'ml-3 font-bold text-white group-hover:text-[#C084FC] transition-all duration-300',
                scrolled ? 'text-lg' : 'text-xl'
              )}>
                Vinicius Loureiro
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-2" role="navigation" aria-label="Menu principal">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.isSection && location.pathname === '/' ? '#' : link.path}
                  onClick={() => handleNavClick(link)}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                    isActive(link)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  )}
                >
                  {isActive(link) && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-white/10"
                      layoutId="activeNav"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              ))}

              {/* Portfolio Link - CTA */}
              <Link
                to="/portfolio"
                className={cn(
                  'ml-4 px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300',
                  'bg-gradient-to-r from-[#6F1C80] to-[#32446C] text-white',
                  'hover:shadow-lg hover:shadow-[#6F1C80]/20 hover:scale-[1.02]',
                  location.pathname.startsWith('/portfolio') && 'ring-2 ring-white/20'
                )}
              >
                Ver Portfólio
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-[72px] left-4 right-4 z-40 bg-[#0a0e27]/98 backdrop-blur-xl border border-white/10 rounded-2xl md:hidden shadow-2xl"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <nav className="p-4 space-y-2" role="navigation" aria-label="Menu mobile">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.isSection && location.pathname === '/' ? '#' : link.path}
                      onClick={() => handleNavClick(link)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                        isActive(link)
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      )}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  );
                })}

                <div className="pt-2 border-t border-white/10">
                  <Link
                    to="/portfolio"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6F1C80] to-[#32446C] text-white font-semibold"
                  >
                    <Briefcase className="w-5 h-5" aria-hidden="true" />
                    <span>Ver Portfólio</span>
                  </Link>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
