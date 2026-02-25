import { Instagram, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface InstagramPost {
  id: string;
  post_url: string;
  thumbnail_url: string;
  caption: string | null;
}

export const InstagramFeed = () => {
  const instagramUrl = "https://www.instagram.com/therevvault";
  const [posts, setPosts] = useState<InstagramPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from('instagram_posts')
        .select('*')
        .order('sort_order', { ascending: true }) // Or created_at
        .order('created_at', { ascending: false })
        .limit(10);

      if (data) {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container-rev">
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
            {posts.map((post, index) => (
              <CarouselItem key={post.id || index} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/5">
                <a
                  href={post.post_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block aspect-square overflow-hidden rounded-lg group relative"
                >
                  <img
                    src={post.thumbnail_url}
                    alt={post.caption || `Instagram post ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-4 bg-card border-border text-foreground hover:bg-primary hover:text-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
};
