import { Instagram } from "lucide-react";

// To set up SnapWidget:
// 1. Go to https://snapwidget.com and create a free account
// 2. Connect your Instagram account
// 3. Create a widget and copy the embed code
// 4. Replace the SNAPWIDGET_ID below with your widget ID from the embed code

const SNAPWIDGET_ID = ""; // Paste your SnapWidget ID here (e.g., "1234567")

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

        {/* SnapWidget Instagram Feed */}
        {SNAPWIDGET_ID ? (
          <div className="w-full">
            <iframe
              src={`https://snapwidget.com/embed/${SNAPWIDGET_ID}`}
              className="w-full border-0"
              style={{ minHeight: '300px' }}
              allowTransparency={true}
              title="Instagram Feed"
              loading="lazy"
            />
          </div>
        ) : (
          <div className="text-center py-12 bg-card/50 border border-border rounded-xl">
            <Instagram className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">Instagram feed not configured</p>
            <p className="text-sm text-muted-foreground">
              Add your SnapWidget ID in the InstagramFeed component
            </p>
            <a 
              href="https://snapwidget.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm mt-2 inline-block"
            >
              Get your free widget at snapwidget.com →
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
