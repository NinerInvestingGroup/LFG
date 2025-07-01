import Link from 'next/link'
import { ArrowRight, Users, Map, MessageCircle, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Header } from '@/components/navigation/Header'
import { APP_CONFIG, ROUTES } from '@/shared/constants'

const features = [
  {
    icon: Users,
    title: 'Connect with Travelers',
    description: 'Find like-minded travelers who share your passion for adventure and exploration.',
  },
  {
    icon: Map,
    title: 'Discover Amazing Trips',
    description: 'Browse and join unique travel experiences organized by fellow travelers.',
  },
  {
    icon: MessageCircle,
    title: 'Plan Together',
    description: 'Coordinate with your travel group through integrated messaging and planning tools.',
  },
  {
    icon: Shield,
    title: 'Travel Safely',
    description: 'Verified profiles and reviews help you travel with confidence and peace of mind.',
  },
]

const stats = [
  { value: '10K+', label: 'Active Travelers' },
  { value: '500+', label: 'Destinations' },
  { value: '2K+', label: 'Successful Trips' },
  { value: '4.9/5', label: 'User Rating' },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative section-padding bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-gradient mb-6">
              Let&apos;s Go Together
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with fellow travelers, discover amazing adventures, and create unforgettable memories together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.DISCOVER}>
                <Button size="lg" className="min-w-[200px]">
                  Discover Trips
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={ROUTES.AUTH.SIGNUP}>
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Join the Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto container-padding">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-muted/50">
        <div className="container mx-auto container-padding">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Why Choose LFG?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to plan, connect, and travel with amazing people from around the world.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="card-hover">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary-500 text-white">
        <div className="container mx-auto container-padding text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who have already discovered their next adventure through LFG.
          </p>
          <Link href={ROUTES.AUTH.SIGNUP}>
            <Button size="lg" variant="secondary" className="min-w-[200px]">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-neutral-900 text-white">
        <div className="container mx-auto container-padding">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white font-bold">
                  LFG
                </div>
                <span className="font-display font-bold text-xl">
                  {APP_CONFIG.name.split(' ')[0]}
                </span>
              </div>
              <p className="text-neutral-400">
                {APP_CONFIG.description}
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link href={ROUTES.DISCOVER} className="hover:text-white transition-colors">Discover</Link></li>
                <li><Link href={ROUTES.TRIPS} className="hover:text-white transition-colors">My Trips</Link></li>
                <li><Link href={ROUTES.MESSAGES} className="hover:text-white transition-colors">Messages</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-neutral-400">
            <p>&copy; {new Date().getFullYear()} {APP_CONFIG.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
