// src/components/sections/Hero.jsx
import { motion, useTransform, useScroll } from 'framer-motion';
import { FiGithub, FiLinkedin, FiCode, FiServer, FiDatabase } from 'react-icons/fi';
import { useParallax } from '../../hooks/useParallax';
import { useState, useEffect } from 'react';

const Hero = () => {
  // Mouse position state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Obtener valores para el paralaje
  const { scrollY, transform } = useParallax();
  
  // Framer Motion scroll hook para efectos más avanzados
  const { scrollYProgress } = useScroll();
  
  // Variantes para animaciones iniciales
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0] // Curva de ease personalizada más suave
      }
    }
  };

  const visualContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const shapeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: custom * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: (custom) => ({
      y: [0, -10, 0],
      scale: [1, 1.02, 1],
      rotate: [0, custom % 2 === 0 ? 3 : -3, 0],
      transition: {
        duration: 3 + custom % 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay: custom * 0.2
      }
    })
  };

  const socialVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 1,
        staggerChildren: 0.1
      }
    }
  };

  const socialItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };

  // Transformaciones de paralaje más suaves utilizando useTransform de Framer Motion
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -15]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.2], [0, -10]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -5]);
  
  // Paralaje más lento para la sección visual de la derecha
  const visualContainerY = useTransform(scrollYProgress, [0, 0.2], [0, 20]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Array de formas para la composición visual abstracta con efecto paralaje y mejores visuales
  const shapes = [
    { 
      icon: <FiCode size={24} />, 
      size: "lg", 
      position: "top-10 left-20", 
      color: "from-blue-400 to-purple-600", 
      custom: 0,
      parallaxFactor: 0.4,
      glowColor: "blue"
    },
    { 
      icon: <FiDatabase size={28} />, 
      size: "xl", 
      position: "bottom-16 right-16", 
      color: "from-indigo-400 to-cyan-500", 
      custom: 1,
      parallaxFactor: 0.6,
      glowColor: "cyan" 
    },
    { 
      icon: <FiServer size={20} />, 
      size: "md", 
      position: "top-32 right-24", 
      color: "from-violet-400 to-fuchsia-500", 
      custom: 2,
      parallaxFactor: 0.7,
      glowColor: "fuchsia"
    },
    { 
      size: "sm", 
      position: "bottom-20 left-14", 
      color: "from-emerald-300 to-teal-500", 
      shape: "circle", 
      custom: 3,
      parallaxFactor: 0.9,
      glowColor: "emerald"
    },
    { 
      size: "lg", 
      position: "top-5 right-5", 
      color: "from-amber-400 to-orange-500", 
      shape: "circle", 
      custom: 4,
      parallaxFactor: 1.3,
      glowColor: "amber"
    },
    { 
      size: "md", 
      position: "bottom-5 left-36", 
      color: "from-pink-400 to-rose-500", 
      shape: "circle", 
      custom: 5,
      parallaxFactor: 1.1,
      glowColor: "pink"
    },
    { 
      size: "xl", 
      position: "top-24 left-4", 
      color: "from-sky-400 to-blue-500", 
      shape: "square", 
      custom: 6,
      parallaxFactor: 0.7,
      glowColor: "sky"
    },
    { 
      size: "sm", 
      position: "bottom-36 right-8", 
      color: "from-purple-500 to-indigo-500", 
      shape: "square", 
      custom: 7,
      parallaxFactor: 1.4,
      glowColor: "purple"
    },
    { 
      size: "lg", 
      position: "top-40 right-40", 
      color: "from-teal-300 to-cyan-500", 
      shape: "square", 
      custom: 8,
      parallaxFactor: 1.0,
      glowColor: "teal"
    },
    { 
      size: "md", 
      position: "bottom-24 center", 
      color: "from-rose-300 to-pink-500", 
      shape: "circle", 
      custom: 9,
      parallaxFactor: 0.8,
      glowColor: "rose"
    },
    { 
      size: "sm", 
      position: "top-16 center", 
      color: "from-blue-300 to-indigo-500", 
      shape: "square", 
      custom: 10,
      parallaxFactor: 1.2,
      glowColor: "blue"
    },
    { 
      size: "xs", 
      position: "bottom-10 right-28", 
      color: "from-violet-300 to-purple-500", 
      shape: "circle", 
      custom: 11,
      parallaxFactor: 0.5,
      glowColor: "violet"
    },
  ];

  // Mapa de tamaños para las formas
  const sizeMap = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  // Referencia para el contenedor de formas
  const [visualContainerRef, setVisualContainerRef] = useState(null);
  const [shapesRefs, setShapesRefs] = useState({});

  // Calcular la posición relativa del mouse dentro del contenedor visual
  const getRelativeMousePosition = () => {
    if (!visualContainerRef) return { x: 0, y: 0 };
    
    const rect = visualContainerRef.getBoundingClientRect();
    return {
      x: mousePosition.x - rect.left,
      y: mousePosition.y - rect.top
    };
  };

  // Calcular la distancia entre el mouse y cada forma con efectos visuales mejorados
  const getDistanceAndForce = (shapeId) => {
    const shapeRef = shapesRefs[shapeId];
    if (!shapeRef || !visualContainerRef) return { distance: 1000, forceX: 0, forceY: 0, scale: 1, brightness: 1, rotation: 0 };
    
    const relativeMousePos = getRelativeMousePosition();
    const shapeRect = shapeRef.getBoundingClientRect();
    const visualRect = visualContainerRef.getBoundingClientRect();
    
    // Calcular el centro de la forma relativo al contenedor
    const shapeCenter = {
      x: (shapeRect.left + shapeRect.width / 2) - visualRect.left,
      y: (shapeRect.top + shapeRect.height / 2) - visualRect.top
    };
    
    // Calcular la distancia entre el mouse y el centro de la forma
    const dx = relativeMousePos.x - shapeCenter.x;
    const dy = relativeMousePos.y - shapeCenter.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Calcular la fuerza basada en la distancia (más cerca = más fuerte)
    const maxDistance = 180; // Distancia máxima para aplicar fuerza (aumentada)
    const maxForce = 40; // Fuerza máxima a aplicar (aumentada)
    
    if (distance > maxDistance) {
      return { distance, forceX: 0, forceY: 0, scale: 1, brightness: 1, rotation: 0 };
    }
    
    // Normalizar la dirección
    const directionX = dx / distance;
    const directionY = dy / distance;
    
    // Calcular la fuerza (inversamente proporcional a la distancia)
    const forceMagnitude = maxForce * (1 - distance / maxDistance);
    
    // Calcular efectos visuales adicionales basados en la distancia
    const distanceRatio = 1 - distance / maxDistance;
    const scale = 1 + distanceRatio * 0.15; // Ligero aumento de escala cuando está cerca
    const brightness = 1 + distanceRatio * 0.5; // Aumentar brillo cuando está cerca
    const rotation = distanceRatio * 15 * (Math.random() > 0.5 ? 1 : -1); // Ligera rotación aleatoria
    
    // La fuerza se aplica en dirección opuesta (el cursor "empuja" las formas)
    return {
      distance,
      forceX: -directionX * forceMagnitude,
      forceY: -directionY * forceMagnitude,
      scale,
      brightness,
      rotation
    };
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-16 pb-24 overflow-hidden relative">
      {/* Elemento de fondo con paralaje */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-50 dark:to-dark-900/20 opacity-30"
        style={{
          y: useTransform(scrollYProgress, [0, 0.5], [0, 150])
        }}
      />
      
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
            style={{ y: titleY, opacity: titleOpacity }}
          >
            <span className="gradient-text">Developer</span>
          </motion.h1>
          <motion.h2 
            variants={itemVariants} 
            className="text-3xl md:text-4xl font-semibold mb-6 text-gray-700 dark:text-gray-200"
            style={{ y: subtitleY }}
          >
            I am a Web Developer and Python lover
          </motion.h2>
          <motion.p 
            variants={itemVariants} 
            className="text-lg text-gray-600 dark:text-gray-400 mb-8"
            style={{ y: textY }}
          >
            I'm a web developer who loves exploring Python libraries to create efficient, scalable solutions.
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.a
              href="#about"
              className="bg-gradient rounded-full px-8 py-3 font-medium text-white shadow-lg hover:opacity-90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Conóceme
            </motion.a>
            <motion.a
              href="#projects"
              className="bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-full px-8 py-3 font-medium text-gray-800 dark:text-white shadow-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Proyectos
            </motion.a>
          </motion.div>
          
          <motion.div
            variants={socialVariants}
            className="mt-12 flex space-x-6"
          >
            <motion.a
              href="https://github.com/CarlosMaroRuiz"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialItemVariants}
              whileHover="hover"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FiGithub className="w-6 h-6" />
            </motion.a>
            
            <motion.a
              href="https://www.linkedin.com/in/carlos-m-ruiz-a5ab17224/"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialItemVariants}
              whileHover="hover"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FiLinkedin className="w-6 h-6" />
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div
          className="relative"
          variants={visualContainerVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            y: visualContainerY,
            opacity: visualOpacity
          }}
          ref={(ref) => setVisualContainerRef(ref)}
        >
          {/* Contenedor con efectos de gradiente */}
          <div className="absolute -inset-0.5 bg-gradient rounded-2xl blur-xl opacity-75"></div>
          
          {/* Contenedor principal */}
          <div className="relative bg-white dark:bg-dark-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-dark-800 h-96 md:h-[500px]">
            
            {/* Líneas de código abstractas con efecto paralaje */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-full opacity-10"
              style={{
                y: useTransform(scrollYProgress, [0, 0.2], [0, 50])
              }}
            >
              <motion.div 
                className="absolute top-8 left-4 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                {`function createSolution() {
  const skills = ["React", "Python", "Tailwind"];
  const passion = "Web Development";
  
  return buildFuture(skills, passion);
}`}
              </motion.div>
              
              <motion.div 
                className="absolute bottom-10 right-6 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre opacity-60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                {`class Developer {
  constructor() {
    this.creativity = Infinity;
    this.problems = [];
    this.solutions = [];
  }
  
  solve(problem) {
    const solution = this.think(problem);
    this.solutions.push(solution);
    return solution;
  }
}`}
              </motion.div>
            </motion.div>
            
            {/* Formas geométricas animadas con paralaje y reacción al mouse */}
            {shapes.map((shape, index) => {
              // Calcular transformación de paralaje más lenta para cada forma
              const yParallax = useTransform(
                scrollYProgress,
                [0, 0.3, 0.6, 1],
                [0, 20 * shape.parallaxFactor, 35 * shape.parallaxFactor, 50 * shape.parallaxFactor]
              );
              
              // Calcular movimiento basado en la posición del mouse
              const { forceX, forceY } = getDistanceAndForce(`shape-${index}`);
              
              return (
                <motion.div
                  key={index}
                  custom={shape.custom}
                  variants={shapeVariants}
                  initial="hidden"
                  animate="visible"
                  className={`absolute ${shape.position} ${sizeMap[shape.size]} flex items-center justify-center z-10`}
                  style={{ 
                    y: yParallax,
                    // Aplicar movimiento adicional basado en el mouse con efectos visuales mejorados
                    x: forceX,
                    y: forceY ? yParallax.get() + forceY : yParallax,
                    scale: getDistanceAndForce(`shape-${index}`).scale,
                    rotate: getDistanceAndForce(`shape-${index}`).rotation,
                    filter: `brightness(${getDistanceAndForce(`shape-${index}`).brightness})`,
                    transition: { type: "spring", stiffness: 350, damping: 15 }
                  }}
                  ref={(ref) => {
                    setShapesRefs(prev => ({ ...prev, [`shape-${index}`]: ref }));
                  }}
                  whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                >
                  {/* Efecto de brillo/resplandor */}
                  <motion.div 
                    className={`absolute inset-0 ${shape.shape === 'circle' ? 'rounded-full' : shape.shape === 'square' ? 'rounded-lg' : 'rounded-xl'}`}
                    style={{
                      boxShadow: `0 0 15px 2px ${shape.glowColor || 'rgba(79, 70, 229, 0.4)'}`,
                      opacity: getDistanceAndForce(`shape-${index}`).distance < 180 ? 
                               0.3 + (1 - getDistanceAndForce(`shape-${index}`).distance / 180) * 0.7 : 0.2,
                      transition: 'opacity 0.2s ease'
                    }}
                  />
                  
                  <motion.div
                    custom={shape.custom}
                    variants={floatingAnimation}
                    initial="initial"
                    animate="animate"
                    className={`${shape.shape === 'circle' ? 'rounded-full' : shape.shape === 'square' ? 'rounded-lg rotate-12' : 'rounded-xl'} 
                                w-full h-full bg-gradient-to-tr ${shape.color} shadow-lg flex items-center justify-center text-white cursor-pointer backdrop-blur-sm backdrop-saturate-150 border border-white/20`}
                    style={{
                      boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
                    }}
                  >
                    {shape.icon && <motion.div 
                      animate={{ 
                        scale: [1, 1.1, 1],
                        transition: { duration: 2 + shape.custom % 2, repeat: Infinity }
                      }}
                    >
                      {shape.icon}
                    </motion.div>}
                  </motion.div>
                </motion.div>
              );
            })}
            
            {/* Efectos de gradiente animados en el fondo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.1, 1.05, 1.15, 1],
                opacity: 1
              }}
              transition={{ 
                scale: {
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                },
                opacity: { delay: 0.5, duration: 0.8, ease: "easeOut" }
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-3xl"
              style={{ 
                scale: useTransform(scrollYProgress, [0, 0.2], [1, 1.2]),
                opacity: useTransform(scrollYProgress, [0, 0.2], [0.5, 0.2])
              }}
            />
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 1.2, 1.1, 1, 1.15, 1.1],
                opacity: 1
              }}
              transition={{ 
                scale: {
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "mirror"
                },
                opacity: { delay: 0.6, duration: 0.8, ease: "easeOut" }
              }}
              className="absolute top-1/3 left-1/3 -translate-x-1/3 -translate-y-1/3 w-48 h-48 rounded-full bg-gradient-to-tr from-blue-500/20 to-cyan-500/20 blur-3xl"
              style={{ 
                scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.9]),
                opacity: useTransform(scrollYProgress, [0, 0.2], [0.5, 0.3])
              }}
            />
            
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [1, 0.9, 1.1, 1, 0.95],
                opacity: 1
              }}
              transition={{ 
                scale: {
                  duration: 7,
                  repeat: Infinity,
                  repeatType: "reverse"
                },
                opacity: { delay: 0.7, duration: 0.8, ease: "easeOut" }
              }}
              className="absolute bottom-1/3 right-1/3 w-36 h-36 rounded-full bg-gradient-to-bl from-amber-500/20 to-orange-500/20 blur-3xl"
              style={{ 
                scale: useTransform(scrollYProgress, [0, 0.2], [1, 1.1]),
                opacity: useTransform(scrollYProgress, [0, 0.2], [0.4, 0.2])
              }}
            />
            
            {/* Texto central con paralaje */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10"
              style={{ 
                y: useTransform(scrollYProgress, [0, 0.2], [0, -30]),
                opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0])
              }}
            >
              <div className="font-bold text-3xl mb-2 gradient-text">Desarrollo Web</div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">Front-end & Back-end</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Elementos decorativos con paralaje */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 dark:from-dark-900/10 to-transparent"
        style={{
          y: useTransform(scrollYProgress, [0, 0.1], [0, -20])
        }}
      />
    </section>
  );
};

export default Hero;