// src/components/sections/Contact.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiPhone, FiMapPin, FiGithub, FiDribbble, FiTwitter, FiLinkedin } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log(formData);
    alert('¡Mensaje enviado con éxito!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
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

  const contactInfo = [
    {
      icon: <FiMail />,
      title: 'Email',
      content: 'youremail@example.com',
      link: 'mailto:youremail@example.com'
    },
    {
      icon: <FiPhone />,
      title: 'Phone',
      content: '+1 (234) 567-890',
      link: 'tel:+1234567890'
    },
    {
      icon: <FiMapPin />,
      title: 'Location',
      content: 'Mexico City, Mexico',
      link: null
    }
  ];

  const socialLinks = [
    { icon: <FiGithub />, link: '#' },
    { icon: <FiDribbble />, link: '#' },
    { icon: <FiTwitter />, link: '#' },
    { icon: <FiLinkedin />, link: '#' }
  ];

  return (
    <section 
      id="contact" 
      className="py-24 transition-colors duration-300 dark:bg-dark-950 bg-white"
      ref={ref}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16" 
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl font-bold mb-4 dark:text-white text-dark-800">Contact Me</h2>
          <div className="w-24 h-1 bg-gradient mx-auto"></div>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="p-8 rounded-xl border transition-colors duration-300 
                dark:bg-dark-900/50 dark:border-dark-800 bg-white border-gray-200 shadow-sm"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-6">Get In Touch</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-gradient flex items-center justify-center mr-4">
                      <span className="text-white">{info.icon}</span>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400">{info.title}</h4>
                      {info.link ? (
                        <a 
                          href={info.link} 
                          className="text-gray-700 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <span className="text-gray-700 dark:text-gray-300">{info.content}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <motion.a 
                      key={index}
                      href={social.link}
                      className="w-10 h-10 rounded-full bg-gray-200 dark:bg-dark-800 flex items-center justify-center 
                        text-gray-600 dark:text-gray-400 hover:text-white dark:hover:text-white 
                        hover:bg-gradient transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="p-8 rounded-xl border dark:bg-dark-900/50 dark:border-dark-800 
                bg-white border-gray-200 shadow-sm"
              variants={itemVariants}
            >
              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Your Name
                  </label>
                  <motion.input 
                    type="text" 
                    id="name" 
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800 border 
                      border-gray-300 dark:border-dark-700 text-gray-800 dark:text-white 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Your Email
                  </label>
                  <motion.input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800 border 
                      border-gray-300 dark:border-dark-700 text-gray-800 dark:text-white 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Subject
                  </label>
                  <motion.input 
                    type="text" 
                    id="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800 border 
                      border-gray-300 dark:border-dark-700 text-gray-800 dark:text-white 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Message
                  </label>
                  <motion.textarea 
                    id="message" 
                    rows="4" 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-dark-800 border 
                      border-gray-300 dark:border-dark-700 text-gray-800 dark:text-white 
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    whileFocus={{ scale: 1.01 }}
                    required
                  />
                </div>
                
                <motion.button 
                  type="submit" 
                  className="w-full bg-gradient rounded-lg px-6 py-3 font-medium text-white shadow-lg hover:opacity-90 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;