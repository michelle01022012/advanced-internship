'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/app/sidebar'
import { SearchBar } from '@/components/app/search-bar'
import { useAuth } from '@/components/auth/auth-provider'

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, ready } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (ready && !user) {
      router.replace('/')
    }
  }, [ready, user, router])

  if (!ready || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-green border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen md:pl-60">
      <Sidebar />
      <SearchBar />
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </div>
  )
}
