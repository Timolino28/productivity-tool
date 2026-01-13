import { TaskItem } from '@/components/task-item'
import { getTasks } from '@/app/dashboard/actions'

export async function TaskList() {
    const tasks = await getTasks()

    if (tasks.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 bg-white rounded-lg border border-dashed">
                No tasks yet. Start by adding one above!
            </div>
        )
    }

    return (
        <div className="grid gap-4">
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    )
}
