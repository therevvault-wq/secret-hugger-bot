import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";

export const HeroSection = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Video Loading Skeleton */}
      {!videoLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background animate-pulse" />
      )}

      {/* Background Video - Desktop */}
      <div className="absolute inset-0 hidden md:block">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      {/* Background Video - Mobile */}
      <div className="absolute inset-0 block md:hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
        >
          {/* TODO: Replace with mobile-specific vertical video if available */}
          <source src={heroVideo} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent md:from-background md:via-background/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />

      {/* Content */}
      <div className="w-full relative z-10 pt-24 md:pt-20 px-4 sm:px-8 lg:pl-20 xl:pl-32">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground leading-tight tracking-wide mb-6 md:mb-8"
          >
            UNLEASH YOUR
            <br />
            <span className="text-gradient-red">MACHINE'S</span>
            <br />
            TRUE POTENTIAL
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-6 md:mb-8"
          >
            Premium aesthetic and performance upgrades for luxury and sports vehicles.
            Transform your ride with world-class imported parts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-3 md:gap-4"
          >
            <Button size="lg" className="btn-primary text-sm sm:text-base px-6 sm:px-8 group">
              Shop Now
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex mt-10 md:mt-16 gap-6 sm:gap-8 md:gap-12"
          >
            {[
              { value: "100+", label: "Products", highlight: true },
              { value: "10+", label: "Brands", highlight: false },
              { value: "200+", label: "Happy Customers", highlight: false },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
              >
                <p className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl ${stat.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
