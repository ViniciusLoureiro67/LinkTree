import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navigation.css';

export function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <motion.div 
        className="nav-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Início
          </motion.span>
        </Link>
        
        <Link 
          to="/portfolio" 
          className={`nav-link ${location.pathname.startsWith('/portfolio') ? 'active' : ''}`}
        >
          <motion.span
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Portfólio
          </motion.span>
        </Link>
      </motion.div>
    </nav>
  );
}
