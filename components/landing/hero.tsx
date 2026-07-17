'use client'

import Image from 'next/image'
import { useAuth } from '@/components/auth/auth-provider'

export function Hero() {
  const { openLoginModal } = useAuth()

  return (
    <section className="mx-auto max-w-6xl px-6 py-8">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <h1 className="text-3xl font-bold leading-tight text-balance md:text-4xl">
            Gain more knowledge
            <br />
            in less time
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-foreground/80">
            Great summaries for busy people, individuals who barely have time to
            read, and even people who don&apos;t like to read.
          </p>
          <button
            type="button"
            onClick={openLoginModal}
            className="mt-8 w-full max-w-xs rounded bg-brand-green py-3 text-sm font-medium text-foreground transition-colors hover:bg-brand-green-hover"
          >
            Login
          </button>
        </div>
        <div className="order-1 flex justify-center md:order-2">
          <Image
            src="/landing.png"
            alt="Illustration of a person reading book summaries"
            width={480}
            height={400}
            priority
            className="h-auto w-full max-w-md object-contain"
          />
        </div>
      </div>
    </section>
  )
}
