'use client'

import { Bookmark } from 'lucide-react'
import { useAuth } from '@/components/auth/auth-provider'

export function LibraryButton({ id }: { id: string }) {
  const { isInLibrary, toggleLibrary } = useAuth()
  const saved = isInLibrary(id)

  return (
    <button
      type="button"
      onClick={() => toggleLibrary(id)}
      className="flex items-center gap-2 text-sm font-medium text-brand-blue transition-colors hover:text-brand-navy"
    >
      <Bookmark className={saved ? 'h-5 w-5 fill-current' : 'h-5 w-5'} />
      {saved ? 'Saved in My Library' : 'Add title to My Library'}
    </button>
  )
}
