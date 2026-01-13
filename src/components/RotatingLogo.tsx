import { motion } from "framer-motion";
import turboLoader from "@/assets/turbo-loader.png";

export const RotatingLogo = () => {
  return (
    <motion.a
      href="https://wa.me/919717820775?text=Hi, I would like to inquire about parts from The Rev Vault."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1, type: "spring" }}
      whileHover={{ scale: 1.1 }}
    >
      <div className="relative">
        {/* Glow ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-glow" />

        <div
          className="relative w-16 h-16 rounded-full bg-background border-2 border-primary/40 flex items-center justify-center shadow-lg overflow-hidden"
        >
          <motion.img
            src={turboLoader}
            alt="Chat on WhatsApp"
            className="w-14 h-14 object-contain"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, ease: "linear", repeat: Infinity }}
          />
        </div>
      </div>
    </motion.a>
  );
};
