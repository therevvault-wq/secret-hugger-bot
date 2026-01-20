import { motion } from "framer-motion";
import turboLoader from "@/assets/turbo-loader.png";

export const RotatingLogo = () => {
  return (
    <motion.a
      href="https://wa.me/919717820775?text=Hi, I would like to inquire about parts from The Rev Vault."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 cursor-pointer group"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 10 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="bg-background border border-primary/20 px-4 py-2 rounded-2xl shadow-xl"
      >
        <p className="text-sm font-medium text-foreground whitespace-nowrap">
          Hi, need any assistance?
        </p>
      </motion.div>

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
