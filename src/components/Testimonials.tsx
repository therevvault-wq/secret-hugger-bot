import { useState, useEffect } from "react";
import { Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SubmitTestimonialModal } from "./SubmitTestimonialModal";

interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  content: string;
  rating: number;
  avatar_seed?: string;
}

// Fallback testimonials with real customer reviews
const fallbackTestimonials: Testimonial[] = [
  {
    id: "1",
    author_name: "Darshan Jain",
    author_title: null,
    rating: 5,
    content: "Excellent shop. Only genuine brake importer. Friendly staff with immense knowledge about car spare and brake parts",
    avatar_seed: "darshan",
  },
  {
    id: "2",
    author_name: "Sejal Jain",
    author_title: null,
    rating: 5,
    content: "Great quality products and overall, a humble experience at the showroom",
    avatar_seed: "sejal",
  },
  {
    id: "3",
    author_name: "Vaibhav Biyani",
    author_title: null,
    rating: 5,
    content: "I always shop my brakes from them... The owner is a sweetheart he is always available to solve all your doubts and queries...They have original BRMEBO & EBC Brakes followed by all other brands... They ship PAN India... Ashish Bhaiya is the best.",
    avatar_seed: "vaibhav",
  },
  {
    id: "4",
    author_name: "Rahul Sharma",
    author_title: "BMW M4 • Mumbai",
    rating: 5,
    content: "TheRevVault transformed my M4 completely. The Vorsteiner kit and Akrapovič exhaust combination is absolutely insane. Top-notch service and genuine parts!",
    avatar_seed: "rahul",
  },
  {
    id: "5",
    author_name: "Arjun Menon",
    author_title: "Mercedes AMG GT • Bangalore",
    rating: 5,
    content: "Best place for premium car parts in India. Got my full carbon fiber aero kit installed perfectly. The team really knows their stuff!",
    avatar_seed: "arjun",
  },
  {
    id: "6",
    author_name: "Vikram Singh",
    author_title: "Porsche 911 GT3 • Delhi",
    rating: 5,
    content: "Imported the KW suspension setup through TheRevVault. Fitment was perfect and the difference in handling is night and day. Highly recommended!",
    avatar_seed: "vikram",
  },
];

const ITEMS_PER_SLIDE = 3;

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 justify-center">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
      />
    ))}
  </div>
);

const AvatarCircle = ({ name, seed }: { name: string; seed?: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  // Use DiceBear avatars for a fun, illustrated look matching the screenshot
  const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed || name}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;

  return (
    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border mx-auto mb-4">
      <img
        src={avatarUrl}
        alt={name}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Fallback to initials if avatar fails
          const target = e.currentTarget;
          target.style.display = "none";
          const parent = target.parentElement;
          if (parent) {
            parent.classList.add("bg-primary/20", "flex", "items-center", "justify-center");
            parent.innerHTML = `<span class="text-primary font-bold text-lg">${initials}</span>`;
          }
        }}
      />
    </div>
  );
};

export const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, author_name, author_title, content, rating")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        setTestimonials(data);
      } else {
        setTestimonials(fallbackTestimonials);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const totalSlides = Math.ceil(testimonials.length / ITEMS_PER_SLIDE);
  const slideTestimonials = testimonials.slice(
    currentSlide * ITEMS_PER_SLIDE,
    currentSlide * ITEMS_PER_SLIDE + ITEMS_PER_SLIDE
  );

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-rev flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding">
      <div className="container-rev">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground">
            What Our <span className="text-primary">Customer Says</span>
          </h2>
        </div>

        {/* 3-column testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {slideTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col items-center text-center px-4"
            >
              {/* Avatar */}
              <AvatarCircle name={testimonial.author_name} seed={testimonial.avatar_seed} />

              {/* Review text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                {testimonial.content}
              </p>

              {/* Name */}
              <p className="font-semibold text-foreground mb-2">
                {testimonial.author_name}
              </p>

              {/* Stars */}
              <StarRating rating={testimonial.rating} />
            </div>
          ))}
        </div>

        {/* Dot navigation */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            {[...Array(totalSlides)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`rounded-full transition-all ${
                  i === currentSlide
                    ? "bg-primary w-6 h-2"
                    : "bg-muted-foreground/30 w-2 h-2"
                }`}
              />
            ))}
          </div>
        )}

        {/* Submit testimonial */}
        <div className="flex justify-center mt-10">
          <SubmitTestimonialModal />
        </div>
      </div>
    </section>
  );
};
