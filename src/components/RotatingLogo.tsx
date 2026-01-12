import { motion } from "framer-motion";
import turboLoader from "@/assets/turbo-loader.png";

export const RotatingLogo = () => {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-40"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, type: "spring" }}
    >
      <div className="relative">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-glow" />

        <motion.div
          className="relative w-16 h-16 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center shadow-lg overflow-hidden"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <motion.img
            src={turboLoader}
            alt="The Rev Vault"
            className="w-14 h-14 object-contain"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};
