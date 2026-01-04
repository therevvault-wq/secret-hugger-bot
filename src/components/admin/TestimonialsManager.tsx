import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

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
      const { error } = await supabase.from('testimonials').delete().eq('id', id);

      if (error) throw error;

      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (error: any) {
      toast.error('Failed to delete testimonial');
    } finally {
      setActionLoading(null);
    }
  };

  const pendingCount = testimonials.filter((t) => !t.is_approved).length;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-display text-foreground">Reviews</h2>
          {pendingCount > 0 && (
            <Badge variant="destructive">{pendingCount} pending</Badge>
          )}
        </div>
      </div>

      {testimonials.length === 0 ? (
        <div className="text-center py-12 bg-card border border-border rounded-xl">
          <p className="text-muted-foreground">No testimonials yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`bg-card border rounded-xl p-6 ${
                !testimonial.is_approved
                  ? 'border-yellow-500/50 bg-yellow-500/5'
                  : 'border-border'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">
                      {testimonial.author_name}
                    </h3>
                    <Badge
                      variant={testimonial.is_approved ? 'default' : 'secondary'}
                    >
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
  );
}
