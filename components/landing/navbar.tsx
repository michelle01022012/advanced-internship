'use client'

import { Logo } from '@/components/logo'
import { useAuth } from '@/components/auth/auth-provider'

export function LandingNavbar() {
  const { openLoginModal } = useAuth()

  return (
    <nav className="w-full">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo />
        <ul className="flex items-center gap-6 text-sm font-medium">
          <li>
            <button
              type="button"
              onClick={openLoginModal}
              className="cursor-pointer text-foreground transition-colors hover:text-brand-green"
            >
              Login
            </button>
          </li>
          <li className="hidden cursor-not-allowed text-muted-foreground/60 md:block">
            About
          </li>
          <li className="hidden cursor-not-allowed text-muted-foreground/60 md:block">
            Contact
          </li>
          <li className="hidden cursor-not-allowed text-muted-foreground/60 md:block">
            Help
          </li>
        </ul>
      </div>
    </nav>
  )
}
