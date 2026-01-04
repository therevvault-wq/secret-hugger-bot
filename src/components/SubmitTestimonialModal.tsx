import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Star, Loader2, PenLine } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const SubmitTestimonialModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [authorTitle, setAuthorTitle] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please sign in to submit a testimonial');
      navigate('/auth');
      return;
    }
    
    if (!authorName.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setLoading(true);
    
    try {
      const { error } = await supabase.from('testimonials').insert({
        user_id: user.id,
        author_name: authorName.trim(),
        author_title: authorTitle.trim() || null,
        content: content.trim(),
        rating,
      });
      
      if (error) throw error;
      
      toast.success('Thank you for your time!', {
        description: 'Testimonial submitted successfully. It will appear on the site once approved.',
      });
      
      // Reset form
      setAuthorName('');
      setAuthorTitle('');
      setContent('');
      setRating(5);
      setOpen(false);
    } catch (error: any) {
      toast.error('Failed to submit testimonial', {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (isOpen && !user) {
      toast.error('Please sign in to submit a testimonial');
      navigate('/auth');
      return;
    }
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="btn-primary">
          <PenLine className="w-4 h-4 mr-2" />
          Write a Review
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Share Your Experience</DialogTitle>
          <DialogDescription>
            Tell us about your experience with TheRevVault. Your testimonial will be reviewed before publishing.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="authorName">Your Name *</Label>
            <Input
              id="authorName"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="John Doe"
              className="bg-secondary/50"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="authorTitle">Your Car / Title</Label>
            <Input
              id="authorTitle"
              value={authorTitle}
              onChange={(e) => setAuthorTitle(e.target.value)}
              placeholder="BMW M4 Owner, Mumbai"
              className="bg-secondary/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Your Review *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your experience with our products and service..."
              className="bg-secondary/50 min-h-[120px]"
              required
            />
          </div>
          
          <Button type="submit" className="w-full btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Review'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
