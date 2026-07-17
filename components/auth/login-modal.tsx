'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { X, User } from 'lucide-react'
import { useAuth } from './auth-provider'

export function LoginModal() {
  const { loginModalOpen, closeLoginModal, loginAsGuest, loginWithEmail } =
    useAuth()
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (loginModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [loginModalOpen])

  if (!loginModalOpen) return null

  const goToApp = () => router.push('/for-you')

  const handleGuest = () => {
    loginAsGuest()
    goToApp()
  }

  const handleGoogle = () => {
    loginWithEmail('user@gmail.com')
    goToApp()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    loginWithEmail(email.trim())
    goToApp()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-16"
      role="dialog"
      aria-modal="true"
      aria-label="Login to Summarist"
      onClick={closeLoginModal}
    >
      <div
        className="relative w-full max-w-md rounded-md bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={closeLoginModal}
          className="absolute right-4 top-4 text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="px-8 py-10">
          <h2 className="mb-8 text-center text-xl font-bold text-foreground">
            {mode === 'login' ? 'Log in to Summarist' : 'Sign up to Summarist'}
          </h2>

          {mode === 'login' && (
            <>
              <button
                type="button"
                onClick={handleGuest}
                className="relative flex w-full items-center justify-center rounded bg-[#3a579d] py-3 text-sm font-medium text-white transition-colors hover:bg-[#314c8c]"
              >
                <User className="absolute left-4 h-5 w-5" />
                Login as a Guest
              </button>
              <Divider />
            </>
          )}

          <button
            type="button"
            onClick={handleGoogle}
            className="relative flex w-full items-center justify-center rounded bg-[#4285f4] py-3 text-sm font-medium text-white transition-colors hover:bg-[#3673d6]"
          >
            <span className="absolute left-1.5 flex h-8 w-8 items-center justify-center rounded bg-white">
              <GoogleIcon />
            </span>
            {mode === 'login' ? 'Login with Google' : 'Sign up with Google'}
          </button>

          <Divider />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand-green"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded border border-border bg-card px-3 py-2.5 text-sm outline-none focus:border-brand-green"
            />
            <button
              type="submit"
              className="rounded bg-brand-green py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-brand-green-hover"
            >
              {mode === 'login' ? 'Login' : 'Sign up'}
            </button>
          </form>

          {mode === 'login' && (
            <button
              type="button"
              className="mt-4 w-full text-center text-sm text-brand-blue hover:underline"
            >
              Forgot your password?
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
          className="w-full rounded-b-md border-t border-border bg-secondary py-4 text-center text-sm font-medium text-brand-blue hover:underline"
        >
          {mode === 'login'
            ? "Don't have an account?"
            : 'Already have an account?'}
        </button>
      </div>
    </div>
  )
}

function Divider() {
  return (
    <div className="my-4 flex items-center gap-4">
      <span className="h-px flex-1 bg-border" />
      <span className="text-sm text-muted-foreground">or</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.46 14.97.5 12 .5A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 6.68 9.14 4.75 12 4.75z"
      />
    </svg>
  )
}
