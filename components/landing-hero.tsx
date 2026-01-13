
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export function LandingHero() {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                        Announcing our public beta.{' '}
                        <Link href="#" className="font-semibold text-blue-600">
                            <span className="absolute inset-0" aria-hidden="true" />
                            Read more <span aria-hidden="true">&rarr;</span>
                        </Link>
                    </div>
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Focus on what <span className="text-blue-600">drives revenue</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                    Stop getting lost in busy work. FocusFlow helps solopreneurs allocate time to high-impact activities, track potential revenue, and eliminate time-wasting tasks.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500">
                        <Link href="/auth">
                            Get Started <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Link href="#features" className="text-sm font-semibold leading-6 text-gray-900">
                        Learn more <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
