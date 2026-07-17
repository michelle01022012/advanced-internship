import { notFound } from 'next/navigation'
import { getBook } from '@/lib/api'
import { PlayerClient } from '@/components/app/player-client'

export default async function PlayerPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const book = await getBook(id)
  if (!book) notFound()

  return <PlayerClient book={book} />
}
