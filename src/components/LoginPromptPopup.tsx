import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Chrome, X } from 'lucide-react';
import { toast } from 'sonner';

export const LoginPromptPopup = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Don't show if user is already logged in
    if (user) return;

    // Check if user has dismissed this before
    const dismissed = localStorage.getItem('loginPromptDismissed');
    if (dismissed) return;

    // Show popup after 1 minute
    const timer = setTimeout(() => {
      setOpen(true);
    }, 60000); // 60 seconds = 1 minute

    return () => clearTimeout(timer);
  }, [user]);

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      
      if (error) {
        toast.error(error.message);
      }
    } catch (error: any) {
      toast.error('Failed to sign in with Google');
    }
  };

  const handleDismiss = () => {
    setOpen(false);
    localStorage.setItem('loginPromptDismissed', 'true');
  };

  const handlePhoneLogin = () => {
    setOpen(false);
    navigate('/auth');
  };

  if (user) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={handleDismiss}
        >
          <X className="w-4 h-4" />
        </Button>
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            Join TheRevVault!
          </DialogTitle>
          <DialogDescription>
            Sign in to unlock exclusive features, save your vehicles, and get personalized recommendations.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 mt-4">
          <Button
            className="w-full btn-primary"
            size="lg"
            onClick={handleGoogleLogin}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          
          <Button
            className="w-full"
            variant="outline"
            size="lg"
            onClick={handlePhoneLogin}
          >
            Sign in with Phone
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
