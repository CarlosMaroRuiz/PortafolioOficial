// src/components/layout/Header.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';

const Header = ({ activeSection }) => {
  const { darkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { id: 'home', text: 'Inicio' },
    { id: 'about', text: 'Sobre Mí' },
    { id: 'skills', text: 'Habilidades' },
    { id: 'experience', text: 'Experiencia' },
    { id: 'certificates', text: 'Certificados' },
    { id: 'achievements', text: 'Logros' },
    { id: 'projects', text: 'Proyectos' }
  ];

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-300 dark:bg-dark-900/80 dark:border-b dark:border-dark-800 bg-white/80 border-b border-gray-200 px-4"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <a href="#home" className="text-2xl font-bold gradient-text">Carlos Dev</a>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={`relative py-2 transition-colors ${
                      activeSection === link.id
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-700 hover:text-dark-900 dark:text-gray-200 dark:hover:text-white'
                    }`}
                  >
                    {link.text}
                    {activeSection === link.id && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient"
                        layoutId="activeSection"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Theme Toggle Switch */}
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-dark-800 text-gray-700 dark:text-gray-200"
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>
          </div>
          
          {/* Mobile Menu Button and Theme Toggle */}
          <div className="flex items-center md:hidden space-x-4">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-dark-800 text-gray-700 dark:text-gray-200"
              whileTap={{ scale: 0.9 }}
            >
              {darkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </motion.button>
            
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-dark-900 dark:hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <motion.div
          initial="closed"
          animate={isMenuOpen ? "open" : "closed"}
          variants={mobileMenuVariants}
          className="md:hidden pt-4 pb-2 space-y-3 overflow-hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setIsMenuOpen(false)}
              className={`block py-2 px-3 rounded-lg transition-colors ${
                activeSection === link.id
                  ? 'bg-gray-200 text-primary-600 dark:bg-dark-800 dark:text-primary-400'
                  : 'text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-dark-800'
              }`}
            >
              {link.text}
            </a>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Header;