import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isAdminLoading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(false);

  const checkAdminRole = async (userId: string) => {
    try {
      setIsAdminLoading(true);
      console.log('Checking admin role for user:', userId);
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .maybeSingle();

      if (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
        return;
      }

      if (data) {
        console.log('User is admin');
        setIsAdmin(true);
      } else {
        console.log('User is not admin');
        setIsAdmin(false);
      }
    } catch (e) {
      console.error('Exception in checkAdminRole:', e);
      setIsAdmin(false);
    } finally {
      setIsAdminLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener - this handles all auth events including OAuth callbacks
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth state change event:', event);
        console.log('Session user email:', session?.user?.email);

        // Update state synchronously first
        setSession(session);
        setUser(session?.user ?? null);

        // Then handle async operations
        if (session?.user && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' || event === 'INITIAL_SESSION')) {
          // Use setTimeout to avoid potential Supabase auth deadlock
          setTimeout(() => {
            if (mounted) {
              checkAdminRole(session.user.id);
            }
          }, 0);
        }

        if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
        }

        // Set loading false after any auth event
        setLoading(false);
      }
    );

    // Also check for existing session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session) {
        console.log('Found existing session for:', session.user?.email);
        setSession(session);
        setUser(session.user);
        checkAdminRole(session.user.id);
      }
      if (mounted) {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, isAdminLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
