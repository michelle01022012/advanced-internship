const leftList = [
  { text: 'Enhance your knowledge', active: false },
  { text: 'Achieve greater success', active: false },
  { text: 'Improve your health', active: true },
  { text: 'Develop better parenting skills', active: false },
  { text: 'Increase happiness', active: false },
  { text: 'Be the best version of yourself!', active: false },
]

const rightList = [
  { text: 'Expand your learning', active: false },
  { text: 'Accomplish your goals', active: false },
  { text: 'Strengthen your vitality', active: true },
  { text: 'Become a better caregiver', active: false },
  { text: 'Improve your mood', active: false },
  { text: 'Maximize your abilities', active: false },
]

const statsA = [
  { pct: '93%', text: 'of Summarist members significantly increase reading frequency.' },
  { pct: '96%', text: 'of Summarist members establish better habits.' },
  { pct: '90%', text: 'have made significant positive change to their lives.' },
]

const statsB = [
  {
    pct: '91%',
    text: 'of Summarist members report feeling more productive after incorporating the service into their daily routine.',
  },
  {
    pct: '94%',
    text: 'of Summarist members have noticed an improvement in their overall comprehension and retention of information.',
  },
  {
    pct: '88%',
    text: 'of Summarist members feel more informed about current events and industry trends since using the platform.',
  },
]

function PhraseList({
  items,
  align,
}: {
  items: { text: string; active: boolean }[]
  align: 'left' | 'right'
}) {
  return (
    <ul className={align === 'right' ? 'text-right' : 'text-left'}>
      {items.map((item) => (
        <li
          key={item.text}
          className={`border-b-2 py-2.5 text-xl font-medium md:text-2xl ${
            item.active
              ? 'border-brand-green text-brand-green'
              : 'border-transparent text-foreground/40'
          }`}
        >
          {item.text}
        </li>
      ))}
    </ul>
  )
}

function StatsBox({ items }: { items: { pct: string; text: string }[] }) {
  return (
    <div className="rounded-lg bg-secondary p-8">
      <div className="flex flex-col gap-6">
        {items.map((s) => (
          <div key={s.pct} className="flex gap-4">
            <span className="text-lg font-bold text-brand-blue">{s.pct}</span>
            <p className="text-sm leading-relaxed text-foreground/80">
              {s.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function Statistics() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid items-center gap-8 py-8 md:grid-cols-2">
        <PhraseList items={leftList} align="left" />
        <StatsBox items={statsA} />
      </div>
      <div className="grid items-center gap-8 py-8 md:grid-cols-2">
        <StatsBox items={statsB} />
        <PhraseList items={rightList} align="right" />
      </div>
    </section>
  )
}
