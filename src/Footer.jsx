import { motion } from 'framer-motion';

export function Footer({ url, title }) {
  return (
    <motion.footer
      className="footer"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        {title}
      </a>
    </motion.footer>
  );
}

  