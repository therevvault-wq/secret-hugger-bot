const brands = [
  { name: "Vorsteiner", logo: "https://www.vorsteiner.com/cdn/shop/files/vrt-logo-light_410x.png" },
  { name: "Akrapovič", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Akrapovic_logo.svg/512px-Akrapovic_logo.svg.png" },
  { name: "BBS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/BBS_logo.svg/512px-BBS_logo.svg.png" },
  { name: "HKS", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/HKS_logo.svg/512px-HKS_logo.svg.png" },
  { name: "Brembo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Brembo_logo.svg/512px-Brembo_logo.svg.png" },
  { name: "KW Suspension", logo: "https://www.kwsuspensions.net/media/kw-logo.svg" },
  { name: "Eventuri", logo: "https://eventuri.net/wp-content/uploads/2023/02/eventuri-logo-white.png" },
  { name: "Armytrix", logo: "https://armytrix.com/cdn/shop/files/logo_white.png" },
  { name: "iPE", logo: "https://www.ipe-exhaust.com/img/logo.png" },
  { name: "Capristo", logo: "https://capristo.de/wp-content/uploads/2022/01/capristo-logo-white.png" },
];

export const BrandCarousel = () => {
  return (
    <section className="py-16 bg-secondary/30 overflow-hidden">
      <div className="container-rev mb-8">
        <p className="text-center text-muted-foreground uppercase tracking-widest text-sm">
          Brands We Deal In
        </p>
      </div>

      <div className="relative">
        {/* Marquee Row */}
        <div className="flex gap-16 animate-marquee">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center px-8 py-6 bg-card/50 border border-border/50 rounded-lg min-w-[180px] h-[80px] hover:border-primary/50 transition-colors"
            >
              <img 
                src={brand.logo} 
                alt={brand.name}
                className="max-h-10 max-w-[140px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <span className="hidden font-display text-xl text-muted-foreground hover:text-foreground transition-colors">
                {brand.name.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
