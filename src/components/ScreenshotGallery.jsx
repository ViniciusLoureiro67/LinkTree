import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ScreenshotGallery.css';

export function ScreenshotGallery({ screenshots }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="screenshot-gallery">
      <motion.h2
        className="gallery-title"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Screenshots do Sistema
      </motion.h2>
      <motion.p
        className="gallery-subtitle"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Clique em qualquer imagem para ver em tamanho maior
      </motion.p>

      <div className="gallery-grid">
        {screenshots.map((screenshot, index) => (
          <motion.div
            key={index}
            className="gallery-item"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={() => !imageErrors[index] && setSelectedImage(screenshot)}
          >
            {imageErrors[index] ? (
              <div className="gallery-placeholder">
                <div className="placeholder-icon">📷</div>
                <p className="placeholder-text">Imagem não encontrada</p>
                <p className="placeholder-hint">Adicione: {screenshot.image.replace('/screenshots/', '')}</p>
              </div>
            ) : (
              <>
                <img
                  src={screenshot.image}
                  alt={screenshot.title}
                  className="gallery-image"
                  onError={() => handleImageError(index)}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <h3 className="gallery-item-title">{screenshot.title}</h3>
                  {screenshot.description && (
                    <p className="gallery-item-description">{screenshot.description}</p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="image-modal"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-modal-button"
                onClick={() => setSelectedImage(null)}
              >
                ×
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="modal-image"
              />
              <div className="modal-content">
                <h3 className="modal-title">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="modal-description">{selectedImage.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
