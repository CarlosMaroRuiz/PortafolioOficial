// src/components/sections/Achievements.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import achievements from '../../data/archivementData';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const cardHover = {
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="achievements" 
      className="py-32 transition-colors duration-300 dark:bg-dark-950 bg-gray-50"
      ref={ref}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-20"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-5xl font-bold mb-5 dark:text-white text-dark-800">Achievements</h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-primary-500 to-primary-700 mx-auto"></div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A showcase of my recognized work and accomplishments in hackathons and tech events.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              className="rounded-2xl overflow-hidden border transition-all duration-300
                dark:bg-dark-900/30 dark:border-dark-800/50 bg-white border-gray-100 shadow-xl
                backdrop-blur-sm"
              variants={cardVariants}
              whileHover="hover"
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div 
                variants={cardHover}
                className="h-full flex flex-col"
              >
                <div className={`h-40 bg-gradient-to-r ${achievement.color} flex items-center justify-center relative p-6`}>
                  <div className="absolute inset-0 opacity-30 bg-pattern"></div>
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
                    {achievement.icon}
                  </div>
                </div>
                
                <div className="p-8 flex-grow">
                  <div className="flex items-center mb-3">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                      {achievement.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 dark:text-white">{achievement.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">{achievement.description}</p>
                  
                  {/* Image Gallery */}
                  {achievement.images.length > 0 && (
                    <motion.div 
                      variants={imageContainerVariants}
                      className="grid grid-cols-2 gap-4 mb-8"
                    >
                      {achievement.images.map((image, imgIndex) => (
                        <motion.div 
                          key={imgIndex}
                          className="relative h-48 rounded-xl overflow-hidden shadow-md"
                          whileHover="hover"
                        >
                          <motion.div
                            className="w-full h-full"
                            variants={imageVariants}
                          >
                            <img 
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover transition-transform duration-300"
                            />
                          </motion.div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Contributions:</h4>
                    {achievement.highlights.map((highlight, i) => (
                      <div key={i} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <span className="ml-3 text-gray-700 dark:text-gray-300">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;