// src/components/ui/GitHubExplorer.jsx
import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const GitHubExplorer = ({ techIcons, iconsRefs, onAction, onIconMove }) => {
  // Estados para el icono de GitHub
  const [githubPosition, setGithubPosition] = useState({ x: 200, y: 200 });
  const [currentTarget, setCurrentTarget] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const [reactionState, setReactionState] = useState('normal'); // normal, dizzy, hurt, bouncing, excited, carrying
  const [reactionEffect, setReactionEffect] = useState(null);
  
  // Estados para el sistema de arrastre
  const [isCarrying, setIsCarrying] = useState(false);
  const [carriedIcon, setCarriedIcon] = useState(null);
  const [originalPosition, setOriginalPosition] = useState(null);

  // Función para convertir posición CSS a coordenadas
  const getIconPosition = (position) => {
    const positions = {
      'top-10 left-20': { x: 80, y: 40 },
      'bottom-16 right-16': { x: 350, y: 320 },
      'top-32 right-24': { x: 320, y: 120 },
      'bottom-20 left-14': { x: 56, y: 300 },
      'top-5 right-5': { x: 380, y: 20 },
      'bottom-5 left-36': { x: 144, y: 360 },
      'top-24 left-4': { x: 16, y: 96 },
      'bottom-36 right-8': { x: 360, y: 250 },
      'top-40 right-40': { x: 280, y: 160 },
      'bottom-24 center': { x: 200, y: 300 },
      'top-16 center': { x: 200, y: 64 },
      'bottom-10 right-28': { x: 300, y: 340 },
    };
    return positions[position] || { x: 200, y: 200 };
  };

  // Generar una nueva posición aleatoria válida
  const getRandomPosition = () => {
    const positions = [
      { x: 80, y: 40 }, { x: 350, y: 320 }, { x: 320, y: 120 },
      { x: 56, y: 300 }, { x: 380, y: 20 }, { x: 144, y: 360 },
      { x: 16, y: 96 }, { x: 360, y: 250 }, { x: 280, y: 160 },
      { x: 200, y: 300 }, { x: 200, y: 64 }, { x: 300, y: 340 }
    ];
    return positions[Math.floor(Math.random() * positions.length)];
  };

  // Obtener reacción específica según la tecnología
  const getReactionForTech = (techName) => {
    const reactions = {
      'AWS': { state: 'hurt', effect: 'sweat', reason: 'expensive', carryable: true },
      'React': { state: 'excited', effect: 'hearts', reason: 'loves it', carryable: true },
      'Python': { state: 'excited', effect: 'hearts', reason: 'easy syntax', carryable: true },
      'JavaScript': { state: 'dizzy', effect: 'stars', reason: 'weird behavior', carryable: false },
      'Node.js': { state: 'excited', effect: 'lightning', reason: 'fast', carryable: true },
      'Tailwind': { state: 'excited', effect: 'sparkles', reason: 'utility first', carryable: true },
      'FastAPI': { state: 'excited', effect: 'speed', reason: 'super fast', carryable: false },
      'Framer': { state: 'dizzy', effect: 'motion', reason: 'too much animation', carryable: false }
    };
    return reactions[techName] || { state: 'normal', effect: 'basic', reason: 'neutral', carryable: true };
  };

  // Realizar acción sobre el icono CON posibilidad de cargarlo
  const performAction = (iconIndex) => {
    const iconRef = iconsRefs[`tech-${iconIndex}`];
    if (!iconRef) {
      console.log(`No ref found for icon ${iconIndex}`);
      return;
    }

    const tech = techIcons[iconIndex];
    const reaction = getReactionForTech(tech.name);
    
    // Decidir si va a cargar el icono (50% de probabilidad si es carryable para más movimiento)
    const willCarry = reaction.carryable && Math.random() > 0.5;
    
    console.log(`GitHub action on ${tech.name}: ${willCarry ? 'CARRY' : tech.action}`);
    
    if (willCarry) {
      // Modo de carga
      setReactionState('carrying');
      setReactionEffect('carrying');
      setIsCarrying(true);
      setCarriedIcon(iconIndex);
      const currentPos = getIconPosition(tech.position);
      setOriginalPosition(currentPos);
      
      // Simular "agarrar" el icono con transformación más visible
      iconRef.style.transition = 'transform 0.3s ease';
      iconRef.style.transform = 'scale(0.7) rotate(15deg)';
      iconRef.style.zIndex = '50';
      iconRef.style.filter = 'brightness(1.2)';
      
      setTimeout(() => {
        // Mover a nueva posición
        const newPos = getRandomPosition();
        console.log(`Moving ${tech.name} from`, currentPos, 'to', newPos);
        
        // Animar el movimiento del GitHub con el icono
        setGithubPosition(newPos);
        
        // Calcular el desplazamiento necesario
        const deltaX = newPos.x - currentPos.x;
        const deltaY = newPos.y - currentPos.y;
        
        // Mover el icono junto con GitHub usando transform
        iconRef.style.transition = 'transform 1.5s ease-in-out';
        iconRef.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.7) rotate(15deg)`;
        
        setTimeout(() => {
          // Soltar el icono en la nueva posición
          iconRef.style.transition = 'transform 0.5s ease';
          iconRef.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1) rotate(0deg)`;
          iconRef.style.filter = 'brightness(1)';
          iconRef.style.zIndex = '10';
          
          // Notificar al componente padre sobre el movimiento
          if (onIconMove) {
            onIconMove(iconIndex, newPos);
          }
          
          // Resetear estados
          setTimeout(() => {
            setIsCarrying(false);
            setCarriedIcon(null);
            setOriginalPosition(null);
            setReactionState('normal');
            setReactionEffect(null);
          }, 500);
          
        }, 1500); // Tiempo de movimiento
      }, 800); // Tiempo de agarre
      
    } else {
      // Acciones normales
      setReactionState(reaction.state);
      setReactionEffect(reaction.effect);
      
      const action = tech.action;
      
      // Aplicar transformación temporal con transición suave
      iconRef.style.transition = 'transform 0.5s ease';
      
      switch (action) {
        case 'jump':
          iconRef.style.transform = 'translateY(-20px) scale(1.1)';
          setTimeout(() => {
            iconRef.style.transform = '';
          }, 500);
          break;
          
        case 'push':
          iconRef.style.transform = 'translateX(15px) rotate(5deg)';
          setTimeout(() => {
            iconRef.style.transform = '';
          }, 600);
          break;
          
        case 'spin':
          iconRef.style.transform = 'rotate(180deg) scale(1.2)';
          setTimeout(() => {
            iconRef.style.transform = '';
          }, 800);
          break;
      }
      
      // Volver al estado normal
      setTimeout(() => {
        setReactionState('normal');
        setReactionEffect(null);
      }, 2000);
    }

    // Callback opcional
    if (onAction) {
      onAction(iconIndex, willCarry ? 'carry' : tech.action, reaction);
    }
  };

  // Movimiento automático del icono de GitHub
  useEffect(() => {
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (!isMoving && !isCarrying && techIcons.length > 0 && reactionState === 'normal') {
          const randomIcon = Math.floor(Math.random() * techIcons.length);
          const targetIcon = techIcons[randomIcon];
          const targetPos = getIconPosition(targetIcon.position);
          
          setCurrentTarget(randomIcon);
          setIsMoving(true);
          
          // Mover GitHub hacia el icono
          setGithubPosition(targetPos);
          
          // Después de llegar, realizar acción
          setTimeout(() => {
            performAction(randomIcon);
            setTimeout(() => {
              if (!isCarrying) {
                setIsMoving(false);
                setCurrentTarget(null);
              }
            }, 1000);
          }, 1500);
        }
      }, 4000); // Un poco más lento para apreciar las cargas
      
      return () => clearInterval(interval);
    }, 2000);
    
    return () => clearTimeout(startDelay);
  }, [techIcons, iconsRefs, isMoving, reactionState, isCarrying]);

  // Animaciones según el estado de reacción
  const getReactionAnimation = () => {
    switch (reactionState) {
      case 'carrying':
        return {
          scale: [1, 1.1, 1],
          y: [0, -5, 0],
          transition: { duration: 0.8, repeat: Infinity }
        };
      case 'dizzy':
        return {
          rotate: [0, -10, 10, -10, 10, 0],
          scale: [1, 0.9, 1.1, 0.9, 1],
          x: [0, -3, 3, -3, 3, 0],
          transition: { duration: 1, repeat: 2 }
        };
      case 'hurt':
        return {
          rotate: [0, -15, 15, -15, 15, 0],
          y: [0, -5, 5, -5, 0],
          scale: [1, 0.8, 1.2, 0.8, 1],
          transition: { duration: 0.8, repeat: 1 }
        };
      case 'bouncing':
        return {
          y: [0, -20, 0, -15, 0, -10, 0],
          scale: [1, 1.1, 0.9, 1.1, 0.9, 1],
          transition: { duration: 1.2 }
        };
      case 'excited':
        return {
          rotate: [0, 360],
          scale: [1, 1.3, 1],
          y: [0, -15, 0],
          transition: { duration: 0.8 }
        };
      default:
        return isMoving 
          ? {
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }
          : {
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            };
    }
  };

  // Efectos visuales según la reacción
  const renderReactionEffect = () => {
    if (!reactionEffect) return null;

    switch (reactionEffect) {
      case 'carrying': // Cargando un icono
        return (
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-blue-500"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1],
              scale: [0, 1.2, 1],
              y: [0, -5, -10]
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            📦
          </motion.div>
        );
      case 'stars': // Mareado
        return (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ duration: 2 }}
          >
            <span className="text-yellow-400">⭐</span>
            <span className="text-yellow-400">💫</span>
            <span className="text-yellow-400">⭐</span>
          </motion.div>
        );
      case 'sweat': // Trabajando duro/cansado
        return (
          <motion.div
            className="absolute -top-6 -right-4 text-blue-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [-10, 0, 5, 10]
            }}
            transition={{ duration: 1.5 }}
          >
            💧
          </motion.div>
        );
      case 'hearts': // Le gusta la tecnología
        return (
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2 flex"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.3, 1, 0],
              y: [0, -10, -20]
            }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-red-400">💕</span>
          </motion.div>
        );
      case 'lightning': // Velocidad/energía
        return (
          <motion.div
            className="absolute -top-6 -right-4 text-yellow-300"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.3, 1, 0]
            }}
            transition={{ duration: 1 }}
          >
            ⚡
          </motion.div>
        );
      case 'sparkles': // Emocionado/feliz
        return (
          <motion.div
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 flex space-x-1"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0]
            }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-purple-400">✨</span>
            <span className="text-pink-400">✨</span>
            <span className="text-blue-400">✨</span>
          </motion.div>
        );
      case 'speed': // Velocidad
        return (
          <motion.div
            className="absolute -right-8 top-1/2 transform -translate-y-1/2"
            initial={{ opacity: 0, x: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              x: [0, 15, 30]
            }}
            transition={{ duration: 1 }}
          >
            <span className="text-blue-400">💨</span>
          </motion.div>
        );
      case 'motion': // Demasiada animación
        return (
          <motion.div
            className="absolute -top-6 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              scale: [0, 1.2, 1, 0],
              rotate: [0, 720]
            }}
            transition={{ duration: 2 }}
          >
            <span className="text-purple-500">🌀</span>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="absolute z-20"
      animate={{
        x: githubPosition.x,
        y: githubPosition.y,
      }}
      transition={{
        duration: isCarrying ? 2 : 1.5,
        ease: isCarrying ? "easeInOut" : "easeInOut"
      }}
    >
      <motion.div
        animate={getReactionAnimation()}
        transition={{
          duration: isMoving ? 1.5 : 3,
          repeat: isMoving ? 1 : (reactionState === 'normal' ? Infinity : 0),
          ease: "easeInOut"
        }}
        className="relative"
      >
        <FaGithub 
          className={`w-12 h-12 drop-shadow-lg transition-colors duration-300 ${
            reactionState === 'hurt' ? 'text-red-600 dark:text-red-400' :
            reactionState === 'dizzy' ? 'text-yellow-600 dark:text-yellow-400' :
            reactionState === 'excited' ? 'text-green-600 dark:text-green-400' :
            reactionState === 'carrying' ? 'text-blue-600 dark:text-blue-400' :
            'text-gray-800 dark:text-white'
          }`} 
        />
        
        {/* Sombra del icono */}
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-black/20 rounded-full blur-sm" />
        
        {/* Efectos de reacción */}
        {renderReactionEffect()}
        
        {/* Expresión facial según estado */}
        {reactionState === 'carrying' && (
          <motion.div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1] }}
            transition={{ duration: 0.5 }}
          >
            😤
          </motion.div>
        )}
        
        {(reactionState === 'hurt' || reactionState === 'dizzy') && (
          <motion.div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5 }}
          >
            {reactionState === 'hurt' ? '😵' : '😵‍💫'}
          </motion.div>
        )}
        
        {reactionState === 'excited' && (
          <motion.div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.5 }}
          >
            😊
          </motion.div>
        )}
        
        {/* Indicador de lo que está cargando */}
        {isCarrying && carriedIcon !== null && (
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Llevando {techIcons[carriedIcon]?.name}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GitHubExplorer;