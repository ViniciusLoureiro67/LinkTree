/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

export function Link({ url, title, icon, download }) {
  return (
    <motion.a
      href={url}
      target={download ? '_self' : '_blank'}
      rel={download ? '' : 'noopener noreferrer'}
      download={download}
      className="link"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <FontAwesomeIcon icon={icon} style={{ marginRight: '8px' }} />
      {title}
    </motion.a>
  );
}


