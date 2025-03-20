// src/components/sections/Projects.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ProjectCard from '../ui/ProjectCard';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: 'VaraTemplateWithHooks',
      description: 'A React template with custom hooks for Vara Network blockchain integration.',
      technologies: ['React JS', 'Tailwind CSS', 'Web3'],
      demoLink: '#',
      githubLink: 'https://github.com/CarlosMaroRuiz/VaraTemplateWithHooks',
    },
    {
      title: 'UPLY_FRONTEND',
      description: 'Frontend application built with React and Tailwind CSS for modern UI experiences.',
      technologies: ['React JS', 'Tailwind CSS', 'JavaScript'],
      demoLink: '#',
      githubLink: 'https://github.com/CarlosMaroRuiz/UPLY_FRONTEND.git',
    },
    {
      title: 'apiRest_Uply',
      description: 'REST API backend with FastAPI, MySQL database and MinIO integration for file storage.',
      technologies: ['FastAPI', 'MySQL', 'MinIO'],
      demoLink: '#',
      githubLink: 'https://github.com/CarlosMaroRuiz/apiRest_Uply',
    },
    {
      title: 'PySearch',
      description: 'Flask application using HTMX for dynamic content without writing JavaScript.',
      technologies: ['Flask', 'HTMX', 'Python'],
      demoLink: '#',
      githubLink: 'https://github.com/CarlosMaroRuiz/PySearch',
    },
    {
      title: 'vote_app_microkernel',
      description: 'Voting application built with Express.js following a microkernel architecture pattern.',
      technologies: ['Express.js', 'HTML', 'JavaScript'],
      demoLink: '#',
      githubLink: 'https://github.com/CarlosMaroRuiz/vote_app_microkernel',
    },
    {
      title: 'sellerBuyers',
      description: 'Python application with MySQL integration for managing seller and buyer relationships.',
      technologies: ['Python', 'MySQL'],
      demoLink: '#',
      githubLink: 'https://github.com/CarlosMaroRuiz/sellerBuyers',
    },
    {
      title: 'FastApiMongo',
      description: 'FastAPI application with MongoDB integration for document-based database operations.',
      technologies: ['FastAPI', 'MongoDB', 'Python'],
      demoLink: '#',
      githubLink: 'https://github.com/CarlosMaroRuiz/FastApiMongo',
    },
    {
      title: 'PyWebScripting',
      description: 'Python web scraping tools and utilities for data extraction from websites.',
      technologies: ['Python', 'BeautifulSoup', 'Requests'],
      demoLink: '#',
      githubLink: 'https://github.com/CarlosMaroRuiz/PyWebScripting',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="projects" 
      className="py-24 transition-colors duration-300 dark:bg-dark-900 bg-gray-50"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16" 
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-dark-800">Projects</h2>
          <div className="w-24 h-1 bg-gradient mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;