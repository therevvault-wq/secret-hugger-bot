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
    category: string | null;
    is_active: boolean;
}

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
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
            setProduct(data);
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
                    {/* Product Image */}
                    <div className="bg-secondary/20 rounded-2xl overflow-hidden aspect-square border border-border">
                        {product.image_url ? (
                            <img
                                src={product.image_url}
                                alt={product.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <Package className="w-24 h-24 text-muted-foreground/30" />
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
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

                        <Card className="border-border bg-card/50">
                            <CardContent className="pt-6">
                                <p className="text-muted-foreground leading-relaxed">
                                    {product.description || "No description available for this product."}
                                </p>
                            </CardContent>
                        </Card>

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
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
