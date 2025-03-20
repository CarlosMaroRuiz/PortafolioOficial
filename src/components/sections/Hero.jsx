// src/components/sections/Hero.jsx
import { motion, useTransform, useScroll } from 'framer-motion';
import { FiGithub, FiLinkedin, FiCode, FiServer, FiDatabase } from 'react-icons/fi';
import { useParallax } from '../../hooks/useParallax';

const Hero = () => {
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
      transition: {
        duration: 3,
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

  // Array de formas para la composición visual abstracta con efecto paralaje
  const shapes = [
    { 
      icon: <FiCode size={24} />, 
      size: "lg", 
      position: "top-10 left-20", 
      color: "from-primary-400 to-primary-600", 
      custom: 0,
      parallaxFactor: 0.4 // Se mueve muy lento
    },
    { 
      icon: <FiDatabase size={28} />, 
      size: "xl", 
      position: "bottom-16 right-16", 
      color: "from-secondary-400 to-secondary-600", 
      custom: 1,
      parallaxFactor: 0.6 // Se mueve lento
    },
    { 
      icon: <FiServer size={20} />, 
      size: "md", 
      position: "top-32 right-24", 
      color: "from-primary-300 to-secondary-500", 
      custom: 2,
      parallaxFactor: 0.7
    },
    { 
      size: "sm", 
      position: "bottom-20 left-14", 
      color: "from-secondary-300 to-primary-500", 
      shape: "circle", 
      custom: 3,
      parallaxFactor: 0.9
    },
    { 
      size: "lg", 
      position: "top-5 right-5", 
      color: "from-primary-500 to-secondary-300", 
      shape: "circle", 
      custom: 4,
      parallaxFactor: 1.3
    },
    { 
      size: "md", 
      position: "bottom-5 left-36", 
      color: "from-secondary-400 to-primary-300", 
      shape: "circle", 
      custom: 5,
      parallaxFactor: 1.1
    },
    { 
      size: "xl", 
      position: "top-24 left-4", 
      color: "from-primary-400 to-secondary-400", 
      shape: "square", 
      custom: 6,
      parallaxFactor: 0.7
    },
    { 
      size: "sm", 
      position: "bottom-36 right-8", 
      color: "from-secondary-500 to-primary-400", 
      shape: "square", 
      custom: 7,
      parallaxFactor: 1.4
    },
    { 
      size: "lg", 
      position: "top-40 right-40", 
      color: "from-primary-300 to-secondary-600", 
      shape: "square", 
      custom: 8,
      parallaxFactor: 1.0
    },
  ];

  // Mapa de tamaños para las formas
  const sizeMap = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
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
            
            {/* Formas geométricas animadas con paralaje */}
            {shapes.map((shape, index) => {
              // Calcular transformación de paralaje más lenta para cada forma
              const yParallax = useTransform(
                scrollYProgress,
                [0, 0.3, 0.6, 1],
                [0, 20 * shape.parallaxFactor, 35 * shape.parallaxFactor, 50 * shape.parallaxFactor]
              );
              
              return (
                <motion.div
                  key={index}
                  custom={shape.custom}
                  variants={shapeVariants}
                  initial="hidden"
                  animate="visible"
                  className={`absolute ${shape.position} ${sizeMap[shape.size]} flex items-center justify-center`}
                  style={{ y: yParallax }}
                >
                  <motion.div
                    custom={shape.custom}
                    variants={floatingAnimation}
                    initial="initial"
                    animate="animate"
                    className={`${shape.shape === 'circle' ? 'rounded-full' : shape.shape === 'square' ? 'rounded-lg rotate-12' : 'rounded-xl'} 
                                w-full h-full bg-gradient-to-tr ${shape.color} shadow-lg flex items-center justify-center text-white`}
                  >
                    {shape.icon && shape.icon}
                  </motion.div>
                </motion.div>
              );
            })}
            
            {/* Círculo de gradiente central con paralaje */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 blur-xl opacity-30"
              style={{ 
                scale: useTransform(scrollYProgress, [0, 0.2], [1, 1.2]),
                opacity: useTransform(scrollYProgress, [0, 0.2], [0.3, 0.1])
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