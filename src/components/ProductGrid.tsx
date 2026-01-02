import { useEffect, useState } from "react";
import { ShopifyProduct, fetchProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

interface ProductGridProps {
  brand?: string | null;
  model?: string | null;
  year?: string | null;
  category?: string | null;
}

export const ProductGrid = ({ brand, model, year, category }: ProductGridProps) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        // Build search query from filters
        // Shopify tags should be set as: Toyota, Supra, 2020
        // Product type should be: Aesthetics or Performance
        const queryParts: string[] = [];
        
        // Tags for vehicle compatibility (brand, model, year)
        if (brand) queryParts.push(`tag:${brand}`);
        if (model) queryParts.push(`tag:${model}`);
        if (year) queryParts.push(`tag:${year}`);
        
        // Product type for category
        if (category) queryParts.push(`product_type:${category}`);
        
        const query = queryParts.length > 0 ? queryParts.join(" AND ") : undefined;
        
        const data = await fetchProducts(20, query);
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [brand, model, year, category]);

  const hasFilters = brand || model || year || category;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-card border border-border rounded-xl">
        <p className="text-muted-foreground text-lg mb-2">
          {hasFilters ? "No products found for this vehicle" : "No products found"}
        </p>
        <p className="text-sm text-muted-foreground">
          Ask the chat to create a product by describing what you want to sell.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.node.id} product={product} />
      ))}
    </div>
  );
};
