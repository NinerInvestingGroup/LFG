import { Metadata } from 'next'
import { Header } from '@/components/navigation/Header'

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your travel dashboard',
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto container-padding section-padding">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-muted-foreground">
          Your personalized travel dashboard is coming soon...
        </p>
      </main>
    </div>
  )
}