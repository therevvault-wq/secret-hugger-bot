import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, User, ChevronDown, LogOut, Shield, Package, UserCircle, MapPin, Gift, Car, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/SearchModal";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useCart } from "@/contexts/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logoNavbar from "@/assets/logo-navbar.png";

const aestheticsItems = ["Body Kits", "Spoilers & Wings", "Carbon Fiber Parts", "Grilles", "Side Skirts", "Diffusers", "Mirror Caps", "Exhaust Tips"];
const performanceItems = ["Ignition System", "Air Intakes & Induction", "Suspensions & Handling", "Braking Upgrades", "Exhausts", "Intercoolers", "Turbo & Boost Management", "Braces", "Wheels & Drivetrain Components"];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  const { user, isAdmin, signOut } = useAuth();
  const { cartCount, setIsOpen: setIsCartOpen } = useCart();
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border">
        <div className="container-rev">
          <div className="flex items-center justify-between h-28">
            {/* Left - Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-4 ml-4">
              <Link to="/" className="nav-link font-medium text-base">Home</Link>

              {/* Aesthetics Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("aesthetics")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link font-medium text-base flex items-center gap-1 py-4">
                  Aesthetics <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "aesthetics" && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-56 bg-card border border-border rounded-lg shadow-2xl p-4"
                    >
                      {aestheticsItems.map((item, i) => (
                        <Link
                          key={item}
                          to={`/shop?category=${encodeURIComponent(item)}`}
                          className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15, delay: i * 0.03 }}
                          >
                            {item}
                          </motion.span>
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Performance Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("performance")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className="nav-link font-medium text-base flex items-center gap-1 py-4">
                  Performance <ChevronDown className="w-4 h-4" />
                </button>
                {activeDropdown === "performance" && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="w-56 bg-card border border-border rounded-lg shadow-2xl p-4"
                    >
                      {performanceItems.map((item, i) => (
                        <Link
                          key={item}
                          to={`/shop?category=${encodeURIComponent(item)}`}
                          className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors"
                        >
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.15, delay: i * 0.03 }}
                          >
                            {item}
                          </motion.span>
                        </Link>
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>

              <Link to="/shop" className="nav-link font-medium text-base">Shop All</Link>
              <Link to="/about" className="nav-link font-medium text-base">About Us</Link>
              <Link to="/blog" className="nav-link font-medium text-base">Blog</Link>
            </div>

            {/* Center - Logo */}
            <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
              <img src={logoNavbar} alt="The Rev Vault" className="h-28 w-auto" />
            </Link>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4 ml-auto">
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

              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
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
            <div className="flex lg:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              <button className="text-foreground" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden py-6 border-t border-border overflow-hidden max-h-[calc(100vh-7rem)] overflow-y-auto"
              >
                <div className="flex flex-col gap-4 pb-4">
                  {/* Search and Login at top */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 }}
                    className="flex items-center gap-3 pb-4 border-b border-border"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        setSearchOpen(true);
                        setIsOpen(false);
                      }}
                    >
                      <Search className="w-4 h-4 mr-2" />
                      Search
                    </Button>
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
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                    <Link to="/" className="text-foreground font-medium py-2 block" onClick={() => setIsOpen(false)}>Home</Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                    <p className="text-primary font-medium mb-2">Aesthetics</p>
                    {aestheticsItems.map((item) => (
                      <Link
                        key={item}
                        to={`/shop?category=${encodeURIComponent(item)}`}
                        className="block py-1.5 pl-4 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                    <p className="text-primary font-medium mb-2">Performance</p>
                    {performanceItems.map((item) => (
                      <Link
                        key={item}
                        to={`/shop?category=${encodeURIComponent(item)}`}
                        className="block py-1.5 pl-4 text-muted-foreground hover:text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        {item}
                      </Link>
                    ))}
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
                    <Link to="/shop" className="text-foreground font-medium py-2 block" onClick={() => setIsOpen(false)}>Shop All</Link>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                    <Link to="/blog" className="text-foreground font-medium py-2 block" onClick={() => setIsOpen(false)}>Blog</Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
};
