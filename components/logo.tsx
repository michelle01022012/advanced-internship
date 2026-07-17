import Image from 'next/image'
import Link from 'next/link'

export function Logo({ href = '/' }: { href?: string }) {
  return (
    <Link href={href} className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="Summarist logo"
        width={40}
        height={40}
        className="h-8 w-8 object-contain"
      />
      <span className="text-2xl font-bold tracking-tight text-foreground">
        Summarist
      </span>
    </Link>
  )
}
