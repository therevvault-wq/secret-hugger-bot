import { Instagram } from "lucide-react";
import { useEffect } from "react";

const instagramPosts = [
  "https://www.instagram.com/p/DSjzgwyiTr5/",
  "https://www.instagram.com/p/DSh5lgkia4d/",
  "https://www.instagram.com/p/DSSf6ozEbm4/",
  "https://www.instagram.com/p/DSQFct6Eg-j/",
  "https://www.instagram.com/p/DRgcf5HCfZ1/",
];

export const InstagramFeed = () => {
  const instagramUrl = "https://www.instagram.com/therevvault";

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    // Process embeds when script loads
    script.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

        {/* Instagram Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {instagramPosts.map((postUrl, index) => (
            <div key={index} className="flex justify-center">
              <blockquote
                className="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink={postUrl}
                data-instgrm-version="14"
                style={{
                  background: "#0a0a0a",
                  border: "1px solid #262626",
                  borderRadius: "12px",
                  maxWidth: "100%",
                  minWidth: "280px",
                  width: "100%",
                }}
              >
                <a href={postUrl} target="_blank" rel="noopener noreferrer" />
              </blockquote>
            </div>
          ))}
        </div>

        {/* Follow CTA */}
        <div className="text-center mt-10">
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-medium rounded-full hover:scale-105 transition-transform"
          >
            <Instagram className="w-5 h-5" />
            Follow @therevvault
          </a>
        </div>
      </div>
    </section>
  );
};
