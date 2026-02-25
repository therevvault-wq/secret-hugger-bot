import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { useRazorpay } from "react-razorpay";
import { Loader2, MapPin, Plus, ShieldCheck, Truck, MessageCircle, CreditCard, CheckCircle2, PartyPopper } from 'lucide-react';
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
    const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'whatsapp'>('razorpay');
    const [orderSuccess, setOrderSuccess] = useState(false);

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

            const defaultAddress = addressList.find((addr: Address) => addr.is_default);
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

            if (orderData.error) {
                throw new Error(orderData.error);
            }

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
                        const { data: newOrder, error: createOrderError } = await (supabase as any)
                            .from('orders')
                            .insert({
                                user_id: user?.id,
                                total_amount: grandTotal,
                                status: 'processing',
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
                        }

                        clearCart();
                        setProcessingPayment(false);
                        setOrderSuccess(true);
                        setTimeout(() => navigate('/orders'), 3000);

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
                    color: "#000000"
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

    const handleWhatsAppCheckout = () => {
        if (!selectedAddressId) {
            toast.error("Please select a shipping address");
            return;
        }
        const selectedAddress = addresses.find(a => a.id === selectedAddressId);
        if (!selectedAddress) return;

        const phone = import.meta.env.VITE_WHATSAPP_NUMBER;
        const itemsList = items.map(item =>
            `- ${item.title} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
        ).join('\n');

        const message = encodeURIComponent(
            `Hi! I'd like to place an order:\n\n` +
            `*Order Items:*\n${itemsList}\n\n` +
            `*Subtotal:* ${formatPrice(cartTotal)}\n` +
            `*Shipping:* ${shippingTotal > 0 ? formatPrice(shippingTotal) : 'Free'}\n` +
            `*Total:* ${formatPrice(grandTotal)}\n\n` +
            `*Shipping Address:*\n` +
            `${selectedAddress.full_name}\n` +
            `${selectedAddress.address_line1}\n` +
            `${selectedAddress.address_line2 ? selectedAddress.address_line2 + '\n' : ''}` +
            `${selectedAddress.city}, ${selectedAddress.state} ${selectedAddress.postal_code}\n` +
            `Phone: ${selectedAddress.phone_number || 'N/A'}\n\n` +
            `Please confirm my order. Thank you!`
        );

        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(price);
    };

    if (orderSuccess) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center space-y-6 animate-in fade-in zoom-in duration-500 p-8">
                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-14 h-14 text-green-500" />
                        </div>
                        <h1 className="font-display text-4xl md:text-5xl text-foreground">Order Placed!</h1>
                        <p className="text-muted-foreground text-lg max-w-md mx-auto">
                            Thank you for your order. You will be redirected to your orders shortly.
                        </p>
                        <Button variant="outline" onClick={() => navigate('/orders')}>
                            View Orders
                        </Button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-1 container-rev pt-32 pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <span className="hover:text-foreground cursor-pointer transition-colors" onClick={() => navigate('/shop')}>Shop</span>
                        <span>/</span>
                        <span className="text-foreground font-medium">Checkout</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="lg:col-span-7 space-y-8">

                            {/* Shipping Address */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Shipping Address
                                </h2>
                                <div className="rounded-xl border border-border/50 p-5">
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
                                            className="space-y-3"
                                        >
                                            {addresses.map((address) => (
                                                <div
                                                    key={address.id}
                                                    className={`flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${selectedAddressId === address.id ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-border'}`}
                                                    onClick={() => setSelectedAddressId(address.id)}
                                                >
                                                    <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                                                    <div className="flex-1">
                                                        <Label htmlFor={address.id} className="font-medium cursor-pointer text-base">
                                                            {address.full_name}
                                                            {address.is_default && (
                                                                <span className="text-xs bg-secondary px-2 py-0.5 rounded-full ml-2 text-muted-foreground">Default</span>
                                                            )}
                                                        </Label>
                                                        <div className="text-sm text-muted-foreground mt-1 space-y-0.5">
                                                            <p>{address.address_line1}</p>
                                                            {address.address_line2 && <p>{address.address_line2}</p>}
                                                            <p>{address.city}, {address.state} {address.postal_code}</p>
                                                            {address.phone_number && <p>Phone: {address.phone_number}</p>}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )}

                                    {addresses.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-border/30 flex justify-end">
                                            <Button variant="ghost" size="sm" onClick={() => navigate('/addresses')}>
                                                Manage Addresses
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-primary" />
                                    Payment Method
                                </h2>
                                <div className="space-y-3">
                                    <div
                                        onClick={() => setPaymentMethod('razorpay')}
                                        className={`rounded-xl border p-4 cursor-pointer transition-all ${paymentMethod === 'razorpay'
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border/50 hover:border-border'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'razorpay' ? 'border-primary' : 'border-muted-foreground/40'}`}>
                                                {paymentMethod === 'razorpay' && <div className="w-2 h-2 rounded-full bg-primary" />}
                                            </div>
                                            <div>
                                                <p className="font-medium">Pay Online</p>
                                                <p className="text-sm text-muted-foreground">Credit/Debit Card, UPI, Net Banking via Razorpay</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        onClick={() => setPaymentMethod('whatsapp')}
                                        className={`rounded-xl border p-4 cursor-pointer transition-all ${paymentMethod === 'whatsapp'
                                            ? 'border-[#25D366] bg-[#25D366]/5'
                                            : 'border-border/50 hover:border-border'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'whatsapp' ? 'border-[#25D366]' : 'border-muted-foreground/40'}`}>
                                                {paymentMethod === 'whatsapp' && <div className="w-2 h-2 rounded-full bg-[#25D366]" />}
                                            </div>
                                            <div>
                                                <p className="font-medium">Order via WhatsApp</p>
                                                <p className="text-sm text-muted-foreground">Place your order through WhatsApp chat</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Order Summary */}
                        <div className="lg:col-span-5">
                            <div className="sticky top-24 rounded-xl border border-border/50 bg-card p-6 space-y-6">
                                <h2 className="text-lg font-semibold">Order Summary</h2>

                                {/* Items with thumbnails */}
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3 items-center">
                                            <div className="relative h-16 w-16 flex-shrink-0 rounded-lg border bg-white overflow-hidden">
                                                {item.image_url ? (
                                                    <img src={item.image_url} alt={item.title} className="h-full w-full object-contain p-1" />
                                                ) : (
                                                    <div className="w-full h-full bg-secondary" />
                                                )}
                                                <span className="absolute -top-1.5 -right-1.5 bg-muted-foreground text-background text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-medium">
                                                    {item.quantity}
                                                </span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                                            </div>
                                            <p className="text-sm font-medium flex-shrink-0">{formatPrice(item.price * item.quantity)}</p>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                {/* Totals */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>{formatPrice(cartTotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span>{shippingTotal > 0 ? formatPrice(shippingTotal) : <span className="text-green-600">Free</span>}</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className="flex justify-between text-lg font-bold">
                                    <span>Total</span>
                                    <span>{formatPrice(grandTotal)}</span>
                                </div>

                                {/* Action Button */}
                                {paymentMethod === 'razorpay' ? (
                                    <Button
                                        className="w-full h-12 text-base font-semibold bg-foreground text-background hover:bg-foreground/90"
                                        onClick={handlePayment}
                                        disabled={processingPayment || loadingAddresses || addresses.length === 0}
                                    >
                                        {processingPayment ? (
                                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
                                        ) : (
                                            <>Pay {formatPrice(grandTotal)}</>
                                        )}
                                    </Button>
                                ) : (
                                    <Button
                                        className="w-full h-12 text-base font-semibold bg-[#25D366] hover:bg-[#1da851] text-white"
                                        onClick={handleWhatsAppCheckout}
                                        disabled={loadingAddresses || addresses.length === 0}
                                    >
                                        <MessageCircle className="w-5 h-5 mr-2" />
                                        Order via WhatsApp
                                    </Button>
                                )}

                                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <ShieldCheck className="w-3 h-3" />
                                    {paymentMethod === 'razorpay' ? 'Secure Payment via Razorpay' : 'Direct communication via WhatsApp'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
