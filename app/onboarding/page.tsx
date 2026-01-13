'use client'

import { useState } from 'react'
import { submitOnboarding } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function OnboardingPage() {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)
        const result = await submitOnboarding(formData)
        setIsLoading(false)

        if (result?.error) {
            toast.error(result.error)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Welcome to FocusFlow</CardTitle>
                    <CardDescription>
                        Let's set up your strategic goals to personalize your experience.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="weeklyBudget">Weekly Work Hour Budget</Label>
                            <Input
                                id="weeklyBudget"
                                name="weeklyBudget"
                                type="number"
                                placeholder="e.g. 40"
                                min="1"
                                required
                                disabled={isLoading}
                            />
                            <p className="text-sm text-gray-500">
                                How many hours do you want to work this week?
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="hourlyRate">Target Hourly Rate ($)</Label>
                            <Input
                                id="hourlyRate"
                                name="hourlyRate"
                                type="number"
                                placeholder="e.g. 150"
                                min="1"
                                step="0.01"
                                required
                                disabled={isLoading}
                            />
                            <p className="text-sm text-gray-500">
                                Used to calculate the revenue potential of your deep work.
                            </p>
                        </div>

                        <Button className="w-full bg-blue-600 hover:bg-blue-500" type="submit" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Complete Setup
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
