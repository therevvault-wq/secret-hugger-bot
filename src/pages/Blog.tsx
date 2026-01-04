import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RotatingLogo } from "@/components/RotatingLogo";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition, SectionReveal } from "@/components/PageTransition";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Body Kits for Your Sports Car in 2024",
    excerpt: "Discover the most popular and high-quality body kits that will transform your vehicle's appearance and aerodynamics.",
    image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&auto=format&fit=crop",
    author: "The Rev Vault Team",
    date: "Dec 15, 2024",
    category: "Aesthetics",
  },
  {
    id: 2,
    title: "Performance Exhaust Systems: What You Need to Know",
    excerpt: "A comprehensive guide to choosing the right exhaust system for improved performance and sound.",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&auto=format&fit=crop",
    author: "The Rev Vault Team",
    date: "Dec 10, 2024",
    category: "Performance",
  },
  {
    id: 3,
    title: "Carbon Fiber vs Fiberglass: Which is Right for You?",
    excerpt: "Understanding the differences between these popular materials for aftermarket car parts.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&auto=format&fit=crop",
    author: "The Rev Vault Team",
    date: "Dec 5, 2024",
    category: "Guides",
  },
  {
    id: 4,
    title: "How to Install a Cold Air Intake: Step-by-Step Guide",
    excerpt: "Learn how to boost your engine's performance with a proper cold air intake installation.",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop",
    author: "The Rev Vault Team",
    date: "Nov 28, 2024",
    category: "DIY",
  },
  {
    id: 5,
    title: "The Ultimate Guide to Suspension Upgrades",
    excerpt: "Everything you need to know about lowering springs, coilovers, and air suspension systems.",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&auto=format&fit=crop",
    author: "The Rev Vault Team",
    date: "Nov 20, 2024",
    category: "Performance",
  },
  {
    id: 6,
    title: "Maintaining Your Aftermarket Parts: Pro Tips",
    excerpt: "Keep your upgrades looking and performing their best with these maintenance essentials.",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop",
    author: "The Rev Vault Team",
    date: "Nov 15, 2024",
    category: "Maintenance",
  },
];

const Blog = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} minDuration={1000} />
      
      <PageTransition className={isLoading ? 'pointer-events-none' : ''}>
        <Navbar />
        <main className="pt-28 pb-20">
          {/* Hero Section */}
          <SectionReveal>
            <section className="container-rev mb-16">
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                THE<span className="text-primary">REV</span>VAULT BLOG
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Stay updated with the latest trends, tips, and guides for upgrading your vehicle.
              </p>
            </section>
          </SectionReveal>

          {/* Featured Post */}
          <SectionReveal delay={0.1}>
            <section className="container-rev mb-16">
              <div className="relative rounded-2xl overflow-hidden group">
                <img 
                  src={blogPosts[0].image} 
                  alt={blogPosts[0].title}
                  className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full mb-4">
                    Featured
                  </span>
                  <h2 className="font-display text-2xl md:text-4xl text-foreground mb-3">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-muted-foreground mb-4 max-w-2xl">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" /> {blogPosts[0].author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {blogPosts[0].date}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </SectionReveal>

          {/* Blog Grid */}
          <SectionReveal delay={0.2}>
            <section className="container-rev">
              <h2 className="font-display text-2xl md:text-3xl text-foreground mb-8">
                LATEST ARTICLES
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.slice(1).map((post) => (
                  <article 
                    key={post.id} 
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-colors"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                        {post.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1 text-primary group-hover:gap-2 transition-all">
                          Read More <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </SectionReveal>
        </main>
        <Footer />
        <RotatingLogo />
      </PageTransition>
    </div>
  );
};

export default Blog;
