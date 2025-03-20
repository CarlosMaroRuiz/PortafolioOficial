// src/components/ui/ProjectCard.jsx
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiGitBranch } from 'react-icons/fi';

const ProjectCard = ({ project }) => {
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
    }
  };

  return (
    <motion.div
      className="card-hover rounded-xl overflow-hidden custom-shadow border 
        transition-colors duration-300 dark:bg-dark-800/50 dark:border-dark-700 
        bg-white border-gray-200 shadow-sm"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, margin: "0px 0px -100px 0px" }}
    >
      <div className="w-full h-48 bg-gray-100 dark:bg-dark-800 flex items-center justify-center">
        <FiGithub className="w-20 h-20 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-dark-700 text-primary-300 text-xs px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <motion.a
            href={project.demoLink}
            className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
            variants={linkVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <FiExternalLink className="h-6 w-6" />
          </motion.a>
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 transition-colors"
            variants={linkVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub className="h-6 w-6" />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;