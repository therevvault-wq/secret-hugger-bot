import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RotatingLogo } from "@/components/RotatingLogo";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition, SectionReveal } from "@/components/PageTransition";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  created_at: string;
  category?: string; // Optional if not yet in DB schema
}

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogs(data || []);
    } catch (error: any) {
      toast.error('Failed to load blogs');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen onLoadingComplete={() => { }} minDuration={500} />

      <PageTransition className={isLoading ? 'pointer-events-none' : ''}>
        <Navbar />
        <main className="pt-32 pb-20">
          {/* Hero Section */}
          <SectionReveal>
            <section className="container-rev mb-16 text-center md:text-left">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                THE<span className="text-primary">REV</span>VAULT BLOG
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto md:mx-0">
                Stay updated with the latest trends, tips, and guides for upgrading your vehicle.
              </p>
            </section>
          </SectionReveal>

          {isLoading ? (
            <div className="flex justify-center py-20">
              {/* Loading handled by LoadingScreen mostly, but fallback just in case */}
            </div>
          ) : blogs.length === 0 ? (
            <SectionReveal>
              <div className="container-rev text-center py-20">
                <BookOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No active blog posts</h3>
                <p className="text-muted-foreground">Check back soon for new articles!</p>
              </div>
            </SectionReveal>
          ) : (
            <>
              {/* Featured Post (First Item) */}
              {blogs.length > 0 && (
                <SectionReveal delay={0.1}>
                  <section className="container-rev mb-16">
                    <Link to={`/blog/${blogs[0].slug || blogs[0].id}`} className="block relative rounded-2xl overflow-hidden group">
                      <div className="w-full h-[400px] md:h-[500px] bg-secondary/30 relative">
                        {blogs[0].featured_image_url ? (
                          <img
                            src={blogs[0].featured_image_url}
                            alt={blogs[0].title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <BookOpen className="w-20 h-20 text-muted-foreground/30" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full mb-4">
                            Featured
                          </span>
                          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-3 group-hover:text-primary transition-colors">
                            {blogs[0].title}
                          </h2>
                          <p className="text-muted-foreground mb-4 max-w-2xl line-clamp-2">
                            {blogs[0].excerpt || blogs[0].content.substring(0, 150) + "..."}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" /> {formatDate(blogs[0].created_at)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </section>
                </SectionReveal>
              )}

              {/* Blog Grid (Remaining Items) */}
              {blogs.length > 1 && (
                <SectionReveal delay={0.2}>
                  <section className="container-rev">
                    <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                      LATEST ARTICLES
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {blogs.slice(1).map((post) => (
                        <Link
                          key={post.id}
                          to={`/blog/${post.slug || post.id}`}
                          className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors block"
                        >
                          <div className="relative overflow-hidden h-48 bg-secondary/30">
                            {post.featured_image_url ? (
                              <img
                                src={post.featured_image_url}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <BookOpen className="w-12 h-12 text-muted-foreground/30" />
                              </div>
                            )}
                          </div>
                          <div className="p-5">
                            <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {post.title}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                              {post.excerpt || post.content.substring(0, 100) + "..."}
                            </p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> {formatDate(post.created_at)}
                              </span>
                              <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                                Read More <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                </SectionReveal>
              )}
            </>
          )}
        </main>
        <Footer />
        <RotatingLogo />
      </PageTransition>
    </div>
  );
};

export default Blog;
