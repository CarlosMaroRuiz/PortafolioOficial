// src/components/ui/ScrollIndicator.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

/**
 * Componente que muestra un indicador de scroll en la parte inferior de la pantalla
 * para animar al usuario a seguir viendo el contenido
 */
const ScrollIndicator = () => {
  const controls = useAnimation();
  
  useEffect(() => {
    // Secuencia de animación
    const sequence = async () => {
      await controls.start({
        y: [0, 10, 0],
        opacity: [0.7, 1, 0.7],
        transition: { 
          duration: 2, 
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 0.5
        }
      });
    };
    
    sequence();
    
    // Auto-hide después de cierto scroll
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        controls.start({ opacity: 0, y: 20, transition: { duration: 0.5 } });
      } else {
        sequence();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls]);
  
  return (
    <motion.div 
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.8 }}
    >
      <motion.div 
        className="flex flex-col items-center"
        animate={controls}
      >
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Scroll</span>
        <svg 
          className="w-6 h-6 text-primary-500 dark:text-primary-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;