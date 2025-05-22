import { motion } from 'framer-motion';

const SkillCard = ({ title, icon, skills }) => {
  return (
    <motion.div 
      className="group relative rounded-2xl p-8 transition-all duration-500 hover:scale-105
        bg-gradient-to-br from-white to-gray-50 dark:from-dark-900 dark:to-dark-800
        border border-gray-200/50 dark:border-dark-700/50
        shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-purple-500/10"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Background gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 
        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon with animated background */}
        <motion.div 
          className="relative w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-600/20 
            rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300 backdrop-blur-md
            border border-white/20 dark:border-white/10"
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 backdrop-blur-lg" />
          <div className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            {icon}
          </div>
        </motion.div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white 
          group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Skills grid */}
        <div className="grid grid-cols-1 gap-3">
          {skills.map((skill, index) => (
            <motion.div 
              key={index} 
              className="flex items-center p-3 rounded-xl bg-gray-50/50 dark:bg-dark-800/50 
                border border-gray-200/30 dark:border-dark-700/30
                hover:bg-gray-100/50 dark:hover:bg-dark-700/50 
                hover:border-blue-300/50 dark:hover:border-blue-500/50
                transition-all duration-300 group/skill"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              whileHover={{ x: 4 }}
            >
              <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4 
                group-hover/skill:scale-110 transition-transform duration-300" />
              <span className="text-gray-700 dark:text-gray-300 font-medium group-hover/skill:text-blue-600 
                dark:group-hover/skill:text-blue-400 transition-colors duration-300">
                {skill}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 
        rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 
        rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    </motion.div>
  );
};

export default SkillCard;