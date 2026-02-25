import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "re_Q1vT64hL_EuFnYWuaKvS55sDEvCD5gCAN";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { recipients, subject, html } = await req.json();

        if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
            return new Response(
                JSON.stringify({ error: "Recipients array is required" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        if (!subject || !html) {
            return new Response(
                JSON.stringify({ error: "Subject and HTML content are required" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const results = [];
        const errors = [];

        // Send emails sequentially to avoid hitting rate limits too hard
        // For a large list, this should be chunked by the client, e.g., 20-50 at a time.
        for (const email of recipients) {
            try {
                const res = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${RESEND_API_KEY}`,
                    },
                    body: JSON.stringify({
                        from: "The Rev Vault <contact@therevvault.in>",
                        to: [email],
                        subject: subject,
                        html: html,
                    }),
                });

                const data = await res.json();
                if (!res.ok) {
                    errors.push({ email, error: data });
                } else {
                    results.push({ email, id: data.id });
                }
            } catch (error) {
                errors.push({ email, error: error.message });
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: `Processed ${recipients.length} emails`,
                sent: results.length,
                failed: errors.length,
                details: { sent: results, failed: errors }
            }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("Error:", error);
        return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }
});
