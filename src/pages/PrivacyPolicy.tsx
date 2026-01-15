import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-32 px-4">
                <div className="container-rev max-w-4xl">
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
                        PRIVACY <span className="text-primary">POLICY</span>
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">1. Information We Collect</h2>
                            <p>
                                We collect information you provide directly to us when you create an account, make a purchase,
                                or communicate with us. This may include your name, email address, phone number, shipping address,
                                and payment information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">2. How We Use Your Information</h2>
                            <p>We use the information we collect to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Process and fulfill your orders</li>
                                <li>Send you order confirmations and shipping updates</li>
                                <li>Respond to your comments and questions</li>
                                <li>Send you marketing communications (with your consent)</li>
                                <li>Improve our website and customer service</li>
                                <li>Prevent fraud and enhance security</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">3. Information Sharing</h2>
                            <p>
                                We do not sell or rent your personal information to third parties. We may share your information with:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Service providers who assist with order fulfillment, payment processing, and shipping</li>
                                <li>Law enforcement when required by law or to protect our rights</li>
                                <li>Business partners with your explicit consent</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">4. Data Security</h2>
                            <p>
                                We implement appropriate technical and organizational measures to protect your personal information
                                against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission
                                over the internet is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">5. Cookies</h2>
                            <p>
                                We use cookies and similar tracking technologies to track activity on our website and store certain
                                information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">6. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access and receive a copy of your personal data</li>
                                <li>Correct inaccurate or incomplete data</li>
                                <li>Request deletion of your data</li>
                                <li>Opt-out of marketing communications</li>
                                <li>Withdraw consent at any time</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">7. Contact Us</h2>
                            <p>
                                If you have any questions about this Privacy Policy, please contact us at:
                            </p>
                            <p className="mt-2">
                                Email: therevvault@gmail.com<br />
                                Phone: +91 82872 20775
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
