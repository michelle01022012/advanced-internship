import type { Book } from '@/lib/types'
import { BookCard } from './book-card'

export function BookList({
  title,
  subtitle,
  books,
}: {
  title: string
  subtitle: string
  books: Book[]
}) {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-brand-navy">{title}</h2>
      <p className="mt-1 text-muted-foreground">{subtitle}</p>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-4">
        {books.length === 0 ? (
          <p className="py-8 text-sm text-muted-foreground">
            No books available.
          </p>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>
    </section>
  )
}
