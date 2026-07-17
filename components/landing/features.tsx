import { FileText, Bookmark, Mic } from 'lucide-react'

const features = [
  {
    icon: FileText,
    title: 'Read or listen',
    text: 'Save time by getting the core ideas from the best books.',
  },
  {
    icon: Bookmark,
    title: 'Find your next read',
    text: 'Explore book lists and personalized recommendations.',
  },
  {
    icon: Mic,
    title: 'Briefcasts',
    text: 'Gain valuable insights from briefcasts.',
  },
]

export function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <h2 className="text-center text-2xl font-bold">
        Understand books in few minutes
      </h2>
      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex flex-col items-center text-center">
            <Icon className="h-14 w-14 text-foreground" strokeWidth={1.2} />
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
