import { LandingNavbar } from '@/components/landing/navbar'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Statistics } from '@/components/landing/statistics'
import { Reviews } from '@/components/landing/reviews'
import { Numbers } from '@/components/landing/numbers'
import { Footer } from '@/components/landing/footer'
import { LoginModal } from '@/components/auth/login-modal'

export default function HomePage() {
  return (
    <main>
      <LandingNavbar />
      <Hero />
      <Features />
      <Statistics />
      <Reviews />
      <Numbers />
      <Footer />
      <LoginModal />
    </main>
  )
}
