
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AuthErrorPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Authentication Error</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md text-center">
                There was an issue signing you in. This link may have expired or is invalid.
            </p>
            <Button asChild>
                <Link href="/auth">Try Again</Link>
            </Button>
        </div>
    )
}
