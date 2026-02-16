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
            console.error('User not found in request context')
            throw new Error('User not found')
        }

        const { amount, currency = 'INR', receipt, notes } = await req.json()

        if (!amount) {
            console.error('Amount is required but missing')
            throw new Error('Amount is required')
        }

        const key_id = Deno.env.get('RAZORPAY_KEY_ID')
        const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET')

        if (!key_id || !key_secret) {
            console.error('Razorpay keys are missing in environment variables')
            throw new Error('Server configuration error: Missing Razorpay keys')
        }

        const razorpay = new Razorpay({
            key_id: key_id,
            key_secret: key_secret,
        })

        const options = {
            amount: Math.round(amount * 100), // amount in the smallest currency unit
            currency,
            receipt,
            notes,
        }

        console.log('Creating Razorpay order with options:', JSON.stringify(options))
        const order = await razorpay.orders.create(options)
        console.log('Razorpay order created successfully:', order.id)

        return new Response(
            JSON.stringify({ ...order, key_id: key_id }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    } catch (error: any) {
        console.error('Error in create-razorpay-order:', error.message)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200, // Return 200 so client can read the error message
            },
        )
    }
})
