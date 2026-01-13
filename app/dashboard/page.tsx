
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { TaskInput } from '@/components/task-input'
import { TaskList } from '@/components/task-list'

export default async function DashboardPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/auth')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

    if (!profile) {
        return redirect('/onboarding')
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
                <p className="text-gray-500">Welcome back, {user.email}! Time to plan your impact.</p>
            </div>

            <TaskInput />

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Task Queue</h2>
                <TaskList />
            </div>
        </div>
    )
}
