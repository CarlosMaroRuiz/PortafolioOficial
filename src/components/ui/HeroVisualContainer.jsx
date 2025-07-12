import { motion, useTransform, useScroll } from 'framer-motion';
import { 
  FaReact, 
  FaPython, 
  FaAws, 
  FaJs, 
  FaNodeJs
} from 'react-icons/fa';
import { 
  SiTailwindcss, 
  SiFastapi,
  SiFramer
} from 'react-icons/si';
import { useState, useEffect } from 'react';
import GitHubExplorer from './GitHubExplorer';

const HeroVisualContainer = ({ 
  title = "Desarrollo Web", 
  subtitle = "Front-end & Back-end",
  className = ""
}) => {
  // Referencias para los iconos
  const [iconsRefs, setIconsRefs] = useState({});
  const [iconPositions, setIconPositions] = useState({}); // Nuevas posiciones de los iconos

  // Framer Motion scroll hook
  const { scrollYProgress } = useScroll();
  
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

  const iconVariants = {
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
      y: [0, -15, 0],
      scale: [1, 1.05, 1],
      rotate: [0, custom % 2 === 0 ? 5 : -5, 0],
      transition: {
        duration: 3 + custom % 3,
        ease: "easeInOut",
        repeat: Infinity,
        delay: custom * 0.2
      }
    })
  };

  // Paralaje para el contenedor visual
  const visualContainerY = useTransform(scrollYProgress, [0, 0.2], [0, 20]);
  const visualOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

  // Configuración de iconos de tecnologías con acciones
  const techIcons = [
    { 
      icon: <FaReact size={32} />, 
      size: "xl", 
      position: "top-10 left-20", 
      color: "#61DAFB", 
      bgColor: "from-cyan-400 to-blue-500",
      custom: 0,
      parallaxFactor: 0.4,
      name: "React",
      action: "spin"
    },
    { 
      icon: <FaPython size={28} />, 
      size: "lg", 
      position: "bottom-16 right-16", 
      color: "#3776AB", 
      bgColor: "from-blue-500 to-yellow-400",
      custom: 1,
      parallaxFactor: 0.6,
      name: "Python",
      action: "jump"
    },
    { 
      icon: <FaAws size={24} />, 
      size: "md", 
      position: "top-32 right-24", 
      color: "#FF9900", 
      bgColor: "from-orange-400 to-yellow-500",
      custom: 2,
      parallaxFactor: 0.7,
      name: "AWS",
      action: "push"
    },
    { 
      icon: <FaJs size={26} />, 
      size: "md", 
      position: "top-5 right-5", 
      color: "#F7DF1E", 
      bgColor: "from-yellow-400 to-yellow-500",
      custom: 3,
      parallaxFactor: 1.3,
      name: "JavaScript",
      action: "jump"
    },
    { 
      icon: <SiTailwindcss size={24} />, 
      size: "md", 
      position: "bottom-5 left-36", 
      color: "#06B6D4", 
      bgColor: "from-cyan-400 to-teal-500",
      custom: 4,
      parallaxFactor: 1.1,
      name: "Tailwind",
      action: "push"
    },
    { 
      icon: <FaNodeJs size={28} />, 
      size: "lg", 
      position: "top-24 left-4", 
      color: "#339933", 
      bgColor: "from-green-500 to-emerald-600",
      custom: 5,
      parallaxFactor: 0.7,
      name: "Node.js",
      action: "spin"
    },
    { 
      icon: <SiFastapi size={20} />, 
      size: "sm", 
      position: "top-16 center", 
      color: "#009688", 
      bgColor: "from-teal-400 to-green-500",
      custom: 6,
      parallaxFactor: 1.2,
      name: "FastAPI",
      action: "jump"
    },
    { 
      icon: <SiFramer size={18} />, 
      size: "xs", 
      position: "bottom-10 right-28", 
      color: "#0055FF", 
      bgColor: "from-blue-500 to-purple-600",
      custom: 7,
      parallaxFactor: 0.5,
      name: "Framer",
      action: "spin"
    },
  ];

  // Mapa de tamaños
  const sizeMap = {
    xs: "w-12 h-12",
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
    xl: "w-28 h-28",
  };

  // Callback para cuando GitHubExplorer realiza una acción
  const handleGitHubAction = (iconIndex, action, reaction) => {
    console.log(`🚀 GitHub ${action} on ${techIcons[iconIndex].name}`);
    if (reaction) {
      console.log(`😄 Reaction: ${reaction.state} - ${reaction.reason}`);
    }
  };

  // Callback para cuando GitHub mueve un icono
  const handleIconMove = (iconIndex, newPosition) => {
    setIconPositions(prev => ({
      ...prev,
      [iconIndex]: newPosition
    }));
    console.log(`📦 Moved ${techIcons[iconIndex].name} to:`, newPosition);
  };

  // Debug: mostrar cuántas referencias tenemos
  useEffect(() => {
    console.log(`🔍 Total icon refs: ${Object.keys(iconsRefs).length}`);
    console.log('📋 Refs:', Object.keys(iconsRefs));
  }, [iconsRefs]);

  return (
    <motion.div
      className={`relative ${className}`}
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
        
        {/* Componente GitHubExplorer separado */}
        <GitHubExplorer 
          techIcons={techIcons}
          iconsRefs={iconsRefs}
          onAction={handleGitHubAction}
          onIconMove={handleIconMove}
        />
        
        {/* Líneas de código con paralaje */}
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
            {`// GitHub can now carry and move icons!
const techStack = {
  frontend: ["React", "Tailwind", "JavaScript"],
  backend: ["Python", "FastAPI", "Node.js"],
  cloud: ["AWS"],
  tools: ["GitHub", "Framer Motion"]
};

const actions = ["jump", "push", "spin", "carry"];`}
          </motion.div>
          
          <motion.div 
            className="absolute bottom-10 right-6 text-xs font-mono text-gray-800 dark:text-gray-200 whitespace-pre opacity-60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            {`function createAmazingApps() {
  const github = new GitHubExplorer();
  const passion = "Web Development";
  const skills = techStack;
  
  // GitHub can now carry icons around!
  github.canCarry = true;
  github.reactions = ["excited", "dizzy", "hurt"];
  
  return buildSomethingAwesome(passion, skills);
}`}
          </motion.div>
        </motion.div>
        
        {/* Iconos de tecnologías */}
        {techIcons.map((tech, index) => {
          const yParallax = useTransform(
            scrollYProgress,
            [0, 0.3, 0.6, 1],
            [0, 15 * tech.parallaxFactor, 25 * tech.parallaxFactor, 35 * tech.parallaxFactor]
          );
          
          return (
            <motion.div
              key={index}
              custom={tech.custom}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className={`absolute ${tech.position} ${sizeMap[tech.size]} flex items-center justify-center z-10`}
              style={{ 
                y: yParallax,
              }}
              ref={(ref) => {
                if (ref) {
                  setIconsRefs(prev => ({ ...prev, [`tech-${index}`]: ref }));
                }
              }}
            >
              {/* Efecto de resplandor */}
              <motion.div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: `0 0 20px 4px ${tech.color}40`,
                  opacity: 0.3,
                  transition: 'opacity 0.2s ease'
                }}
              />
              
              {/* Contenedor del icono */}
              <motion.div
                custom={tech.custom}
                variants={floatingAnimation}
                initial="initial"
                animate="animate"
                className={`rounded-2xl w-full h-full bg-gradient-to-tr ${tech.bgColor} shadow-xl flex items-center justify-center text-white backdrop-blur-sm backdrop-saturate-150 border border-white/20 relative overflow-hidden`}
                style={{
                  boxShadow: `0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 8px 10px -5px rgba(0, 0, 0, 0.1)`
                }}
              >
                {/* Icono de tecnología */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    transition: { duration: 2 + tech.custom % 2, repeat: Infinity }
                  }}
                  className="relative z-10"
                >
                  {tech.icon}
                </motion.div>
                
                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {tech.name}
                </div>
                
                {/* Efecto de brillo interno */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent rounded-2xl pointer-events-none" />
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl"
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
          className="absolute top-1/3 left-1/3 -translate-x-1/3 -translate-y-1/3 w-48 h-48 rounded-full bg-gradient-to-tr from-cyan-500/20 to-teal-500/20 blur-3xl"
          style={{ 
            scale: useTransform(scrollYProgress, [0, 0.2], [1, 0.9]),
            opacity: useTransform(scrollYProgress, [0, 0.2], [0.5, 0.3])
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
          <div className="font-bold text-3xl mb-2 gradient-text">{title}</div>
          <div className="text-gray-600 dark:text-gray-300 font-medium">{subtitle}</div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroVisualContainer;