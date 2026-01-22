import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Package, ShoppingCart, X } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  title: string;
  description: string | null;
  price: number;
  compare_at_price: number | null;
  image_url: string | null;
  category: string | null;
  is_active: boolean | null;
  compatible_vehicles: string | null;
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const make = searchParams.get('make');
  const model = searchParams.get('model');
  const year = searchParams.get('year');
  const fuelType = searchParams.get('fuelType');
  const categoryFilter = searchParams.get('category');

  useEffect(() => {
    fetchProducts();
  }, [searchParams]);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      // Fetch all active products grouped by category
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true });

      if (error) throw error;
      setProducts((data as unknown as Product[]) || []);
    } catch (error: any) {
      toast.error('Failed to fetch products', {
        description: error.message,
      });
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

  // Filter products based on vehicle compatibility
  // Filter products based on vehicle compatibility
  const filteredProducts = (make || model) ? products.filter(product => {
    // If product has no compatible_vehicles, it's universal (show for all)
    if (!product.compatible_vehicles) return true;

    const compatibleVehicles = product.compatible_vehicles.toLowerCase().split(',').map(v => v.trim());
    const searchModel = model?.toLowerCase();
    const searchMake = make?.toLowerCase();

    return compatibleVehicles.some(vehicle => {
      // If user selected a model
      if (searchModel) {
        // Match if the vehicle string refers to this specific model
        if (vehicle.includes(searchModel)) return true;
        // OR match if the product is generic for the entire Make (e.g. "Volkswagen" or "Tata")
        // But NOT if it's for a different model of the same make (handled by the includes check above)
        if (searchMake && vehicle === searchMake) return true;
        return false;
      }

      // If user only selected a make
      if (searchMake) {
        return vehicle.includes(searchMake);
      }

      return false;
    });
  }) : products;

  // Group products by category
  const aestheticsCategories = [
    'aesthetics', 'body kits', 'spoilers & wings', 'carbon fiber parts',
    'grilles', 'side skirts', 'diffusers', 'mirror caps', 'exhaust tips',
    'exterior', 'interior', 'lighting'
  ];

  const performanceCategories = [
    'performance', 'air intakes', 'exhaust systems', 'ecu tuning',
    'suspension', 'brake kits', 'turbo kits', 'intercoolers',
    'performance filters', 'wheels', 'tires'
  ];

  const aestheticsProducts = filteredProducts.filter(p =>
    p.category && aestheticsCategories.includes(p.category.toLowerCase())
  );

  const performanceProducts = filteredProducts.filter(p =>
    p.category && performanceCategories.includes(p.category.toLowerCase())
  );

  const otherProducts = filteredProducts.filter(p => {
    const cat = p.category?.toLowerCase();
    return !cat || (!aestheticsCategories.includes(cat) && !performanceCategories.includes(cat));
  });

  // Apply category filter from URL if present
  const categoryFilteredProducts = categoryFilter
    ? filteredProducts.filter(p => p.category?.toLowerCase() === categoryFilter.toLowerCase())
    : null;

  const renderProductCard = (product: Product) => (
    <Card key={product.id} className="border-border hover:border-primary/50 transition-all overflow-hidden group flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block flex-1">
        {product.image_url && (
          <div className="aspect-square overflow-hidden bg-white relative">
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            />
            {product.compare_at_price && product.compare_at_price > product.price && (
              <Badge className="absolute top-2 right-2 bg-destructive text-white border-none">
                Sale
              </Badge>
            )}
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </CardTitle>
          {product.category && (
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              {product.category}
            </div>
          )}
        </CardHeader>
      </Link>

      <CardContent className="space-y-4 mt-auto">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.compare_at_price && product.compare_at_price > product.price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.compare_at_price)}
            </span>
          )}
        </div>
        <Button
          className="w-full btn-primary"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation if clicked on button
            e.stopPropagation();
            addToCart(product);
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container-rev pt-32 pb-20">
        <div className="mb-8">
          <h1 className="font-display text-4xl md:text-5xl mb-4">
            {categoryFilter ? categoryFilter : 'Products for Your Vehicle'}
          </h1>
          {(make || model || year || fuelType || categoryFilter) && (
            <div className="flex flex-wrap gap-2 mb-4 items-center">
              {categoryFilter && <Badge variant="default" className="text-sm bg-primary">{categoryFilter}</Badge>}
              {make && <Badge variant="secondary" className="text-sm">{make}</Badge>}
              {model && <Badge variant="secondary" className="text-sm">{model}</Badge>}
              {year && <Badge variant="secondary" className="text-sm">{year}</Badge>}
              {fuelType && <Badge variant="secondary" className="text-sm">{fuelType}</Badge>}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/shop')}
                className="ml-2"
              >
                <X className="w-3 h-3 mr-1" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <Card className="border-border">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Package className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Products Added</h3>
              <p className="text-muted-foreground text-center max-w-md">
                We're currently working on adding products for your vehicle. Please check back soon or contact us for availability.
              </p>
            </CardContent>
          </Card>
        ) : categoryFilteredProducts ? (
          // Show only category-filtered products
          <div className="space-y-8">
            {categoryFilteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryFilteredProducts.map(renderProductCard)}
              </div>
            ) : (
              <Card className="border-border">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Package className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    No products found in the "{categoryFilter}" category. Try browsing all products.
                  </p>
                  <Button onClick={() => navigate('/shop')} className="mt-4">
                    View All Products
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          <div className="space-y-16">
            {/* Aesthetics Section */}
            {aestheticsProducts.length > 0 && (
              <section>
                <div className="mb-8">
                  <h2 className="font-display text-3xl md:text-4xl mb-2">
                    <span className="text-primary">AESTHETICS</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Enhance your vehicle's appearance with premium aesthetic upgrades
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {aestheticsProducts.map(renderProductCard)}
                </div>
              </section>
            )}

            {/* Performance Section */}
            {performanceProducts.length > 0 && (
              <section>
                <div className="mb-8">
                  <h2 className="font-display text-3xl md:text-4xl mb-2">
                    <span className="text-primary">PERFORMANCE</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Boost your vehicle's power and handling with performance parts
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {performanceProducts.map(renderProductCard)}
                </div>
              </section>
            )}

            {/* Other Products Section */}
            {otherProducts.length > 0 && (
              <section>
                <div className="mb-8">
                  <h2 className="font-display text-3xl md:text-4xl mb-2">
                    OTHER PRODUCTS
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherProducts.map(renderProductCard)}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
