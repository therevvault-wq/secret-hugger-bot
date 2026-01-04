import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import turboLoader from '@/assets/turbo-loader.png';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  minDuration?: number;
}

export const LoadingScreen = ({ onLoadingComplete, minDuration = 2000 }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime;
        const targetProgress = Math.min((elapsed / minDuration) * 100, 100);
        return Math.min(prev + 5, targetProgress);
      });
    }, 50);

    // Complete loading after minimum duration
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setIsLoading(false);
        onLoadingComplete?.();
      }, 300);
    }, minDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [minDuration, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center backdrop-blur-md bg-background/80"
        >
          {/* Content container */}
          <div className="relative flex flex-col items-center gap-6">
            {/* Spinning turbo logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="relative"
            >
              {/* Subtle glow effect */}
              <div className="absolute inset-0 blur-xl bg-primary/20 rounded-full" />
              
              {/* Turbo container */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, ease: 'linear', repeat: Infinity }}
                className="relative w-20 h-20 md:w-24 md:h-24"
              >
                <img
                  src={turboLoader}
                  alt="Loading..."
                  className="w-full h-full object-contain drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)]"
                />
              </motion.div>
            </motion.div>

            {/* Progress bar - subtle */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="w-32 md:w-40 h-0.5 bg-border/50 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-primary/80 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
