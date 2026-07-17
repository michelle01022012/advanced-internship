import {
  getSelectedBook,
  getRecommendedBooks,
  getSuggestedBooks,
} from '@/lib/api'
import { SelectedBook } from '@/components/app/selected-book'
import { BookList } from '@/components/app/book-list'

export default async function ForYouPage() {
  const [selected, recommended, suggested] = await Promise.all([
    getSelectedBook(),
    getRecommendedBooks(),
    getSuggestedBooks(),
  ])

  return (
    <div>
      {selected && (
        <section className="mb-10">
          <h2 className="mb-4 text-2xl font-bold text-brand-navy">
            Selected just for you
          </h2>
          <SelectedBook book={selected} />
        </section>
      )}
      <BookList
        title="Recommended For You"
        subtitle="We think you'll like these"
        books={recommended}
      />
      <BookList
        title="Suggested Books"
        subtitle="Browse those books"
        books={suggested}
      />
    </div>
  )
}
