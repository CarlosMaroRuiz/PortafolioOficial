import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMonitor, FiServer, FiCode } from 'react-icons/fi';
import SkillCard from '../ui/SkillCard';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const frontendSkills = [
    'HTML/CSS',
    'JavaScript',
    'React.js',
    'Tailwind CSS',
  ];

  const backendSkills = [
    'Python',
    'Flask',
    'FastAPI',
    'MySQL',
    'Node.js',
    'Express.js',
  ];

  const otherSkills = [
    'Git/GitHub',
    'Docker',
    'Blockchain/Web3',
    'AWS Cloud',
  ];

  return (
    <section 
      id="skills" 
      className="py-24 transition-colors duration-300 dark:bg-dark-950 bg-white"
      ref={ref}
    >
      <motion.div 
        className="container mx-auto px-4"
        variants={sectionVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={headerVariants}>
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-dark-800">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div variants={cardVariants}>
            <SkillCard 
              title="Frontend Development"
              icon={<FiMonitor className="h-8 w-8 text-white" />}
              skills={frontendSkills}
            />
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <SkillCard 
              title="Backend Development"
              icon={<FiServer className="h-8 w-8 text-white" />}
              skills={backendSkills}
            />
          </motion.div>
          
          <motion.div variants={cardVariants}>
            <SkillCard 
              title="Other Technologies"
              icon={<FiCode className="h-8 w-8 text-white" />}
              skills={otherSkills}
            />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;