import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

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
        
        {/* WhatsApp Icon */}
        <div className="relative">
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-[#25D366]/20 animate-pulse-glow" />
          
          <motion.div 
            className="relative w-14 h-14 rounded-full bg-[#25D366] border-2 border-[#25D366]/40 flex items-center justify-center shadow-lg group-hover:bg-[#20BA5A] group-hover:border-[#20BA5A] transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
          </motion.div>
        </div>
      </div>
    </motion.a>
  );
};
