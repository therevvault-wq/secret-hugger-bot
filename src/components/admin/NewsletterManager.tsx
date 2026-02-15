import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Loader2, Send, Users, Mail } from "lucide-react";
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Progress } from "@/components/ui/progress";

export default function NewsletterManager() {
    const [subscribers, setSubscribers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [progress, setProgress] = useState(0);
    const [testEmail, setTestEmail] = useState("");

    // Form Data
    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            const { data, error } = await (supabase as any)
                .from('newsletter_subscribers')
                .select('email');

            if (error) throw error;
            setSubscribers(data.map(s => s.email));
        } catch (error) {
            console.error('Error fetching subscribers:', error);
            toast.error('Failed to load subscribers');
        } finally {
            setLoading(false);
        }
    };

    const sendEmail = async (recipients: string[], isTest = false) => {
        if (!subject || !content) {
            toast.error("Please provide both subject and content");
            return;
        }

        try {
            const { data, error } = await supabase.functions.invoke('send-newsletter', {
                body: {
                    recipients,
                    subject: isTest ? `[TEST] ${subject}` : subject,
                    html: content
                }
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            return data;
        } catch (error: any) {
            console.error('Error sending email:', error);
            throw error;
        }
    };

    const handleSendTest = async () => {
        if (!testEmail) {
            toast.error("Please enter a test email address");
            return;
        }

        setSending(true);
        try {
            await sendEmail([testEmail], true);
            toast.success(`Test email sent to ${testEmail}`);
        } catch (error: any) {
            toast.error("Failed to send test email: " + (error.message || "Unknown error"));
        } finally {
            setSending(false);
        }
    };

    const handleSendCampaign = async () => {
        if (subscribers.length === 0) {
            toast.error("No subscribers to send to");
            return;
        }

        if (!confirm(`Are you sure you want to send this email to ${subscribers.length} subscribers?`)) {
            return;
        }

        setSending(true);
        setProgress(0);
        let successCount = 0;
        let failCount = 0;

        try {
            // Chunk recipients to avoid timeouts/limits
            const CHUNK_SIZE = 20;
            const chunks = [];
            for (let i = 0; i < subscribers.length; i += CHUNK_SIZE) {
                chunks.push(subscribers.slice(i, i + CHUNK_SIZE));
            }

            for (let i = 0; i < chunks.length; i++) {
                try {
                    const result = await sendEmail(chunks[i]);
                    successCount += result.sent || 0;
                    failCount += result.failed || 0;
                } catch (e) {
                    console.error(`Failed to send chunk ${i}`, e);
                    failCount += chunks[i].length;
                }

                // Update progress
                setProgress(Math.round(((i + 1) / chunks.length) * 100));
            }

            toast.success(`Campaign finished. Sent: ${successCount}, Failed: ${failCount}`);

            // Allow sending again by NOT clearing form, but maybe good to confirm done
        } catch (error: any) {
            toast.error("Campaign interrupted: " + error.message);
        } finally {
            setSending(false);
            setProgress(0);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    if (loading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-display text-foreground">Newsletter Campaign</h2>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        <Users className="w-4 h-4" />
                        Total Subscribers: {subscribers.length}
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Compose Area */}
                <Card className="lg:col-span-2 border-border">
                    <CardHeader>
                        <CardTitle>Compose Email</CardTitle>
                        <CardDescription>Create your newsletter content</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject *</Label>
                            <Input
                                id="subject"
                                placeholder="Enter email subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Content *</Label>
                            <div className="min-h-[300px] quill-editor">
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    modules={modules}
                                    placeholder="Write your newsletter here..."
                                    className="h-[250px] mb-12"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Actions Area */}
                <div className="space-y-6">
                    {/* Test Email */}
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="text-lg">Test Sending</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="test-email">Test Email Address</Label>
                                <Input
                                    id="test-email"
                                    placeholder="your@email.com"
                                    value={testEmail}
                                    onChange={(e) => setTestEmail(e.target.value)}
                                />
                            </div>
                            <Button
                                onClick={handleSendTest}
                                variant="outline"
                                className="w-full"
                                disabled={sending}
                            >
                                {sending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                                Send Test
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Blast Campaign */}
                    <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-lg text-primary flex items-center gap-2">
                                <Mail className="w-5 h-5" />
                                Send Campaign
                            </CardTitle>
                            <CardDescription>
                                Will send to {subscribers.length} subscribers.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {sending && progress > 0 && (
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs text-muted-foreground">
                                        <span>Sending...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>
                            )}

                            <Button
                                onClick={handleSendCampaign}
                                className="w-full btn-primary"
                                disabled={sending || subscribers.length === 0}
                            >
                                {sending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Users className="w-4 h-4 mr-2" />
                                        Send to All
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
