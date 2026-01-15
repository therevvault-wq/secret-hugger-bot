import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-32 px-4">
                <div className="container-rev max-w-4xl">
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8 text-center sm:text-left">
                        REFUND, RETURN & <span className="text-primary">REPLACEMENT</span>
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>

                        <p>
                            At THEREVVAULT, we deal in automotive aftermarket and performance-related products. Due to the nature of these products, we follow a strict no-return policy, except in specific cases mentioned below.
                        </p>

                        <p className="font-semibold italic">
                            Please read this policy carefully before placing an order.
                        </p>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">1. Product Availability</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Not all products listed on our website are always in stock.</li>
                                <li>Expected delivery timelines are mentioned on each product page.</li>
                                <li>If you need a product urgently, we strongly recommend contacting us before placing your order to confirm availability.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase text-destructive">2. No Returns / No Refunds Policy</h2>
                            <div className="bg-destructive/10 border border-destructive/20 p-6 rounded-xl mb-6 shadow-sm">
                                <p className="text-foreground font-bold flex items-center gap-3 text-lg">
                                    <span className="text-2xl">🚫</span> Goods once sold are not eligible for return or refund.
                                </p>
                            </div>
                            <p className="font-semibold text-foreground">This includes, but is not limited to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Change of mind after ordering</li>
                                <li>Incorrect selection by the customer</li>
                                <li>Compatibility or fitment issues</li>
                                <li>Delay expectations once order is dispatched</li>
                                <li>Products ordered without prior confirmation</li>
                            </ul>
                            <p className="mt-6 bg-secondary/20 p-4 rounded-lg border border-border italic text-center">
                                We do not offer refunds under any circumstances unless explicitly stated.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">3. Replacement Policy (Transit Damage Only)</h2>
                            <p>
                                We only offer replacement in the rare event of damage during transit.
                            </p>
                            <p className="mt-4 font-semibold text-foreground">Eligibility for Replacement:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>The product was damaged during shipping</li>
                                <li>The issue is reported within <strong>48 hours (2 days)</strong> of delivery</li>
                                <li>The product is unused and in original packaging</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">4. Mandatory Proof for Transit Damage</h2>
                            <p>To process a replacement request, the following proof is mandatory:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                <div className="bg-secondary/20 p-5 rounded-xl border border-border border-l-4 border-l-primary/50">
                                    <div className="flex gap-4 items-start mb-2">
                                        <span className="text-2xl">🎥</span>
                                        <p className="text-foreground font-bold uppercase tracking-tight">Unboxing Video</p>
                                    </div>
                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                        <li>Must show the sealed package being opened</li>
                                        <li>The damaged product must be clearly visible</li>
                                    </ul>
                                </div>
                                <div className="bg-secondary/20 p-5 rounded-xl border border-border border-l-4 border-l-primary/50">
                                    <div className="flex gap-4 items-start mb-2">
                                        <span className="text-2xl">📸</span>
                                        <p className="text-foreground font-bold uppercase tracking-tight">Photographs</p>
                                    </div>
                                    <ul className="list-disc pl-5 text-sm space-y-1">
                                        <li>Clear shot of the damaged product</li>
                                        <li>Condition of the outer packaging</li>
                                        <li>View of the shipping label</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-destructive/5 border border-destructive/20 p-4 rounded-lg mt-6 flex items-center gap-3">
                                <span className="text-2xl shrink-0">⚠️</span>
                                <p className="text-foreground font-semibold text-sm">
                                    Without a clear unboxing video, replacement requests will not be accepted.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">5. How to Request a Replacement</h2>
                            <p>
                                Please email us at <a href="mailto:therevvault@gmail.com" className="text-primary hover:underline font-medium">therevvault@gmail.com</a> with the following details:
                            </p>
                            <ul className="list-disc pl-6 space-y-1 mt-3">
                                <li>Order number</li>
                                <li>Description of the issue</li>
                                <li>Unboxing video</li>
                                <li>Photographs of damage and packaging</li>
                            </ul>
                            <p className="mt-4 italic text-sm border-l-2 border-primary/30 pl-4 py-1">
                                All requests are subject to verification and approval.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-wide">6. Replacement Approval</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Replacement will be initiated only after verification of submitted proof.</li>
                                <li>If proof is incomplete, unclear, or invalid, the request may be rejected.</li>
                                <li>Decision taken by THEREVVAULT will be final.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-wide">7. Shipping Costs for Replacement</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>If transit damage is confirmed, we will bear the shipping cost for the replacement product.</li>
                                <li>No cash refunds will be issued in place of replacement.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-wide">8. Exclusions</h2>
                            <p className="mb-3">We do not accept replacement requests for:</p>
                            <ul className="list-disc pl-6 space-y-2 bg-secondary/10 p-4 rounded-lg">
                                <li>Products that have been used, installed, or attempted to be installed</li>
                                <li>Damage caused due to incorrect installation or handling</li>
                                <li>Unauthorized modifications or tampering</li>
                                <li>Electrical damage due to improper wiring or voltage issues</li>
                                <li>Requests raised after <strong>48 hours</strong> of delivery</li>
                                <li>Products without original packaging</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">9. Sale / Discounted Items</h2>
                            <p>
                                Products purchased during sales, offers, or discounts are not eligible for return, refund, or replacement unless damaged during transit and reported within the allowed window.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">10. Important Notes for Automotive Products</h2>
                            <div className="bg-primary/5 border border-primary/20 p-6 rounded-xl">
                                <ul className="list-disc pl-6 space-y-3">
                                    <li>Many products sold by THEREVVAULT are vehicle-specific.</li>
                                    <li><strong>Customers are responsible for verifying compatibility before ordering.</strong></li>
                                    <li>We recommend professional installation wherever applicable.</li>
                                    <li>THEREVVAULT is not responsible for vehicle damage, labour costs, or secondary losses.</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">11. Contact Information</h2>
                            <div className="bg-secondary/40 p-8 rounded-2xl border border-border mt-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                                    <div className="w-24 h-24 bg-primary rounded-full blur-3xl"></div>
                                </div>
                                <div className="relative z-10">
                                    <p className="font-display text-2xl text-foreground mb-4 tracking-wider">THEREVVAULT</p>
                                    <div className="space-y-3">
                                        <p className="flex items-center gap-3 group/link">
                                            <span className="text-primary">📧</span>
                                            <a href="mailto:therevvault@gmail.com" className="text-foreground/80 hover:text-primary transition-colors">therevvault@gmail.com</a>
                                        </p>
                                        <p className="flex items-center gap-3">
                                            <span className="text-primary">📍</span>
                                            <span className="text-foreground/80">Delhi, India</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
