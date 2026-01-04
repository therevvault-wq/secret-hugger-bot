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

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* 1. Hero Banner/Video */}
        <HeroSection />
        
        {/* 2. Search Filter */}
        <VehicleSelector />
        
        {/* 3. Brands Scrolling */}
        <BrandCarousel />
        
        {/* 4. Shop by Categories */}
        <ShopByCategories />
        
        {/* 5. Blogs - "Fuel Your Passion" */}
        <BlogSection />
        
        {/* 6. Why Us (no heading) */}
        <WhyChooseUs />
        
        {/* 7. Exclusive Offers/Sales */}
        <OffersSection />
        
        {/* 8. How can we assist you today (Contact Us) */}
        <ContactSection />
        
        {/* 9. Testimonials */}
        <Testimonials />
        
        {/* 10. Instagram Feed */}
        <InstagramFeed />
      </main>
      <Footer />
      <RotatingLogo />
      <ScrollToTop />
      
      {/* Popups */}
      <LoginPromptPopup />
      <GaragePromptPopup />
    </div>
  );
};

export default Index;
