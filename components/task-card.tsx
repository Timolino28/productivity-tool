'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Check, Trash2, Loader2 } from 'lucide-react'
import { updateTask, deleteTask } from '@/app/dashboard/actions'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface Task {
    id: string
    title: string
    category: 'DEEP_WORK' | 'SHALLOW_WORK' | 'ADMIN'
    duration_estimate: number
    is_completed?: boolean
}

interface TaskCardProps {
    task: Task
}

export function TaskCard({ task }: TaskCardProps) {
    const [isPending, startTransition] = useTransition()

    const handleComplete = () => {
        startTransition(async () => {
            const formData = new FormData()
            formData.append('taskId', task.id)
            formData.append('isCompleted', 'true')

            const result = await updateTask(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Task marked as complete')
            }
        })
    }

    const handleDelete = () => {
        startTransition(async () => {
            const formData = new FormData()
            formData.append('taskId', task.id)

            const result = await deleteTask(formData)
            if (result.error) {
                toast.error(result.error)
            } else {
                toast.success('Task deleted')
            }
        })
    }

    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow group relative">
            <CardContent className="p-3">
                <div className="flex justify-between items-start gap-2">
                    <div className="flex-1">
                        <p className={cn("text-sm font-medium leading-none mb-2", task.is_completed && "line-through text-muted-foreground")}>
                            {task.title}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="text-[10px] h-5">
                                {task.duration_estimate}m
                            </Badge>
                            <Badge variant={
                                task.category === 'DEEP_WORK' ? 'default' :
                                    task.category === 'SHALLOW_WORK' ? 'secondary' : 'outline'
                            } className={
                                task.category === 'DEEP_WORK' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200 text-[10px] h-5 px-1 py-0' : 'text-[10px] h-5 px-1 py-0'
                            }>
                                {task.category === 'DEEP_WORK' ? 'Deep' : task.category === 'SHALLOW_WORK' ? 'Shallow' : 'Admin'}
                            </Badge>
                        </div>
                    </div>

                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={handleComplete}
                            disabled={isPending}
                        >
                            <Check className="h-3 w-3" />
                            <span className="sr-only">Complete</span>
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={handleDelete}
                            disabled={isPending}
                        >
                            {isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                            <span className="sr-only">Delete</span>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
