'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { Play, Pause, RotateCcw, RotateCw } from 'lucide-react'
import type { Book } from '@/lib/types'
import { formatTime } from '@/lib/format'
import { useAuth } from '@/components/auth/auth-provider'
import { cn } from '@/lib/utils'

const FONT_SIZES = [
  { size: 16, cls: 'text-base' },
  { size: 18, cls: 'text-lg' },
  { size: 22, cls: 'text-xl' },
  { size: 26, cls: 'text-2xl' },
]

export function PlayerClient({ book }: { book: Book }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const { markFinished } = useAuth()
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fontIndex, setFontIndex] = useState(0)

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) audio.pause()
    else audio.play()
    setPlaying(!playing)
  }

  const skip = (amount: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = Math.min(
      Math.max(audio.currentTime + amount, 0),
      duration,
    )
  }

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current
    if (!audio) return
    const time = Number(e.target.value)
    audio.currentTime = time
    setCurrent(time)
  }

  return (
    <div className="pb-28">
      <div className="mb-4 flex items-center gap-4 border-b border-border pb-4">
        {FONT_SIZES.map((f, i) => (
          <button
            key={f.size}
            type="button"
            onClick={() => setFontIndex(i)}
            aria-label={`Font size ${i + 1}`}
            className={cn(
              'border-b-2 border-transparent pb-1 font-serif leading-none text-brand-navy transition-colors',
              fontIndex === i && 'border-brand-green',
            )}
            style={{ fontSize: `${16 + i * 5}px` }}
          >
            Aa
          </button>
        ))}
      </div>

      <h1 className="border-b border-border pb-4 text-2xl font-bold text-brand-navy">
        {book.title}
      </h1>
      <div
        className={cn(
          'mt-6 whitespace-pre-line leading-relaxed text-brand-navy',
          FONT_SIZES[fontIndex].cls,
        )}
      >
        {book.summary}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 flex h-24 items-center gap-4 bg-brand-navy px-6 text-primary-foreground">
        <div className="flex w-1/4 min-w-0 items-center gap-3">
          <Image
            src={book.imageLink || '/logo.png'}
            alt={book.title}
            width={48}
            height={48}
            unoptimized
            className="h-12 w-12 shrink-0 object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm">{book.title}</p>
            <p className="truncate text-xs text-primary-foreground/70">
              {book.author}
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center gap-6">
          <button type="button" onClick={() => skip(-10)} aria-label="Rewind 10 seconds">
            <RotateCcw className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={toggle}
            aria-label={playing ? 'Pause' : 'Play'}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground text-brand-navy"
          >
            {playing ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current" />
            )}
          </button>
          <button type="button" onClick={() => skip(10)} aria-label="Forward 10 seconds">
            <RotateCw className="h-6 w-6" />
          </button>
        </div>

        <div className="flex w-1/3 items-center gap-3 text-xs">
          <span className="tabular-nums">{formatTime(current)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={current}
            onChange={onSeek}
            aria-label="Seek"
            className="h-1 flex-1 cursor-pointer accent-brand-green"
          />
          <span className="tabular-nums">{formatTime(duration)}</span>
        </div>

        <audio
          ref={audioRef}
          src={book.audioLink}
          preload="metadata"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onEnded={() => {
            setPlaying(false)
            markFinished(book.id)
          }}
        />
      </div>
    </div>
  )
}
