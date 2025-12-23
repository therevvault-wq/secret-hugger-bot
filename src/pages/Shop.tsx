import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RotatingLogo } from "@/components/RotatingLogo";
import { ProductGrid } from "@/components/ProductGrid";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <section className="container-rev mb-12">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {category ? (
              <>
                <span className="text-primary">{category}</span>
              </>
            ) : (
              <>OUR <span className="text-primary">PRODUCTS</span></>
            )}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Premium aesthetic and performance upgrades for your vehicle. All parts are imported and guaranteed authentic.
          </p>
          
          {category && (
            <Link to="/shop">
              <Button variant="outline" size="sm" className="mt-4">
                <X className="w-4 h-4 mr-2" />
                Clear filter
              </Button>
            </Link>
          )}
        </section>

        <section className="container-rev">
          <ProductGrid category={category} />
        </section>
      </main>
      <Footer />
      <RotatingLogo />
    </div>
  );
};

export default Shop;
