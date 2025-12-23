import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search, X, ArrowRight } from "lucide-react";

interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DEMO_PRODUCTS = [
  { id: "1", name: "Carbon Fiber Spoiler", brand: "REVVAULT", price: 899, category: "Exterior" },
  { id: "2", name: "Performance Air Intake", brand: "K&N", price: 349, category: "Engine" },
  { id: "3", name: "LED Headlight Kit", brand: "OSRAM", price: 599, category: "Lighting" },
  { id: "4", name: "Coilover Suspension Kit", brand: "KW", price: 2499, category: "Suspension" },
  { id: "5", name: "Forged Alloy Wheels", brand: "BBS", price: 3200, category: "Wheels" },
  { id: "6", name: "Sport Exhaust System", brand: "AKRAPOVIC", price: 4500, category: "Exhaust" },
];

const POPULAR_SEARCHES = ["Spoiler", "Exhaust", "Wheels", "Suspension", "LED Lights"];

export const SearchModal = ({ open, onOpenChange }: SearchModalProps) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<typeof DEMO_PRODUCTS>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = DEMO_PRODUCTS.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query]);

  const handleProductClick = (productId: string) => {
    onOpenChange(false);
    navigate(`/product/${productId}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onOpenChange(false);
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 bg-card border-border">
        <DialogHeader className="p-4 border-b border-border">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for parts, brands, categories..."
              className="pl-10 pr-10 h-12 text-lg bg-transparent border-none focus-visible:ring-0"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto">
          {query.trim() === "" ? (
            <div className="p-4">
              <p className="text-sm text-muted-foreground mb-3">Popular Searches</p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 text-sm bg-secondary rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left"
                >
                  <div>
                    <p className="text-foreground font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.brand} • {product.category}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-foreground font-semibold">${product.price}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </button>
              ))}
              <button
                onClick={handleSearch}
                className="w-full p-3 text-center text-primary hover:underline text-sm"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No products found for "{query}"</p>
              <p className="text-sm text-muted-foreground mt-1">Try a different search term</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
