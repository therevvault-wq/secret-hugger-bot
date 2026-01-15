import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-32 px-4">
                <div className="container-rev max-w-4xl">
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
                        REFUND <span className="text-primary">POLICY</span>
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">1. Return Eligibility</h2>
                            <p>
                                We want you to be completely satisfied with your purchase. If you're not happy with your order,
                                you may return eligible items within 7 days of delivery for a refund or exchange.
                            </p>
                            <p className="mt-4">Items must be:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Unused and in original condition</li>
                                <li>In original packaging with all tags and labels attached</li>
                                <li>Accompanied by proof of purchase</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">2. Non-Returnable Items</h2>
                            <p>The following items cannot be returned:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Custom-ordered or specially manufactured parts</li>
                                <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                                <li>Installed or used products</li>
                                <li>Products damaged due to misuse or improper installation</li>
                                <li>Electrical components that have been connected or installed</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">3. Return Process</h2>
                            <p>To initiate a return:</p>
                            <ol className="list-decimal pl-6 space-y-2">
                                <li>Contact our customer service team at therevvault@gmail.com or +91 82872 20775</li>
                                <li>Provide your order number and reason for return</li>
                                <li>Wait for return authorization and instructions</li>
                                <li>Pack the item securely in its original packaging</li>
                                <li>Ship the item to the address provided by our team</li>
                            </ol>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">4. Refund Processing</h2>
                            <p>
                                Once we receive and inspect your return, we will notify you of the approval or rejection of your refund.
                                If approved, your refund will be processed within 7-10 business days to your original payment method.
                            </p>
                            <p className="mt-4">
                                Please note: Shipping costs are non-refundable. You will be responsible for paying your own shipping
                                costs for returning your item unless the return is due to our error or a defective product.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">5. Exchanges</h2>
                            <p>
                                We only replace items if they are defective or damaged. If you need to exchange an item for the same
                                product, contact us at therevvault@gmail.com with your order details.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">6. Damaged or Defective Items</h2>
                            <p>
                                If you receive a damaged or defective item, please contact us immediately with photos of the damage.
                                We will arrange for a replacement or full refund, including shipping costs.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">7. Contact Us</h2>
                            <p>
                                For any questions about returns or refunds, please contact us:
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
