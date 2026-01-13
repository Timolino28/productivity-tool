
'use client'

import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { DashboardSidebar } from './dashboard-sidebar'

export function DashboardHeader() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-white px-6 lg:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0 flex gap-0 w-[240px]">
                    <DashboardSidebar />
                </SheetContent>
            </Sheet>
            <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <span className="font-semibold text-lg">FocusFlow</span>
            </div>
        </header>
    )
}
