// src/components/sections/Certificates.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiDatabase, FiCode } from 'react-icons/fi';

const Certificates = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certificates = [
    {
      title: 'AWS Academy Graduate',
      issuer: 'AWS Academy',
      description: 'AWS Academy Cloud Architecting certification, demonstrating proficiency in cloud architecture principles and AWS services.',
      date: 'October 2023',
      icon: <FiCode className="h-6 w-6 text-white" />,
      link: 'https://www.credly.com/badges/a281a731-0e24-4906-b75e-a82a9b5d30ef/public_url'
    }
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
      id="certificates" 
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
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-dark-800">Certifications</h2>
          <div className="w-24 h-1 bg-gradient mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              className="card-hover rounded-xl overflow-hidden border transition-colors duration-300 flex flex-col
                dark:bg-dark-800/40 dark:border-dark-700 bg-white border-gray-200 shadow-sm"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-6 flex-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient flex items-center justify-center mr-4 flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                    <p className="dark:text-gray-400 text-gray-600">{cert.issuer}</p>
                  </div>
                </div>
                <div className="dark:text-gray-300 text-gray-700 mb-4">
                  <p className="mb-2">{cert.description}</p>
                  <p className="text-sm text-primary-500">Obtained: {cert.date}</p>
                </div>
              </div>
              <div className="px-6 py-3 border-t dark:border-dark-700 border-gray-200">
                <a 
                  href={cert.link || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-500 hover:text-primary-600 transition-colors text-sm font-medium flex items-center"
                >
                  Verify Certificate
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;