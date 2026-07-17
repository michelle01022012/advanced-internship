'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  House,
  Bookmark,
  PenLine,
  Search,
  Settings,
  CircleQuestionMark,
  LogOut,
} from 'lucide-react'
import { Logo } from '@/components/logo'
import { useAuth } from '@/components/auth/auth-provider'
import { cn } from '@/lib/utils'

const topNav = [
  { label: 'For you', href: '/for-you', icon: House },
  { label: 'My Library', href: '/library', icon: Bookmark },
  { label: 'Highlights', href: null, icon: PenLine },
  { label: 'Search', href: null, icon: Search },
]

const bottomNav = [{ label: 'Settings', href: '/settings', icon: Settings }]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex h-20 items-center px-6">
        <Logo href="/for-you" />
      </div>

      <nav className="flex flex-1 flex-col justify-between pb-8">
        <ul className="flex flex-col">
          {topNav.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              active={item.href === pathname}
            />
          ))}
        </ul>

        <ul className="flex flex-col">
          {bottomNav.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              active={item.href === pathname}
            />
          ))}
          <NavItem
            item={{ label: 'Help & Support', href: null, icon: CircleQuestionMark }}
            active={false}
          />
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="relative flex w-full items-center gap-3 px-6 py-3 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

function NavItem({
  item,
  active,
}: {
  item: { label: string; href: string | null; icon: typeof House }
  active: boolean
}) {
  const Icon = item.icon
  const content = (
    <>
      <span
        className={cn(
          'absolute left-0 top-0 h-full w-1 bg-brand-green',
          active ? 'block' : 'hidden',
        )}
      />
      <Icon className="h-5 w-5" />
      {item.label}
    </>
  )

  const base =
    'relative flex items-center gap-3 px-6 py-3 text-sm transition-colors'

  if (!item.href) {
    return (
      <li>
        <span
          className={cn(base, 'cursor-not-allowed text-sidebar-foreground/40')}
        >
          {content}
        </span>
      </li>
    )
  }

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          base,
          'text-sidebar-foreground hover:bg-sidebar-accent',
          active && 'font-medium',
        )}
      >
        {content}
      </Link>
    </li>
  )
}
