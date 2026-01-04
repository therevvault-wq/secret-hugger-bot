import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
      </div>

      {/* Content */}
      <div className="w-full relative z-10 pt-24 md:pt-20 px-4 sm:px-8 lg:pl-20 xl:pl-32">
        <div className="max-w-3xl">
          <h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight tracking-wide mb-6 md:mb-8 animate-slide-up" 
            style={{ animationDelay: "0.1s" }}
          >
            UNLEASH YOUR
            <br />
            <span className="text-gradient-red">MACHINE'S</span>
            <br />
            TRUE POTENTIAL
          </h1>

          <p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-6 md:mb-8 animate-slide-up" 
            style={{ animationDelay: "0.2s" }}
          >
            Premium aesthetic and performance upgrades for luxury and sports vehicles.
            Transform your ride with world-class imported parts.
          </p>

          <div 
            className="flex flex-wrap gap-3 md:gap-4 animate-slide-up" 
            style={{ animationDelay: "0.3s" }}
          >
            <Button size="lg" className="btn-primary text-sm sm:text-base px-6 sm:px-8">
              Shop Now <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </div>

          {/* Stats */}
          <div 
            style={{ animationDelay: "0.4s" }} 
            className="flex mt-10 md:mt-16 animate-slide-up gap-6 sm:gap-8 md:gap-12"
          >
            <div>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary">100+</p>
              <p className="text-muted-foreground text-xs sm:text-sm">Products</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">10+</p>
              <p className="text-muted-foreground text-xs sm:text-sm">Brands</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">200+</p>
              <p className="text-muted-foreground text-xs sm:text-sm">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
