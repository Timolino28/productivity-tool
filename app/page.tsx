
import { LandingHero } from '@/components/landing-hero'
import { LandingFeatures } from '@/components/landing-features'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <LandingHero />
      <LandingFeatures />

      {/* Footer */}
      <footer className="w-full py-12 px-4 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} FocusFlow. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
