import { Metadata } from 'next'
import { Header } from '@/components/navigation/Header'
import { CommunityFeed } from '@/components/cards/CommunityFeed'

export const metadata: Metadata = {
  title: 'Community Feed Test',
  description: 'Testing the LFG community feed component',
}

export default function TestFeedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <Header />
      <main className="container mx-auto container-padding section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Community Feed Test</h1>
            <p className="text-muted-foreground">
              Testing the community feed component with sample data
            </p>
          </div>
          
          <CommunityFeed />
        </div>
      </main>
    </div>
  )
}