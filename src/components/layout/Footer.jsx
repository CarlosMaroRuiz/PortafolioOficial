
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Variantes para la animación del botón "Volver Arriba"
  const scrollToTopVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { y: -5, transition: { duration: 0.2, ease: 'easeInOut' } }
  };

  // Función para desplazarse suavemente hasta la parte superior
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="py-8 transition-colors duration-300 dark:bg-dark-900 dark:border-t dark:border-dark-800 bg-gray-100 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="dark:text-gray-400 text-gray-600">
            © {currentYear} <span className="gradient-text font-semibold">CarlosDev</span>. All rights reserved.
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="mt-4 md:mt-0 inline-block px-4 py-2 transition-colors dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-dark-800"
            initial="initial"
            animate="animate"
            whileHover="hover"
            variants={scrollToTopVariants}
          >
            Volver Arriba
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;