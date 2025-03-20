// src/components/ui/ParallaxSection.jsx
import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

/**
 * Componente de utilidad para añadir efectos de paralaje a cualquier sección
 * con animaciones de entrada mejoradas
 * 
 * @param {Object} props - Props del componente
 * @param {React.ReactNode} props.children - Contenido de la sección
 * @param {string} props.id - ID de la sección para navegación
 * @param {string} props.className - Clases adicionales
 * @param {number} props.intensity - Intensidad del efecto paralaje (0.1 - 1.0)
 * @param {string} props.bgColor - Color de fondo opcional
 * @param {string} props.direction - Dirección del paralaje: "up", "down", "left", "right"
 * @param {string} props.entranceAnimation - Tipo de animación de entrada: "fade", "slide", "scale"
 */
const ParallaxSection = ({ 
  children, 
  id, 
  className = "", 
  intensity = 0.15, // Reducido para hacer el paralaje más lento
  bgColor = "",
  direction = "down", // "up", "down", "left", "right"
  entranceAnimation = "fade" // Tipo de animación de entrada
}) => {
  const { scrollYProgress } = useScroll();
  const { scrollY } = useScroll();
  
  // Hook para detectar cuando la sección entra en el viewport
  const [ref, inView] = React.useState({ current: null });
  
  // Definimos rangos más amplios para un efecto más suave y lento
  const startRange = 0;
  const midRange = 0.5; // Punto medio para un efecto más suave
  const endRange = 1;
  
  // Transformaciones de paralaje más sutiles
  let transform;
  
  switch (direction) {
    case "up":
      transform = useTransform(
        scrollYProgress, 
        [startRange, midRange, endRange], 
        [0, -30 * intensity, -60 * intensity]
      );
      break;
    case "left":
      transform = {
        x: useTransform(
          scrollYProgress, 
          [startRange, midRange, endRange], 
          [0, -30 * intensity, -60 * intensity]
        )
      };
      break;
    case "right":
      transform = {
        x: useTransform(
          scrollYProgress, 
          [startRange, midRange, endRange], 
          [0, 30 * intensity, 60 * intensity]
        )
      };
      break;
    case "down":
    default:
      transform = useTransform(
        scrollYProgress, 
        [startRange, midRange, endRange], 
        [0, 30 * intensity, 60 * intensity]
      );
      break;
  }
  
  // Si la dirección es vertical, usamos 'y' para la transformación
  const style = direction === 'left' || direction === 'right' 
    ? { x: transform } 
    : { y: transform };
  
  // Definir variantes para la animación de entrada
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Variantes para la animación de los hijos basada en el tipo seleccionado
  const childVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1.0] }
      }
    },
    slide: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8, 
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          ease: [0.25, 0.1, 0.25, 1.0]
        }
      }
    }
  };

  // Determinamos qué variante usar basada en el prop entranceAnimation
  const selectedVariant = childVariants[entranceAnimation] || childVariants.fade;

  return (
    <motion.section 
      id={id} 
      ref={ref}
      className={`relative overflow-hidden ${className} ${bgColor}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px 0px" }}
      variants={containerVariants}
    >
      {/* Capa de efectos de paralaje */}
      <motion.div 
        className="absolute inset-0 pointer-events-none" 
        style={style}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-secondary-500/5 dark:from-primary-500/10 dark:to-secondary-500/10" />
      </motion.div>
      
      {/* Contenido de la sección con animación de entrada mejorada */}
      <motion.div 
        className="relative z-10"
        variants={selectedVariant}
      >
        {children}
      </motion.div>
      
      {/* Elemento decorativo adicional con paralaje */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white/5 to-transparent dark:from-dark-800/5 dark:to-transparent pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -20])
        }}
      />
    </motion.section>
  );
};

export default ParallaxSection;