const brands = [
  { name: "Borla", logo: "/brands/borla.png" },
  { name: "Eibach", logo: "/brands/eibach.png" },
  { name: "EBC", logo: "/brands/ebc.png" },
  { name: "BMC", logo: "/brands/bmc.jpg" },
  { name: "HEL", logo: "/brands/hel.jpg" },
  { name: "Brembo", logo: "/brands/brembo.png" },
  { name: "Brisk", logo: "/brands/brisk.jpg" },
  { name: "Liqui Moly", logo: "/brands/liqui-moly.png" },
  { name: "Pagid Racing", logo: "/brands/pagid.png" },
  { name: "DBA", logo: "/brands/dba.png" },
  { name: "Motul", logo: "/brands/motul.png" },
  { name: "Bilstein", logo: "/brands/bilstein.png" },
  { name: "KW", logo: "/brands/kw.png" },
  { name: "Akrapovic", logo: "/brands/akrapovic.jpg" },
  { name: "Forge", logo: "/brands/forge.jpg" },
  { name: "MAXSPEED", logo: "/brands/maxspeed.jpg" },
];

export const BrandCarousel = () => {
  return (
    <section className="py-16 bg-secondary/30 overflow-hidden">
      <div className="container-rev mb-8">
        <p className="text-center text-muted-foreground uppercase tracking-widest text-sm">
          Brands We Deal In
        </p>
      </div>

      <div className="relative overflow-hidden">
        {/* Marquee Container - infinite seamless loop */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {/* First set of brands */}
          {brands.map((brand, i) => (
            <div
              key={`first-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-8 py-6 mx-4 bg-white border border-border/50 rounded-lg min-w-[180px] h-[100px] hover:border-primary/50 transition-colors group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-14 object-contain transition-all duration-300 transform group-hover:scale-110"
              />
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {brands.map((brand, i) => (
            <div
              key={`second-${i}`}
              className="flex-shrink-0 flex items-center justify-center px-8 py-6 mx-4 bg-white border border-border/50 rounded-lg min-w-[180px] h-[100px] hover:border-primary/50 transition-colors group"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-14 object-contain transition-all duration-300 transform group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </section>
  );
};
