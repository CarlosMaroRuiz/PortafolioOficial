// src/components/sections/Experience.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experienceItems = [
    {
      period: 'Ago 2023 - Sep 2023',
      title: 'Frontend Developer',
      company: 'HighTech',
      responsibilities: [
        'Developed frontend templates using Blade templating engine',
        'Created interactive UI components with Livewire',
        'Implemented responsive designs with Tailwind CSS',
        'Collaborated with backend team for Laravel integration'
      ]
    },
    {
      period: 'Nov 2023 - Dic 2024',
      title: 'Frontend Developer',
      company: 'IMA Chiapas',
      responsibilities: [
        'Worked on ERP Restaurant project',
        'Developed frontend using React.js with TypeScript',
        'Implemented UI design using Tailwind CSS',
        'Utilized Flowbite component library to speed up development'
      ]
    }
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

  const headerVariants = {
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

  return (
    <section 
      id="experience" 
      className="py-24 transition-colors duration-300 dark:bg-dark-900 bg-gray-50"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-dark-800">Work Experience</h2>
          <div className="w-24 h-1 bg-gradient mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {experienceItems.map((item, index) => (
            <motion.div 
              key={index}
              className="flex flex-col md:flex-row md:items-start gap-8"
              variants={itemVariants}
            >
              <div className="md:w-1/3">
                <div className="sticky top-24">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.period}</span>
                  <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium">{item.company}</p>
                </div>
              </div>
              <div className="md:w-2/3 rounded-xl p-6 border transition-colors duration-300
                dark:bg-dark-800/50 dark:border-dark-700 bg-white border-gray-200">
                <h4 className="text-lg font-semibold mb-4">Responsibilities:</h4>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  {item.responsibilities.map((responsibility, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;