'use client'

import { useState } from 'react'
import { addTask } from '@/app/dashboard/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Plus } from 'lucide-react'

export function TaskInput() {
    const [isLoading, setIsLoading] = useState(false)

    const handleAddTask = async (formData: FormData) => {
        setIsLoading(true)
        const result = await addTask(formData)
        setIsLoading(false)

        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success('Task added to your queue')
            // Reset form (simple way)
            const form = document.getElementById('task-form') as HTMLFormElement
            form?.reset()
        }
    }

    return (
        <Card className="mb-8">
            <CardHeader>
                <CardTitle>Brain Dump</CardTitle>
                <CardDescription>Get everything out of your head. We'll help you schedule it.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="task-form" action={handleAddTask} className="flex flex-col gap-4 md:flex-row md:items-end">
                    <div className="space-y-2">
                        <Label htmlFor="title">Task Name</Label>
                        <Input id="title" name="title" placeholder="e.g. Q4 Strategy Review" required disabled={isLoading} />
                    </div>

                    <div className="w-[180px]">
                        <Label htmlFor="category" className="mb-2">Category</Label>
                        <Select name="category" required defaultValue="DEEP_WORK" disabled={isLoading}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="DEEP_WORK">Deep Work</SelectItem>
                                <SelectItem value="SHALLOW_WORK">Shallow Work</SelectItem>
                                <SelectItem value="ADMIN">Admin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="w-[140px] space-y-2">
                        <Label htmlFor="duration">Est. Minutes</Label>
                        <Input id="duration" name="duration" type="number" placeholder="60" min="5" step="5" required disabled={isLoading} />
                    </div>

                    <Button type="submit" disabled={isLoading} className="bg-blue-600 hover:bg-blue-500">
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />}
                        Add Task
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
