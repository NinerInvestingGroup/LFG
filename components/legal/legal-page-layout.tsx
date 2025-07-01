import Link from 'next/link'
import { ArrowLeft, Shield, Calendar, Clock } from 'lucide-react'

interface LegalPageLayoutProps {
  title: string
  lastUpdated: string
  effectiveDate: string
  children: React.ReactNode
}

export function LegalPageLayout({ title, lastUpdated, effectiveDate, children }: LegalPageLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-neutral-600 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to LFG
            </Link>
          </div>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary-50 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">{title}</h1>
              <p className="text-neutral-600">LFG Travel Platform</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Effective: {effectiveDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-neutral max-w-none">
            {children}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-neutral-200">
          <div className="bg-neutral-50 rounded-lg p-6">
            <h3 className="font-semibold text-neutral-900 mb-3">Questions or Concerns?</h3>
            <p className="text-neutral-700 mb-4">
              If you have any questions about this document or our policies, we're here to help.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="mailto:legal@lfgetaway.com" 
                className="text-primary hover:underline font-medium"
              >
                Contact Legal Team
              </a>
              <a 
                href="mailto:support@lfgetaway.com" 
                className="text-primary hover:underline font-medium"
              >
                General Support
              </a>
              <Link 
                href="/privacy-policy" 
                className="text-primary hover:underline font-medium"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms-of-service" 
                className="text-primary hover:underline font-medium"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}