
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addTask(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const duration = parseInt(formData.get('duration') as string)

    const { error } = await supabase
        .from('tasks')
        .insert({
            user_id: user.id,
            title,
            category,
            duration_estimate: duration,
            is_completed: false
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { message: 'Task added successfully' }
}


export async function deleteTask(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const taskId = formData.get('taskId') as string

    const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId)
        .eq('user_id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { message: 'Task deleted successfully' }
}

export async function updateTask(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const taskId = formData.get('taskId') as string
    const isCompleted = formData.get('isCompleted') === 'true'

    const { error } = await supabase
        .from('tasks')
        .update({ is_completed: isCompleted })
        .eq('id', taskId)
        .eq('user_id', user.id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { message: 'Task updated successfully' }
}

export async function getTasks() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return []

    const { data } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

    return data || []
}
