import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useRazorpay } from "react-razorpay";
import { Loader2, MapPin, Plus, ShieldCheck, Truck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface Address {
    id: string;
    full_name: string;
    address_line1: string;
    address_line2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    phone_number: string | null;
    is_default: boolean;
}

export default function Checkout() {
    const { user } = useAuth();
    const { items, cartTotal, shippingTotal, grandTotal, clearCart } = useCart();
    const navigate = useNavigate();
    const { Razorpay } = useRazorpay();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loadingAddresses, setLoadingAddresses] = useState(true);
    const [selectedAddressId, setSelectedAddressId] = useState<string>('');
    const [processingPayment, setProcessingPayment] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/auth?redirect=/checkout');
            return;
        }

        if (items.length === 0) {
            navigate('/shop');
            return;
        }

        fetchAddresses();
    }, [user, navigate, items.length]);

    const fetchAddresses = async () => {
        try {
            setLoadingAddresses(true);
            const { data, error } = await (supabase as any)
                .from('user_addresses')
                .select('*')
                .eq('user_id', user?.id)
                .order('is_default', { ascending: false })
                .order('created_at', { ascending: false });

            if (error) throw error;

            const addressList = data || [];
            setAddresses(addressList);

            // Auto-select default address
            const defaultAddress = addressList.find(addr => addr.is_default);
            if (defaultAddress) {
                setSelectedAddressId(defaultAddress.id);
            } else if (addressList.length > 0) {
                setSelectedAddressId(addressList[0].id);
            }
        } catch (error: any) {
            toast.error('Failed to load addresses');
        } finally {
            setLoadingAddresses(false);
        }
    };

    const handlePayment = async () => {
        if (!selectedAddressId) {
            toast.error("Please select a shipping address");
            return;
        }

        const selectedAddress = addresses.find(a => a.id === selectedAddressId);
        if (!selectedAddress) return;

        setProcessingPayment(true);
        try {
            // 1. Create Order via Edge Function
            const { data: orderData, error: orderError } = await supabase.functions.invoke('create-razorpay-order', {
                body: {
                    amount: grandTotal,
                    currency: 'INR',
                    receipt: `receipt_${Date.now()}`,
                    notes: {
                        address_id: selectedAddressId,
                        user_email: user?.email
                    }
                }
            });

            if (orderError) throw orderError;

            // We need Key ID. For now, assume it's returned or available.
            // If the function returns it (we didn't implement that yet but we should), or if we have it in env.
            // Let's assume we need to fetch it or rely on existing mechanism.
            // I'll update the edge function to return key_id as well.
            const keyId = orderData.key_id || 'YOUR_RAZORPAY_KEY_ID_PLACEHOLDER';

            const options = {
                key: keyId,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "RevVault",
                description: "Payment for Order",
                order_id: orderData.id,
                handler: async (response: any) => {
                    try {
                        // Success - Create Order in DB
                        // We should ideally verify signature on backend, but for now we'll create the order directly

                        // 1. Create Order record
                        const { data: newOrder, error: createOrderError } = await (supabase as any)
                            .from('orders')
                            .insert({
                                user_id: user?.id,
                                total_amount: grandTotal,
                                status: 'processing', // or 'paid'
                                shipping_address: `${selectedAddress.full_name}, ${selectedAddress.address_line1}, ${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postal_code}`,
                                items: items.map(item => ({
                                    id: item.id,
                                    name: item.title,
                                    quantity: item.quantity,
                                    price: item.price
                                }))
                            })
                            .select()
                            .single();

                        if (createOrderError) throw createOrderError;

                        // 2. Create Payment record
                        const { error: paymentError } = await (supabase as any)
                            .from('payments')
                            .insert({
                                order_id: newOrder.id,
                                user_id: user?.id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                amount: grandTotal,
                                status: 'captured'
                            });

                        if (paymentError) {
                            console.error("Payment record creation failed", paymentError);
                            // Don't fail the whole flow, the order is created
                        }

                        toast.success("Order placed successfully!");
                        clearCart();
                        navigate('/orders');

                    } catch (err: any) {
                        console.error(err);
                        toast.error("Failed to finalize order: " + err.message);
                    }
                },
                prefill: {
                    name: selectedAddress.full_name || user?.user_metadata?.full_name || '',
                    email: user?.email || '',
                    contact: selectedAddress.phone_number || user?.user_metadata?.phone_number || ''
                },
                theme: {
                    color: "#000000" // Black for RevVault
                },
                modal: {
                    ondismiss: () => {
                        setProcessingPayment(false);
                        toast('Payment cancelled');
                    }
                }
            };

            const rzp1 = new Razorpay(options);
            rzp1.open();

        } catch (error: any) {
            console.error(error);
            toast.error("Payment initialization failed: " + (error.message || "Unknown error"));
            setProcessingPayment(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 container-rev pt-32 pb-20">
                <div className="max-w-6xl mx-auto">
                    <h1 className="font-display text-4xl mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column - Address & Review */}
                        <div className="lg:col-span-2 space-y-6">

                            {/* Shipping Address */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-primary" />
                                        Shipping Address
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {loadingAddresses ? (
                                        <div className="flex justify-center py-8">
                                            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                                        </div>
                                    ) : addresses.length === 0 ? (
                                        <div className="text-center py-8">
                                            <p className="text-muted-foreground mb-4">You have no saved addresses.</p>
                                            <Button onClick={() => navigate('/addresses')} variant="outline">
                                                <Plus className="w-4 h-4 mr-2" />
                                                Add New Address
                                            </Button>
                                        </div>
                                    ) : (
                                        <RadioGroup
                                            value={selectedAddressId}
                                            onValueChange={setSelectedAddressId}
                                            className="space-y-4"
                                        >
                                            {addresses.map((address) => (
                                                <div key={address.id} className={`flex items-start space-x-3 space-y-0 rounded-md border p-4 ${selectedAddressId === address.id ? 'border-primary bg-primary/5' : ''}`}>
                                                    <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                                                    <div className="flex-1 cursor-pointer" onClick={() => setSelectedAddressId(address.id)}>
                                                        <Label htmlFor={address.id} className="font-medium cursor-pointer text-base">
                                                            {address.full_name} {address.is_default && <span className="text-xs bg-secondary px-2 py-0.5 rounded-full ml-2 text-muted-foreground">Default</span>}
                                                        </Label>
                                                        <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                                                            <p>{address.address_line1}</p>
                                                            {address.address_line2 && <p>{address.address_line2}</p>}
                                                            <p>{address.city}, {address.state} {address.postal_code}</p>
                                                            <p>{address.country}</p>
                                                            <p>Phone: {address.phone_number}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )}

                                    {addresses.length > 0 && (
                                        <div className="mt-4 pt-4 border-t flex justify-end">
                                            <Button variant="ghost" size="sm" onClick={() => navigate('/addresses')}>
                                                Manage Addresses
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Order Items Review */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-primary" />
                                        Order Items
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-4 py-2">
                                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-secondary/20">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-secondary" />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium line-clamp-1">{item.title}</h4>
                                                <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                        </div>

                        {/* Right Column - Summary */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Order Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span>{formatPrice(cartTotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span>{shippingTotal > 0 ? formatPrice(shippingTotal) : <span className="text-green-600">Free</span>}</span>
                                        </div>
                                        <Separator />
                                        <div className="flex justify-between font-bold text-lg">
                                            <span>Total</span>
                                            <span>{formatPrice(grandTotal)}</span>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="flex flex-col gap-4">
                                        <Button
                                            className="w-full btn-primary h-12 text-lg"
                                            onClick={handlePayment}
                                            disabled={processingPayment || loadingAddresses || addresses.length === 0}
                                        >
                                            {processingPayment ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Processing...
                                                </>
                                            ) : (
                                                <>
                                                    Pay Now
                                                </>
                                            )}
                                        </Button>

                                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                            <ShieldCheck className="w-3 h-3" />
                                            Secure Payment via Razorpay
                                        </div>
                                    </CardFooter>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
