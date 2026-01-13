
import { BarChart3, Calendar, ShieldCheck, Zap } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'

const features = [
    {
        name: 'Strategic Input Engine',
        description:
            'Brain dump tasks and automatically categorize them into Deep Work, Shallow Work, or Admin.',
        icon: Zap,
    },
    {
        name: 'Smart Week Generator',
        description:
            'Automatically schedule your deep work sessions during your peak focus hours for maximum efficiency.',
        icon: Calendar,
    },
    {
        name: 'Revenue Impact Dashboard',
        description:
            'Visualize the potential revenue of your planned work and see the opportunity cost of admin tasks.',
        icon: BarChart3,
    },
    {
        name: 'Focus-First Security',
        description:
            'Your data is secure and your focus is protected. We prioritize privacy and minimal distractions.',
        icon: ShieldCheck,
    },
]

export function LandingFeatures() {
    return (
        <div className="py-24 sm:py-32" id="features">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-blue-600">Work Smarter</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Everything you need to scale your output
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        FocusFlow isn't just a to-do list. It's a strategic partner that forces you to align your time with your revenue goals.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
