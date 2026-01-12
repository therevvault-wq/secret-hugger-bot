import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { VehicleSelector } from "@/components/VehicleSelector";
import { BrandCarousel } from "@/components/BrandCarousel";
import { ShopByCategories } from "@/components/ShopByCategories";
import { BlogSection } from "@/components/BlogSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { OffersSection } from "@/components/OffersSection";
import { ContactSection } from "@/components/ContactSection";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";
import { RotatingLogo } from "@/components/RotatingLogo";
import { ScrollToTop } from "@/components/ScrollToTop";
import { LoginPromptPopup } from "@/components/LoginPromptPopup";
import { GaragePromptPopup } from "@/components/GaragePromptPopup";
import { LoadingScreen } from "@/components/LoadingScreen";
import { PageTransition, SectionReveal } from "@/components/PageTransition";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle OAuth callback
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast.success('Successfully signed in!');
      }
      if (event === 'SIGNED_OUT') {
        toast.info('Signed out');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen onLoadingComplete={() => setIsLoading(false)} minDuration={1500} />
      
      <PageTransition className={isLoading ? 'pointer-events-none' : ''}>
        <Navbar />
        <main>
          {/* 1. Hero Banner/Video */}
          <HeroSection />
          
          {/* 2. Search Filter */}
          <SectionReveal>
            <VehicleSelector />
          </SectionReveal>
          
          {/* 3. Brands Scrolling */}
          <SectionReveal delay={0.1}>
            <BrandCarousel />
          </SectionReveal>
          
          {/* 4. Shop by Categories */}
          <SectionReveal delay={0.1}>
            <ShopByCategories />
          </SectionReveal>
          
          {/* 5. Blogs - "Fuel Your Passion" */}
          <SectionReveal>
            <BlogSection />
          </SectionReveal>
          
          {/* 6. Why Us (no heading) */}
          <SectionReveal>
            <WhyChooseUs />
          </SectionReveal>
          
          {/* 7. Exclusive Offers/Sales */}
          <SectionReveal>
            <OffersSection />
          </SectionReveal>
          
          {/* 8. How can we assist you today (Contact Us) */}
          <SectionReveal>
            <ContactSection />
          </SectionReveal>
          
          {/* 9. Testimonials */}
          <SectionReveal>
            <Testimonials />
          </SectionReveal>
          
          {/* 10. Instagram Feed */}
          <SectionReveal>
            <InstagramFeed />
          </SectionReveal>
        </main>
        <Footer />
        <RotatingLogo />
        <ScrollToTop />
        
        {/* Popups */}
        <LoginPromptPopup />
        <GaragePromptPopup />
      </PageTransition>
    </div>
  );
};

export default Index;
