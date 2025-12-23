import logoCircular from "@/assets/logo-circular.png";

export const RotatingLogo = () => {
  const whatsappNumber = "919876543210"; // Replace with your actual WhatsApp number
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi! I'm interested in your products.`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 cursor-pointer hover:scale-110 transition-transform duration-300"
    >
      <div className="w-16 h-16 rounded-full bg-rev-dark/90 backdrop-blur-sm border border-primary/30 flex items-center justify-center shadow-lg animate-pulse-glow">
        <img
          src={logoCircular}
          alt="Contact us on WhatsApp"
          className="w-12 h-12 animate-spin-slow object-contain"
        />
      </div>
    </a>
  );
};
