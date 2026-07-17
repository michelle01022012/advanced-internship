import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Star, Clock, Mic, Lightbulb, BookOpen } from 'lucide-react'
import { getBook } from '@/lib/api'
import { BookDuration } from '@/components/app/book-duration'
import { LibraryButton } from '@/components/app/library-button'

export default async function BookPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const book = await getBook(id)
  if (!book) notFound()

  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-brand-navy">{book.title}</h1>
        <p className="mt-3 font-bold text-brand-navy">{book.author}</p>
        <p className="mt-2 text-lg text-brand-navy">{book.subTitle}</p>

        <div className="my-6 grid max-w-md grid-cols-2 gap-4 border-y border-border py-4 text-sm font-medium text-brand-navy">
          <Stat icon={Star}>
            {book.averageRating} ({book.totalRating} ratings)
          </Stat>
          <Stat icon={Clock}>
            <BookDuration audioLink={book.audioLink} />
          </Stat>
          <Stat icon={Mic}>{book.type}</Stat>
          <Stat icon={Lightbulb}>{book.keyIdeas} Key ideas</Stat>
        </div>

        <div className="flex gap-4">
          <Link
            href={`/player/${book.id}`}
            className="flex h-12 w-32 items-center justify-center gap-2 rounded bg-brand-navy text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <BookOpen className="h-5 w-5" />
            Read
          </Link>
          <Link
            href={`/player/${book.id}`}
            className="flex h-12 w-32 items-center justify-center gap-2 rounded bg-brand-navy text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Mic className="h-5 w-5" />
            Listen
          </Link>
        </div>

        <div className="mt-6">
          <LibraryButton id={book.id} />
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-brand-navy">
            What&apos;s it about?
          </h2>
          <div className="mb-4 flex flex-wrap gap-4">
            {book.tags?.map((tag) => (
              <span
                key={tag}
                className="rounded bg-secondary px-4 py-2.5 text-sm font-medium text-brand-navy"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="leading-relaxed text-brand-navy">
            {book.bookDescription}
          </p>
        </div>

        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-brand-navy">
            About the author
          </h2>
          <p className="leading-relaxed text-brand-navy">
            {book.authorDescription}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        <Image
          src={book.imageLink || '/logo.png'}
          alt={book.title}
          width={300}
          height={300}
          unoptimized
          className="h-auto w-[300px] object-contain"
        />
      </div>
    </div>
  )
}

function Stat({
  icon: Icon,
  children,
}: {
  icon: typeof Star
  children: React.ReactNode
}) {
  return (
    <span className="flex items-center gap-2">
      <Icon className="h-5 w-5" />
      {children}
    </span>
  )
}
