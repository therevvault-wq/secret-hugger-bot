import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { toast } from 'sonner';
import { Loader2, Check, X, Star, Trash2 } from 'lucide-react';

interface Testimonial {
  id: string;
  author_name: string;
  author_title: string | null;
  content: string;
  rating: number;
  is_approved: boolean;
  created_at: string;
}

export default function Admin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        toast.error('Access denied. Admin only.');
        navigate('/');
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      fetchTestimonials();
    }
  }, [isAdmin]);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setTestimonials(data || []);
    } catch (error: any) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, approve: boolean) => {
    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('testimonials')
        .update({ is_approved: approve })
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success(approve ? 'Testimonial approved!' : 'Testimonial hidden');
      fetchTestimonials();
    } catch (error: any) {
      toast.error('Failed to update testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    setActionLoading(id);
    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (error: any) {
      toast.error('Failed to delete testimonial');
    } finally {
      setActionLoading(null);
    }
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
      
      <main className="flex-1 py-20 px-4">
        <div className="container-rev">
          <div className="mb-8">
            <h1 className="font-display text-4xl text-foreground">
              ADMIN <span className="text-primary">PANEL</span>
            </h1>
            <p className="text-muted-foreground mt-2">Manage testimonials</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground">No testimonials yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-card border border-border rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-foreground">
                          {testimonial.author_name}
                        </h3>
                        <Badge variant={testimonial.is_approved ? 'default' : 'secondary'}>
                          {testimonial.is_approved ? 'Approved' : 'Pending'}
                        </Badge>
                      </div>
                      
                      {testimonial.author_title && (
                        <p className="text-sm text-muted-foreground mb-2">
                          {testimonial.author_title}
                        </p>
                      )}
                      
                      <div className="flex gap-1 mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      
                      <p className="text-foreground">{testimonial.content}</p>
                      
                      <p className="text-xs text-muted-foreground mt-3">
                        Submitted: {new Date(testimonial.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      {!testimonial.is_approved ? (
                        <Button
                          size="sm"
                          onClick={() => handleApprove(testimonial.id, true)}
                          disabled={actionLoading === testimonial.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {actionLoading === testimonial.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleApprove(testimonial.id, false)}
                          disabled={actionLoading === testimonial.id}
                        >
                          {actionLoading === testimonial.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <X className="w-4 h-4 mr-1" />
                              Hide
                            </>
                          )}
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(testimonial.id)}
                        disabled={actionLoading === testimonial.id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
