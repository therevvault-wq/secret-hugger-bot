import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ShoppingCart, ArrowLeft, Package, Check, AlertCircle, Truck, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';

import { ComponentProps } from 'react';

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
    stock_status: string | null;
    shipping_cost: number | null;
    shipping_note: string | null;
}

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

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
            const currentProduct = data as any;
            setProduct(currentProduct);
            setSelectedImage(currentProduct.image_url || (currentProduct.images?.[0]) || '');

            // Fetch related products
            if (currentProduct.category) {
                const { data: relatedData } = await supabase
                    .from('products')
                    .select('*')
                    .eq('category', currentProduct.category)
                    .neq('id', currentProduct.id)
                    .limit(4);

                if (relatedData) setRelatedProducts(relatedData as any);
            }

            // Handle Recently Viewed
            let viewed: Product[] = [];
            try {
                const stored = localStorage.getItem('recentlyViewed');
                if (stored) {
                    viewed = JSON.parse(stored);
                }
            } catch (e) {
                console.error("Failed to parse recently viewed items", e);
                // Reset if corrupted
                localStorage.removeItem('recentlyViewed');
            }

            // Remove current product if it exists to avoid duplicates
            const filteredViewed = viewed.filter((p: Product) => p.id !== currentProduct.id);
            // Add current product to start
            const newViewed = [currentProduct, ...filteredViewed].slice(0, 4);
            localStorage.setItem('recentlyViewed', JSON.stringify(newViewed));
            // Set recently viewed state (excluding current product for display)
            setRecentlyViewed(filteredViewed.slice(0, 4));

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

    const ProductCard = ({ product }: { product: Product }) => (
        <div
            onClick={() => navigate(`/product/${product.id}`)}
            className="group cursor-pointer space-y-3"
        >
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary/20 border border-border relative">
                {product.image_url ? (
                    <img
                        src={product.image_url}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Package className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                )}
                {product.stock_status === 'out_of_stock' && (
                    <div className="absolute top-2 right-2 bg-destructive/90 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Sold Out
                    </div>
                )}
            </div>
            <div>
                <h3 className="font-display font-bold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {product.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">{formatPrice(product.price)}</p>
            </div>
        </div>
    );

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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
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
                                <>
                                    <div className={`relative ${!isExpanded && product.description.length > 500 ? 'max-h-[300px] overflow-hidden' : ''}`}>
                                        <div
                                            className="prose prose-rev prose-invert max-w-none w-full break-words
                                            prose-headings:font-display prose-headings:text-foreground prose-headings:mb-4 prose-headings:uppercase prose-headings:tracking-wider
                                            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                                            prose-strong:text-foreground prose-strong:font-bold
                                            prose-ul:list-disc prose-ul:pl-5 prose-ul:mb-6 prose-ul:space-y-1
                                            prose-li:text-muted-foreground"
                                            dangerouslySetInnerHTML={{ __html: product.description }}
                                        />
                                        {!isExpanded && product.description.length > 500 && (
                                            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/80 to-transparent" />
                                        )}
                                    </div>
                                    {product.description.length > 500 && (
                                        <Button
                                            variant="ghost"
                                            className="w-full mt-2 text-primary hover:text-primary hover:bg-primary/10"
                                            onClick={() => setIsExpanded(!isExpanded)}
                                        >
                                            {isExpanded ? (
                                                <>Read Less <ChevronUp className="ml-2 h-4 w-4" /></>
                                            ) : (
                                                <>Read More <ChevronDown className="ml-2 h-4 w-4" /></>
                                            )}
                                        </Button>
                                    )}
                                </>
                            ) : (
                                <p className="text-muted-foreground italic">No description available for this product.</p>
                            )}
                        </div>

                        <div className="pt-4 space-y-4">
                            {/* Terms and Conditions Checkbox */}
                            <div className="flex items-start space-x-3 p-4 bg-secondary/20 rounded-lg border border-border/50">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                                />
                                <label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer select-none">
                                    I agree to the <span className="text-primary hover:underline">Terms & Conditions</span> regarding shipping, returns, and compatibility.
                                </label>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button
                                    size="lg"
                                    className="btn-primary flex-1 text-lg h-14"
                                    onClick={() => addToCart(product)}
                                    disabled={product.stock_status === 'out_of_stock' || !termsAccepted}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    {product.stock_status === 'out_of_stock' ? 'Out of Stock' :
                                        product.stock_status === 'pre_order' ? 'Pre-Order Now' : 'Add to Cart'}
                                </Button>
                            </div>

                            {!termsAccepted && product.stock_status !== 'out_of_stock' && (
                                <p className="text-xs text-muted-foreground text-center">
                                    Please accept the terms and conditions to proceed
                                </p>
                            )}

                            {/* Stock Status */}
                            {product.stock_status === 'out_of_stock' ? (
                                <p className="text-sm text-destructive flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Currently out of stock
                                </p>
                            ) : product.stock_status === 'pre_order' ? (
                                <p className="text-sm text-yellow-500 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Available for pre-order
                                </p>
                            ) : (
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                    <Check className="w-4 h-4 text-green-500" />
                                    In stock and ready to ship
                                </p>
                            )}

                            {/* Shipping Info */}
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                                <Truck className="w-4 h-4" />
                                {product.shipping_cost && product.shipping_cost > 0 ? (
                                    <span><strong>Shipping:</strong> ₹{product.shipping_cost} (packing & shipping charges)</span>
                                ) : (
                                    <span className="text-green-500"><strong>Free Shipping</strong></span>
                                )}
                            </p>
                            {product.shipping_note && (
                                <p className="text-sm text-yellow-600/90 ml-6 -mt-3 italic">
                                    {product.shipping_note}
                                </p>
                            )}

                            <p className="text-sm text-muted-foreground mt-2">
                                <strong>Delivery:</strong> {product.delivery_timeline || 'Standard Delivery: 5-7 Business Days (refer to Shipping Policy for details)'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div className="mb-20">
                        <h2 className="font-display text-2xl md:text-3xl mb-8">Related Products</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Recently Viewed */}
                {recentlyViewed.length > 0 && (
                    <div>
                        <h2 className="font-display text-2xl md:text-3xl mb-8">Recently Viewed</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {recentlyViewed.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
