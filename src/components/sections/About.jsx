// src/components/sections/About.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: 'HighTech',
      description: 'Developed frontend templates using Blade, Livewire, JavaScript, HTML, and Tailwind CSS, allowing my team to integrate them into the Laravel project for rendering.',
      techs: ['Blade', 'Livewire', 'JavaScript', 'HTML', 'Tailwind CSS', 'Laravel'],
    },
    {
      title: 'IMA Chiapas',
      description: 'Worked on a project called ERP Restaurants, where I integrated frontend technologies such as React.js using TypeScript and Tailwind CSS, along with the Flowbite component library to speed up development.',
      techs: ['React.js', 'TypeScript', 'Tailwind CSS', 'Flowbite', 'ERP'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
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
      id="about" 
      className="py-24 transition-colors duration-300 dark:bg-dark-900 bg-gray-50"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-dark-800">About Me</h2>
          <div className="w-24 h-1 bg-gradient mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.p 
            className="text-xl text-center mb-12 dark:text-gray-300 text-gray-700"
            variants={itemVariants}
          >
            I am passionate about web development and a curious Python enthusiast.
          </motion.p>
          
          <motion.h3 
            className="text-2xl font-bold mb-8 gradient-text"
            variants={itemVariants}
          >
            Places where I have practiced
          </motion.h3>
          
          <motion.div className="space-y-8" variants={containerVariants}>
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                className="experience-card card-hover rounded-xl p-8 custom-shadow border transition-colors duration-300
                  dark:bg-dark-800 dark:border-dark-700 bg-white border-gray-200 shadow-sm"
                variants={cardVariants}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h4 className="text-xl font-bold mb-3">{exp.title}</h4>
                <p className="dark:text-gray-400 text-gray-600">{exp.description}</p>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.techs.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="bg-dark-700 text-primary-300 text-xs px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;