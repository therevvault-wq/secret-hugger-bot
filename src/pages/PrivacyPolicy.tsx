import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-32 px-4">
                <div className="container-rev max-w-4xl">
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8 text-center sm:text-left">
                        PRIVACY <span className="text-primary">POLICY</span>
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>

                        <p>
                            This Privacy Policy describes how THEREVVAULT (“we”, “us”, “our”) collects, uses, stores, and protects your personal information when you visit our website, make a purchase, or otherwise interact with us (collectively, the “Services”).
                        </p>

                        <p>
                            By accessing or using our Services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree, please do not use our website or Services.
                        </p>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">1. Who We Are</h2>
                            <div className="bg-secondary/20 p-5 rounded-xl border border-border">
                                <p className="text-foreground font-semibold mb-1">Brand Name: <span className="text-primary font-display ml-2">THEREVVAULT</span></p>
                                <p>Location: Delhi, India</p>
                                <p>Email: therevvault@gmail.com</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">2. Information We Collect</h2>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">A. Information You Provide Directly</h3>
                                    <p>We may collect personal information including:</p>
                                    <ul className="list-disc pl-6 space-y-1 mt-2">
                                        <li>Full name</li>
                                        <li>Email address</li>
                                        <li>Phone number</li>
                                        <li>Billing and shipping address</li>
                                        <li>Vehicle details (if provided voluntarily)</li>
                                        <li>Account login details</li>
                                        <li>Communications with customer support</li>
                                    </ul>
                                </div>

                                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                                    <h3 className="text-foreground font-semibold mb-2 flex items-center gap-2">
                                        <span>B. Payment Information</span>
                                    </h3>
                                    <p>Payments on our website may be made via Credit/Debit Cards, UPI, Net Banking, and other supported methods.</p>
                                    <p className="mt-3 text-sm flex items-center gap-2">
                                        <span className="text-lg">⚠️</span>
                                        <span className="font-semibold text-foreground italic">Important: We do not store your card or banking details. All payments are securely processed by trusted third-party payment gateways.</span>
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-foreground font-semibold mb-2">C. Information Collected Automatically</h3>
                                    <p>When you browse our website, we may automatically collect:</p>
                                    <ul className="list-disc pl-6 space-y-1 mt-2 text-sm italic">
                                        <li>IP address</li>
                                        <li>Browser type and version</li>
                                        <li>Device information</li>
                                        <li>Pages visited and time spent</li>
                                        <li>Referring URLs</li>
                                        <li>Cookie and analytics data</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">3. Cookies & Tracking Technologies</h2>
                            <p>We use cookies, pixels, and similar technologies to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Ensure smooth website functionality</li>
                                <li>Remember your preferences</li>
                                <li>Analyse traffic and user behaviour</li>
                                <li>Improve marketing and advertising effectiveness</li>
                            </ul>
                            <p className="mt-4 text-sm italic">
                                You may disable cookies through your browser settings. However, doing so may affect certain website features.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">4. How We Use Your Information</h2>
                            <p>We use your information to:</p>
                            <ul className="list-disc pl-6 space-y-2 mt-2">
                                <li>Process and deliver orders</li>
                                <li>Manage user accounts</li>
                                <li>Communicate order updates and service messages</li>
                                <li>Provide customer support</li>
                                <li>Improve website performance and offerings</li>
                                <li>Prevent fraud and ensure platform security</li>
                                <li>Send promotional offers and updates (you can opt out anytime)</li>
                                <li>Comply with legal and regulatory obligations</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">5. Sharing of Information</h2>
                            <p>We may share your information only when necessary, including with:</p>
                            <ul className="list-disc pl-6 space-y-1 mt-2">
                                <li>Payment processors (to complete transactions)</li>
                                <li>Logistics and courier partners (to deliver orders)</li>
                                <li>Technology and analytics partners (for website optimisation)</li>
                                <li>Marketing platforms (only where permitted by law)</li>
                                <li>Government or legal authorities, if required</li>
                            </ul>
                            <p className="mt-4 font-bold text-foreground flex items-center gap-2">
                                <span>🚫</span> We do not sell your personal data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">6. User-Generated Content</h2>
                            <p>If you post reviews, images, comments, or other content publicly:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Such content may be visible to others</li>
                                <li>We are not responsible for how third parties use publicly shared information</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">7. Data Retention</h2>
                            <p>We retain personal information only as long as:</p>
                            <ul className="list-disc pl-6 space-y-1">
                                <li>Required to fulfill orders or services</li>
                                <li>Necessary for customer support or dispute resolution</li>
                                <li>Mandated by applicable Indian laws</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">8. Data Security</h2>
                            <p>
                                We take reasonable technical and organisational measures to protect your personal information.
                                However, no online transmission is completely secure, and absolute security cannot be guaranteed.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">9. Your Rights</h2>
                            <p>Subject to applicable laws, you may request to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate data</li>
                                <li>Delete certain personal data (where legally permissible)</li>
                                <li>Opt out of marketing communications</li>
                            </ul>
                            <p className="mt-4">
                                Requests can be sent to <a href="mailto:therevvault@gmail.com" className="text-primary hover:underline">therevvault@gmail.com</a>.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">10. Children’s Privacy</h2>
                            <p>
                                Our Services are not intended for individuals under 18 years of age.
                                We do not knowingly collect personal information from minors.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">11. Third-Party Links</h2>
                            <p>
                                Our website may contain links to third-party websites.
                                We are not responsible for their privacy practices or content. Please review their policies separately.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">12. Changes to this Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time.
                                Updates will be posted on this page with a revised date. Continued use of our Services means acceptance of the updated policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase tracking-tight">13. Governing Law</h2>
                            <p>
                                This Privacy Policy shall be governed by the laws of India.
                                Any disputes shall be subject to the jurisdiction of courts located in Delhi, India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4 uppercase">14. Contact Us</h2>
                            <div className="bg-secondary/40 p-8 rounded-2xl border border-border mt-6 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform text-4xl">
                                    🔒
                                </div>
                                <div className="relative z-10">
                                    <p className="font-display text-2xl text-foreground mb-4 tracking-wider uppercase">THEREVVAULT</p>
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
