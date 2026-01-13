
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TaskCard } from '@/components/task-card'

interface Task {
    id: string
    title: string
    category: 'DEEP_WORK' | 'SHALLOW_WORK' | 'ADMIN'
    duration_estimate: number // minutes
}

// Naive scheduler: distribute tasks evenly across 5 days
// Naive scheduler: fill each day up to 8 hours (480 mins) before moving to next
function generateSchedule(tasks: Task[]) {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const schedule: Record<string, Task[]> = {
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
    }

    // Sort by priority (Deep Work first)
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.category === 'DEEP_WORK' && b.category !== 'DEEP_WORK') return -1
        if (a.category !== 'DEEP_WORK' && b.category === 'DEEP_WORK') return 1
        return 0
    })

    const MAX_MINUTES_PER_DAY = 480 // 8 hours
    let currentDayIndex = 0
    let currentDayMinutes = 0

    sortedTasks.forEach((task) => {
        // If adding this task exceeds the daily limit and we are not on Friday yet, move to next day
        if (currentDayMinutes + task.duration_estimate > MAX_MINUTES_PER_DAY && currentDayIndex < 4) {
            currentDayIndex++
            currentDayMinutes = 0
        }

        const day = days[currentDayIndex]
        schedule[day].push(task)
        currentDayMinutes += task.duration_estimate
    })

    return schedule
}

export default async function SchedulePage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return redirect('/auth')

    const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_completed', false) // Only schedule incomplete tasks

    const schedule = generateSchedule((tasks || []) as Task[])
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">Smart Schedule</h1>
                <p className="text-gray-500">Your optimized week at a glance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {days.map((day) => (
                    <div key={day} className="flex flex-col gap-4">
                        <h3 className="font-semibold text-center text-gray-700">{day}</h3>
                        <div className="space-y-3">
                            {schedule[day].map((task) => (
                                <TaskCard key={task.id} task={task} />
                            ))}
                            {schedule[day].length === 0 && (
                                <div className="h-24 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
                                    Free Day
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
