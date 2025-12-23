import { Shield, Truck, Award, Headphones } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "100% Authentic",
    description: "All products are sourced directly from authorized dealers worldwide",
  },
  {
    icon: Truck,
    title: "Pan-India Delivery",
    description: "Fast and secure shipping to all major cities across India",
  },
  {
    icon: Award,
    title: "Expert Installation",
    description: "Professional fitment services at partner workshops nationwide",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Expert consultation for choosing the right parts for your build",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="section-padding">
      <div className="container-rev">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Our Promise
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-2">
            WHY <span className="text-primary">THEREVVAULT</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group p-6 bg-card border border-border rounded-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
