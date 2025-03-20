// src/components/sections/Achievements.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiStar, FiAward } from 'react-icons/fi';

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const achievements = [
    {
      title: 'First Place at the Vara Network Hackathon at ITAM, Mexico City',
      category: 'Hackathon',
      description: 'I won 1st place at the MegaHackathon by Vara Network at ITAM with Monogatari, a Web3 platform revolutionizing manga through blockchain, smart contracts, and NFTs. As a Frontend Developer.',
      highlights: [
        'Application login using a web3-to-web2 abstraction for user convenience',
        'Hackaton Team',
        'NFT collection for application users'
      ],
      icon: <FiStar className="h-24 w-24 text-white" />
    },
    {
      title: 'Third Place at the Vara Network Hackathon in Chiapas',
      category: 'Hackathon',
      description: 'I achieved 3rd place at the Hackathon in Chiapas, sponsored by Vara Network, with a blockchain-based project. In the team, I served as the Frontend Developer.',
      highlights: [
        'Blockchain-based solution',
        'Frontend Development using modern web technologies',
        'Team collaboration in a competitive environment'
      ],
      icon: <FiAward className="h-24 w-24 text-white" />
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
      id="achievements" 
      className="py-24 transition-colors duration-300 dark:bg-dark-950 bg-white"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          variants={headerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-dark-800">Achievements</h2>
          <div className="w-24 h-1 bg-gradient mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {achievements.map((achievement, index) => (
            <motion.div 
              key={index}
              className="card-hover rounded-xl overflow-hidden custom-shadow border transition-colors duration-300
                dark:bg-dark-900/50 dark:border-dark-800 bg-white border-gray-200 shadow-sm"
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-48 bg-gradient flex items-center justify-center">
                {achievement.icon}
              </div>
              <div className="p-6">
                <span className="text-xs text-primary-600 dark:text-primary-400 font-semibold uppercase tracking-wider">
                  {achievement.category}
                </span>
                <h3 className="text-xl font-bold mt-2 mb-3">{achievement.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{achievement.description}</p>
                
                <div className="space-y-2">
                  {achievement.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 dark:text-primary-400 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;