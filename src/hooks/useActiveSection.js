import { useState, useEffect } from 'react';

/**
 * Hook para detectar a seção ativa baseado no scroll
 * @param {string[]} sectionIds - Array com os IDs das seções
 * @param {number} threshold - Porcentagem de visibilidade (0-1)
 * @returns {string} - ID da seção ativa
 */
export function useActiveSection(sectionIds, threshold = 0.5) {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold, rootMargin: '-80px 0px 0px 0px' }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sectionIds, threshold]);

  return activeSection;
}
