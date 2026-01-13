
'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Trash2, Clock } from 'lucide-react'
import { deleteTask, updateTask } from '@/app/dashboard/actions'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Task {
    id: string
    title: string
    category: string
    duration_estimate: number
    is_completed: boolean
}

export function TaskItem({ task }: { task: Task }) {
    const [isLoading, setIsLoading] = useState(false)

    const handleToggleComplete = async () => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('taskId', task.id)
        formData.append('isCompleted', (!task.is_completed).toString())

        const result = await updateTask(formData)

        if (result?.error) {
            toast.error(result.error)
        }
        setIsLoading(false)
    }

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this task?')) return

        setIsLoading(true)
        const formData = new FormData()
        formData.append('taskId', task.id)

        const result = await deleteTask(formData)

        if (result?.error) {
            toast.error(result.error)
            setIsLoading(false)
        }
        // If success, the component will be unmounted by revalidation, so no need to set loading false
    }

    return (
        <Card className={cn("transition-all duration-200", task.is_completed ? "opacity-60 bg-gray-50" : "hover:shadow-md")}>
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                            "h-8 w-8 rounded-full shrink-0",
                            task.is_completed ? "bg-green-100 border-green-200 text-green-600 hover:bg-green-200 hover:text-green-700" : "hover:bg-gray-100"
                        )}
                        onClick={handleToggleComplete}
                        disabled={isLoading}
                    >
                        {task.is_completed && <Check className="h-4 w-4" />}
                        <span className="sr-only">Toggle completion</span>
                    </Button>

                    <div className="space-y-1">
                        <p className={cn("font-medium leading-none transition-all", task.is_completed && "line-through text-gray-500")}>
                            {task.title}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{task.duration_estimate} min</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Badge variant={
                        task.category === 'DEEP_WORK' ? 'default' :
                            task.category === 'SHALLOW_WORK' ? 'secondary' : 'outline'
                    } className={cn(
                        "whitespace-nowrap",
                        task.category === 'DEEP_WORK' ? "bg-blue-100 text-blue-800 hover:bg-blue-200" : ""
                    )}>
                        {task.category.replace('_', ' ')}
                    </Badge>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete task</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
