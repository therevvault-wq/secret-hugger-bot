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
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Radial gradient background */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-background to-background" />
          
          {/* Content container */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Spinning turbo logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full animate-pulse" />
              
              {/* Turbo container */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
                className="relative w-28 h-28 md:w-36 md:h-36"
              >
                <img
                  src={turboLoader}
                  alt="Loading..."
                  className="w-full h-full object-contain drop-shadow-[0_0_30px_hsl(var(--primary)/0.5)]"
                />
              </motion.div>
            </motion.div>

            {/* Brand text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <h1 className="font-display text-3xl md:text-4xl text-foreground tracking-wider">
                THE<span className="text-primary">REV</span>VAULT
              </h1>
              <p className="text-muted-foreground text-sm mt-2">Unleash Your Machine</p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="w-48 md:w-64 h-1 bg-border rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                style={{
                  boxShadow: '0 0 20px hsl(var(--primary) / 0.5)',
                }}
              />
            </motion.div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-primary/20" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-primary/20" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
