'use client'

import { useState } from 'react'
import { formatTime } from '@/lib/format'

export function BookDuration({ audioLink }: { audioLink: string }) {
  const [duration, setDuration] = useState<number | null>(null)

  return (
    <>
      <span>{duration == null ? '--:--' : formatTime(duration)}</span>
      {audioLink && (
        <audio
          src={audioLink}
          preload="metadata"
          className="hidden"
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        />
      )}
    </>
  )
}
