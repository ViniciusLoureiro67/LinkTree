import { useState, useEffect } from 'react';

export function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Update scroll position
      setScrollPosition(currentScrollY);

      // Update scroll direction
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');

      // Check if at top
      setIsAtTop(currentScrollY < 50);

      // Check if at bottom
      setIsAtBottom(currentScrollY + windowHeight >= documentHeight - 50);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    scrollPosition,
    scrollDirection,
    isAtTop,
    isAtBottom,
    scrollProgress: Math.min(
      100,
      (scrollPosition / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    ),
  };
}

export function useScrollTo() {
  const scrollTo = (elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return { scrollTo, scrollToTop, scrollToBottom };
}
