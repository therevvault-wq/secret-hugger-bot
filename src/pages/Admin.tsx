import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, FileText, Gift, MessageSquare, LayoutDashboard, Package, Instagram } from 'lucide-react';
import BlogManager from '@/components/admin/BlogManager';
import OffersManager from '@/components/admin/OffersManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import ProductsManager from '@/components/admin/ProductsManager';
import InstagramManager from '@/components/admin/InstagramManager';

export default function Admin() {
  const [pendingReviews, setPendingReviews] = useState(0);
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        navigate('/');
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchPendingCount();
    }
  }, [isAdmin]);

  const fetchPendingCount = async () => {
    const { count } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true })
      .eq('is_approved', false);

    setPendingReviews(count || 0);
  };

  if (authLoading || (!isAdmin && user)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-4">
        <div className="container-rev">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <LayoutDashboard className="w-8 h-8 text-primary" />
              <h1 className="font-display text-4xl text-foreground">
                ADMIN <span className="text-primary">PANEL</span>
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage your products, blogs, offers, and customer reviews
            </p>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                <span className="hidden sm:inline">Products</span>
              </TabsTrigger>
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Blogs</span>
              </TabsTrigger>
              <TabsTrigger value="offers" className="flex items-center gap-2">
                <Gift className="w-4 h-4" />
                <span className="hidden sm:inline">Offers</span>
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex items-center gap-2 relative">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Reviews</span>
                {pendingReviews > 0 && (
                  <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {pendingReviews}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="instagram" className="flex items-center gap-2">
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline">Instagram</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <ProductsManager />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogManager />
            </TabsContent>

            <TabsContent value="offers">
              <OffersManager />
            </TabsContent>

            <TabsContent value="reviews">
              <TestimonialsManager />
            </TabsContent>

            <TabsContent value="instagram">
              <InstagramManager />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
