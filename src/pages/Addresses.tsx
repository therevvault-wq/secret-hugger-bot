import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function Addresses() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addresses] = useState<any[]>([]);

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view your addresses');
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container-rev pt-32 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                Saved Addresses
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your delivery addresses
              </p>
            </div>
            <Button className="btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              Add Address
            </Button>
          </div>

          {addresses.length === 0 ? (
            <Card className="border-border">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <MapPin className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No saved addresses</h3>
                <p className="text-muted-foreground text-center mb-6">
                  Add a delivery address to make checkout faster
                </p>
                <Button className="btn-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Address
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Address cards will be rendered here */}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
