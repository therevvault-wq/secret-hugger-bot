import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ShoppingCart, ArrowLeft, Package, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
    id: string;
    title: string;
    description: string | null;
    price: number;
    compare_at_price: number | null;
    image_url: string | null;
    images: string[] | null;
    category: string | null;
    product_type: string | null;
    is_active: boolean;
    delivery_timeline: string | null;
}

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const fetchProduct = async (productId: string) => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', productId)
                .single();

            if (error) throw error;
            setProduct(data as any);
            setSelectedImage((data as any).image_url || ((data as any).images?.[0]) || '');
        } catch (error: any) {
            toast.error('Failed to load product');
            navigate('/shop');
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <Package className="w-16 h-16 text-muted-foreground" />
                    <h2 className="text-xl font-semibold">Product not found</h2>
                    <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 container-rev pt-32 pb-20">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="mb-8 pl-0 hover:pl-2 transition-all"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    <div className="space-y-6">
                        <div className="bg-white rounded-3xl overflow-hidden aspect-square border border-border flex items-center justify-center max-h-[600px] shadow-sm">
                            {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain p-4"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-secondary/20">
                                    <Package className="w-24 h-24 text-muted-foreground/30" />
                                </div>
                            )}
                        </div>

                        {product.images && product.images.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                                {[product.image_url, ...product.images.filter(img => img !== product.image_url)].filter(Boolean).map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImage(img!)}
                                        className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all p-1 bg-white shadow-sm ${selectedImage === img ? 'border-primary ring-2 ring-primary/20' : 'border-transparent opacity-70 hover:opacity-100 hover:border-gray-200'}`}
                                    >
                                        <img src={img!} alt={`Gallery ${idx}`} className="w-full h-full object-contain" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6 min-w-0">
                        <div>
                            {product.category && (
                                <Badge variant="secondary" className="mb-4">
                                    {product.category}
                                </Badge>
                            )}
                            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-4">
                                {product.title}
                            </h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-bold text-primary">
                                    {formatPrice(product.price)}
                                </span>
                                {product.compare_at_price && product.compare_at_price > product.price && (
                                    <span className="text-xl text-muted-foreground line-through">
                                        {formatPrice(product.compare_at_price)}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="border-t border-border/10 pt-8 mt-4">
                            {product.description ? (
                                <div
                                    className="prose prose-rev prose-invert max-w-none w-full break-words
                                    prose-headings:font-display prose-headings:text-foreground prose-headings:mb-4 prose-headings:uppercase prose-headings:tracking-wider
                                    prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                                    prose-strong:text-foreground prose-strong:font-bold
                                    prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-6 prose-ul:space-y-1
                                    prose-li:text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: product.description }}
                                />
                            ) : (
                                <p className="text-muted-foreground italic">No description available for this product.</p>
                            )}
                        </div>

                        <div className="pt-4 space-y-4">
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="btn-primary flex-1 text-lg h-14"
                                    onClick={() => addToCart(product)}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    Add to Cart
                                </Button>
                            </div>

                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                In stock and ready to ship
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                <strong>Delivery:</strong> {(product as any).delivery_timeline || 'Standard Delivery: 5-7 Business Days (refer to Shipping Policy for details)'}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
