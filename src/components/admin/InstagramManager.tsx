import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Plus, Trash2, ExternalLink, Image as ImageIcon } from "lucide-react";

interface InstagramPost {
    id: string;
    post_url: string;
    thumbnail_url: string;
    caption: string | null;
    created_at: string;
}

export default function InstagramManager() {
    const [posts, setPosts] = useState<InstagramPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        post_url: "",
        caption: "",
    });
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('instagram_posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
            toast.error('Failed to load Instagram posts');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnailFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!thumbnailFile || !formData.post_url) {
            toast.error("Please provide both a link and a thumbnail image");
            return;
        }

        setUploading(true);
        try {
            // 1. Upload Thumbnail
            const fileExt = thumbnailFile.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('instagram-thumbnails')
                .upload(filePath, thumbnailFile);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('instagram-thumbnails')
                .getPublicUrl(filePath);

            // 2. Insert Post
            const { error: insertError } = await supabase
                .from('instagram_posts')
                .insert({
                    post_url: formData.post_url,
                    thumbnail_url: publicUrl,
                    caption: formData.caption
                });

            if (insertError) throw insertError;

            toast.success("Instagram post added successfully");
            setFormData({ post_url: "", caption: "" });
            setThumbnailFile(null);
            // Reset file input
            const fileInput = document.getElementById('thumbnail') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            fetchPosts();
        } catch (error: any) {
            console.error('Error adding post:', error);
            toast.error(error.message || "Failed to add post");
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string, thumbnailUrl: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        try {
            // 1. Delete DB Record
            const { error: deleteError } = await supabase
                .from('instagram_posts')
                .delete()
                .eq('id', id);

            if (deleteError) throw deleteError;

            // 2. Try to delete image (optional cleanup)
            const fileName = thumbnailUrl.split('/').pop();
            if (fileName) {
                await supabase.storage
                    .from('instagram-thumbnails')
                    .remove([fileName]);
            }

            toast.success("Post removed");
            fetchPosts();
        } catch (error) {
            toast.error("Failed to delete post");
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display text-foreground">Instagram Feed</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Add New Post Form */}
                <Card className="lg:col-span-1 h-fit border-border">
                    <CardHeader>
                        <CardTitle>Add New Post</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="post_url">Instagram Post URL</Label>
                                <Input
                                    id="post_url"
                                    placeholder="https://instagram.com/p/..."
                                    value={formData.post_url}
                                    onChange={(e) => setFormData({ ...formData, post_url: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="thumbnail">Thumbnail Image</Label>
                                <div className="flex items-center gap-2">
                                    <Input
                                        id="thumbnail"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="cursor-pointer"
                                    />
                                </div>
                                {thumbnailFile && (
                                    <p className="text-xs text-muted-foreground">
                                        Selected: {thumbnailFile.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="caption">Caption (Optional)</Label>
                                <Input
                                    id="caption"
                                    placeholder="Short description..."
                                    value={formData.caption}
                                    onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                                />
                            </div>

                            <Button type="submit" className="w-full btn-primary" disabled={uploading}>
                                {uploading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add to Feed
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                {/* Posts List */}
                <div className="lg:col-span-2 space-y-4">
                    <h3 className="font-semibold text-lg">Current Feed ({posts.length})</h3>

                    {loading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="w-8 h-8 animate-spin text-primary" />
                        </div>
                    ) : posts.length === 0 ? (
                        <div className="text-center p-8 border border-dashed rounded-lg text-muted-foreground">
                            No posts added yet. Add one to get started.
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {posts.map((post) => (
                                <div key={post.id} className="group relative aspect-square rounded-lg overflow-hidden border border-border bg-secondary/20">
                                    <img
                                        src={post.thumbnail_url}
                                        alt="Instagram Post"
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                    />

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2">
                                        <a
                                            href={post.post_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white hover:text-primary transition-colors"
                                        >
                                            <ExternalLink className="w-6 h-6" />
                                        </a>
                                        <button
                                            onClick={() => handleDelete(post.id, post.thumbnail_url)}
                                            className="text-destructive hover:text-destructive/80 transition-colors bg-white/10 p-2 rounded-full backdrop-blur-sm"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        {post.caption && (
                                            <p className="text-white/80 text-xs text-center line-clamp-2 px-2">{post.caption}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
