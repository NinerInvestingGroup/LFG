import { Metadata } from 'next'
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  CommunityShowcaseSection,
  SocialProofSection,
  Footer,
} from '@/components/landing'

export const metadata: Metadata = {
  title: 'LFG Travel - Epic Group Adventures Made Easy',
  description: 'The world\'s first unified social travel ecosystem. Plan, coordinate, and experience epic group travel with friends. Join 100,000+ travelers today!',
  keywords: ['group travel', 'travel planning', 'social travel', 'trip coordination', 'travel community'],
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CommunityShowcaseSection />
      <SocialProofSection />
      <Footer />
    </>
  )
}
