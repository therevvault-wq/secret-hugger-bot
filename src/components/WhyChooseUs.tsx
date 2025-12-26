import { Award, BadgeCheck, Puzzle, Truck, Percent } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Find Top Brands",
  },
  {
    icon: BadgeCheck,
    title: "Genuine Products Guaranteed",
  },
  {
    icon: Puzzle,
    title: "Easy Compatibility Check",
  },
  {
    icon: Truck,
    title: "Fast & Free Delivery",
  },
  {
    icon: Percent,
    title: "Discount Deals",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-secondary/30">
      <div className="container-rev">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center max-w-[140px]"
            >
              <div className="w-16 h-16 flex items-center justify-center mb-3">
                <feature.icon className="w-12 h-12 text-muted-foreground stroke-[1.5]" />
              </div>
              <span className="text-sm font-medium text-muted-foreground leading-tight">
                {feature.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
