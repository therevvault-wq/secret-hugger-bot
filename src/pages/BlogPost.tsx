import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { RotatingLogo } from '@/components/RotatingLogo';
import { LoadingScreen } from '@/components/LoadingScreen';
import { PageTransition, SectionReveal } from '@/components/PageTransition';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Calendar, User, ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    featured_image_url: string | null;
    created_at: string;
    is_published: boolean;
}

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchPost(slug);
        }
    }, [slug]);

    const fetchPost = async (slugOrId: string) => {
        try {
            setIsLoading(true);

            // Try fetching by slug first
            let { data, error } = await supabase
                .from('blogs')
                .select('*')
                .eq('slug', slugOrId)
                .single();

            // If not found by slug, try by ID (UUID format check could be added but simpler to just try)
            if (!data && (slugOrId.length === 36)) { // Basic check for UUID length
                const { data: dataId, error: errorId } = await supabase
                    .from('blogs')
                    .select('*')
                    .eq('id', slugOrId)
                    .single();

                if (!errorId) {
                    data = dataId;
                    error = null;
                }
            }

            if (error) throw error;

            if (!data) {
                throw new Error('Post not found');
            }

            // Check if published (unless user is admin, but keeping simple for public view)
            if (!data.is_published) {
                // Optionally check for admin here to allow preview
                // For now, redirect if not published
                toast.error('This post is not available');
                navigate('/blog');
                return;
            }

            setPost(data);
        } catch (error: any) {
            toast.error('Failed to load blog post');
            navigate('/blog');
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background">
                <LoadingScreen onLoadingComplete={() => { }} minDuration={500} />
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="min-h-screen bg-background">
            <PageTransition>
                <Navbar />
                <main className="pt-32 pb-20">
                    <SectionReveal>
                        <div className="container-rev max-w-4xl mx-auto">
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/blog')}
                                className="mb-8 pl-0 hover:pl-2 transition-all"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Blog
                            </Button>

                            <div className="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" /> {formatDate(post.created_at)}
                                </span>
                            </div>

                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-8 text-balance">
                                {post.title}
                            </h1>
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.1}>
                        <div className="container-rev max-w-5xl mx-auto mb-12">
                            {post.featured_image_url ? (
                                <div className="aspect-[21/9] w-full bg-secondary rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src={post.featured_image_url}
                                        alt={post.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="aspect-[21/9] w-full bg-secondary rounded-2xl overflow-hidden shadow-sm flex items-center justify-center border border-border">
                                    <BookOpen className="w-24 h-24 text-muted-foreground/20" />
                                </div>
                            )}
                        </div>
                    </SectionReveal>

                    <SectionReveal delay={0.2}>
                        <div className="container-rev max-w-3xl mx-auto">
                            <article
                                className="prose prose-lg prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>
                    </SectionReveal>
                </main>
                <Footer />
                <RotatingLogo />
            </PageTransition>
        </div>
    );
}
