import { Metadata } from 'next'
import { Header } from '@/components/navigation/Header'

export const metadata: Metadata = {
  title: 'Discover Trips',
  description: 'Discover amazing travel opportunities',
}

export default function DiscoverPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto container-padding section-padding">
        <h1 className="text-3xl font-bold mb-6">Discover Trips</h1>
        <p className="text-muted-foreground">
          Trip discovery and search functionality coming soon...
        </p>
      </main>
    </div>
  )
}
