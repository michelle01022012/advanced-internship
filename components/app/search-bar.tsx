'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Clock, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import { searchBooks } from '@/lib/api'
import type { Book } from '@/lib/types'
import { BookDuration } from './book-duration'

export function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query.trim()) {
        setResults([])
        setLoading(false)
        return
      }
      setLoading(true)
      const data = await searchBooks(query)
      setResults(data)
      setLoading(false)
    }, 400)
    return () => clearTimeout(handler)
  }, [query])

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const goToBook = (id: string) => {
    setOpen(false)
    setQuery('')
    router.push(`/book/${id}`)
  }

  return (
    <div className="flex h-20 items-center justify-end border-b border-border px-6">
      <div ref={containerRef} className="relative w-full max-w-sm">
        <div className="flex items-center rounded-lg border border-border bg-secondary">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            placeholder="Search for books"
            className="w-full bg-transparent px-4 py-2.5 text-sm outline-none"
          />
          <span className="flex h-full items-center border-l border-border px-4 text-muted-foreground">
            {loading ? (
              <LoaderCircle className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </span>
        </div>

        {open && query.trim() && (
          <div className="absolute right-0 top-full z-40 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-lg border border-border bg-card shadow-lg">
            {loading && results.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                Searching...
              </p>
            ) : results.length === 0 ? (
              <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                No books found
              </p>
            ) : (
              results.map((book) => (
                <button
                  key={book.id}
                  type="button"
                  onClick={() => goToBook(book.id)}
                  className="flex w-full items-center gap-3 border-b border-border p-3 text-left transition-colors last:border-b-0 hover:bg-secondary"
                >
                  <Image
                    src={book.imageLink || '/logo.png'}
                    alt={book.title}
                    width={48}
                    height={64}
                    className="h-16 w-12 shrink-0 object-cover"
                    unoptimized
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{book.title}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {book.author}
                    </p>
                    <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <BookDuration audioLink={book.audioLink} />
                    </span>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
