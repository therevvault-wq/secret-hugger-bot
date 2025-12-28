import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { SubmitTestimonialModal } from "./SubmitTestimonialModal";

interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  content: string;
  rating: number;
}

// Fallback testimonials for when database is empty
const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    author_name: "Rahul Sharma",
    author_title: "BMW M4 Competition • Mumbai",
    rating: 5,
    content: "TheRevVault transformed my M4 completely. The Vorsteiner kit and Akrapovič exhaust combination is absolutely insane. Top-notch service and genuine parts!",
  },
  {
    id: "2",
    author_name: "Arjun Menon",
    author_title: "Mercedes AMG GT • Bangalore",
    rating: 5,
    content: "Best place for premium car parts in India. Got my full carbon fiber aero kit installed perfectly. The team really knows their stuff!",
  },
  {
    id: "3",
    author_name: "Vikram Singh",
    author_title: "Porsche 911 GT3 • Delhi",
    rating: 5,
    content: "Imported the KW suspension setup through TheRevVault. Fitment was perfect and the difference in handling is night and day. Highly recommended!",
  },
];

export const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('id, author_name, author_title, content, rating')
        .eq('is_approved', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(fallbackTestimonials);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  if (loading) {
    return (
      <section className="section-padding bg-gradient-to-b from-secondary/20 to-background">
        <div className="container-rev flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

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
                {[...Array(testimonials[current]?.rating || 5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg md:text-xl text-foreground mb-8 leading-relaxed">
                "{testimonials[current]?.content}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  {testimonials[current]?.author_name?.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonials[current]?.author_name}</p>
                  {testimonials[current]?.author_title && (
                    <p className="text-sm text-muted-foreground">
                      {testimonials[current].author_title}
                    </p>
                  )}
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

            {/* Submit testimonial button */}
            <div className="flex justify-center mt-8">
              <SubmitTestimonialModal />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
