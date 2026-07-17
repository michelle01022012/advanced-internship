'use client'

import useSWR from 'swr'
import { useAuth } from '@/components/auth/auth-provider'
import { getBook } from '@/lib/api'
import { BookCard } from '@/components/app/book-card'
import type { Book } from '@/lib/types'

function useBooks(ids: string[]) {
  const key = ids.length ? ['books', ...ids] : null
  const { data, isLoading } = useSWR<Book[]>(key, async () => {
    const books = await Promise.all(ids.map((id) => getBook(id)))
    return books.filter((b): b is Book => Boolean(b))
  })
  return { books: data ?? [], isLoading }
}

export default function LibraryPage() {
  const { library, finished } = useAuth()
  const saved = useBooks(library)
  const done = useBooks(finished)

  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-navy">Saved Books</h1>
      <p className="mt-1 text-muted-foreground">{library.length} items</p>
      <BookGrid books={saved.books} loading={saved.isLoading} empty="Save your favorite books to find them here." />

      <h1 className="mt-12 text-2xl font-bold text-brand-navy">Finished</h1>
      <p className="mt-1 text-muted-foreground">{finished.length} items</p>
      <BookGrid books={done.books} loading={done.isLoading} empty="Books you finish will appear here." />
    </div>
  )
}

function BookGrid({
  books,
  loading,
  empty,
}: {
  books: Book[]
  loading: boolean
  empty: string
}) {
  if (loading) {
    return <p className="py-8 text-sm text-muted-foreground">Loading…</p>
  }
  if (books.length === 0) {
    return <p className="py-8 text-sm text-muted-foreground">{empty}</p>
  }
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  )
}
