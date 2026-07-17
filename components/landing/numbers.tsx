import { Crown, Star, Leaf } from 'lucide-react'

const cards = [
  {
    icon: Crown,
    stat: '3 Million',
    text: 'Downloads on all platforms',
    stars: false,
  },
  {
    icon: Star,
    stat: '4.5 Stars',
    text: 'Average ratings on iOS and Google Play',
    stars: true,
  },
  {
    icon: Leaf,
    stat: '97%',
    text: 'Of Summarist members create a better reading habit',
    stars: false,
  },
]

export function Numbers() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-center text-2xl font-bold">
        Start growing with Summarist now
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {cards.map(({ icon: Icon, stat, text, stars }) => (
          <div
            key={stat}
            className="flex flex-col items-center rounded-lg bg-stat px-6 py-10 text-center"
          >
            <Icon
              className="h-12 w-12 text-brand-blue"
              strokeWidth={1.4}
              fill={stars ? 'currentColor' : 'none'}
            />
            <span className="mt-4 text-3xl font-semibold">{stat}</span>
            <p className="mt-2 text-sm text-foreground/70">{text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
