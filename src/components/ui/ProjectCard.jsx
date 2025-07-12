// src/components/ui/ProjectCard.jsx 
import { motion, useAnimation } from 'framer-motion'; 
import { FiExternalLink, FiGithub, FiGitBranch, FiEye, FiEyeOff } from 'react-icons/fi';
import { useState, useEffect, useRef } from 'react';

const ProjectCard = ({ project }) => {
  // Control para la animación del gato de GitHub
  const [isHovering, setIsHovering] = useState(false);
  const [peekingCat, setPeekingCat] = useState(false);
  const iconControls = useAnimation();
  const peekControls = useAnimation();
  const cardRef = useRef(null);
  
  // Estado para decidir qué animación mostrar aleatoriamente
  const [currentAnimation, setCurrentAnimation] = useState(0);

  // Función para determinar si el demo link está disponible
  const isDemoAvailable = project.demoLink && project.demoLink !== '#';
  
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Animación para los enlaces
  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    },
    disabled: {
      scale: 1,
      opacity: 0.5
    }
  };
  
  // Array de animaciones divertidas para el icono grande de GitHub
  const githubAnimations = [
    // Animación 1: Salto entusiasta
    {
      scale: [1, 1.3, 0.8, 1.2, 1],
      rotate: [0, -10, 10, -5, 0],
      y: [0, -25, 5, -10, 0],
      x: [0, -5, 5, -3, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    },
    // Animación 2: Giro completo
    {
      scale: [1, 1.1, 1],
      rotate: [0, 0, 360],
      y: [0, -15, 0],
      transition: {
        duration: 1,
        ease: "easeInOut"
      }
    },
    // Animación 3: Temblor de miedo
    {
      scale: [1, 0.9, 1.05, 0.95, 1],
      rotate: [0, -3, 3, -2, 2, -1, 1, 0],
      x: [0, -3, 3, -3, 3, -2, 2, -1, 1, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1]
      }
    },
    // Animación 4: Salto lateral juguetón
    {
      scale: [1, 1.1, 0.9, 1],
      x: [0, 20, -20, 0],
      y: [0, -10, -5, 0],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    },
    // Animación 5: Golpecitos curiosos
    {
      scale: [1, 1.05, 1, 1.05, 1],
      rotate: [0, -5, 0, 5, 0],
      y: [0, -5, 0, -5, 0],
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    }
  ];
  
  // Función para elegir una animación aleatoria
  const selectRandomAnimation = () => {
    const randomIndex = Math.floor(Math.random() * githubAnimations.length);
    setCurrentAnimation(randomIndex);
    return randomIndex;
  };
  
  // Función para activar el gato que se asoma desde arriba
  const triggerPeekingCat = () => {
    // Probabilidad de que el gato se asome (50%)
    if (Math.random() > 0.5) {
      setPeekingCat(true);
      
      // Iniciar la animación de asomarse
      peekControls.start({
        y: ['-120%', '-60%', '-80%', '-70%'],
        rotate: [0, -5, 5, 0],
        transition: {
          duration: 1.5,
          ease: "easeInOut"
        }
      });
      
      // Ocultar el gato después de un tiempo
      setTimeout(() => {
        peekControls.start({
          y: '-120%',
          transition: {
            duration: 0.5,
            ease: "easeIn"
          }
        });
        setTimeout(() => setPeekingCat(false), 500);
      }, 3000);
    }
  };
  
  // Función para manejar cuando el cursor se acerca al icono grande
  const handleMouseEnter = () => {
    setIsHovering(true);
    
    // Seleccionar una animación aleatoria
    const animIndex = selectRandomAnimation();
    iconControls.start({...githubAnimations[animIndex]});
    
    // Posibilidad de que el gato se asome
    // Solo lo hacemos si no está ya asomándose
    if (!peekingCat) {
      triggerPeekingCat();
    }
    
    // Resetear después de la animación
    setTimeout(() => {
      setIsHovering(false);
      iconControls.start({
        scale: 1,
        rotate: 0,
        x: 0,
        y: 0,
        transition: { duration: 0.3 }
      });
    }, 1000);
  };
  
  // Función para manejar clics en demo no disponible
  const handleDemoClick = (e) => {
    if (!isDemoAvailable) {
      e.preventDefault();
      // Opcional: mostrar una notificación o tooltip
      console.log('Demo not available for this project');
    }
  };
  
  // Animación para el icono pequeño de GitHub
  const smallGithubVariants = {
    idle: { 
      scale: 1
    },
    wiggle: {
      rotate: [0, -15, 15, -10, 10, -5, 5, 0],
      transition: {
        duration: 0.7
      }
    }
  };
  
  // Posible animación periódica aleatoria
  useEffect(() => {
    const randomInterval = 5000 + Math.random() * 10000; // Entre 5 y 15 segundos
    
    // Hay una pequeña probabilidad de que el gato se asome por sí solo
    const interval = setInterval(() => {
      if (!isHovering && !peekingCat && Math.random() > 0.7) {
        triggerPeekingCat();
      }
    }, randomInterval);
    
    return () => clearInterval(interval);
  }, [isHovering, peekingCat]);

  return (
    <motion.div
      ref={cardRef}
      className="card-hover rounded-xl overflow-hidden custom-shadow border 
         transition-colors duration-300 dark:bg-dark-800/50 dark:border-dark-700
         bg-white border-gray-200 shadow-sm relative"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      {/* Gato que se asoma por arriba de la tarjeta */}
      {peekingCat && (
        <motion.div
          className="absolute w-full flex justify-center"
          style={{ top: '-40px', zIndex: 20 }}
          initial={{ y: '-120%' }}
          animate={peekControls}
        >
          <div className="relative">
            <FiGithub className="w-14 h-14 text-gray-700 dark:text-gray-300" />
          </div>
        </motion.div>
      )}
      
      <motion.div 
        className="w-full h-48 bg-gray-100 dark:bg-dark-800 flex items-center justify-center relative overflow-hidden"
        onMouseEnter={handleMouseEnter}
      >
        {/* Efectos de resplandor aleatorios durante la animación */}
        {isHovering && (
          <>
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-primary-300/20 to-primary-500/20"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.7, 0],
                scale: [0.8, 1.1, 1]
              }}
              transition={{ duration: 0.8 }}
            />
            
            <motion.div
              className="absolute w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 0.5 }}
            >
              {/* Estrellas aleatorias que aparecen cuando se activa la animación */}
              {Array.from({ length: 5 }).map((_, i) => {
                const size = 3 + Math.random() * 5;
                return (
                  <motion.div
                    key={i}
                    className="absolute bg-yellow-300 rounded-full"
                    style={{
                      width: size,
                      height: size,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{ 
                      duration: 0.5 + Math.random() * 0.5,
                      delay: Math.random() * 0.3
                    }}
                  />
                );
              })}
            </motion.div>
          </>
        )}
        
        {/* Icono principal de GitHub con animación */}
        <motion.div
          initial={{ scale: 1, rotate: 0, x: 0, y: 0 }}
          animate={iconControls}
          className="relative z-10"
        >
          <FiGithub className="w-20 h-20 text-gray-500 dark:text-gray-400" />
        </motion.div>
      </motion.div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 dark:text-white text-dark-800">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                text-xs font-medium px-3 py-1 rounded-full 
                hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4 items-center">
          {/* Demo Link mejorado */}
          <motion.div className="relative group">
            <motion.a
              href={isDemoAvailable ? project.demoLink : '#'}
              target={isDemoAvailable ? "_blank" : undefined}
              rel={isDemoAvailable ? "noopener noreferrer" : undefined}
              className={`transition-colors flex items-center ${
                isDemoAvailable 
                  ? 'text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 cursor-pointer' 
                  : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              }`}
              variants={linkVariants}
              whileHover={isDemoAvailable ? "hover" : "disabled"}
              whileTap={isDemoAvailable ? { scale: 0.95 } : {}}
              onClick={handleDemoClick}
            >
              {isDemoAvailable ? (
                <FiExternalLink className="h-6 w-6" />
              ) : (
                <FiEyeOff className="h-6 w-6" />
              )}
            </motion.a>
            
            {/* Tooltip para demo disponible/no disponible */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              {isDemoAvailable ? "View Live Demo" : "Demo not available"}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </motion.div>
          
          {/* GitHub Link mejorado */}
          <motion.div className="relative group">
            <motion.a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
              variants={smallGithubVariants}
              whileHover="wiggle"
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => {
                // Posibilidad de que el gato se asome cuando 
                // se hace hover en el icono pequeño
                if (!peekingCat && Math.random() > 0.5) {
                  triggerPeekingCat();
                }
              }}
            >
              <FiGithub className="h-6 w-6" />
            </motion.a>
            
            {/* Tooltip para GitHub */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
              View on GitHub
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;