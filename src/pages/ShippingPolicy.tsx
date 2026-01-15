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

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">1. Shipping Coverage</h2>
                            <p>
                                We currently ship to all locations within India. For international orders, please contact us directly
                                at therevvault@gmail.com for a custom shipping quote.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">2. Processing Time</h2>
                            <p>
                                Orders are typically processed within 1-3 business days (excluding weekends and holidays). You will
                                receive a confirmation email with tracking information once your order has been shipped.
                            </p>
                            <p className="mt-4">
                                Please note: Custom orders or special-order items may require additional processing time. We will
                                notify you of any delays.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">3. Delivery Time</h2>
                            <p>Estimated delivery times vary by location:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Metro Cities (Delhi, Mumbai, Bangalore, etc.):</strong> 3-5 business days</li>
                                <li><strong>Tier 2 Cities:</strong> 5-7 business days</li>
                                <li><strong>Remote Areas:</strong> 7-14 business days</li>
                            </ul>
                            <p className="mt-4">
                                These are estimates and actual delivery times may vary depending on courier availability, weather
                                conditions, and other factors beyond our control.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">4. Shipping Costs</h2>
                            <p>
                                Shipping costs are calculated based on the weight, dimensions, and destination of your order.
                                The exact shipping cost will be displayed at checkout before you complete your purchase.
                            </p>
                            <p className="mt-4">
                                <strong>Free Shipping:</strong> We offer free shipping on orders above ₹10,000 to select locations.
                                Check at checkout to see if your location qualifies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">5. Order Tracking</h2>
                            <p>
                                Once your order ships, you will receive a tracking number via email and SMS. You can track your
                                shipment using this number on the courier's website or through your account on our website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">6. Delivery Requirements</h2>
                            <p>
                                Someone must be available to receive the package at the shipping address. If no one is available,
                                the courier will leave a notice with instructions for redelivery or pickup.
                            </p>
                            <p className="mt-4">
                                Please ensure your shipping address is complete and accurate. We are not responsible for delays or
                                non-delivery due to incorrect or incomplete addresses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">7. Damaged or Lost Shipments</h2>
                            <p>
                                If your package arrives damaged, please:
                            </p>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>Take photos of the damaged packaging and product</li>
                                <li>Contact us immediately at therevvault@gmail.com</li>
                                <li>Keep all packaging materials for inspection</li>
                            </ol>
                            <p className="mt-4">
                                For lost shipments, please contact us if your order hasn't arrived within the estimated delivery
                                timeframe. We will work with the courier to locate your package or arrange a replacement.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">8. Large or Heavy Items</h2>
                            <p>
                                Some automotive parts are large or heavy and may require special shipping arrangements. For such items:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Delivery may require a signature</li>
                                <li>Curbside delivery is standard (delivery to your doorstep may incur additional charges)</li>
                                <li>You may need to arrange for additional help to move the item</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">9. International Shipping</h2>
                            <p>
                                For international orders, please note:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Additional customs duties and taxes may apply</li>
                                <li>Delivery times are estimates and may vary significantly</li>
                                <li>The customer is responsible for all customs fees and import duties</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">10. Contact Us</h2>
                            <p>
                                For shipping inquiries or issues, please contact us:
                            </p>
                            <p className="mt-2">
                                Email: therevvault@gmail.com<br />
                                Phone: +91 82872 20775<br />
                                WhatsApp: +91 97178 20775
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
