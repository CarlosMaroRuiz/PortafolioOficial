// src/components/ui/TypewriterText.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({
  text,
  speed = 100,
  delay = 0,
  showCursor = true,
  cursorChar = '|',
  className = '',
  onComplete = () => {},
  highlightWords = [],
  loop = false,
  deleteSpeed = 50,
  pauseTime = 2000,
  naturalTyping = true,
  pauseOnPunctuation = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Función para calcular velocidad natural con más variaciones
  const getNaturalSpeed = (char, index) => {
    if (!naturalTyping) return speed;
    
    const baseSpeed = speed;
    const variation = Math.random() * 40; // Variación de 0-40ms
    
    // Pausas más largas después de puntuación
    if (pauseOnPunctuation && index > 0) {
      const prevChar = text[index - 1];
      if (['.', ',', '!', '?', ';', ':'].includes(prevChar)) {
        return baseSpeed + variation + 200; // Pausa extra después de puntuación
      }
    }
    
    // Pausas cortas después de espacios
    if (char === ' ') {
      return baseSpeed + variation + 80;
    }
    
    // Velocidad más rápida para letras comunes
    if (['a', 'e', 'i', 'o', 'u', 't', 'h', 'r', 'n', 's'].includes(char.toLowerCase())) {
      return Math.max(baseSpeed - 20 + variation, 30);
    }
    
    // Velocidad normal con ligera variación
    return baseSpeed + variation;
  };

  useEffect(() => {
    if (loop && isComplete && !isDeleting) {
      const timer = setTimeout(() => {
        setIsDeleting(true);
        setIsComplete(false);
      }, pauseTime);
      return () => clearTimeout(timer);
    }

    if (isDeleting) {
      if (displayText.length > 0) {
        const timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timer);
      } else {
        setIsDeleting(false);
        setCurrentIndex(0);
      }
    } else {
      if (currentIndex < text.length) {
        const currentChar = text[currentIndex];
        const typingSpeed = currentIndex === 0 ? delay : getNaturalSpeed(currentChar, currentIndex);
        
        const timer = setTimeout(() => {
          setDisplayText(prev => prev + currentChar);
          setCurrentIndex(prev => prev + 1);
        }, typingSpeed);
        
        return () => clearTimeout(timer);
      } else if (!isComplete) {
        setIsComplete(true);
        onComplete();
      }
    }
  }, [currentIndex, text, speed, delay, isComplete, onComplete, loop, isDeleting, displayText, deleteSpeed, pauseTime, naturalTyping, pauseOnPunctuation]);

  // Función para resaltar palabras específicas con mejor estilo
  const highlightText = (text) => {
    if (!highlightWords.length) return text;
    
    let highlightedText = text;
    highlightWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, 
        `<span class="text-primary-600 dark:text-primary-400 font-bold bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/20 px-2 py-1 rounded-md shadow-sm">${word}</span>`
      );
    });
    
    return highlightedText;
  };

  // Variantes mejoradas del cursor con efecto de "breathing" - siempre activo
  const cursorVariants = {
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0
    },
    hidden: { 
      opacity: 0.1, // Nunca completamente invisible
      scale: 0.95,
      y: 0.5
    }
  };

  return (
    <span className={className}>
      <span 
        dangerouslySetInnerHTML={{ 
          __html: highlightText(displayText) 
        }} 
      />
      {showCursor && (
        <motion.span
          initial="visible"
          animate={{
            opacity: [1, 0.1, 1],
            scale: [1, 0.95, 1],
            y: [0, 0.5, 0]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
          className="inline-block ml-1 relative"
          style={{
            width: '3px',
            height: '1em',
            transform: 'translateY(0.1em)'
          }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-b from-primary-500 to-primary-600 dark:from-primary-400 dark:to-primary-500 rounded-full"
            style={{
              boxShadow: '0 0 12px rgba(20, 184, 166, 0.6), 0 0 20px rgba(20, 184, 166, 0.3)',
              filter: 'brightness(1.2)'
            }}
            animate={{
              boxShadow: [
                '0 0 8px rgba(20, 184, 166, 0.6), 0 0 16px rgba(20, 184, 166, 0.3)',
                '0 0 16px rgba(20, 184, 166, 0.8), 0 0 24px rgba(20, 184, 166, 0.4)',
                '0 0 8px rgba(20, 184, 166, 0.6), 0 0 16px rgba(20, 184, 166, 0.3)'
              ],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.span>
      )}
    </span>
  );
};

export default TypewriterText;