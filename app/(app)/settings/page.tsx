'use client'

import { useAuth } from '@/components/auth/auth-provider'

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="border-b border-border pb-6 text-3xl font-bold text-brand-navy">
        Settings
      </h1>

      <div className="border-b border-border py-6">
        <h2 className="font-bold text-brand-navy">Your Subscription plan</h2>
        <p className="mt-1 text-brand-navy">{user?.plan ?? 'basic'}</p>
      </div>

      <div className="py-6">
        <h2 className="font-bold text-brand-navy">Email</h2>
        <p className="mt-1 text-brand-navy">{user?.email ?? '—'}</p>
      </div>
    </div>
  )
}
