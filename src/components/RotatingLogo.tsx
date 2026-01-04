import { motion, AnimatePresence } from "framer-motion";
import turboLoader from "@/assets/turbo-loader.png";

export const RotatingLogo = () => {
  const whatsappNumber = "919717820775";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in your products.`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 cursor-pointer group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, type: "spring" }}
    >
      <div className="flex items-center gap-3">
        {/* Chat bubble message */}
        <motion.div 
          className="bg-card/95 backdrop-blur-sm text-foreground px-4 py-2.5 rounded-lg shadow-lg border border-border/50"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          <span className="text-sm font-medium whitespace-nowrap">Need any assistance?</span>
        </motion.div>
        
        {/* Turbo Logo */}
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-glow" />
          
          <motion.div 
            className="relative w-14 h-14 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center shadow-lg overflow-hidden group-hover:border-primary transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <motion.img
              src={turboLoader}
              alt="Contact us on WhatsApp"
              className="w-12 h-12 object-contain"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, ease: "linear", repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
};
