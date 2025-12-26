import { Link } from "react-router-dom";
import { Paintbrush, Gauge, Car, Wind, Sparkles } from "lucide-react";

const categories = [
  {
    name: "Body Kits",
    icon: Car,
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=400&h=300&fit=crop",
  },
  {
    name: "Exhaust Tips",
    icon: Wind,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    name: "Spoilers",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
  },
  {
    name: "Turbo Kits",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=400&h=300&fit=crop",
  },
  {
    name: "Custom Paint",
    icon: Paintbrush,
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=300&fit=crop",
  },
];

export const ShopByCategories = () => {
  return (
    <section className="section-padding">
      <div className="container-rev">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Browse
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-2">
            SHOP BY <span className="text-primary">CATEGORY</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/shop?category=${encodeURIComponent(category.name)}`}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <category.icon className="w-10 h-10 text-primary mb-2 transition-transform group-hover:scale-110" />
                <span className="font-display text-lg text-foreground text-center">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
