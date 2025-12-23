import { Link } from "react-router-dom";

export const OffersSection = () => {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-rev">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Ongoing <span className="text-primary">Offers</span>
          </h2>
          <p className="text-muted-foreground">Don't miss out on our exclusive deals</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Offer 1 */}
          <Link to="/shop" className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
            <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 to-rev-dark flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-primary font-bold text-lg">LIMITED TIME</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
                  20% OFF CARBON FIBER PARTS
                </h3>
                <p className="text-muted-foreground mt-2">Premium carbon fiber upgrades for your build</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          {/* Offer 2 */}
          <Link to="/shop" className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300">
            <div className="aspect-[16/9] bg-gradient-to-br from-rev-dark to-primary/20 flex items-center justify-center">
              <div className="text-center p-8">
                <span className="text-primary font-bold text-lg">NEW ARRIVAL</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mt-2">
                  AKRAPOVIČ EXHAUST SYSTEMS
                </h3>
                <p className="text-muted-foreground mt-2">Now available for all major brands</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
};
