import React from 'react';
import { motion } from 'framer-motion';

const SlideIn = ({ children, direction = 'left', delay = 0, duration = 0.5, ...props }) => {
  const variants = {
    hidden: {
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0
    },
    visible: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default SlideIn;
