import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Rahul Sharma",
    car: "BMW M4 Competition",
    location: "Mumbai",
    rating: 5,
    text: "TheRevVault transformed my M4 completely. The Vorsteiner kit and Akrapovič exhaust combination is absolutely insane. Top-notch service and genuine parts!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Arjun Menon",
    car: "Mercedes AMG GT",
    location: "Bangalore",
    rating: 5,
    text: "Best place for premium car parts in India. Got my full carbon fiber aero kit installed perfectly. The team really knows their stuff!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Vikram Singh",
    car: "Porsche 911 GT3",
    location: "Delhi",
    rating: 5,
    text: "Imported the KW suspension setup through TheRevVault. Fitment was perfect and the difference in handling is night and day. Highly recommended!",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  },
  {
    name: "Karthik Reddy",
    car: "Audi RS6 Avant",
    location: "Hyderabad",
    rating: 5,
    text: "From exhaust to wheels, everything I got from TheRevVault has been exceptional quality. They're the real deal for performance enthusiasts.",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
      <div className="container-rev">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Customer Reviews
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-2">
            WHAT THEY <span className="text-primary">SAY</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
              <Quote className="w-12 h-12 text-primary/30 mb-6" />

              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                "{testimonials[current].text}"
              </p>

              <div className="flex items-center gap-4">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary"
                />
                <div>
                  <p className="font-semibold text-foreground">{testimonials[current].name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[current].car} • {testimonials[current].location}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prev}
                className="rounded-full border-border hover:border-primary hover:text-primary"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-primary w-6" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={next}
                className="rounded-full border-border hover:border-primary hover:text-primary"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
