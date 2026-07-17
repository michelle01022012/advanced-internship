'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

export interface User {
  email: string
  isGuest: boolean
  plan: 'basic' | 'premium'
}

interface AuthContextValue {
  user: User | null
  ready: boolean
  library: string[]
  finished: string[]
  loginModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
  loginAsGuest: () => void
  loginWithEmail: (email: string) => void
  logout: () => void
  toggleLibrary: (id: string) => void
  isInLibrary: (id: string) => boolean
  markFinished: (id: string) => void
  setPlan: (plan: 'basic' | 'premium') => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const USER_KEY = 'summarist-user'
const LIB_KEY = 'summarist-library'
const FIN_KEY = 'summarist-finished'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [library, setLibrary] = useState<string[]>([])
  const [finished, setFinished] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const [loginModalOpen, setLoginModalOpen] = useState(false)

  useEffect(() => {
    try {
      const u = localStorage.getItem(USER_KEY)
      if (u) setUser(JSON.parse(u))
      const l = localStorage.getItem(LIB_KEY)
      if (l) setLibrary(JSON.parse(l))
      const f = localStorage.getItem(FIN_KEY)
      if (f) setFinished(JSON.parse(f))
    } catch {
      // ignore
    }
    setReady(true)
  }, [])

  const persistUser = useCallback((u: User | null) => {
    setUser(u)
    if (u) localStorage.setItem(USER_KEY, JSON.stringify(u))
    else localStorage.removeItem(USER_KEY)
  }, [])

  const loginAsGuest = useCallback(() => {
    persistUser({ email: 'guest@summarist.com', isGuest: true, plan: 'premium' })
    setLoginModalOpen(false)
  }, [persistUser])

  const loginWithEmail = useCallback(
    (email: string) => {
      persistUser({ email, isGuest: false, plan: 'premium' })
      setLoginModalOpen(false)
    },
    [persistUser],
  )

  const logout = useCallback(() => {
    persistUser(null)
  }, [persistUser])

  const setPlan = useCallback(
    (plan: 'basic' | 'premium') => {
      setUser((prev) => {
        if (!prev) return prev
        const next = { ...prev, plan }
        localStorage.setItem(USER_KEY, JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const toggleLibrary = useCallback((id: string) => {
    setLibrary((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
      localStorage.setItem(LIB_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isInLibrary = useCallback(
    (id: string) => library.includes(id),
    [library],
  )

  const markFinished = useCallback((id: string) => {
    setFinished((prev) => {
      if (prev.includes(id)) return prev
      const next = [...prev, id]
      localStorage.setItem(FIN_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      library,
      finished,
      loginModalOpen,
      openLoginModal: () => setLoginModalOpen(true),
      closeLoginModal: () => setLoginModalOpen(false),
      loginAsGuest,
      loginWithEmail,
      logout,
      toggleLibrary,
      isInLibrary,
      markFinished,
      setPlan,
    }),
    [
      user,
      ready,
      library,
      finished,
      loginModalOpen,
      loginAsGuest,
      loginWithEmail,
      logout,
      toggleLibrary,
      isInLibrary,
      markFinished,
      setPlan,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
