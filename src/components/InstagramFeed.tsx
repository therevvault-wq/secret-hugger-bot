import { Instagram } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const instagramPosts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    alt: "Custom exhaust system"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop",
    alt: "Performance wheels"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=400&fit=crop",
    alt: "Sports car detail"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=400&fit=crop",
    alt: "Modified vehicle"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=400&h=400&fit=crop",
    alt: "Car interior upgrade"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=400&h=400&fit=crop",
    alt: "Performance parts"
  },
];

export const InstagramFeed = () => {
  const instagramUrl = "https://www.instagram.com/therevvault";

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <a 
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 mb-10 group"
        >
          <Instagram className="w-7 h-7 text-primary group-hover:scale-110 transition-transform" />
          <h2 className="font-display text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
            Follow us @therevvault
          </h2>
        </a>

        {/* Instagram Carousel */}
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {instagramPosts.map((post) => (
              <CarouselItem key={post.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square overflow-hidden rounded-lg group relative"
                >
                  <img
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-rev-dark border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-4 bg-rev-dark border-primary/30 text-foreground hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
};
