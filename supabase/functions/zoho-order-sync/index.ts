import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ZOHO_CLIENT_ID = Deno.env.get('ZOHO_CLIENT_ID')
const ZOHO_CLIENT_SECRET = Deno.env.get('ZOHO_CLIENT_SECRET')
const ZOHO_REFRESH_TOKEN = Deno.env.get('ZOHO_REFRESH_TOKEN')

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { record } = await req.json()

        if (!record) {
            throw new Error('No record found in the request body')
        }

        console.log('Processing order:', record.id)

        // 1. Get Access Token from Zoho
        // https://www.zoho.com/crm/developer/docs/api/oauth-overview.html#refresh-access-token
        const tokenResponse = await fetch(
            `https://accounts.zoho.com/oauth/v2/token?refresh_token=${ZOHO_REFRESH_TOKEN}&client_id=${ZOHO_CLIENT_ID}&client_secret=${ZOHO_CLIENT_SECRET}&grant_type=refresh_token`,
            { method: 'POST' }
        )

        const tokenData = await tokenResponse.json()
        if (tokenData.error) {
            console.error('Zoho Token Error:', tokenData.error)
            throw new Error('Failed to refresh Zoho token: ' + JSON.stringify(tokenData))
        }

        const accessToken = tokenData.access_token

        // 2. Map Supabase Order to Zoho Sales Order
        // Note: You need to map Products effectively. 
        // This assumes 'items' matches your Zoho Product codes or you create ad-hoc items.
        const zohoOrderData = {
            data: [
                {
                    Subject: `Order ${record.id.slice(0, 8)}`,
                    Status: 'Created',
                    // Account_Name: { id: "YOUR_DEFAULT_ACCOUNT_ID" }, // Or map from user_id if you sync contacts
                    Grand_Total: record.total_amount,
                    Product_Details: record.items.map((item: any) => ({
                        product: {
                            name: item.title,
                            // Product_Code: item.id // If you sync IDs
                        },
                        quantity: item.quantity,
                        list_price: item.price,
                        net_total: item.price * item.quantity
                    })),
                    Billing_Street: record.shipping_address, // Simplification
                    // Add more fields as needed: Billing_City, Billing_Country, etc.
                }
            ]
        }

        // 3. Create Sales Order in Zoho CRM
        const zohoResponse = await fetch('https://www.zohoapis.com/crm/v2/Sales_Orders', {
            method: 'POST',
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(zohoOrderData)
        })

        const zohoResult = await zohoResponse.json()
        console.log('Zoho Create Response:', zohoResult)

        return new Response(
            JSON.stringify({ success: true, zoho_response: zohoResult }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error) {
        console.error('Error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
