// src/components/ui/HeroTextSection.jsx
import { motion, useTransform, useScroll } from 'framer-motion';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import TypewriterText from './TypewriterText';

const HeroTextSection = ({ 
  title = "Developer",
  subtitle = "I am a Web Developer and Python lover",
  description = "I'm a web developer who loves exploring Python libraries to create efficient, scalable solutions.",
  primaryButtonText = "Conóceme",
  primaryButtonHref = "#about",
  secondaryButtonText = "Ver Proyectos",
  secondaryButtonHref = "#projects",
  githubUrl = "https://github.com/CarlosMaroRuiz",
  linkedinUrl = "https://www.linkedin.com/in/carlos-m-ruiz-a5ab17224/",
  className = "",
  enableTypewriter = true,
  typewriterSpeed = 80,
  typewriterDelay = 1000
}) => {
  // Framer Motion scroll hook para efectos de paralaje
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
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
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

  // Transformaciones de paralaje suaves
  const titleY = useTransform(scrollYProgress, [0, 0.2], [0, -15]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const subtitleY = useTransform(scrollYProgress, [0, 0.2], [0, -10]);
  const textY = useTransform(scrollYProgress, [0, 0.2], [0, -5]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative z-10 text-center md:text-left w-full max-w-lg md:max-w-none mx-auto md:mx-0 ${className}`}
    >
      <motion.h1 
        variants={itemVariants} 
        className="text-5xl md:text-6xl font-bold mb-4 leading-tight"
        style={{ y: titleY, opacity: titleOpacity }}
      >
        <span className="gradient-text">{title}</span>
      </motion.h1>
      
      <motion.h2 
        variants={itemVariants} 
        className="text-3xl md:text-4xl font-semibold mb-6 text-gray-700 dark:text-gray-200 min-h-[3rem] md:min-h-[4rem]"
        style={{ y: subtitleY }}
      >
        {enableTypewriter ? (
          <TypewriterText
            text={subtitle}
            speed={typewriterSpeed}
            delay={typewriterDelay}
            showCursor={true}
            cursorChar="|"
            className=""
            highlightWords={[]} 
            loop={false}
            naturalTyping={true}
            pauseOnPunctuation={true}
          />
        ) : (
          subtitle
        )}
      </motion.h2>
      
      <motion.p 
        variants={itemVariants} 
        className="text-lg text-gray-600 dark:text-gray-400 mb-8"
        style={{ y: textY }}
      >
        {description}
      </motion.p>
      
      <motion.div 
        variants={itemVariants} 
        className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center md:justify-start"
      >
        <motion.a
          href={primaryButtonHref}
          className="bg-gradient rounded-full px-8 py-3 font-medium text-white shadow-lg hover:opacity-90 transition-all text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {primaryButtonText}
        </motion.a>
        <motion.a
          href={secondaryButtonHref}
          className="bg-white dark:bg-dark-800 border border-gray-300 dark:border-dark-700 rounded-full px-8 py-3 font-medium text-gray-800 dark:text-white shadow-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-all text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {secondaryButtonText}
        </motion.a>
      </motion.div>
      
      <motion.div
        variants={socialVariants}
        className="mt-12 flex space-x-6 justify-center md:justify-start"
      >
        <motion.a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          variants={socialItemVariants}
          whileHover="hover"
          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FiGithub className="w-6 h-6" />
        </motion.a>
        
        <motion.a
          href={linkedinUrl}
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
  );
};

export default HeroTextSection;