"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Plane, Instagram, Twitter, Facebook, Youtube, Mail, MapPin, Phone, Heart } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Pricing", href: "/pricing" },
      { name: "Mobile App", href: "/app" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Blog", href: "/blog" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "Community", href: "/community" },
      { name: "Travel Guides", href: "/guides" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Safety", href: "/safety" },
    ],
  }

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/lfgtravel", color: "hover:text-pink-500" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/lfgtravel", color: "hover:text-blue-400" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/lfgtravel", color: "hover:text-blue-600" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/lfgtravel", color: "hover:text-red-500" },
  ]

  return (
    <footer className="bg-neutral-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-black mb-4">Stay in the Loop</h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get travel inspiration, exclusive deals, and epic trip ideas delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl text-neutral-900 font-medium focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <Button className="bg-white text-primary hover:bg-white/90 font-bold px-8 py-4 rounded-2xl">
              <Mail className="w-5 h-5 mr-2" />
              Subscribe
            </Button>
          </div>
          <p className="text-sm opacity-70 mt-4">Join 50,000+ travelers getting weekly inspiration</p>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Plane className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black">LFG</span>
              </div>

              <p className="text-neutral-400 mb-6 leading-relaxed">
                The world's first unified social travel ecosystem. Turn friends into travel squad and create epic
                adventures together.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-neutral-400">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <Phone className="w-5 h-5 text-primary" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-neutral-400">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>hello@lfgtravel.com</span>
                </div>
              </div>

              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.name}
                      href={social.href}
                      className={`w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div>
              <h4 className="text-lg font-bold mb-6">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-white transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-neutral-800" />

      {/* Bottom Bar */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-neutral-400 text-sm">© 2024 LFG Travel. All rights reserved.</p>
              <Badge className="bg-success text-white">
                <Heart className="w-3 h-3 mr-1" />
                Made with love for travelers
              </Badge>
            </div>

            <div className="flex items-center gap-6 text-sm text-neutral-400">
              <span>🌍 Available worldwide</span>
              <span>📱 iOS & Android</span>
              <span>🔒 Secure & trusted</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
