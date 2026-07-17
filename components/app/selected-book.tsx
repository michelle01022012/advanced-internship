import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import type { Book } from '@/lib/types'
import { BookDuration } from './book-duration'

export function SelectedBook({ book }: { book: Book }) {
  return (
    <Link
      href={`/book/${book.id}`}
      className="flex flex-col gap-6 rounded bg-cream p-6 transition-opacity hover:opacity-90 md:flex-row md:items-center"
    >
      <p className="max-w-xs text-sm leading-relaxed text-foreground md:border-r md:border-foreground/20 md:pr-6">
        {book.subTitle}
      </p>
      <div className="flex items-center gap-6">
        <Image
          src={book.imageLink || '/logo.png'}
          alt={book.title}
          width={140}
          height={140}
          unoptimized
          className="h-32 w-auto object-contain"
        />
        <div>
          <h3 className="text-base font-semibold">{book.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{book.author}</p>
          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Play className="h-4 w-4 fill-current" />
            </span>
            <span className="text-sm font-medium">
              <BookDuration audioLink={book.audioLink} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
