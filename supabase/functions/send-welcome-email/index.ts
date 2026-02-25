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
        const { email } = await req.json();

        if (!email) {
            return new Response(
                JSON.stringify({ error: "Email is required" }),
                { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
                from: "The Rev Vault <contact@therevvault.in>",
                to: [email],
                subject: "Welcome to The Rev Vault! 🚗",
                html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0a0a; color: #ffffff; padding: 40px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #ff4d00; font-size: 32px; margin: 0;">THE REV VAULT</h1>
              <p style="color: #888; font-size: 14px; margin-top: 5px;">Premium Performance & Aesthetic Parts</p>
            </div>
            
            <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%); border: 1px solid #333; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
              <h2 style="color: #ffffff; margin-top: 0;">Welcome to the Vault! 🔓</h2>
              <p style="color: #cccccc; line-height: 1.6;">
                Thank you for subscribing to The Rev Vault newsletter! You're now part of an exclusive community of automotive enthusiasts.
              </p>
              <p style="color: #cccccc; line-height: 1.6;">
                As a subscriber, you'll get:
              </p>
              <ul style="color: #cccccc; line-height: 1.8;">
                <li>🚀 Early access to new arrivals</li>
                <li>💰 Exclusive discounts and deals</li>
                <li>📦 First dibs on limited edition parts</li>
                <li>🎯 Personalized recommendations for your ride</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin-bottom: 30px;">
              <a href="https://therevvault.com/shop" style="display: inline-block; background-color: #ff4d00; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Explore Our Collection
              </a>
            </div>
            
            <div style="border-top: 1px solid #333; padding-top: 20px; text-align: center;">
              <p style="color: #888; font-size: 12px; margin: 0;">
                © 2024 The Rev Vault. All rights reserved.<br>
                <a href="https://therevvault.com" style="color: #ff4d00; text-decoration: none;">therevvault.com</a>
              </p>
            </div>
          </div>
        `,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("Resend API error:", data);
            return new Response(
                JSON.stringify({ error: "Failed to send email", details: data }),
                { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({ success: true, message: "Welcome email sent!", data }),
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
