// src/components/sections/Certificates.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiAward, FiDatabase, FiCode, FiCpu } from 'react-icons/fi';

const Certificates = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const certificates = [
    {
      title: 'Generative AI Foundations AWS',
      issuer: 'Immune Technology Institute',
      description: 'Comprehensive certification covering PartyRock, Prompt Engineering, Responsible AI Practices, and Generative AI for Executives. Advanced training in AI foundations and practical implementation.',
      date: 'June 2025',
      icon: <FiCpu className="h-6 w-6 text-white" />,
      link: 'https://www.credential.net/7360dbda-15a4-4266-80cc-25c04247e421#acc.C71dkjKg',
      modules: [
        'PartyRock Introduction',
        'Prompt Engineering Essentials',
        'Responsible AI Practices',
        'Generative AI for Executives'
      ]
    },
    {
      title: 'AWS Academy Graduate',
      issuer: 'AWS Academy',
      description: 'AWS Academy Cloud Architecting certification, demonstrating proficiency in cloud architecture principles and AWS services.',
      date: 'October 2023',
      icon: <FiCode className="h-6 w-6 text-white" />,
      link: 'https://www.credly.com/badges/a281a731-0e24-4906-b75e-a82a9b5d30ef/public_url',
      modules: [
        'Cloud Architecture',
        'AWS Services',
        'Infrastructure Design'
      ]
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
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Continuously expanding my expertise through professional certifications in cutting-edge technologies.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {certificates.map((cert, index) => (
            <motion.div 
              key={index}
              className="card-hover rounded-xl overflow-hidden border transition-all duration-300 flex flex-col relative
                dark:bg-dark-800/40 dark:border-dark-700 bg-white border-gray-200 shadow-lg hover:shadow-xl"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >

              {/* Header con gradiente */}
              <div className={`p-6 bg-gradient-to-r ${
                index === 0 
                  ? 'from-purple-500 to-blue-600' 
                  : 'from-blue-500 to-cyan-600'
              }`}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mr-4 flex-shrink-0">
                    {cert.icon}
                  </div>
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{cert.title}</h3>
                    <p className="text-white/90 font-medium">{cert.issuer}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 flex-grow flex flex-col">
                <div className="flex-grow">
                  <div className="text-gray-600 dark:text-gray-300 mb-4">
                    <p className="mb-3">{cert.description}</p>
                    <p className="text-sm text-primary-500 font-semibold">Obtained: {cert.date}</p>
                  </div>

                  {/* Módulos/Skills incluidos */}
                  {cert.modules && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">Key Areas Covered:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {cert.modules.map((module, moduleIndex) => (
                          <div key={moduleIndex} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mr-3 flex-shrink-0" />
                            <span className="text-gray-700 dark:text-gray-300">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer con link de verificación */}
                <div className="border-t dark:border-dark-700 border-gray-200 pt-4">
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors text-sm font-medium group"
                  >
                    <span>Verify Certificate</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;