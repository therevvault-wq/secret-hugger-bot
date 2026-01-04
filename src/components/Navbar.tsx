import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, ChevronDown, LogOut, Shield, Package, UserCircle, MapPin, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/SearchModal";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoNavbar from "@/assets/logo-navbar.png";

const aestheticsItems = ["Body Kits", "Spoilers & Wings", "Carbon Fiber Parts", "Grilles", "Side Skirts", "Diffusers", "Mirror Caps", "Exhaust Tips"];
const performanceItems = ["Air Intakes", "Exhaust Systems", "ECU Tuning", "Suspension", "Brake Kits", "Turbo Kits", "Intercoolers", "Performance Filters"];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (data?.full_name) {
          setUserName(data.full_name);
        } else if (user.user_metadata?.full_name) {
          setUserName(user.user_metadata.full_name);
        } else if (user.email) {
          // Extract first part of email as fallback
          setUserName(user.email.split('@')[0]);
        }
      } else {
        setUserName(null);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
        <div className="container-rev">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img src={logoNavbar} alt="The Rev Vault" className="h-24 w-auto" />
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
                <button className="nav-link font-medium flex items-center gap-1 py-4">
                  Aesthetics <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "aesthetics" && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-56 bg-card border border-border rounded-lg shadow-2xl p-4 animate-fade-in">
                      {aestheticsItems.map(item => (
                        <span 
                          key={item} 
                          className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Performance Dropdown */}
              <div 
                className="relative" 
                onMouseEnter={() => setActiveDropdown("performance")} 
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link font-medium flex items-center gap-1 py-4">
                  Performance <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "performance" && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="w-56 bg-card border border-border rounded-lg shadow-2xl p-4 animate-fade-in">
                      {performanceItems.map(item => (
                        <span 
                          key={item} 
                          className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors cursor-default"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link to="/blog" className="nav-link font-medium">Blog</Link>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {user && userName && (
                <span className="text-foreground text-sm font-medium">
                  Hi, {userName}
                </span>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-foreground" 
                onClick={() => setSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                      <User className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5 text-sm text-muted-foreground">
                      {user.email}
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer">
                        <UserCircle className="w-4 h-4 mr-2" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/garage" className="cursor-pointer">
                        <Car className="w-4 h-4 mr-2" />
                        My Garage
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="cursor-pointer">
                        <Package className="w-4 h-4 mr-2" />
                        Order History
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/addresses" className="cursor-pointer">
                        <MapPin className="w-4 h-4 mr-2" />
                        Saved Addresses
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/coupons" className="cursor-pointer">
                        <Gift className="w-4 h-4 mr-2" />
                        Gifts & Coupons
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <User className="w-5 h-5" />
                  </Button>
                </Link>
              )}
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
                    <span 
                      key={item} 
                      className="block py-1.5 pl-4 text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-primary font-medium mb-2">Performance</p>
                  {performanceItems.slice(0, 4).map(item => (
                    <span 
                      key={item} 
                      className="block py-1.5 pl-4 text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <Link to="/blog" className="text-foreground font-medium py-2" onClick={() => setIsOpen(false)}>Blog</Link>
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link to="/admin" className="flex-1" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" size="sm" className="w-full">Admin</Button>
                        </Link>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                        className="flex-1"
                      >
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <Link to="/auth" className="flex-1" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" size="sm" className="w-full">Login</Button>
                    </Link>
                  )}
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
