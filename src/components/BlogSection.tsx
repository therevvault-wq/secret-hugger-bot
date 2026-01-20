import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  featured_image_url: string;
  slug: string;
}

export const BlogSection = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from("blogs")
          .select("id, title, excerpt, featured_image_url, slug")
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(3);

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="section-padding bg-secondary/20">
        <div className="container-rev flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-secondary/20">
      <div className="container-rev">
        <div className="text-center mb-12">
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Knowledge Hub
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mt-2">
            FUEL YOUR <span className="text-primary">PASSION</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Expert guides, build tips, and automotive insights to help you make the best choices for your machine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.featured_image_url}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
                <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2">
                  {blog.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link to="/blog" className="group">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
