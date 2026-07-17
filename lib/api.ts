import type { Book } from './types'

const BASE = 'https://us-central1-summaristt.cloudfunctions.net'

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return fallback
    return (await res.json()) as T
  } catch {
    return fallback
  }
}

export async function getSelectedBook(): Promise<Book | null> {
  const data = await safeFetch<Book[]>(`${BASE}/getBooks?status=selected`, [])
  return data[0] ?? null
}

export async function getRecommendedBooks(): Promise<Book[]> {
  return safeFetch<Book[]>(`${BASE}/getBooks?status=recommended`, [])
}

export async function getSuggestedBooks(): Promise<Book[]> {
  return safeFetch<Book[]>(`${BASE}/getBooks?status=suggested`, [])
}

export async function getBook(id: string): Promise<Book | null> {
  const data = await safeFetch<Book | null>(`${BASE}/getBook?id=${id}`, null)
  return data
}

export async function searchBooks(search: string): Promise<Book[]> {
  if (!search.trim()) return []
  return safeFetch<Book[]>(
    `${BASE}/getBooksByAuthorOrTitle?search=${encodeURIComponent(search)}`,
    [],
  )
}
