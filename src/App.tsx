import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Profile from "./pages/Profile";
import MyGarage from "./pages/MyGarage";
import Addresses from "./pages/Addresses";
import Coupons from "./pages/Coupons";
import NotFound from "./pages/NotFound";

import { CartProvider } from "@/contexts/CartContext"; // Import CartProvider
import { CartSheet } from "@/components/CartSheet"; // Import CartSheet
import ProductDetails from "./pages/ProductDetails";
import BlogPost from "./pages/BlogPost";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider> {/* Wrap with CartProvider */}
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CartSheet /> {/* Add CartSheet globally */}
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} /> {/* Add Product Details Route */}
              <Route path="/profile" element={<Profile />} />
              <Route path="/garage" element={<MyGarage />} />
              <Route path="/addresses" element={<Addresses />} />
              <Route path="/coupons" element={<Coupons />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
