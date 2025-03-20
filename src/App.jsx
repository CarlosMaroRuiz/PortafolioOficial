// src/App.jsx
import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Certificates from './components/sections/Certificates';
import Achievements from './components/sections/Achievements';
import Projects from './components/sections/Projects';
import Contact from './components/sections/Contact';
import ParallaxSection from './components/ui/ParallaxSection';
import { motion } from 'framer-motion';
import ScrollIndicator from './components/ui/ScrollIndicator';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Observador de intersección para detectar qué sección es visible
  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Observar todas las secciones con id
    document.querySelectorAll('section[id]').forEach((section) => {
      sectionObserver.observe(section);
    });

    return () => {
      document.querySelectorAll('section[id]').forEach((section) => {
        sectionObserver.unobserve(section);
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-300 dark:bg-dark-950 dark:text-gray-100 bg-gray-100 text-dark-900 overflow-x-hidden px-4 md:px-8">
        {/* Elementos de fondo con paralaje */}
        <motion.div 
          className="fixed top-0 right-0 w-1/3 h-screen bg-gradient-to-l from-primary-100/20 to-transparent dark:from-primary-900/5 dark:to-transparent pointer-events-none -z-10" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        
        <motion.div 
          className="fixed top-0 left-0 w-1/3 h-screen bg-gradient-to-r from-secondary-100/20 to-transparent dark:from-secondary-900/5 dark:to-transparent pointer-events-none -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />
        
        {/* Indicador de scroll para invitar al usuario a explorar */}
        <ScrollIndicator />
        
        <Header activeSection={activeSection} />
        
        <main>
          <Hero />
          
          <ParallaxSection id="about-parallax" intensity={0.2} direction="right" entranceAnimation="slide">
            <About />
          </ParallaxSection>
          
          <ParallaxSection id="skills-parallax" intensity={0.15} direction="left" entranceAnimation="fade">
            <Skills />
          </ParallaxSection>
          
          <ParallaxSection id="experience-parallax" intensity={0.12} direction="up" entranceAnimation="scale">
            <Experience />
          </ParallaxSection>
          
          <ParallaxSection id="certificates-parallax" intensity={0.14} direction="down" entranceAnimation="slide">
            <Certificates />
          </ParallaxSection>
          
          <ParallaxSection id="achievements-parallax" intensity={0.18} direction="right" entranceAnimation="scale">
            <Achievements />
          </ParallaxSection>
          
          <ParallaxSection id="projects-parallax" intensity={0.16} direction="left" entranceAnimation="fade">
            <Projects />
          </ParallaxSection>
          
  
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;