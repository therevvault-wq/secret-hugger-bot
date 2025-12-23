import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/SearchModal";
import logoNavbar from "@/assets/logo-navbar.png";

const aestheticsItems = ["Body Kits", "Spoilers & Wings", "Carbon Fiber Parts", "Grilles", "Side Skirts", "Diffusers", "Mirror Caps", "Exhaust Tips"];
const performanceItems = ["Air Intakes", "Exhaust Systems", "ECU Tuning", "Suspension", "Brake Kits", "Turbo Kits", "Intercoolers", "Performance Filters"];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
        <div className="container-rev">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logoNavbar} alt="The Rev Vault" className="h-16 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className="nav-link font-medium">Home</Link>

              {/* Aesthetics Dropdown */}
              <div 
                className="relative" 
                onMouseEnter={() => setActiveDropdown("aesthetics")} 
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link font-medium flex items-center gap-1">
                  Aesthetics <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "aesthetics" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-2xl p-4 animate-fade-in">
                    {aestheticsItems.map(item => (
                      <Link 
                        key={item} 
                        to={`/shop?category=${encodeURIComponent(item)}`} 
                        className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Performance Dropdown */}
              <div 
                className="relative" 
                onMouseEnter={() => setActiveDropdown("performance")} 
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link font-medium flex items-center gap-1">
                  Performance <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "performance" && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-2xl p-4 animate-fade-in">
                    {performanceItems.map(item => (
                      <Link 
                        key={item} 
                        to={`/shop?category=${encodeURIComponent(item)}`} 
                        className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/blog" className="nav-link font-medium">Blog</Link>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground" 
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
              <Link to="/account">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                    0
                  </span>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button className="lg:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden py-6 border-t border-border animate-fade-in">
              <div className="flex flex-col gap-4">
                <Link to="/" className="text-foreground font-medium py-2" onClick={() => setIsOpen(false)}>Home</Link>
                <div>
                  <p className="text-primary font-medium mb-2">Aesthetics</p>
                  {aestheticsItems.slice(0, 4).map(item => (
                    <Link 
                      key={item} 
                      to={`/shop?category=${encodeURIComponent(item)}`} 
                      className="block py-1.5 pl-4 text-muted-foreground" 
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
                <div>
                  <p className="text-primary font-medium mb-2">Performance</p>
                  {performanceItems.slice(0, 4).map(item => (
                    <Link 
                      key={item} 
                      to={`/shop?category=${encodeURIComponent(item)}`} 
                      className="block py-1.5 pl-4 text-muted-foreground" 
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
                <Link to="/blog" className="text-foreground font-medium py-2" onClick={() => setIsOpen(false)}>Blog</Link>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <Link to="/account" className="flex-1">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setIsOpen(false)}>Login</Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => {
                      setIsOpen(false);
                      setSearchOpen(true);
                    }}
                  >
                    <Search className="w-5 h-5" />
                  </Button>
                  <Link to="/cart">
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                      <ShoppingCart className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
