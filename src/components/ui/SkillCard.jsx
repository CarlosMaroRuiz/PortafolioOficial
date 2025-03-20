
import { motion } from 'framer-motion';

const SkillCard = ({ title, icon, skills }) => {
 
  const progressVariants = {
    hidden: { width: 0 },
    visible: (percentage) => ({
      width: `${percentage}%`,
      transition: { 
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3
      }
    })
  };

  return (
    <motion.div 
      className="card-hover rounded-xl p-8 custom-shadow border transition-colors duration-300
        dark:bg-dark-900/50 dark:border-dark-800 bg-white border-gray-200 shadow-sm"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="rounded-full w-16 h-16 flex items-center justify-center bg-gradient mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill.name}</span>
              <span className="text-sm font-medium">{skill.percentage}%</span>
            </div>
            <div className="w-full bg-dark-700 rounded-full h-2">
              <motion.div 
                className="bg-gradient rounded-full h-2"
                custom={skill.percentage}
                variants={progressVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillCard;