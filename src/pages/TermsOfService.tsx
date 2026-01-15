import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-32 px-4">
                <div className="container-rev max-w-4xl">
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8 text-center sm:text-left">
                        TERMS OF <span className="text-primary">SERVICE</span>
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <section className="bg-secondary/20 p-6 rounded-2xl border border-border mb-8">
                            <h2 className="text-2xl font-display text-foreground mt-0 mb-4 uppercase tracking-wider">Overview</h2>
                            <p className="m-0">
                                This website is operated by THEREVVAULT (“we”, “us”, “our”). By accessing or using this website, including purchasing products or services from us, you agree to be bound by these Terms of Use (“Terms”), along with our Privacy Policy, Return & Refund Policy, and any other policies referenced herein.
                            </p>
                            <p className="mt-4 font-semibold text-foreground">
                                If you do not agree to these Terms, you must not access or use our website or services.
                            </p>
                            <p className="mt-4 text-sm italic">
                                Our customer support is available between 10:00 AM – 6:00 PM IST on working days.
                            </p>
                        </section>

                        <p className="text-lg">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 1 – Eligibility & Store Terms</h2>
                            <p>By using this website, you confirm that:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>You are at least 18 years of age or the age of majority in your jurisdiction.</li>
                                <li>You will not use our products or services for any illegal or unauthorized purpose.</li>
                                <li>You will comply with all applicable local, state, national, and international laws.</li>
                            </ul>
                            <p className="mt-4 font-semibold text-destructive/80">
                                Any violation of these Terms may result in immediate termination of access to our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 2 – General Conditions</h2>
                            <p>We reserve the right to refuse service to anyone for any reason at any time.</p>
                            <p className="mt-3">You understand that:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Your content (excluding payment information) may be transmitted over multiple networks.</li>
                                <li>Payment information is always encrypted during transactions.</li>
                                <li>You may not reproduce, duplicate, copy, sell, resell, or exploit any part of the Service without express written permission from us.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight text-foreground/80">Section 3 – Accuracy of Information</h2>
                            <p>We strive to ensure all information on this website is accurate and up to date. However:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>We do not guarantee completeness, accuracy, or timeliness of content.</li>
                                <li>Product specifications, compatibility details, and images are for reference only.</li>
                                <li>Any reliance on website information is at your own risk.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 4 – Modifications</h2>
                            <p>Prices, product availability, and services are subject to change without prior notice.</p>
                            <p className="mt-3">We reserve the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Modify or discontinue any product or service at any time.</li>
                                <li>Correct pricing errors, inaccuracies, or omissions even after an order is placed.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 5 – Products & Services</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Certain products may be available exclusively online.</li>
                                <li>Products may have limited quantities and are subject to availability.</li>
                                <li>Returns, replacements, or refunds are governed strictly by our Refund, Return & Replacement Policy.</li>
                            </ul>
                            <div className="bg-primary/5 border border-primary/20 p-5 rounded-xl mt-6">
                                <h3 className="text-foreground font-bold flex items-center gap-2 mb-2 uppercase text-sm tracking-widest">
                                    <span>⚠️</span> Automotive Disclaimer
                                </h3>
                                <p className="text-sm italic m-0">
                                    Many products sold are performance or aftermarket parts. Installation, usage, and vehicle compatibility are the customer’s responsibility. We are not liable for improper installation, misuse, or consequential vehicle damage.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 6 – Billing Information</h2>
                            <p>You agree to provide accurate, complete, and current billing and contact information.</p>
                            <p className="mt-3">We reserve the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Cancel or limit orders suspected to be fraudulent or reseller-based.</li>
                                <li>Change payment methods (e.g., disabling COD for high-value orders).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 7 – Third-Party Links</h2>
                            <p>
                                We may provide access to third-party tools or websites. These are provided “as is” and we are not responsible for their content, accuracy, or functionality. Accessing third-party links is at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 8 – User Feedback</h2>
                            <p>By submitting reviews, feedback, images, or suggestions:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>You grant us a non-exclusive, royalty-free, perpetual right to use such content.</li>
                                <li>We are not obligated to maintain confidentiality or provide compensation.</li>
                                <li>We reserve the right to remove any content deemed offensive, misleading, or unlawful.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 9 – Personal Information</h2>
                            <p>
                                Your personal data is governed by our Privacy Policy, which explains how we collect, store, and protect your information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 10 – Errors & Omissions</h2>
                            <p>Occasionally, there may be errors relating to product descriptions, pricing, offers, or availability. We reserve the right to correct such errors and cancel affected orders.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight text-destructive/90">Section 11 – Prohibited Uses</h2>
                            <p>You are prohibited from using this website to:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Violate any laws or regulations</li>
                                <li>Infringe intellectual property rights</li>
                                <li>Transmit malicious code, spam, or fraudulent content</li>
                                <li>Harass, abuse, or harm others</li>
                                <li>Scrape or misuse website data</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 12 – Disclaimer</h2>
                            <p>All products and services are provided “as is” and “as available”. We make no warranties, express or implied, including fitness for a particular purpose or merchantability.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 13 – Liability</h2>
                            <p>To the maximum extent permitted by law, we shall not be liable for indirect, incidental, or consequential damages. Our total liability shall not exceed the amount paid by you for the product or service.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 14 – Indemnification</h2>
                            <p>You agree to indemnify and hold harmless THEREVVAULT, its owners, partners, and affiliates from any claims arising from your misuse of products or violation of these Terms.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 15 – Termination</h2>
                            <p>We may terminate or suspend your access without notice if you violate these Terms. All obligations incurred prior to termination shall survive.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">Section 18 – Governing Law</h2>
                            <p>
                                These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Delhi, India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-wider">Contact Information</h2>
                            <div className="bg-secondary/40 p-8 rounded-2xl border border-border mt-6 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <p className="font-display text-2xl text-foreground mb-4 tracking-wider uppercase">THEREVVAULT</p>
                                    <div className="space-y-3">
                                        <p className="flex items-center gap-3 group/link">
                                            <span className="text-primary font-bold">📧</span>
                                            <a href="mailto:therevvault@gmail.com" className="text-foreground/80 hover:text-primary transition-colors">therevvault@gmail.com</a>
                                        </p>
                                        <p className="flex items-center gap-3">
                                            <span className="text-primary font-bold">📍</span>
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
