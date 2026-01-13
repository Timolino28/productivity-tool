
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { DollarSign, TrendingUp, AlertCircle, Clock } from 'lucide-react'

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount)
}

export default async function RevenuePage() {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return redirect('/auth')

    // Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (!profile) return redirect('/onboarding')

    // Fetch Tasks
    const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)

    const deepWorkTasks = tasks?.filter(t => t.category === 'DEEP_WORK') || []
    const adminTasks = tasks?.filter(t => t.category === 'ADMIN') || []
    const shallowTasks = tasks?.filter(t => t.category === 'SHALLOW_WORK') || []

    // Calculate Metrics
    const hourlyRate = profile.hourly_rate || 0
    const deepWorkMinutes = deepWorkTasks.reduce((acc, t) => acc + (t.duration_estimate || 0), 0)
    const adminMinutes = adminTasks.reduce((acc, t) => acc + (t.duration_estimate || 0), 0)
    const shallowMinutes = shallowTasks.reduce((acc, t) => acc + (t.duration_estimate || 0), 0)

    const potentialRevenue = (deepWorkMinutes / 60) * hourlyRate
    const opportunityCost = ((adminMinutes + shallowMinutes) / 60) * hourlyRate

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Revenue Impact</h1>
                <p className="text-gray-500">Analyze the financial value of your time allocation.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Potential Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatCurrency(potentialRevenue)}</div>
                        <p className="text-xs text-muted-foreground">
                            Based on {Math.round(deepWorkMinutes / 60)}h of Deep Work
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Opportunity Cost</CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">-{formatCurrency(opportunityCost)}</div>
                        <p className="text-xs text-muted-foreground">
                            Lost to Admin & Shallow work
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Deep Work Ratio</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {tasks && tasks.length > 0
                                ? Math.round((deepWorkMinutes / (deepWorkMinutes + adminMinutes + shallowMinutes)) * 100)
                                : 0}%
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Target: 60%
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Planned Time</CardTitle>
                        <Clock className="h-4 w-4 text-gray-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {((deepWorkMinutes + adminMinutes + shallowMinutes) / 60).toFixed(1)}h
                        </div>
                        <p className="text-xs text-muted-foreground">
                            of {profile.weekly_budget}h Budget
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Opportunity to add charts here later */}
            <Card className="bg-blue-50 border-blue-100">
                <CardHeader>
                    <CardTitle className="text-blue-900">Calculated Impact</CardTitle>
                    <CardDescription className="text-blue-700">
                        Your hourly rate of <span className="font-semibold">{formatCurrency(hourlyRate)}/hr</span> means every hour of admin work costs you money.
                        FocusFlow recommends delegating {Math.round(adminMinutes / 60)} hours of admin tasks to reclaim <span className="font-semibold">{formatCurrency((adminMinutes / 60) * hourlyRate)}</span>.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
