// src/hooks/useParallax.js
import { useEffect, useState } from 'react';

export const useParallax = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Añadir el event listener
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Limpiar el event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Función para transformar valores basados en posición de scroll
  const transform = (startValue, endValue, startScroll, endScroll) => {
    // Asegurarse que estamos dentro del rango de scroll deseado
    if (scrollY <= startScroll) return startValue;
    if (scrollY >= endScroll) return endValue;

    // Calculamos el porcentaje de scroll entre el inicio y el fin
    const scrollPercentage = (scrollY - startScroll) / (endScroll - startScroll);
    
    // Retornamos el valor interpolado
    return startValue + (endValue - startValue) * scrollPercentage;
  };

  return {
    scrollY,
    transform
  };
};