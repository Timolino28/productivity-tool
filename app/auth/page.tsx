
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { login, signup, loginWithGoogle } from './actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

export default function AuthPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<string>("login")

    const handleLogin = async (formData: FormData) => {
        setIsLoading(true)
        const result = await login(formData)
        setIsLoading(false)

        if (result?.error) {
            toast.error(result.error)
        } else {
            toast.success("Login successful")
        }
    }

    const handleSignup = async (formData: FormData) => {
        setIsLoading(true)
        const result = await signup(formData)
        setIsLoading(false)

        if (result?.error) {
            toast.error(result.error)
        } else if (result?.message) {
            toast.success(result.message)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
                        Welcome to <a href="/" className="text-blue-600 hover:text-blue-500">FocusFlow</a>
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Your strategic productivity partner
                    </p>
                </div>

                <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="signup">Sign Up</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <Card>
                            <CardHeader>
                                <CardTitle>Login</CardTitle>
                                <CardDescription>
                                    Enter your email below to login to your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form action={handleLogin} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" required disabled={isLoading} />
                                    </div>
                                    <Button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-500" type="submit" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Login
                                    </Button>
                                </form>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                    </div>
                                </div>
                                <form action={loginWithGoogle}>
                                    <Button variant="outline" className="cursor-pointer w-full" type="submit">
                                        Google
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="signup">
                        <Card>
                            <CardHeader>
                                <CardTitle>Create an account</CardTitle>
                                <CardDescription>
                                    Enter your email below to create your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <form action={handleSignup} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input id="email" name="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password</Label>
                                        <Input id="password" name="password" type="password" required disabled={isLoading} />
                                    </div>
                                    <Button className="cursor-pointer w-full bg-blue-600 hover:bg-blue-500" type="submit" disabled={isLoading}>
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        Sign Up
                                    </Button>
                                </form>
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-white px-2 text-gray-500">Or continue with</span>
                                    </div>
                                </div>
                                <form action={loginWithGoogle}>
                                    <Button variant="outline" className="cursor-pointer w-full" type="submit">
                                        Google
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
