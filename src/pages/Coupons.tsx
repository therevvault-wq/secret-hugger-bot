import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Gift, Percent } from 'lucide-react';
import { toast } from 'sonner';

export default function Coupons() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [coupons] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view your coupons');
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container-rev pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl mb-4">
              Gifts & Coupons
            </h1>
            <p className="text-muted-foreground text-lg">
              View and manage your available offers
            </p>
          </div>

          {coupons.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Gift className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No coupons available</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Check back later for exclusive offers and discounts
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Coupon cards will be rendered here */}
              <Card className="border-border hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <Percent className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Sample Coupon</CardTitle>
                        <CardDescription>Get 10% off on your next purchase</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <code className="text-sm font-mono bg-secondary px-3 py-1 rounded">
                      WELCOME10
                    </code>
                    <Button variant="outline" size="sm">
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
