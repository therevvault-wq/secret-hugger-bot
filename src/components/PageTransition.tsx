import { motion, type Transition, type Easing } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition = ({ children, className = '' }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' as Easing }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Section animation wrapper for staggered reveals
interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const SectionReveal = ({ children, className = '', delay = 0 }: SectionRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
