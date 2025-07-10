// src/components/sections/Hero.jsx
import { motion, useTransform, useScroll } from 'framer-motion';
import HeroVisualContainer from '../ui/HeroVisualContainer';
import HeroTextSection from '../ui/HeroTextSection';

const Hero = () => {
  // Framer Motion scroll hook para efectos más avanzados
  const { scrollYProgress } = useScroll();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-32 md:pt-16 pb-24 overflow-hidden relative">
      {/* Elemento de fondo con paralaje */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-primary-50 dark:to-dark-900/20 opacity-30"
        style={{
          y: useTransform(scrollYProgress, [0, 0.5], [0, 150])
        }}
      />
      
      <div className="container mx-auto px-6 md:px-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center justify-items-center md:justify-items-start relative z-10">

        <HeroTextSection 
          title="Developer"
          subtitle="I am a Web Developer and Python lover"
          description="I'm a web developer who loves exploring Python libraries to create efficient, scalable solutions."
          primaryButtonText="Conóceme"
          primaryButtonHref="#about"
          secondaryButtonText="Ver Proyectos"
          secondaryButtonHref="#projects"
          githubUrl="https://github.com/CarlosMaroRuiz"
          linkedinUrl="https://www.linkedin.com/in/carlos-m-ruiz-a5ab17224/"
          enableTypewriter={true}
          typewriterSpeed={50}
          typewriterDelay={600}
        />
        
        {/* Sección visual usando el componente existente - Oculto en móviles */}
        <HeroVisualContainer 
          title="Desarrollo Web"
          subtitle="Front-end & Back-end"
          className="w-full hidden md:block"
        />
      </div>
      
   
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 dark:from-dark-900/10 to-transparent"
        style={{
          y: useTransform(scrollYProgress, [0, 0.1], [0, -20])
        }}
      />
    </section>
  );
};

export default Hero;