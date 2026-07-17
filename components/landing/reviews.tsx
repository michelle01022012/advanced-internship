'use client'

import { Star } from 'lucide-react'
import { useAuth } from '@/components/auth/auth-provider'

const reviews = [
  {
    name: 'Hanna M.',
    text: "This app has been a game-changer for me! It's saved me so much time and effort in reading and comprehending books. Highly recommend it to all book lovers.",
  },
  {
    name: 'David B.',
    text: "I love this app! It provides concise and accurate summaries of books in a way that is easy to understand. It's also very user-friendly and intuitive.",
  },
  {
    name: 'Nathan S.',
    text: 'This app is a great way to get the main takeaways from a book without having to read the entire thing. The summaries are well-written and informative. Definitely worth downloading.',
  },
  {
    name: 'Ryan R.',
    text: "If you're a busy person who loves reading but doesn't have the time to read every book in full, this app is for you! The summaries are thorough and provide a great overview of the book's content.",
  },
]

export function Reviews() {
  const { openLoginModal } = useAuth()

  return (
    <section className="mx-auto max-w-2xl px-6 py-16">
      <h2 className="text-center text-2xl font-bold">What our members say</h2>
      <div className="mt-10 flex flex-col gap-6">
        {reviews.map((r) => (
          <div key={r.name} className="rounded bg-cream p-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold">{r.name}</span>
              <div className="flex text-brand-blue">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              {r.text}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-10 flex justify-center">
        <button
          type="button"
          onClick={openLoginModal}
          className="w-full max-w-xs rounded bg-brand-green py-3 text-sm font-medium text-foreground transition-colors hover:bg-brand-green-hover"
        >
          Login
        </button>
      </div>
    </section>
  )
}
