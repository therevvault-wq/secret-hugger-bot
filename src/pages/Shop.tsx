import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RotatingLogo } from "@/components/RotatingLogo";
import { ProductGrid } from "@/components/ProductGrid";

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container-rev mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            OUR <span className="text-primary">PRODUCTS</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Premium aesthetic and performance upgrades for your vehicle. All parts are imported and guaranteed authentic.
          </p>
        </section>

        <section className="container-rev">
          <ProductGrid />
        </section>
      </main>
      <Footer />
      <RotatingLogo />
    </div>
  );
};

export default Shop;
