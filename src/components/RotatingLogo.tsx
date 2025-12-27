import logoCircular from "@/assets/logo-circular.png";

export const RotatingLogo = () => {
  const whatsappNumber = "919876543210"; // Replace with your actual WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in your products.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        {/* Chat bubble message */}
        <div className="bg-muted/95 backdrop-blur-sm text-foreground px-4 py-2.5 rounded-lg shadow-lg opacity-100 group-hover:scale-105 transition-transform duration-300">
          <span className="text-sm font-medium whitespace-nowrap">Hi! Need any assistance?</span>
        </div>
        
        {/* Logo */}
        <div className="w-14 h-14 rounded-full bg-rev-dark/90 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-lg animate-pulse-glow group-hover:scale-110 transition-transform duration-300">
          <img
            src={logoCircular}
            alt="Contact us on WhatsApp"
            className="w-10 h-10 animate-spin-slow object-contain"
          />
        </div>
      </div>
    </a>
  );
};
