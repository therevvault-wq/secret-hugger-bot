import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 py-32 px-4">
                <div className="container-rev max-w-4xl">
                    <h1 className="font-display text-4xl md:text-5xl text-foreground mb-8">
                        TERMS OF <span className="text-primary">SERVICE</span>
                    </h1>

                    <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
                        <p className="text-lg">
                            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">1. Agreement to Terms</h2>
                            <p>
                                By accessing and using The Rev Vault website, you accept and agree to be bound by the terms and
                                provisions of this agreement. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">2. Use of Service</h2>
                            <p>You agree to use our service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Use the service in any way that violates any applicable law or regulation</li>
                                <li>Impersonate or attempt to impersonate The Rev Vault, our employees, or other users</li>
                                <li>Engage in any conduct that restricts or inhibits anyone's use of the service</li>
                                <li>Use any automated system to access the service without our permission</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">3. Product Information</h2>
                            <p>
                                We strive to provide accurate product descriptions and pricing. However, we do not warrant that product
                                descriptions, pricing, or other content is accurate, complete, reliable, current, or error-free. We reserve
                                the right to correct any errors and to change or update information at any time without prior notice.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">4. Orders and Payments</h2>
                            <p>
                                All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order
                                for any reason, including but not limited to product availability, errors in pricing or product information,
                                or suspected fraudulent activity.
                            </p>
                            <p className="mt-4">
                                Payment must be received before orders are processed. We accept various payment methods as displayed
                                during checkout. All prices are in Indian Rupees (INR) unless otherwise stated.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">5. Intellectual Property</h2>
                            <p>
                                The service and its original content, features, and functionality are owned by The Rev Vault and are
                                protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">6. User Accounts</h2>
                            <p>
                                When you create an account with us, you must provide accurate and complete information. You are responsible
                                for maintaining the confidentiality of your account and password. You agree to accept responsibility for all
                                activities that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">7. Limitation of Liability</h2>
                            <p>
                                The Rev Vault shall not be liable for any indirect, incidental, special, consequential, or punitive damages
                                resulting from your use of or inability to use the service. Our total liability shall not exceed the amount
                                you paid for the product or service in question.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">8. Product Warranties</h2>
                            <p>
                                Products sold are covered by manufacturer warranties where applicable. The Rev Vault is not responsible for
                                warranty claims beyond facilitating communication with manufacturers. Installation of parts should be done
                                by qualified professionals.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">9. Modifications to Terms</h2>
                            <p>
                                We reserve the right to modify or replace these Terms at any time. We will provide notice of any material
                                changes by posting the new Terms on this page. Your continued use of the service after any changes constitutes
                                acceptance of the new Terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">10. Governing Law</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of India, without regard to its
                                conflict of law provisions. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction
                                of the courts in Delhi, India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-display text-foreground mt-8 mb-4">11. Contact Information</h2>
                            <p>
                                If you have any questions about these Terms, please contact us:
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
