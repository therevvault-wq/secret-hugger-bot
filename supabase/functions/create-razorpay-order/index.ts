import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Razorpay from "npm:razorpay@2.9.2"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {
                global: {
                    headers: { Authorization: req.headers.get('Authorization')! },
                },
            }
        )

        const {
            data: { user },
        } = await supabaseClient.auth.getUser()

        if (!user) {
            throw new Error('User not found')
        }

        const { amount, currency = 'INR', receipt, notes } = await req.json()

        if (!amount) {
            throw new Error('Amount is required')
        }

        const razorpay = new Razorpay({
            key_id: Deno.env.get('RAZORPAY_KEY_ID')!,
            key_secret: Deno.env.get('RAZORPAY_KEY_SECRET')!,
        })

        const options = {
            amount: Math.round(amount * 100), // amount in the smallest currency unit
            currency,
            receipt,
            notes,
        }

        const order = await razorpay.orders.create(options)

        return new Response(
            JSON.stringify({ ...order, key_id: Deno.env.get('RAZORPAY_KEY_ID') }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            },
        )
    }
})
