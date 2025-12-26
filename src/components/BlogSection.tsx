import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogs = [
  {
    title: "Top 5 Exhaust Upgrades That Transform Your Ride",
    excerpt: "Discover the best exhaust systems that boost performance and give your car that aggressive sound.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
    readTime: "5 min read",
    slug: "exhaust-upgrades",
  },
  {
    title: "Body Kit Installation: What You Need to Know",
    excerpt: "A complete guide to choosing and installing the perfect body kit for your vehicle.",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop",
    readTime: "7 min read",
    slug: "body-kit-installation",
  },
  {
    title: "Turbo vs Supercharger: Which is Right for You?",
    excerpt: "Breaking down the pros and cons of forced induction systems for your build.",
    image: "https://images.unsplash.com/photo-1619405399517-d7fce0f13302?w=600&h=400&fit=crop",
    readTime: "6 min read",
    slug: "turbo-vs-supercharger",
  },
];

export const BlogSection = () => {
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
              key={blog.slug}
              to={`/blog/${blog.slug}`}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readTime}</span>
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
