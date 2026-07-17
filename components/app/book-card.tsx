import Link from 'next/link'
import Image from 'next/image'
import { Clock, Star } from 'lucide-react'
import type { Book } from '@/lib/types'
import { BookDuration } from './book-duration'

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="relative flex w-full flex-col rounded p-3 transition-colors hover:bg-secondary"
    >
      {book.subscriptionRequired && (
        <span className="absolute right-0 top-0 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-medium text-primary-foreground">
          Premium
        </span>
      )}
      <div className="mb-3 flex h-44 items-center justify-center">
        <Image
          src={book.imageLink || '/logo.png'}
          alt={book.title}
          width={172}
          height={172}
          unoptimized
          className="h-full w-auto object-contain"
        />
      </div>
      <h3 className="text-base font-bold leading-snug text-foreground">
        {book.title}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
      <p className="mt-2 text-sm leading-snug text-foreground/70">
        {book.subTitle}
      </p>
      <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <BookDuration audioLink={book.audioLink} />
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-4 w-4" />
          {book.averageRating}
        </span>
      </div>
    </Link>
  )
}
