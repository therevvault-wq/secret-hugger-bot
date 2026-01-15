import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-32 px-4">
                <div className="container-rev max-w-4xl">
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
                        SHIPPING <span className="text-primary">POLICY</span>
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>

                        <p>
                            This Shipping Policy outlines how orders placed on THEREVVAULT are processed, shipped, and delivered. By placing an order with us, you agree to the terms mentioned below.
                        </p>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">1. Order Processing Time</h2>
                            <p>
                                Orders are processed only on business days (excluding Sundays and public holidays).
                            </p>
                            <div className="bg-secondary/30 border border-primary/20 p-4 rounded-lg mt-4">
                                <p className="text-foreground">
                                    <span className="mr-2">⚠️</span>
                                    During high-demand periods or product backorders, processing times may be longer. Customers will be informed accordingly.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">2. Shipping & Delivery Timelines</h2>
                            <p>
                                Orders are shipped through registered domestic courier companies and/or India Speed Post.
                            </p>
                            <p className="mt-4">
                                Estimated delivery time after dispatch is typically <strong>7–21 days</strong>, depending on:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Product availability</li>
                                <li>Shipping location</li>
                                <li>Courier partner operations</li>
                            </ul>
                            <p className="mt-4 italic">
                                Please note that delivery timelines are estimates and may vary due to courier or logistical factors beyond our control.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">3. Shipping Charges</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Shipping charges vary based on product type, weight, location, and courier partner.</li>
                                <li>Shipping rates are calculated automatically at checkout.</li>
                                <li>In some cases, shipping charges may be partially or fully absorbed by THEREVVAULT as part of a promotion.</li>
                                <li>The selection of courier service and shipping cost is handled automatically by our system.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">4. Order Tracking</h2>
                            <p>
                                Once your order is dispatched, you will receive an AWB / Tracking Number via email, SMS, or WhatsApp.
                            </p>
                            <p className="mt-2">
                                You can track your order using the provided tracking details.
                            </p>
                            <p className="mt-2">
                                If you face any issues with tracking, you may contact us at <a href="mailto:therevvault@gmail.com" className="text-primary hover:underline">therevvault@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">5. Multiple Shipments</h2>
                            <p>
                                If your order contains multiple items:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Products may be shipped separately from different warehouses.</li>
                                <li>Items may arrive in multiple packages and at different times.</li>
                                <li>This is done to avoid unnecessary delays and ensure faster delivery.</li>
                                <li>There is no additional shipping charge for split shipments unless informed otherwise.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">6. Delivery Address</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Orders are delivered only to the address provided at checkout.</li>
                                <li>Address changes are not possible once the order has been placed.</li>
                                <li>Please ensure that your address, pin code, and contact number are accurate.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">7. Delayed, Lost, or Stuck Shipments</h2>
                            <p>
                                All orders are shipped using insured delivery services.
                            </p>
                            <p className="mt-2">
                                If an order gets stuck, is sent back, or lost during delivery, we apologize for the inconvenience. Since the postal service is beyond our control, we'll work with you to resolve the issue.
                            </p>
                            <p className="mt-2">
                                Once the issue is verified, a replacement shipment may be arranged if needed.
                            </p>
                            <div className="bg-secondary/30 border border-primary/20 p-4 rounded-lg mt-4">
                                <p className="text-foreground">
                                    <span className="mr-2">⚠️</span>
                                    Since courier operations are beyond our control, delivery delays do not qualify for refunds.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">8. Undelivered or Returned Shipments</h2>
                            <p>
                                If an order is returned to us due to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Incorrect address</li>
                                <li>Customer unavailable</li>
                                <li>Refusal to accept delivery</li>
                            </ul>
                            <p className="mt-4">
                                Re-shipping charges may apply, and delivery timelines may reset.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">9. Delivery Confirmation</h2>
                            <p>
                                Order delivery confirmation is provided via courier tracking updates.
                            </p>
                            <p className="mt-2">
                                THEREVVAULT is not responsible for delays caused by courier companies, natural events, strikes, or government restrictions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">10. Returns, Refunds & Replacements</h2>
                            <p>
                                All shipping-related concerns must be read in conjunction with our <strong>Refund, Return & Replacement Policy</strong>, which outlines eligibility and procedures.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">11. Contact Information</h2>
                            <p>
                                For shipping-related queries, contact us at:
                            </p>
                            <div className="bg-secondary/20 p-6 rounded-xl border border-border mt-4">
                                <p className="font-display text-xl text-foreground mb-4">THEREVVAULT</p>
                                <p className="flex items-center gap-2 mb-2">
                                    <span>📧</span>
                                    <a href="mailto:therevvault@gmail.com" className="text-primary hover:underline">therevvault@gmail.com</a>
                                </p>
                                <p className="flex items-center gap-2">
                                    <span>📍</span>
                                    <span>Delhi, India</span>
                                </p>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
