import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CartSheet = () => {
    const { items, isOpen, setIsOpen, updateQuantity, removeFromCart, cartTotal, shippingTotal, grandTotal } = useCart();
    const navigate = useNavigate();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleCheckout = () => {
        setIsOpen(false);
        navigate('/checkout'); // We'll need to create this later or direct to a simple summary
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="flex flex-col w-full sm:max-w-lg">
                <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Your Cart ({items.length})
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <ShoppingBag className="w-16 h-16 text-muted-foreground/30" />
                            <div className="space-y-1">
                                <h3 className="font-semibold text-lg">Your cart is empty</h3>
                                <p className="text-muted-foreground text-sm">
                                    Looks like you haven't added anything yet.
                                </p>
                            </div>
                            <Button onClick={() => setIsOpen(false)} variant="outline">
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-secondary/20">
                                        {item.image_url ? (
                                            <img
                                                src={item.image_url}
                                                alt={item.title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-secondary">
                                                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium">
                                                <h3 className="line-clamp-2 pr-4">{item.title}</h3>
                                                <p className="ml-4 flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center gap-2 border rounded-md p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-1 hover:bg-secondary rounded-sm disabled:opacity-50"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-1 hover:bg-secondary rounded-sm"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="font-medium text-destructive hover:text-destructive/80 flex items-center gap-1"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t pt-6 space-y-3">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <p>Subtotal</p>
                            <p>{formatPrice(cartTotal)}</p>
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <p>Shipping</p>
                            <p>{shippingTotal > 0 ? formatPrice(shippingTotal) : <span className="text-green-500">Free</span>}</p>
                        </div>
                        <div className="flex items-center justify-between text-base font-medium border-t pt-3">
                            <p>Total</p>
                            <p>{formatPrice(grandTotal)}</p>
                        </div>
                        <Button className="w-full btn-primary h-12 text-lg" onClick={handleCheckout}>
                            Checkout
                        </Button>
                        <div className="flex justify-center">
                            <button
                                type="button"
                                className="font-medium text-primary hover:text-primary/80 text-sm"
                                onClick={() => setIsOpen(false)}
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};
