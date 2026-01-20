import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Offer {
  id: string;
  title: string;
  subtitle: string | null;
  image_url: string;
  link: string | null;
}

export const OffersSection = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const { data, error } = await supabase
          .from("offers")
          .select("id, title, subtitle, image_url, link")
          .eq("is_active", true)
          .order("sort_order", { ascending: true });

        if (error) throw error;
        setOffers(data || []);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-secondary/30">
        <div className="container-rev flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (offers.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-secondary/30">
      <div className="container-rev">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
            Ongoing <span className="text-primary">Offers</span>
          </h2>
          <p className="text-muted-foreground">Don't miss out on our exclusive deals</p>
        </div>

        <div className={`grid gap-6 ${offers.length === 1 ? 'md:grid-cols-1 max-w-2xl mx-auto' : 'md:grid-cols-2'}`}>
          {offers.map((offer) => (
            offer.link ? (
              <Link
                key={offer.id}
                to={offer.link}
                className="group relative overflow-hidden rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-[16/9] relative">
                  <img
                    src={offer.image_url}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-end justify-center p-6">
                    <div className="text-center">
                      {offer.subtitle && (
                        <span className="text-primary font-bold text-sm uppercase tracking-wider">
                          {offer.subtitle}
                        </span>
                      )}
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1">
                        {offer.title}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>
            ) : (
              <div
                key={offer.id}
                className="group relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 cursor-default"
              >
                <div className="aspect-[16/9] relative">
                  <img
                    src={offer.image_url}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 flex items-end justify-center p-6">
                    <div className="text-center">
                      {offer.subtitle && (
                        <span className="text-primary font-bold text-sm uppercase tracking-wider">
                          {offer.subtitle}
                        </span>
                      )}
                      <h3 className="text-xl md:text-2xl font-display font-bold text-white mt-1">
                        {offer.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};
