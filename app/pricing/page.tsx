
'use client'

import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { toast } from 'sonner'

export default function PricingPage() {
    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/stripe/checkout', { method: 'POST' })
            if (!response.ok) throw new Error('Checkout failed')
            const data = await response.json()
            window.location.href = data.url
        } catch (error) {
            toast.error("Checkout failed. Check server logs/keys.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">Simple, Transparent Pricing</h1>
                <p className="mt-4 text-lg text-gray-600">Invest in your focus. One plan, everything included.</p>
            </div>

            <Card className="w-full max-w-md border-blue-200 shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                </div>
                <CardHeader>
                    <CardTitle className="text-2xl">Pro Monthly</CardTitle>
                    <CardDescription>Unlock your full revenue potential</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold">$29</span>
                        <span className="text-gray-500">/month</span>
                    </div>

                    <ul className="space-y-3">
                        {[
                            'Unlimited Strategic Input',
                            'Smart Week Scheduling',
                            'Revenue Impact Dashboard',
                            'Priority Support'
                        ].map((feature) => (
                            <li key={feature} className="flex items-center gap-2">
                                <Check className="h-4 w-4 text-blue-600" />
                                <span className="text-gray-600 text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleCheckout} className="w-full bg-blue-600 hover:bg-blue-500" size="lg">
                        Subscribe Now
                    </Button>
                </CardFooter>
            </Card>

            <p className="mt-8 text-center text-sm text-gray-500">
                Secure payment via Stripe. Cancel anytime.
            </p>
        </div>
    )
}
