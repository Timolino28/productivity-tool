'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function submitOnboarding(formData: FormData) {
    const supabase = await createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/auth')
    }

    const weeklyBudget = parseInt(formData.get('weeklyBudget') as string)
    const hourlyRate = parseFloat(formData.get('hourlyRate') as string)

    // Ensure we provide the primary key 'id' which matches the user's ID
    const payload = {
        id: user.id,
        user_id: user.id,
        weekly_budget: weeklyBudget,
        hourly_rate: hourlyRate,
    }

    const { error } = await supabase
        .from('profiles')
        .upsert(payload)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard', 'layout')
    redirect('/dashboard')
}
